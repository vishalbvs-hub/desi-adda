require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const API_KEY = process.env.GOOGLE_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const INPUT = path.join(__dirname, "confirmed-desi.json");
const OUTPUT = path.join(__dirname, "confirmed-enriched.json");
const businesses = JSON.parse(fs.readFileSync(INPUT, "utf8"));

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function makeSlug(name, city) {
  return (name + " " + (city || "")).toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 80);
}

function photoUrls(photos) {
  if (!photos?.length) return [];
  return photos.slice(0, 10).map(p => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${API_KEY}`);
}

// Route business to correct table based on query/category
function routeToTable(b) {
  const q = (b._queries || []).join(" ").toLowerCase();
  const cat = (b._categories || []).join(" ").toLowerCase();
  const name = (b.name || "").toLowerCase();

  if (q.match(/restaurant|biryani|tandoori|dosa|chaat|kebab|karahi|nihari|naan|masala|tiffin|catering|food delivery|chai cafe|sweet shop|bakery/)) return "restaurants";
  if (q.match(/grocery|meat shop|halal grocery|desi grocery/)) return "groceries";
  if (q.match(/temple|gurdwara|mosque|masjid|priest|pandit|puja|astrologer|imam|spiritual/)) return "temples";
  if (q.match(/wedding|dj|photographer|videographer|decorator|mandap|florist|event planner|mehndi party|sangeet|walima|nikah|banquet/)) return "wedding_vendors";
  if (q.match(/doctor|dentist|pediatrician|cardiologist|dermatologist|psychiatrist|speaking doctor/)) return "professionals";
  if (q.match(/lawyer|attorney|h1b|cpa|tax|realtor|insurance|mortgage|financial|driving school|cargo|itin|fbar/)) return "professionals";
  if (q.match(/beauty|salon|threading|bridal makeup/)) return "beauty_brands";
  if (q.match(/yoga|ayurveda|meditation/)) return "health_wellness";
  if (q.match(/dance class|music|carnatic|tabla|tutoring|childcare|quran|urdu school|hindi school/)) return "kids";
  if (q.match(/clothing|saree|jewelry/)) return "wedding_vendors"; // closest fit
  if (q.match(/banquet hall|nikkah hall/)) return "event_halls";

  // Fallback by category
  if (cat.includes("professional")) return "professionals";
  if (cat.includes("spiritual")) return "temples";
  if (cat.includes("event")) return "wedding_vendors";
  return "restaurants"; // default
}

async function getDetails(placeId) {
  const fields = "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,geometry,place_id,photos,reviews,price_level,business_status";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.status === "OK" ? data.result : null;
}

async function generateEditorial(name, city, table, reviews) {
  if (!ANTHROPIC_KEY || !reviews?.length) return null;

  const prompts = {
    restaurants: "Write a brief restaurant guide: JSON with known_for, the_move, skip (or null), vibe, pro_tip.",
    groceries: "Write a brief grocery guide: JSON with known_for, best_for, freshness_day (or null), pro_tip, skip (or null).",
    temples: "Write a brief temple/religious center guide: JSON with known_for, best_time_to_visit, community_events, pro_tip.",
    professionals: "Write a brief professional profile summary: JSON with specialty_focus, languages, pro_tip.",
    default: "Write a brief business guide: JSON with known_for, best_for, pro_tip.",
  };

  const system = `You are a local expert writing for Desi Adda USA, a South Asian community directory for Metro Detroit. Based on Google reviews, write a brief guide entry. Be direct and useful. ${prompts[table] || prompts.default} Respond with ONLY JSON, no markdown fences.`;

  const reviewText = reviews.slice(0, 3).map(r => `[${r.rating}★] "${(r.text || "").substring(0, 200)}" — ${r.author_name}`).join("\n");
  const msg = `Business: ${name}\nCity: ${city}\nReviews:\n${reviewText}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 250, system, messages: [{ role: "user", content: msg }] }),
    });
    const data = await res.json();
    const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
    try { return JSON.parse(text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()); } catch { return { raw: text }; }
  } catch { return null; }
}

