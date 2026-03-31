require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

function makeSlug(name, city) {
  return (name + "-" + (city || "mi"))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

(async () => {
  const { data, error } = await s.from("professionals").select("id, name, city");
  if (error) { console.error("Fetch error:", error); return; }
  console.log("Total professionals:", data.length);

  const slugs = {};
  for (const p of data) {
    const base = makeSlug(p.name, p.city);
    let slug = base;
    let i = 2;
    while (slugs[slug]) {
      slug = base + "-" + i;
      i++;
    }
    slugs[slug] = p.id;
  }
  console.log("Unique slugs:", Object.keys(slugs).length);
  console.log("Sample slugs:", Object.keys(slugs).slice(0, 5));
})();
