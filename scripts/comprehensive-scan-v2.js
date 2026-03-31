require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) { console.error("Missing GOOGLE_API_KEY"); process.exit(1); }

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const DRY_RUN = process.argv.includes("--dry-run");

const LAT = 42.6064;
const LNG = -83.1498;
const RADIUS = 128748; // 80 miles in meters

const OUTPUT = path.join(__dirname, "comprehensive-scan-v2-results.json");
const V1_FILE = path.join(__dirname, "comprehensive-scan-results.json");
const PROCESSED_OUTPUT = path.join(__dirname, "comprehensive-scan-v2-processed.json");

const QUERIES = {
  "South Asian Broad": [
    "South Asian restaurant Michigan",
    "Pakistani restaurant Michigan",
    "Bangladeshi restaurant Michigan",
    "Nepali restaurant Michigan",
    "Sri Lankan restaurant Michigan",
    "halal restaurant Michigan",
    "halal meat shop Michigan",
    "desi restaurant Michigan",
    "desi grocery Michigan",
  ],
  "Pakistani/Muslim": [
    "Pakistani grocery Michigan",
    "halal grocery Michigan",
    "Pakistani clothing Michigan",
    "Pakistani jewelry Michigan",
    "Islamic bookstore Michigan",
    "halal bakery Michigan",
    "Pakistani catering Michigan",
    "Pakistani wedding Michigan",
    "Muslim wedding planner Michigan",
    "nikah services Michigan",
  ],
  "Bangladeshi": [
    "Bangladeshi restaurant Michigan",
    "Bangladeshi grocery Michigan",
    "Bengali sweet shop Michigan",
    "Bangladeshi catering Michigan",
  ],
  "Nepali/Sri Lankan": [
    "Nepali restaurant Michigan",
    "Himalayan restaurant Michigan",
    "Sri Lankan restaurant Michigan",
  ],
  "Cultural Food Terms": [
    "biryani Michigan",
    "tandoori Michigan",
    "masala Michigan",
    "naan Michigan",
    "dosa Michigan",
    "chaat Michigan",
    "kebab Michigan",
    "karahi Michigan",
    "nihari Michigan",
    "paan shop Michigan",
  ],
  "Language-Specific Professionals": [
    "Urdu speaking doctor Michigan",
    "Hindi speaking doctor Michigan",
    "Telugu speaking doctor Michigan",
    "Gujarati speaking doctor Michigan",
    "Bengali speaking doctor Michigan",
    "South Asian dentist Michigan",
    "Pakistani lawyer Michigan",
    "halal mortgage Michigan",
    "Islamic finance Michigan",
  ],
  "Beauty/Services": [
    "Pakistani beauty salon Michigan",
    "Bengali beauty salon Michigan",
    "South Asian bridal Michigan",
    "desi DJ Michigan",
    "dhol player Michigan",
    "qawwali Michigan",
    "Quran classes Michigan",
    "Urdu school Michigan",
    "Hindi school Michigan",
  ],
  "Event": [
    "mehndi party Michigan",
    "sangeet party Michigan",
    "walima Michigan",
    "nikkah hall Michigan",
    "Indian banquet hall Michigan",
  ],
  "Spiritual": [
    "mosque Michigan",
    "imam services Michigan",
    "maulana Michigan",
    "Hindu priest Michigan",
    "Sikh gurdwara Michigan",
    "Jain temple Michigan",
    "Buddhist temple Myanmar Michigan",
  ],
};

