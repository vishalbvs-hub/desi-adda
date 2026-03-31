require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

(async () => {
  const { data } = await s.from("temples").select("id,name,city,slug").is("slug", null);
  console.log("Temples missing slugs:", data.length);
  for (const t of data) {
    const slug = (t.name + "-" + t.city)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const { error } = await s.from("temples").update({ slug }).eq("id", t.id);
    console.log(error ? "ERROR: " + error.message : "Updated:", t.name, "->", slug);
  }
  const { data: check } = await s.from("temples").select("id").is("slug", null);
  console.log("Remaining without slug:", check.length);
})();
