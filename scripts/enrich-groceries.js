const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) { console.error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_API_KEY env var"); process.exit(1); }

const INPUT = path.join(__dirname, "groceries-to-enrich.json");
const OUTPUT = path.join(__dirname, "enriched-groceries.json");
const stores = JSON.parse(fs.readFileSync(INPUT, "utf8"));
const DRY_RUN = process.argv.includes("--dry-run");

const COST_FIND = 0.017;
const COST_DETAILS = 0.032;

async function findPlaceId(name, city) {
  const input = encodeURIComponent(`${name} ${city} Michigan`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id,name,formatted_address&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK" && data.candidates?.length > 0) return data.candidates[0];
  return null;
}

async function getDetails(placeId) {
  const fields = "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,geometry,place_id,photos,reviews,price_level,business_status";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.status === "OK" ? data.result : null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`\n🥘 Grocery Store Enrichment`);
  console.log(`===========================`);
  console.log(`Input: ${stores.length} stores`);
  console.log(`Est. cost: ~$${(stores.length * (COST_FIND + COST_DETAILS)).toFixed(2)}`);

  if (DRY_RUN) {
    console.log("\n🏁 DRY RUN. Remove --dry-run to execute.\n");
    stores.slice(0, 5).forEach((s, i) => console.log(`  ${i+1}. ${s.name} — ${s.city}`));
    if (stores.length > 5) console.log(`  ... and ${stores.length - 5} more`);
    return;
  }

  const enriched = [];
  let found = 0, notFound = 0;

  for (let i = 0; i < stores.length; i++) {
    const s = stores[i];
    console.log(`${i+1}/${stores.length}: ${s.name} (${s.city})...`);

    const candidate = await findPlaceId(s.name, s.city);
    if (!candidate) {
      console.log(`  ⚠️ NOT FOUND`);
      enriched.push({ ...s, _enriched: false });
      notFound++;
      await sleep(200);
      continue;
    }

    const details = await getDetails(candidate.place_id);
    if (!details) {
      console.log(`  ⚠️ Details failed`);
      enriched.push({ ...s, _enriched: false, google_place_id: candidate.place_id });
      notFound++;
      await sleep(200);
      continue;
    }

    enriched.push({
      ...s,
      _enriched: true,
      google_place_id: candidate.place_id,
      google_name: details.name,
      formatted_address: details.formatted_address || null,
      phone: details.formatted_phone_number || s.phone || null,
      website: details.website || null,
      rating: details.rating || null,
      reviews_count: details.user_ratings_total || null,
      latitude: details.geometry?.location?.lat || null,
      longitude: details.geometry?.location?.lng || null,
      hours: details.opening_hours?.weekday_text?.join(" | ") || null,
      photo_refs: (details.photos || []).slice(0, 10).map(p => p.photo_reference),
      top_reviews: (details.reviews || []).slice(0, 5).map(r => ({
        author: r.author_name, rating: r.rating, text: r.text, time: r.relative_time_description,
      })),
    });
    found++;
    console.log(`  ✅ ${details.rating || "—"} ⭐ (${details.user_ratings_total || 0} reviews)`);
    await sleep(200);
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(enriched, null, 2));
  console.log(`\n===========================`);
  console.log(`Found: ${found}/${stores.length}, Not found: ${notFound}`);
  console.log(`Output: ${OUTPUT}`);
  console.log(`Cost: ~$${((found + notFound) * COST_FIND + found * COST_DETAILS).toFixed(2)}`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