const allQueries = Object.entries(QUERIES).flatMap(([cat, qs]) => qs.map(q => ({ query: q, category: cat })));
const COST = 0.032;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function textSearch(query, pageToken) {
  const params = new URLSearchParams({ query, location: `${LAT},${LNG}`, radius: String(RADIUS), key: API_KEY });
  if (pageToken) params.set("pagetoken", pageToken);
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`);
  return await res.json();
}

async function searchAllPages(query) {
  const results = [];
  let data = await textSearch(query);
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") return results;
  if (data.results) results.push(...data.results);
  let page = 1;
  while (data.next_page_token && page < 3) {
    await sleep(2000);
    data = await textSearch(query, data.next_page_token);
    if (data.results) results.push(...data.results);
    page++;
  }
  return results;
}

async function main() {
  console.log(`\n🔍 Comprehensive Scan V2 — Expanded Search`);
  console.log(`=============================================`);
  console.log(`Queries: ${allQueries.length}`);
  console.log(`Radius: 80 miles from Troy, MI`);
  console.log(`Est. cost: $${(allQueries.length * COST).toFixed(2)}`);
  console.log(`=============================================\n`);

  if (DRY_RUN) {
    console.log("🏁 DRY RUN\n");
    Object.entries(QUERIES).forEach(([cat, qs]) => {
      console.log(`${cat} (${qs.length}):`);
      qs.forEach(q => console.log(`  • ${q}`));
      console.log();
    });
    return;
  }

  // Load V1 place_ids to skip
  let v1PlaceIds = new Set();
  if (fs.existsSync(V1_FILE)) {
    const v1 = JSON.parse(fs.readFileSync(V1_FILE, "utf8"));
    v1.forEach(r => v1PlaceIds.add(r.place_id));
    console.log(`📂 Loaded ${v1PlaceIds.size} place_ids from scan v1 to skip\n`);
  }

  const allResults = [];
  const resultsByQuery = {};

  for (let i = 0; i < allQueries.length; i++) {
    const { query, category } = allQueries[i];
    process.stdout.write(`${i + 1}/${allQueries.length}: "${query}"... `);

    const results = await searchAllPages(query);
    const extracted = results.map(r => ({
      name: r.name,
      formatted_address: r.formatted_address,
      place_id: r.place_id,
      rating: r.rating || null,
      user_ratings_total: r.user_ratings_total || null,
      types: r.types || [],
      business_status: r.business_status || null,
      latitude: r.geometry?.location?.lat || null,
      longitude: r.geometry?.location?.lng || null,
      _query: query,
      _category: category,
    }));

    allResults.push(...extracted);
    resultsByQuery[query] = extracted.length;
    console.log(`${extracted.length} results`);
    await sleep(200);
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(allResults, null, 2));
  console.log(`\n📄 Raw: ${OUTPUT} (${allResults.length} results)\n`);

  // Deduplicate within v2
  const seen = new Map();
  for (const r of allResults) {
    if (!seen.has(r.place_id)) {
      seen.set(r.place_id, { ...r, _queries: [r._query], _categories: [r._category] });
    } else {
      const ex = seen.get(r.place_id);
      if (!ex._queries.includes(r._query)) ex._queries.push(r._query);
      if (!ex._categories.includes(r._category)) ex._categories.push(r._category);
    }
  }
  const unique = [...seen.values()];
  console.log(`🔄 Deduplicated: ${allResults.length} → ${unique.length} unique`);

  // Remove v1 duplicates
  const newFromV1 = unique.filter(r => !v1PlaceIds.has(r.place_id));
  console.log(`🔗 After removing v1 duplicates: ${newFromV1.length} (removed ${unique.length - newFromV1.length})`);

  // Michigan only
  const mi = newFromV1.filter(r => r.formatted_address && (r.formatted_address.includes(", MI ") || r.formatted_address.includes(", Michigan") || r.formatted_address.includes(" MI ")));
  console.log(`📍 Michigan only: ${mi.length} (removed ${newFromV1.length - mi.length})\n`);

  // Cross-reference Supabase
  console.log("🔗 Cross-referencing with Supabase...");
  const tables = ["restaurants", "groceries", "temples", "wedding_vendors", "event_halls", "kids", "beauty_brands", "health_wellness", "community_networking", "professionals", "professional_services"];
  const existingPlaceIds = new Set();
  const existingNames = new Set();
  for (const table of tables) {
    try {
      const { data } = await supabase.from(table).select("name, google_place_id");
      if (data) data.forEach(r => {
        if (r.google_place_id) existingPlaceIds.add(r.google_place_id);
        if (r.name) existingNames.add(r.name.toLowerCase().trim());
      });
    } catch {}
  }

  let newCount = 0, existingCount = 0;
  for (const r of mi) {
    if (existingPlaceIds.has(r.place_id) || existingNames.has(r.name.toLowerCase().trim())) {
      r._status = "existing"; existingCount++;
    } else {
      r._status = "new"; newCount++;
    }
  }
  console.log(`  Already in DB: ${existingCount}`);
  console.log(`  NEW finds: ${newCount}\n`);

  // Category breakdown
  console.log("📊 NEW FINDS BY CATEGORY:");
  const cats = {};
  for (const r of mi.filter(r => r._status === "new")) {
    const c = r._categories[0];
    if (!cats[c]) cats[c] = 0;
    cats[c]++;
  }
  Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log(`  ${n.toString().padStart(4)} | ${c}`));

  // Results per query
  console.log("\n📋 RESULTS PER QUERY:");
  Object.entries(resultsByQuery).forEach(([q, n]) => console.log(`  ${n.toString().padStart(3)} | ${q}`));

  // Save
  fs.writeFileSync(PROCESSED_OUTPUT, JSON.stringify({
    meta: {
      scanned_at: new Date().toISOString(),
      queries: allQueries.length,
      radius_miles: 80,
      est_cost: `$${(allQueries.length * COST).toFixed(2)}`,
      raw: allResults.length,
      unique_v2: unique.length,
      new_vs_v1: newFromV1.length,
      michigan: mi.length,
      new_vs_db: newCount,
      existing_in_db: existingCount,
    },
    new_businesses: mi.filter(r => r._status === "new"),
    existing_businesses: mi.filter(r => r._status === "existing"),
  }, null, 2));

  console.log(`\n📄 Processed: ${PROCESSED_OUTPUT}`);
  console.log(`\n=============================================`);
  console.log(`🔍 SCAN V2 COMPLETE`);
  console.log(`  Queries: ${allQueries.length}`);
  console.log(`  Cost: ~$${(allQueries.length * COST).toFixed(2)}`);
  console.log(`  New unique MI finds: ${newCount}`);
  console.log(`  (not in v1 or Supabase)`);
  console.log(`=============================================\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
