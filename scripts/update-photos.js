require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const API_KEY = process.env.GOOGLE_API_KEY;

async function main() {
  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name, city, google_place_id")
    .not("google_place_id", "is", null);

  console.log(`📸 Updating photos for ${restaurants.length} restaurants (up to 10 per restaurant)...\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < restaurants.length; i++) {
    const r = restaurants[i];
    process.stdout.write(`${i + 1}/${restaurants.length}: ${r.name}... `);

    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${r.google_place_id}&fields=photos&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "OK" || !data.result?.photos) {
        console.log("no photos");
        continue;
      }

      const photoUrls = data.result.photos.slice(0, 10).map(p =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${API_KEY}`
      );

      const { error } = await supabase
        .from("restaurants")
        .update({ photos: photoUrls, updated_at: new Date().toISOString() })
        .eq("id", r.id);

      if (error) {
        console.log(`❌ ${error.message}`);
        errors++;
      } else {
        console.log(`✅ ${photoUrls.length} photos`);
        updated++;
      }
    } catch (e) {
      console.log(`❌ ${e.message}`);
      errors++;
    }

    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`\n📸 Done! ${updated} updated, ${errors} errors`);
  console.log(`Estimated cost: ~$${(restaurants.length * 0.032).toFixed(2)} (Place Details requests)`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
