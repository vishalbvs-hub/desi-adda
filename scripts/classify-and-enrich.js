require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const API_KEY = process.env.GOOGLE_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const INPUT = path.join(__dirname, "needs-review.json");
const businesses = JSON.parse(fs.readFileSync(INPUT, "utf8"));
const DRY_RUN = process.argv.includes("--dry-run");
const CLASSIFY_ONLY = process.argv.includes("--classify-only");

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function makeSlug(name, city) {
  return (name + " " + (city || "")).toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 80);
}

function routeToTable(b) {
  const q = (b._queries || []).join(" ").toLowerCase();
  if (q.match(/restaurant|biryani|tandoori|dosa|chaat|kebab|karahi|nihari|naan|masala|tiffin|catering|food delivery|chai cafe|sweet shop|bakery|halal restaurant/)) return "restaurants";
  if (q.match(/grocery|meat shop|halal grocery|desi grocery|halal meat/)) return "groceries";
  if (q.match(/temple|gurdwara|mosque|masjid|priest|pandit|puja|astrologer|imam|spiritual|quran/)) return "temples";
  if (q.match(/wedding|dj|photographer|videographer|decorator|mandap|florist|event planner|mehndi|sangeet|walima|nikah|banquet/)) return "wedding_vendors";
  if (q.match(/doctor|dentist|pediatrician|cardiologist|dermatologist|psychiatrist|speaking doctor/)) return "professionals";
  if (q.match(/lawyer|attorney|h1b|cpa|tax|realtor|insurance|mortgage|financial|driving school|cargo|itin|fbar/)) return "professionals";
  if (q.match(/beauty|salon|threading|bridal makeup|bridal/)) return "beauty_brands";
  if (q.match(/yoga|ayurveda|meditation/)) return "health_wellness";
  if (q.match(/dance class|music|carnatic|tabla|tutoring|childcare|school/)) return "kids";
  if (q.match(/clothing|saree|jewelry/)) return "wedding_vendors";
  if (q.match(/banquet hall|nikkah hall/)) return "event_halls";
  return "restaurants";
}

// ═══ CLASSIFICATION ═══
async function classifyBatch(batch) {
  const listings = batch.map((b, i) => `${i + 1}. "${b.name}" — ${b.formatted_address || "?"} (found via: "${b._queries?.[0] || "?"}")`).join("\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: `You classify businesses as South Asian or not. A business is South Asian if it serves the Indian, Pakistani, Bangladeshi, Nepali, Sri Lankan, or broader South Asian community — including restaurants, grocery stores, temples, mosques serving South Asian communities, doctors/lawyers with South Asian names, beauty salons, dance schools, etc. Respond with ONLY a JSON array of numbers (1-indexed) for the YES businesses. Example: [1, 3, 5, 8]. If none are South Asian, respond with [].`,
      messages: [{ role: "user", content: `Which of these are South Asian businesses?\n\n${listings}` }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "[]";
  try {
    return JSON.parse(text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
  } catch {
    // Try to extract numbers
    const nums = text.match(/\d+/g);
    return nums ? nums.map(Number) : [];
  }
}

// ═══ ENRICHMENT ═══
async function getDetails(placeId) {
  const fields = "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,geometry,place_id,photos,reviews,business_status";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.status === "OK" ? data.result : null;
}

async function generateEditorial(name, city, table, reviews) {
  if (!reviews?.length) return null;
  const prompts = {
    restaurants: "JSON with known_for, the_move, skip (or null), vibe, pro_tip.",
    groceries: "JSON with known_for, best_for, freshness_day (or null), pro_tip, skip (or null).",
    default: "JSON with known_for, best_for, pro_tip.",
  };
  const system = `You are a local expert for Desi Adda USA. Based on reviews, write a brief guide. ${prompts[table] || prompts.default} ONLY JSON, no fences.`;
  const reviewText = reviews.slice(0, 3).map(r => `[${r.rating}★] "${(r.text || "").substring(0, 150)}" — ${r.author_name}`).join("\n");
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 200, system, messages: [{ role: "user", content: `${name}, ${city}\n${reviewText}` }] }),
    });
    const data = await res.json();
    const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
    try { return JSON.parse(text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()); } catch { return null; }
  } catch { return null; }
}

