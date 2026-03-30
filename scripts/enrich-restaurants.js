const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error("Missing GOOGLE_PLACES_API_KEY environment variable.");
  console.error("Run: export GOOGLE_PLACES_API_KEY=your_key_here");
  process.exit(1);
}

const INPUT_FILE = path.join(__dirname, "restaurants-to-enrich.json");
const OUTPUT_FILE = path.join(__dirname, "enriched-restaurants.json");

const restaurants = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

// Cost estimates (legacy Places API):
// Find Place: $0.017 per request
// Place Details (basic+contact+atmosphere): ~$0.032 per request
// Photos: free (just metadata here, not downloading)
const COST_FIND = 0.017;
const COST_DETAILS = 0.032;

const DRY_RUN = process.argv.includes("--dry-run");

async function findPlaceId(name, city) {
  const input = encodeURIComponent(`${name} ${city} Michigan`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id,name,formatted_address&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK" && data.candidates && data.candidates.length > 0) {
    return data.candidates[0];
  }
  return null;
}

async function getPlaceDetails(placeId) {
  const fields = [
    "name", "formatted_address", "formatted_phone_number", "website",
    "rating", "user_ratings_total", "opening_hours", "geometry",
    "place_id", "photos", "reviews", "price_level", "business_status",
  ].join(",");
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK") {
    return data.result;
  }
  return null;
}

function extractPhotoRefs(photos, max = 3) {
  if (!photos || photos.length === 0) return [];
  return photos.slice(0, max).map(p => p.photo_reference);
}

function extractReviews(reviews, max = 5) {
  if (!reviews || reviews.length === 0) return [];
  return reviews.slice(0, max).map(r => ({
    author: r.author_name,
    rating: r.rating,
    text: r.text,
    time: r.relative_time_description,
  }));
}

async function main() {
  console.log(`\n🍛 Restaurant Enrichment Script`);
  console.log(`================================`);
  console.log(`Input: ${restaurants.length} restaurants`);
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log(`\nEstimated API calls:`);
  console.log(`  Find Place:    ${restaurants.length} × $${COST_FIND} = $${(restaurants.length * COST_FIND).toFixed(2)}`);
  console.log(`  Place Details: ${restaurants.length} × $${COST_DETAILS} = $${(restaurants.length * COST_DETAILS).toFixed(2)}`);
  const totalCost = restaurants.length * (COST_FIND + COST_DETAILS);
  console.log(`  TOTAL:         ~$${totalCost.toFixed(2)}`);
  console.log(`  (Actual may be less if some aren't found)\n`);

  if (DRY_RUN) {
    console.log("🏁 DRY RUN — no API calls made. Remove --dry-run to execute.\n");
    // Show first 5 restaurants
    console.log("First 5 restaurants to enrich:");
    restaurants.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.name} — ${r.city} (${r.cuisine_type})`);
    });
    console.log(`  ... and ${restaurants.length - 5} more\n`);
    return;
  }

  const enriched = [];
  let found = 0;
  let notFound = 0;
  let detailsFailed = 0;

  for (let i = 0; i < restaurants.length; i++) {
    const r = restaurants[i];
    console.log(`Enriching ${i + 1}/${restaurants.length}: ${r.name} (${r.city})...`);

    // Step 1: Find place_id
    const candidate = await findPlaceId(r.name, r.city);
    if (!candidate) {
      console.log(`  ⚠️  NOT FOUND — skipping`);
      enriched.push({ ...r, _enriched: false, _error: "Not found in Google Places" });
      notFound++;
      await sleep(200);
      continue;
    }

    // Step 2: Get details
    const details = await getPlaceDetails(candidate.place_id);
    if (!details) {
      console.log(`  ⚠️  Details failed for place_id ${candidate.place_id}`);
      enriched.push({ ...r, _enriched: false, google_place_id: candidate.place_id, _error: "Details request failed" });
      detailsFailed++;
      await sleep(200);
      continue;
    }

    // Step 3: Merge
    const entry = {
      // Original data
      ...r,
      // Google Places data
      _enriched: true,
      google_place_id: candidate.place_id,
      google_name: details.name,
      formatted_address: details.formatted_address || null,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      rating: details.rating || null,
      reviews_count: details.user_ratings_total || null,
      price_level: details.price_level || null,
      business_status: details.business_status || null,
      latitude: details.geometry?.location?.lat || null,
      longitude: details.geometry?.location?.lng || null,
      hours: details.opening_hours?.weekday_text?.join(" | ") || null,
      photo_refs: extractPhotoRefs(details.photos),
      top_reviews: extractReviews(details.reviews),
    };

    enriched.push(entry);
    found++;
    console.log(`  ✅ ${details.rating || "—"} ⭐ (${details.user_ratings_total || 0} reviews) — ${details.formatted_address || "no address"}`);

    await sleep(200);
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(enriched, null, 2));

  // Summary
  const actualCost = (found + notFound) * COST_FIND + found * COST_DETAILS;
  console.log(`\n================================`);
  console.log(`🍛 ENRICHMENT COMPLETE`);
  console.log(`  Found:          ${found}/${restaurants.length}`);
  console.log(`  Not found:      ${notFound}`);
  console.log(`  Details failed: ${detailsFailed}`);
  console.log(`  Output:         ${OUTPUT_FILE}`);
  console.log(`  Est. API cost:  ~$${actualCost.toFixed(2)}`);
  console.log(`================================\n`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
