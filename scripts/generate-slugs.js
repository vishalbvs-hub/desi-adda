require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

function makeSlug(name, city) {
  return (name + " " + (city || "")).toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 80);
}

async function generateSlugs(table) {
  console.log(`\nProcessing ${table}...`);
  const { data, error } = await supabase.from(table).select("id, name, city, slug");
  if (error) { console.error(`  Error fetching ${table}:`, error.message); return; }
  if (!data?.length) { console.log(`  No rows in ${table}`); return; }

  let updated = 0, skipped = 0;
  for (const row of data) {
    if (row.slug) { skipped++; continue; }
    const slug = makeSlug(row.name, row.city);
    const { error: updateError } = await supabase.from(table).update({ slug }).eq("id", row.id);
    if (updateError) {
      console.error(`  Failed to update ${row.name}:`, updateError.message);
    } else {
      updated++;
    }
  }
  console.log(`  ${table}: ${updated} slugs generated, ${skipped} already had slugs (${data.length} total)`);
}

async function main() {
  console.log("Generating slugs for beauty_brands, health_wellness, kids...");
  await generateSlugs("beauty_brands");
  await generateSlugs("health_wellness");
  await generateSlugs("kids");
  console.log("\nDone!");
}

main().catch(console.error);
