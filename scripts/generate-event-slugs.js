require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function toSlug(name, city) {
  return `${name}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateSlugs(table) {
  const { data, error } = await supabase
    .from(table)
    .select("id, name, city")
    .is("slug", null);

  if (error) {
    console.error(`Error fetching ${table}:`, error.message);
    return 0;
  }
  if (!data || data.length === 0) {
    console.log(`${table}: no rows with null slug`);
    return 0;
  }

  let count = 0;
  for (const row of data) {
    const slug = toSlug(row.name || "unknown", row.city || "mi");
    const { error: updateErr } = await supabase
      .from(table)
      .update({ slug })
      .eq("id", row.id);

    if (updateErr) {
      console.error(`  Failed ${table} id=${row.id}:`, updateErr.message);
    } else {
      count++;
    }
  }
  return count;
}

(async () => {
  const vendorCount = await generateSlugs("wedding_vendors");
  console.log(`wedding_vendors: ${vendorCount} slugs generated`);

  const hallCount = await generateSlugs("event_halls");
  console.log(`event_halls: ${hallCount} slugs generated`);

  console.log(`Total: ${vendorCount + hallCount} slugs generated`);
})();