async function main() {
  console.log(`\n🚀 Full Enrichment Pipeline — ${businesses.length} businesses`);
  console.log(`══════════════════════════════════════════════`);

  // Route businesses
  const routing = {};
  businesses.forEach(b => {
    const table = routeToTable(b);
    if (!routing[table]) routing[table] = 0;
    routing[table]++;
  });
  console.log("\nRouting:");
  Object.entries(routing).sort((a,b) => b[1]-a[1]).forEach(([t,n]) => console.log(`  ${t}: ${n}`));

  console.log(`\nStep 1: Google Place Details (${businesses.length} calls, ~$${(businesses.length * 0.032).toFixed(2)})`);
  console.log(`Step 2: Import to Supabase`);
  console.log(`Step 3: Claude Haiku editorial (~$0.01)`);
  console.log(`══════════════════════════════════════════════\n`);

  // Step 1: Enrich
  const enriched = [];
  let detailsOk = 0, detailsFail = 0;

  for (let i = 0; i < businesses.length; i++) {
    const b = businesses[i];
    if ((i + 1) % 20 === 0 || i === 0) process.stdout.write(`\n📍 Details ${i + 1}/${businesses.length}...\n`);
    process.stdout.write(`  ${i + 1}. ${b.name}... `);

    const details = await getDetails(b.place_id);
    if (!details) {
      console.log("❌ not found");
      detailsFail++;
      enriched.push({ ...b, _enriched: false, _table: routeToTable(b) });
      await sleep(200);
      continue;
    }

    const city = (details.formatted_address || "").split(",").slice(-3, -2)[0]?.trim() || b.formatted_address?.split(",")[1]?.trim() || "";

    enriched.push({
      ...b,
      _enriched: true,
      _table: routeToTable(b),
      _city: city,
      google_name: details.name,
      formatted_address: details.formatted_address,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      rating: details.rating || null,
      reviews_count: details.user_ratings_total || null,
      latitude: details.geometry?.location?.lat || null,
      longitude: details.geometry?.location?.lng || null,
      hours: details.opening_hours?.weekday_text?.join(" | ") || null,
      photos: photoUrls(details.photos || []),
      top_reviews: (details.reviews || []).slice(0, 5).map(r => ({
        author_name: r.author_name, rating: r.rating, text: r.text, time: r.relative_time_description,
      })),
    });
    detailsOk++;
    console.log(`✅ ${details.rating || "—"}⭐`);
    await sleep(200);
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(enriched, null, 2));
  console.log(`\n✅ Details: ${detailsOk} ok, ${detailsFail} failed\n`);

  // Step 2: Import to Supabase
  console.log("📦 Importing to Supabase...");
  const enrichedOnly = enriched.filter(b => b._enriched);
  let imported = 0, importErrors = 0, editorialOk = 0;

  for (let i = 0; i < enrichedOnly.length; i++) {
    const b = enrichedOnly[i];
    const table = b._table;
    const slug = makeSlug(b.google_name || b.name, b._city);

    // Build row based on table type
    let row;
    if (table === "professionals") {
      row = {
        name: b.google_name || b.name, city: b._city, phone: b.phone, website: b.website,
        bio: b.formatted_address, specialty: b._queries?.[0]?.replace(/ Michigan$/i, "") || null,
        google_place_id: b.place_id, latitude: b.latitude, longitude: b.longitude,
        metro: "detroit", featured: false,
      };
    } else {
      row = {
        name: b.google_name || b.name, city: b._city, slug,
        description: b._queries?.[0]?.replace(/ Michigan$/i, "") || null,
        subcategories: [], badges: [],
        address: b.formatted_address, phone: b.phone, url: b.website,
        rating: b.rating, reviews: b.reviews_count,
        hours: b.hours, google_place_id: b.place_id,
        latitude: b.latitude, longitude: b.longitude,
        metro: "detroit", photos: b.photos,
      };
    }

    // Check if exists
    const { data: existing } = await supabase.from(table).select("id").eq("google_place_id", b.place_id).limit(1);
    let dbError;
    if (existing?.length > 0) {
      const { error } = await supabase.from(table).update(row).eq("google_place_id", b.place_id);
      dbError = error;
    } else {
      const { error } = await supabase.from(table).insert(row);
      dbError = error;
    }

    if (dbError) {
      if ((i + 1) % 50 === 0) console.log(`  ${i + 1}/${enrichedOnly.length}...`);
      importErrors++;
    } else {
      imported++;
    }

    // Step 3: Editorial (inline, skip if no reviews)
    if (!dbError && b.top_reviews?.length > 0) {
      const editorial = await generateEditorial(b.google_name || b.name, b._city, table, b.top_reviews);
      if (editorial) {
        const editField = table === "restaurants" ? "what_to_order" : table === "groceries" ? "what_to_know" : null;
        if (editField) {
          await supabase.from(table).update({ [editField]: JSON.stringify(editorial) }).eq("google_place_id", b.place_id);
        }
        editorialOk++;
      }
      await sleep(300);
    }

    if ((i + 1) % 30 === 0) console.log(`  Progress: ${i + 1}/${enrichedOnly.length} (${imported} imported, ${importErrors} errors, ${editorialOk} editorials)`);
  }

  // Step 4: Deduplicate
  console.log("\n🔄 Deduplicating...");
  const dedupTables = ["restaurants", "groceries", "temples", "wedding_vendors", "event_halls", "kids", "beauty_brands", "health_wellness", "community_networking"];
  let totalDeduped = 0;
  for (const table of dedupTables) {
    const { data } = await supabase.from(table).select("id, name, google_place_id").order("id");
    if (!data) continue;
    const byPlaceId = {};
    data.forEach(r => {
      if (!r.google_place_id) return;
      if (!byPlaceId[r.google_place_id]) byPlaceId[r.google_place_id] = [];
      byPlaceId[r.google_place_id].push(r);
    });
    const dupeIds = [];
    Object.values(byPlaceId).filter(rows => rows.length > 1).forEach(rows => {
      rows.sort((a, b) => b.id - a.id); // keep newest
      rows.slice(1).forEach(r => dupeIds.push(r.id));
    });
    if (dupeIds.length > 0) {
      await supabase.from(table).delete().in("id", dupeIds);
      totalDeduped += dupeIds.length;
    }
  }
  console.log(`  Removed ${totalDeduped} duplicates\n`);

  // Summary
  const { count: rCount } = await supabase.from("restaurants").select("*", { count: "exact", head: true });
  const { count: gCount } = await supabase.from("groceries").select("*", { count: "exact", head: true });
  const { count: tCount } = await supabase.from("temples").select("*", { count: "exact", head: true });
  const { count: wCount } = await supabase.from("wedding_vendors").select("*", { count: "exact", head: true });
  const { count: pCount } = await supabase.from("professionals").select("*", { count: "exact", head: true });

  console.log("══════════════════════════════════════════════");
  console.log("🚀 PIPELINE COMPLETE");
  console.log(`  Details fetched: ${detailsOk}/${businesses.length}`);
  console.log(`  Imported: ${imported} (${importErrors} errors)`);
  console.log(`  Editorials: ${editorialOk}`);
  console.log(`  Duplicates removed: ${totalDeduped}`);
  console.log(`\n  DB totals:`);
  console.log(`    Restaurants: ${rCount}`);
  console.log(`    Groceries: ${gCount}`);
  console.log(`    Temples: ${tCount}`);
  console.log(`    Wedding Vendors: ${wCount}`);
  console.log(`    Professionals: ${pCount}`);
  console.log("══════════════════════════════════════════════\n");
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
