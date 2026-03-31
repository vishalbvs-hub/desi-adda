require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) { console.error("Missing GOOGLE_API_KEY in .env.local"); process.exit(1); }

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const OUTPUT = path.join(__dirname, "comprehensive-scan-results.json");
const DRY_RUN = process.argv.includes("--dry-run");

// Troy, MI center + 50 mile radius (~80km)
const LAT = 42.6064;
const LNG = -83.1498;
const RADIUS = 80467; // 50 miles in meters

const QUERIES = {
  "Local Businesses": [
    "Indian sweet shop Michigan",
    "Indian bakery Michigan",
    "Indian chai cafe Michigan",
    "Indian beauty salon Michigan",
    "Indian threading Michigan",
    "mehndi henna artist Michigan",
    "Indian bridal makeup Michigan",
    "Indian clothing store Michigan",
    "saree shop Michigan",
    "Indian jewelry store Michigan",
    "Indian tiffin service Michigan",
    "Indian home food delivery Michigan",
    "Indian catering Michigan",
    "dosa batter delivery Michigan",
    "Indian yoga studio Michigan",
    "ayurveda Michigan",
    "Indian meditation center Michigan",
    "Bharatanatyam dance class Michigan",
    "Bollywood dance class Michigan",
    "Kathak dance class Michigan",
    "Indian music class Michigan",
    "Carnatic music lessons Michigan",
    "tabla lessons Michigan",
    "Indian tutoring Michigan",
    "Indian childcare Michigan",
  ],
  "Event Planning": [
    "Indian wedding DJ Michigan",
    "Bollywood DJ Michigan",
    "Indian wedding photographer Michigan",
    "Indian wedding videographer Michigan",
    "Indian wedding decorator Michigan",
    "mandap decoration Michigan",
    "Indian event planner Michigan",
    "Indian florist wedding Michigan",
  ],
  "Professionals & Services": [
    "Indian doctor Michigan",
    "Indian dentist Michigan",
    "Indian pediatrician Michigan",
    "Indian cardiologist Michigan",
    "Indian dermatologist Michigan",
    "Indian psychiatrist Michigan",
    "Indian immigration attorney Michigan",
    "H1B lawyer Michigan",
    "Indian CPA Michigan",
    "NRI tax preparer Michigan",
    "FBAR filing Michigan",
    "Indian realtor Michigan",
    "Indian insurance agent Michigan",
    "Indian mortgage broker Michigan",
    "Indian financial advisor Michigan",
    "Indian driving school Michigan",
    "cargo shipping India Michigan",
    "visitors medical insurance Michigan",
    "ITIN services Michigan",
  ],
  "Temples & Spiritual": [
    "Hindu pandit Michigan",
    "Indian priest services Michigan",
    "puja services Michigan",
    "Indian astrologer Michigan",
    "vastu consultant Michigan",
  ],
};

