require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error("Missing ANTHROPIC_API_KEY"); process.exit(1); }

const DRY_RUN = process.argv.includes("--dry-run");

const SYSTEM_PROMPT = `You are a local expert writing for Desi Adda USA, a South Asian community directory for Metro Detroit. Based on Google reviews, write a brief grocery store guide entry. Be direct and useful, like a friend giving advice. Format your response as JSON with these fields:
- known_for: what this store is best at (comma separated, 2-3 things)
- best_for: who should shop here (e.g. "South Indian families who need fresh curry leaves and drumsticks")
- freshness_day: when fresh vegetables arrive, if mentioned in reviews (or null)
- pro_tip: insider tip about the store
- skip: anything reviewers complain about (or null)

Respond with ONLY the JSON object, no markdown fences.`;

async function callClaude(msg) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 300, system: SYSTEM_PROMPT, messages: [{ role: "user", content: msg }] }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
  return { text, input: data.usage?.input_tokens || 0, output: data.usage?.output_tokens || 0 };
}

async function main() {
  const { data: reviews } = await supabase.from("grocery_reviews").select("grocery_google_place_id, author_name, rating, review_text, review_time");
  const byPlace = {};
  for (const r of reviews) { if (!byPlace[r.grocery_google_place_id]) byPlace[r.grocery_google_place_id] = []; byPlace[r.grocery_google_place_id].push(r); }

  const placeIds = Object.keys(byPlace);
  const { data: stores } = await supabase.from("groceries").select("id, name, city, store_type, specialties, rating, reviews, google_place_id, what_to_know").in("google_place_id", placeIds);

  const force = process.argv.includes("--force");
  const toProcess = force ? stores : stores.filter(s => !s.what_to_know);

  console.log(`\n🥘 Generate Grocery "What to Know"`);
  console.log(`===================================`);
  console.log(`Stores with reviews: ${stores.length}`);
  console.log(`To process: ${toProcess.length}`);
  console.log(`Est. cost: ~$${(toProcess.length * (800 * 0.25 + 150 * 1.25) / 1_000_000).toFixed(4)}\n`);

  if (DRY_RUN) { console.log("🏁 DRY RUN\n"); return; }

  let success = 0, errors = 0, totalIn = 0, totalOut = 0;
  for (let i = 0; i < toProcess.length; i++) {
    const s = toProcess[i];
    const revs = byPlace[s.google_place_id] || [];
    console.log(`${i+1}/${toProcess.length}: ${s.name} (${s.city})...`);

    const reviewText = revs.map(r => `[${r.rating}★] "${(r.review_text || "").substring(0, 300)}" — ${r.author_name}`).join("\n\n");
    const msg = `Store: ${s.name}\nCity: ${s.city}\nType: ${s.store_type || "Indian Grocery"}\nSpecialties: ${s.specialties || "N/A"}\nRating: ${s.rating || "N/A"}/5 (${s.reviews || 0} reviews)\n\nGoogle Reviews:\n${reviewText}`;

    try {
      const { text, input, output } = await callClaude(msg);
      totalIn += input; totalOut += output;
      let parsed;
      try { parsed = JSON.parse(text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()); } catch { parsed = { raw: text }; }
      const { error } = await supabase.from("groceries").update({ what_to_know: JSON.stringify(parsed) }).eq("id", s.id);
      if (error) { console.log(`  ❌ ${error.message}`); errors++; } else { console.log(`  ✅ ${parsed.known_for || "—"}`); success++; }
    } catch (e) { console.log(`  ❌ ${e.message}`); errors++; }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n===================================`);
  console.log(`Success: ${success}/${toProcess.length}, Errors: ${errors}`);
  console.log(`Tokens: ${totalIn} in, ${totalOut} out`);
  console.log(`Cost: $${((totalIn / 1e6) * 0.25 + (totalOut / 1e6) * 1.25).toFixed(4)}`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
