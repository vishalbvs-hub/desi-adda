require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const API_KEY = process.env.GOOGLE_API_KEY;
const enriched = JSON.parse(fs.readFileSync(path.join(__dirname, "enriched-groceries.json"), "utf8")).filter(r => r._enriched);

function makeSlug(name, city) {
  return (name + " " + city).toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function photoUrls(refs) {
  if (!refs?.length) return [];
  return refs.map(ref => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${API_KEY}`);
}

async function main() {
  // Check schema
  const { error: schemaCheck } = await supabase.from("groceries").select("slug").limit(1);
  if (schemaCheck?.message?.includes("does not exist")) {
    console.log("❌ Column 'slug' missing. Run the schema SQL first!");
    console.log("\nALTER TABLE groceries ADD COLUMN IF NOT EXISTS slug text;");
    console.log("ALTER TABLE groceries ADD COLUMN IF NOT EXISTS store_type text;");
    console.log("ALTER TABLE groceries ADD COLUMN IF NOT EXISTS specialties text;");
    console.log("ALTER TABLE groceries ADD COLUMN IF NOT EXISTS address text;");
    console.log("ALTER TABLE groceries ADD COLUMN IF NOT EXISTS what_to_know text;");
    process.exit(1);
  }

  console.log(`🥘 Importing ${enriched.length} grocery stores...\n`);

  let updated = 0, inserted = 0, errors = 0;
  for (let i = 0; i < enriched.length; i++) {
    const s = enriched[i];
    const row = {
      name: s.name, city: s.city, slug: makeSlug(s.name, s.city),
      store_type: s.type || null, specialties: s.specialties || null,
      description: s.specialties || null,
      subcategories: s.type ? s.type.split(/[,\/]/).map(t => t.trim()) : [],
      badges: [], address: s.formatted_address || s.address || null,
      phone: s.phone || null, url: s.website || null,
      rating: s.rating || null, reviews: s.reviews_count || null,
      hours: s.hours || null, google_place_id: s.google_place_id,
      latitude: s.latitude || null, longitude: s.longitude || null,
      metro: "detroit", photos: photoUrls(s.photo_refs),
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase.from("groceries").select("id").eq("google_place_id", s.google_place_id).limit(1);
    if (existing?.length > 0) {
      const { error } = await supabase.from("groceries").update(row).eq("google_place_id", s.google_place_id);
      if (error) { console.log(`  ❌ ${s.name}: ${error.message}`); errors++; } else updated++;
    } else {
      const { error } = await supabase.from("groceries").insert(row);
      if (error) { console.log(`  ❌ ${s.name}: ${error.message}`); errors++; } else inserted++;
    }
    if ((i + 1) % 10 === 0) console.log(`  Progress: ${i + 1}/${enriched.length}`);
  }
  console.log(`\n✅ Groceries: ${updated} updated, ${inserted} new, ${errors} errors`);

  // Reviews
  console.log("\n📝 Inserting reviews...");
  const { error: revCheck } = await supabase.from("grocery_reviews").select("id").limit(0);
  if (revCheck) { console.log("❌ grocery_reviews table missing. Run schema SQL first!"); return; }

  await supabase.from("grocery_reviews").delete().neq("id", 0);
  let revCount = 0;
  for (const s of enriched) {
    if (!s.top_reviews?.length) continue;
    const rows = s.top_reviews.map(r => ({
      grocery_google_place_id: s.google_place_id,
      author_name: r.author, rating: r.rating, review_text: r.text, review_time: r.time,
    }));
    const { error } = await supabase.from("grocery_reviews").insert(rows);
    if (!error) revCount += rows.length;
  }
  console.log(`✅ ${revCount} reviews inserted`);

  const { count: gCount } = await supabase.from("groceries").select("*", { count: "exact", head: true });
  const { count: rCount } = await supabase.from("grocery_reviews").select("*", { count: "exact", head: true });
  console.log(`\n📊 Final: ${gCount} groceries, ${rCount} reviews`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