const allQueries = Object.entries(QUERIES).flatMap(([cat, qs]) => qs.map(q => ({ query: q, category: cat })));
const COST_PER_SEARCH = 0.032;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function textSearch(query, pageToken) {
  const params = new URLSearchParams({
    query,
    location: `${LAT},${LNG}`,
    radius: String(RADIUS),
    key: API_KEY,
  });
  if (pageToken) params.set("pagetoken", pageToken);

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`;
  const res = await fetch(url);
  return await res.json();
}

async function searchAllPages(query) {
  const results = [];
  let data = await textSearch(query);
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    console.log(`    ⚠️ API status: ${data.status}`);
    return results;
  }
  if (data.results) results.push(...data.results);

  // Follow pagination (up to 3 pages = 60 results)
  let page = 1;
  while (data.next_page_token && page < 3) {
    await sleep(2000); // Google requires delay before using next_page_token
    data = await textSearch(query, data.next_page_token);
    if (data.results) results.push(...data.results);
    page++;
  }

  return results;
}

async function main() {
  console.log(`\n🔍 Comprehensive South Asian Business Scan`);
  console.log(`=============================================`);
  console.log(`Queries: ${allQueries.length}`);
  console.log(`Center: Troy, MI (${LAT}, ${LNG})`);
  console.log(`Radius: 50 miles`);
  console.log(`Est. cost: $${(allQueries.length * COST_PER_SEARCH).toFixed(2)} (text searches only)`);
  console.log(`=============================================\n`);

  if (DRY_RUN) {
    console.log("🏁 DRY RUN — no API calls.\n");
    Object.entries(QUERIES).forEach(([cat, qs]) => {
      console.log(`${cat} (${qs.length} queries):`);
      qs.forEach(q => console.log(`  • ${q}`));
      console.log();
    });
    return;
  }

  const allResults = [];
  const resultsByQuery = {};
  let totalApiCalls = 0;

  for (let i = 0; i < allQueries.length; i++) {
    const { query, category } = allQueries[i];
    process.stdout.write(`${i + 1}/${allQueries.length}: "${query}"... `);

    const results = await searchAllPages(query);
    totalApiCalls++;

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

  // Save raw results
  fs.writeFileSync(OUTPUT, JSON.stringify(allResults, null, 2));
  console.log(`\n📄 Raw results saved: ${OUTPUT} (${allResults.length} total)\n`);

  // ── DEDUPLICATION ──
  console.log("🔄 Deduplicating by place_id...");
  const seen = new Map();
  for (const r of allResults) {
    if (!seen.has(r.place_id)) {
      seen.set(r.place_id, { ...r, _queries: [r._query], _categories: [r._category] });
    } else {
      const existing = seen.get(r.place_id);
      if (!existing._queries.includes(r._query)) existing._queries.push(r._query);
      if (!existing._categories.includes(r._category)) existing._categories.push(r._category);
    }
  }
  const unique = [...seen.values()];
  console.log(`  ${allResults.length} raw → ${unique.length} unique places\n`);

  // ── FILTER MICHIGAN ONLY ──
  console.log("📍 Filtering to Michigan only...");
  const michiganOnly = unique.filter(r =>
    r.formatted_address && (
      r.formatted_address.includes(", MI ") ||
      r.formatted_address.includes(", Michigan") ||
      r.formatted_address.includes(" MI ")
    )
  );
  const removed = unique.length - michiganOnly.length;
  console.log(`  Kept: ${michiganOnly.length}, Removed (out of state): ${removed}\n`);

  // ── CROSS-REFERENCE WITH EXISTING DATA ──
  console.log("🔗 Cross-referencing with existing Supabase data...");
  const tables = ["restaurants", "groceries", "temples", "wedding_vendors", "event_halls",
    "kids", "beauty_brands", "health_wellness", "community_networking", "professionals",
    "professional_services"];

  const existingPlaceIds = new Set();
  const existingNames = new Set();
  for (const table of tables) {
    let data = null;
    try { const res = await supabase.from(table).select("name, google_place_id"); data = res.data; } catch { }
    if (data) {
      data.forEach(r => {
        if (r.google_place_id) existingPlaceIds.add(r.google_place_id);
        if (r.name) existingNames.add(r.name.toLowerCase().trim());
      });
    }
  }

  let newCount = 0;
  let existingCount = 0;
  for (const r of michiganOnly) {
    if (existingPlaceIds.has(r.place_id) || existingNames.has(r.name.toLowerCase().trim())) {
      r._status = "existing";
      existingCount++;
    } else {
      r._status = "new";
      newCount++;
    }
  }
  console.log(`  Existing in DB: ${existingCount}`);
  console.log(`  NEW discoveries: ${newCount}\n`);

  // ── CATEGORY BREAKDOWN ──
  console.log("📊 BREAKDOWN BY CATEGORY:");
  const catCounts = {};
  for (const r of michiganOnly) {
    const cat = r._categories[0] || "Unknown";
    if (!catCounts[cat]) catCounts[cat] = { total: 0, new: 0, existing: 0 };
    catCounts[cat].total++;
    catCounts[cat][r._status]++;
  }
  Object.entries(catCounts).forEach(([cat, counts]) => {
    console.log(`  ${cat}: ${counts.total} total (${counts.new} new, ${counts.existing} existing)`);
  });

  // ── RESULTS BY QUERY ──
  console.log("\n📋 RESULTS PER QUERY:");
  Object.entries(resultsByQuery).forEach(([q, count]) => {
    console.log(`  ${count.toString().padStart(3)} | ${q}`);
  });

  // ── SAVE PROCESSED RESULTS ──
  const processedOutput = path.join(__dirname, "comprehensive-scan-processed.json");
  fs.writeFileSync(processedOutput, JSON.stringify({
    meta: {
      scanned_at: new Date().toISOString(),
      queries: allQueries.length,
      api_calls: totalApiCalls,
      est_cost: `$${(totalApiCalls * COST_PER_SEARCH).toFixed(2)}`,
      raw_results: allResults.length,
      unique_places: unique.length,
      michigan_only: michiganOnly.length,
      new_discoveries: newCount,
      already_in_db: existingCount,
    },
    new_businesses: michiganOnly.filter(r => r._status === "new"),
    existing_businesses: michiganOnly.filter(r => r._status === "existing"),
  }, null, 2));

  console.log(`\n📄 Processed results: ${processedOutput}`);
  console.log(`\n=============================================`);
  console.log(`🔍 SCAN COMPLETE`);
  console.log(`  Total API calls: ${totalApiCalls}`);
  console.log(`  Est. cost: $${(totalApiCalls * COST_PER_SEARCH).toFixed(2)}`);
  console.log(`  Unique MI places: ${michiganOnly.length}`);
  console.log(`  NEW to import: ${newCount}`);
  console.log(`  Already in DB: ${existingCount}`);
  console.log(`=============================================\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