async function importBusiness(b, details) {
  const table = routeToTable(b);
  const city = (details.formatted_address || "").split(",").slice(-3, -2)[0]?.trim() || "";
  const slug = makeSlug(details.name || b.name, city);
  const photos = (details.photos || []).slice(0, 10).map(p => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${API_KEY}`);
  const reviews = (details.reviews || []).slice(0, 5).map(r => ({ author_name: r.author_name, rating: r.rating, text: r.text, time: r.relative_time_description }));

  // Check existing
  const { data: existing } = await supabase.from(table).select("id").eq("google_place_id", b.place_id).limit(1);
  if (existing?.length > 0) return { table, status: "exists" };

  let row;
  if (table === "professionals") {
    row = { name: details.name || b.name, city, phone: details.formatted_phone_number || null, website: details.website || null, bio: details.formatted_address, specialty: b._queries?.[0]?.replace(/ Michigan$/i, "") || null, google_place_id: b.place_id, latitude: details.geometry?.location?.lat, longitude: details.geometry?.location?.lng, metro: "detroit", featured: false };
  } else {
    row = { name: details.name || b.name, city, slug, description: b._queries?.[0]?.replace(/ Michigan$/i, "") || null, subcategories: [], badges: [], address: details.formatted_address, phone: details.formatted_phone_number || null, url: details.website || null, rating: details.rating || null, reviews: details.user_ratings_total || null, hours: details.opening_hours?.weekday_text?.join(" | ") || null, google_place_id: b.place_id, latitude: details.geometry?.location?.lat, longitude: details.geometry?.location?.lng, metro: "detroit", photos };
  }

  const { error } = await supabase.from(table).insert(row);
  if (error) return { table, status: "error", msg: error.message };

  // Editorial
  if (reviews.length > 0) {
    const editorial = await generateEditorial(details.name || b.name, city, table, reviews);
    if (editorial) {
      const field = table === "restaurants" ? "what_to_order" : table === "groceries" ? "what_to_know" : null;
      if (field) await supabase.from(table).update({ [field]: JSON.stringify(editorial) }).eq("google_place_id", b.place_id);
    }
  }

  return { table, status: "imported" };
}

// ═══ MAIN ═══
async function main() {
  console.log(`\n🤖 Classify & Enrich — ${businesses.length} businesses`);
  console.log(`══════════════════════════════════════════════`);
  const batchCount = Math.ceil(businesses.length / 20);
  console.log(`Classification: ${batchCount} Haiku batches (~$0.04)`);
  console.log(`══════════════════════════════════════════════\n`);

  if (DRY_RUN) { console.log("🏁 DRY RUN\n"); return; }

  // Step 1: Classify
  console.log("🤖 STEP 1: Classifying...\n");
  const desi = [];
  const notDesi = [];
  let classified = 0;

  for (let i = 0; i < businesses.length; i += 20) {
    const batch = businesses.slice(i, i + 20);
    const batchNum = Math.floor(i / 20) + 1;

    try {
      const yesIndices = await classifyBatch(batch);
      const yesSet = new Set(yesIndices);

      batch.forEach((b, j) => {
        if (yesSet.has(j + 1)) { desi.push(b); } else { notDesi.push(b); }
      });

      classified += batch.length;
      if (batchNum % 10 === 0 || i + 20 >= businesses.length) {
        console.log(`  Batch ${batchNum}/${batchCount}: classified ${classified}/${businesses.length} — ${desi.length} YES, ${notDesi.length} NO`);
      }
    } catch (e) {
      console.log(`  ❌ Batch ${batchNum} error: ${e.message}`);
      notDesi.push(...batch); // skip on error
      classified += batch.length;
    }

    await sleep(300);
  }

  console.log(`\n✅ Classification complete: ${desi.length} South Asian, ${notDesi.length} not\n`);

  // Save classification results
  fs.writeFileSync(path.join(__dirname, "classified-yes.json"), JSON.stringify(desi, null, 2));
  fs.writeFileSync(path.join(__dirname, "classified-no.json"), JSON.stringify(notDesi, null, 2));

  if (CLASSIFY_ONLY) {
    console.log("📄 Saved classified-yes.json and classified-no.json");
    console.log("Run without --classify-only to enrich.\n");
    return;
  }

  // Step 2: Enrich & Import
  console.log(`🔧 STEP 2: Enriching ${desi.length} businesses...\n`);
  console.log(`  Est. Place Details cost: ~$${(desi.length * 0.032).toFixed(2)}\n`);

  let enriched = 0, importedCount = 0, existsCount = 0, errorCount = 0;
  const tableCounts = {};

  for (let i = 0; i < desi.length; i++) {
    const b = desi[i];
    if ((i + 1) % 30 === 0) {
      console.log(`  Progress: ${i + 1}/${desi.length} (${importedCount} imported, ${existsCount} exists, ${errorCount} errors)`);
    }

    const details = await getDetails(b.place_id);
    if (!details) { errorCount++; await sleep(200); continue; }
    enriched++;

    const result = await importBusiness(b, details);
    if (result.status === "imported") {
      importedCount++;
      tableCounts[result.table] = (tableCounts[result.table] || 0) + 1;
    } else if (result.status === "exists") {
      existsCount++;
    } else {
      errorCount++;
    }

    await sleep(250);
  }

  // Final counts
  console.log(`\n══════════════════════════════════════════════`);
  console.log(`🚀 COMPLETE`);
  console.log(`  Classified: ${businesses.length} (${desi.length} YES, ${notDesi.length} NO)`);
  console.log(`  Enriched: ${enriched}`);
  console.log(`  Imported: ${importedCount}`);
  console.log(`  Already existed: ${existsCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log(`\n  By table:`);
  Object.entries(tableCounts).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(`    ${t}: +${n}`));

  const tables = ["restaurants", "groceries", "temples", "wedding_vendors", "event_halls", "kids", "beauty_brands", "health_wellness", "community_networking", "professionals"];
  let total = 0;
  console.log(`\n  📊 FINAL DB TOTALS:`);
  for (const t of tables) {
    const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
    console.log(`    ${t}: ${count}`);
    total += count;
  }
  console.log(`    TOTAL: ${total}`);
  console.log(`══════════════════════════════════════════════\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
