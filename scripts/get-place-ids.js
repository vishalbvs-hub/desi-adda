require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

if (!GOOGLE_API_KEY || !process.env.SUPABASE_SERVICE_KEY) {
  console.error("Missing GOOGLE_API_KEY or SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

async function findPlaceId(name, city) {
  const input = encodeURIComponent(`${name} ${city} MI`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id,name,formatted_address&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].place_id;
  }
  if (data.status && data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    console.log(`    API error: ${data.status} — ${data.error_message || ""}`);
  }
  return null;
}

async function processTable(tableName) {
  console.log(`\n--- ${tableName} ---`);
  const { data: listings } = await supabase.from(tableName).select("id, name, city, google_place_id");

  let updated = 0;
  for (const listing of listings) {
    if (listing.google_place_id) {
      console.log(`  skip  ${listing.name} — already has Place ID`);
      continue;
    }
    const placeId = await findPlaceId(listing.name, listing.city || "Detroit");
    if (placeId) {
      await supabase.from(tableName).update({ google_place_id: placeId }).eq("id", listing.id);
      console.log(`  done  ${listing.name} -> ${placeId}`);
      updated++;
    } else {
      console.log(`  miss  ${listing.name} — not found`);
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`  Updated: ${updated}/${listings.length}`);
}

async function main() {
  console.log("Looking up Google Place IDs...\n");
  await processTable("restaurants");
  await processTable("groceries");
  await processTable("temples");
  await processTable("wedding_vendors");
  console.log("\nDone!");
}

main().catch(console.error);
