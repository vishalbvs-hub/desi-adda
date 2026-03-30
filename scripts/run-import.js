require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const enriched = JSON.parse(
  fs.readFileSync(path.join(__dirname, "enriched-restaurants.json"), "utf8")
).filter(r => r._enriched);

const API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c";

function makeSlug(name, city) {
  return (name + " " + city)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function photoUrls(refs) {
  if (!refs || refs.length === 0) return [];
  return refs.map(ref =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${API_KEY}`
  );
}

function subcatsFromCuisine(cuisineType) {
  if (!cuisineType) return [];
  return cuisineType.split(/[,\/]/).map(s => s.trim()).filter(Boolean);
}

async function main() {
  console.log("🗄️  STEP 1: You need to run 01-schema.sql manually in Supabase SQL Editor first!");
  console.log("   It adds columns: slug, cuisine_type, veg_status, price_range, notable_dishes, etc.");
  console.log("   And creates the restaurant_reviews table.\n");

  // Check if new columns exist
  const { data: testRow, error: testErr } = await supabase
    .from("restaurants")
    .select("slug")
    .limit(1);

  if (testErr && testErr.message.includes("does not exist")) {
    console.log("❌ Column 'slug' doesn't exist. Run 01-schema.sql first!\n");
    console.log("Paste this in Supabase SQL Editor:");
    console.log(fs.readFileSync(path.join(__dirname, "sql", "01-schema.sql"), "utf8"));
    process.exit(1);
  }

  console.log("✅ Schema columns detected. Proceeding with upserts...\n");

  // Step 2: Upsert restaurants
  console.log("🍛 Upserting restaurants...");
  let upserted = 0;
  let updated = 0;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < enriched.length; i++) {
    const r = enriched[i];
    const row = {
      name: r.name,
      city: r.city,
      slug: makeSlug(r.name, r.city),
      cuisine_type: r.cuisine_type || null,
      veg_status: r.veg_status || null,
      price_range: r.price_range || null,
      notable_dishes: r.notable_dishes || null,
      description: r.notable_dishes || null,
      subcategories: subcatsFromCuisine(r.cuisine_type),
      badges: [],
      address: r.formatted_address || null,
      phone: r.phone || null,
      url: r.website || null,
      rating: r.rating || null,
      reviews: r.reviews_count || null,
      hours: r.hours || null,
      google_place_id: r.google_place_id,
      latitude: r.latitude || null,
      longitude: r.longitude || null,
      metro: "detroit",
      photos: photoUrls(r.photo_refs),
      featured: false,
      updated_at: new Date().toISOString(),
    };

    // Check if exists
    const { data: existing } = await supabase
      .from("restaurants")
      .select("id")
      .eq("google_place_id", r.google_place_id)
      .limit(1);

    if (existing && existing.length > 0) {
      // Update
      const { error } = await supabase
        .from("restaurants")
        .update(row)
        .eq("google_place_id", r.google_place_id);

      if (error) {
        console.log(`  ❌ ${i + 1}/${enriched.length} ${r.name}: ${error.message}`);
        errors++;
      } else {
        updated++;
        upserted++;
      }
    } else {
      // Insert
      const { error } = await supabase
        .from("restaurants")
        .insert(row);

      if (error) {
        console.log(`  ❌ ${i + 1}/${enriched.length} ${r.name}: ${error.message}`);
        errors++;
      } else {
        inserted++;
        upserted++;
      }
    }

    if ((i + 1) % 20 === 0 || i === enriched.length - 1) {
      console.log(`  Progress: ${i + 1}/${enriched.length} (${updated} updated, ${inserted} inserted, ${errors} errors)`);
    }
  }

  console.log(`\n✅ Restaurants: ${upserted} upserted (${updated} updated, ${inserted} new, ${errors} errors)\n`);

  // Step 3: Insert reviews
  console.log("📝 Inserting reviews...");

  // Check if table exists
  const { error: revCheck } = await supabase.from("restaurant_reviews").select("id").limit(0);
  if (revCheck) {
    console.log("❌ restaurant_reviews table doesn't exist. Run 01-schema.sql first!");
    process.exit(1);
  }

  // Clear existing
  await supabase.from("restaurant_reviews").delete().neq("id", 0);
  console.log("  Cleared existing reviews");

  let reviewCount = 0;
  let reviewErrors = 0;

  for (const r of enriched) {
    if (!r.top_reviews || r.top_reviews.length === 0) continue;

    const rows = r.top_reviews.map(rev => ({
      restaurant_google_place_id: r.google_place_id,
      author_name: rev.author,
      rating: rev.rating || null,
      review_text: rev.text,
      review_time: rev.time,
    }));

    const { error } = await supabase.from("restaurant_reviews").insert(rows);
    if (error) {
      console.log(`  ❌ Reviews for ${r.name}: ${error.message}`);
      reviewErrors++;
    } else {
      reviewCount += rows.length;
    }
  }

  console.log(`\n✅ Reviews: ${reviewCount} inserted (${reviewErrors} errors)\n`);

  // Final counts
  const { count: rCount } = await supabase.from("restaurants").select("*", { count: "exact", head: true });
  const { count: revCount } = await supabase.from("restaurant_reviews").select("*", { count: "exact", head: true });
  console.log(`📊 Final: ${rCount} restaurants, ${revCount} reviews`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
