const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "enriched-restaurants.json"), "utf8"));
const enriched = data.filter(r => r._enriched);

function esc(s) {
  if (s === null || s === undefined) return "NULL";
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function slug(name, city) {
  return (name + " " + city)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function photoUrls(refs, apiKey) {
  if (!refs || refs.length === 0) return "'{}'";
  const urls = refs.map(ref =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${apiKey}`
  );
  return "'{" + urls.map(u => '"' + u.replace(/"/g, '') + '"').join(",") + "}'";
}

function subcatsFromCuisine(cuisineType) {
  if (!cuisineType) return "'{}'";
  const parts = cuisineType.split(/[,\/]/).map(s => s.trim()).filter(Boolean);
  return "'{" + parts.map(p => '"' + p.replace(/"/g, '') + '"').join(",") + "}'";
}

// Use the key from .env.local
const API_KEY = "AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c";

let sql = "";

// Header
sql += "-- ============================================================\n";
sql += "-- RESTAURANT ENRICHMENT IMPORT\n";
sql += `-- Generated: ${new Date().toISOString()}\n`;
sql += `-- ${enriched.length} restaurants, ${enriched.reduce((s, r) => s + (r.top_reviews?.length || 0), 0)} reviews\n`;
sql += "-- ============================================================\n\n";

// Step 1: Add new columns
sql += "-- ── STEP 1: Add new columns to restaurants ──\n";
const newCols = [
  ["slug", "text"],
  ["cuisine_type", "text"],
  ["veg_status", "text"],
  ["price_range", "text"],
  ["notable_dishes", "text"],
  ["what_to_order", "text"],
  ["origin_city_match", "text"],
  ["featured", "boolean DEFAULT false"],
  ["address", "text"],
];
for (const [col, type] of newCols) {
  sql += `ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS ${col} ${type};\n`;
}
sql += "\n";

// Step 2: Create restaurant_reviews table
sql += "-- ── STEP 2: Create restaurant_reviews table ──\n";
sql += `CREATE TABLE IF NOT EXISTS restaurant_reviews (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  restaurant_google_place_id text NOT NULL,
  author_name text,
  rating numeric,
  review_text text,
  review_time text,
  created_at timestamptz DEFAULT now()
);\n\n`;

sql += "ALTER TABLE restaurant_reviews ENABLE ROW LEVEL SECURITY;\n";
sql += `CREATE POLICY IF NOT EXISTS "Public read restaurant_reviews" ON restaurant_reviews FOR SELECT USING (true);\n\n`;

// Step 3: Upsert restaurants
sql += "-- ── STEP 3: Upsert restaurants ──\n";
sql += "-- Using ON CONFLICT on google_place_id (requires unique constraint)\n";
sql += "CREATE UNIQUE INDEX IF NOT EXISTS idx_restaurants_google_place_id ON restaurants(google_place_id) WHERE google_place_id IS NOT NULL;\n\n";

for (const r of enriched) {
  const s = slug(r.name, r.city);
  const subcats = subcatsFromCuisine(r.cuisine_type);
  const photos = photoUrls(r.photo_refs, API_KEY);
  const hours = r.hours ? esc(r.hours) : "NULL";

  sql += `INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES (${esc(r.name)}, ${esc(r.city)}, ${esc(s)}, ${esc(r.cuisine_type)}, ${esc(r.veg_status)}, ${esc(r.price_range)}, ${esc(r.notable_dishes)}, ${esc(r.notable_dishes)}, ${subcats}, '{}', ${esc(r.formatted_address)}, ${esc(r.phone)}, ${esc(r.website)}, ${r.rating || "NULL"}, ${r.reviews_count || "NULL"}, ${hours}, ${esc(r.google_place_id)}, ${r.latitude || "NULL"}, ${r.longitude || "NULL"}, 'detroit', ${photos}, false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();\n\n`;
}

// Step 4: Insert reviews
sql += "-- ── STEP 4: Insert reviews ──\n";
sql += "-- Clear existing reviews to avoid duplicates on re-run\n";
sql += "TRUNCATE TABLE restaurant_reviews;\n\n";

for (const r of enriched) {
  if (!r.top_reviews || r.top_reviews.length === 0) continue;
  for (const rev of r.top_reviews) {
    sql += `INSERT INTO restaurant_reviews (restaurant_google_place_id, author_name, rating, review_text, review_time)
VALUES (${esc(r.google_place_id)}, ${esc(rev.author)}, ${rev.rating || "NULL"}, ${esc(rev.text)}, ${esc(rev.time)});\n`;
  }
  sql += "\n";
}

// Summary
sql += "-- ── SUMMARY ──\n";
sql += `-- Restaurants upserted: ${enriched.length}\n`;
sql += `-- Reviews inserted: ${enriched.reduce((s, r) => s + (r.top_reviews?.length || 0), 0)}\n`;

const outputPath = path.join(__dirname, "import-restaurants.sql");
fs.writeFileSync(outputPath, sql);
console.log(`✅ Generated ${outputPath}`);
console.log(`   ${enriched.length} restaurant upserts`);
console.log(`   ${enriched.reduce((s, r) => s + (r.top_reviews?.length || 0), 0)} review inserts`);
console.log(`   ${(sql.length / 1024).toFixed(0)} KB SQL file`);
