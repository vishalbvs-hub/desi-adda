require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY in .env.local");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry-run");

const SYSTEM_PROMPT = `You are a local food expert writing for Desi Adda USA, a South Asian community directory for Metro Detroit. Based on the Google reviews provided, write a brief, opinionated restaurant guide entry. Be direct and useful, like a friend giving advice. Format your response as JSON with these fields:
- known_for: 2-3 dishes this place is most praised for (comma separated)
- the_move: 1-2 sentences on what to order and any insider tips
- skip: 1 sentence on what reviewers say to avoid (or null if nothing negative)
- vibe: 1 sentence describing the atmosphere/experience
- pro_tip: 1 sentence insider tip (best time to go, hidden menu items, parking, etc. or null)

Respond with ONLY the JSON object, no markdown fences, no explanation.`;

// Haiku pricing: $0.25/M input, $1.25/M output
const COST_INPUT_PER_M = 0.25;
const COST_OUTPUT_PER_M = 1.25;
const EST_INPUT_TOKENS = 800; // ~800 tokens per request (reviews + context)
const EST_OUTPUT_TOKENS = 150; // ~150 tokens response

async function callClaude(userMessage) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  const text = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "";
  const inputTokens = data.usage?.input_tokens || 0;
  const outputTokens = data.usage?.output_tokens || 0;
  return { text, inputTokens, outputTokens };
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  // Get all restaurants that have reviews
  const { data: reviews } = await supabase
    .from("restaurant_reviews")
    .select("restaurant_google_place_id, author_name, rating, review_text, review_time");

  // Group reviews by place_id
  const reviewsByPlace = {};
  for (const r of reviews) {
    if (!reviewsByPlace[r.restaurant_google_place_id]) reviewsByPlace[r.restaurant_google_place_id] = [];
    reviewsByPlace[r.restaurant_google_place_id].push(r);
  }

  // Get restaurants with those place_ids
  const placeIds = Object.keys(reviewsByPlace);
  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name, city, cuisine_type, notable_dishes, rating, reviews, google_place_id, what_to_order")
    .in("google_place_id", placeIds);

  // Filter out ones that already have what_to_order (unless --force)
  const force = process.argv.includes("--force");
  const toProcess = force
    ? restaurants
    : restaurants.filter(r => !r.what_to_order);

  console.log(`\n🍛 Generate "What to Order" Guide`);
  console.log(`==================================`);
  console.log(`Restaurants with reviews: ${restaurants.length}`);
  console.log(`Already have guide:       ${restaurants.length - toProcess.length}`);
  console.log(`To process:               ${toProcess.length}`);
  console.log(`\nEstimated API cost:`);
  const estInputCost = (toProcess.length * EST_INPUT_TOKENS / 1_000_000) * COST_INPUT_PER_M;
  const estOutputCost = (toProcess.length * EST_OUTPUT_TOKENS / 1_000_000) * COST_OUTPUT_PER_M;
  console.log(`  Input:  ~${(toProcess.length * EST_INPUT_TOKENS).toLocaleString()} tokens × $${COST_INPUT_PER_M}/M = $${estInputCost.toFixed(4)}`);
  console.log(`  Output: ~${(toProcess.length * EST_OUTPUT_TOKENS).toLocaleString()} tokens × $${COST_OUTPUT_PER_M}/M = $${estOutputCost.toFixed(4)}`);
  console.log(`  TOTAL:  ~$${(estInputCost + estOutputCost).toFixed(4)}\n`);

  if (DRY_RUN) {
    console.log("🏁 DRY RUN — no API calls. Remove --dry-run to execute.\n");
    console.log("First 5 restaurants:");
    toProcess.slice(0, 5).forEach((r, i) => {
      const revCount = reviewsByPlace[r.google_place_id]?.length || 0;
      console.log(`  ${i + 1}. ${r.name} (${r.city}) — ${revCount} reviews, ${r.cuisine_type || "no cuisine type"}`);
    });
    if (toProcess.length > 5) console.log(`  ... and ${toProcess.length - 5} more\n`);
    return;
  }

  let success = 0;
  let errors = 0;
  let totalInput = 0;
  let totalOutput = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const r = toProcess[i];
    const revs = reviewsByPlace[r.google_place_id] || [];

    console.log(`${i + 1}/${toProcess.length}: ${r.name} (${r.city})...`);

    // Build prompt
    const reviewText = revs
      .map(rev => `[${rev.rating}★] "${rev.review_text?.substring(0, 300) || ""}" — ${rev.author_name}`)
      .join("\n\n");

    const userMessage = `Restaurant: ${r.name}
City: ${r.city}
Cuisine: ${r.cuisine_type || "Indian"}
Notable dishes from research: ${r.notable_dishes || "N/A"}
Overall rating: ${r.rating || "N/A"}/5 (${r.reviews || 0} reviews)

Google Reviews:
${reviewText}`;

    try {
      const { text, inputTokens, outputTokens } = await callClaude(userMessage);
      totalInput += inputTokens;
      totalOutput += outputTokens;

      // Try to parse JSON
      let parsed;
      try {
        // Strip markdown fences if present
        const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsed = JSON.parse(clean);
      } catch {
        console.log(`  ⚠️  JSON parse failed, storing raw text`);
        parsed = { raw: text };
      }

      // Update Supabase
      const { error } = await supabase
        .from("restaurants")
        .update({ what_to_order: JSON.stringify(parsed) })
        .eq("id", r.id);

      if (error) {
        console.log(`  ❌ DB update failed: ${error.message}`);
        errors++;
      } else {
        console.log(`  ✅ Known for: ${parsed.known_for || "—"}`);
        success++;
      }
    } catch (e) {
      console.log(`  ❌ API error: ${e.message}`);
      errors++;
    }

    await sleep(500);
  }

  const actualInputCost = (totalInput / 1_000_000) * COST_INPUT_PER_M;
  const actualOutputCost = (totalOutput / 1_000_000) * COST_OUTPUT_PER_M;

  console.log(`\n==================================`);
  console.log(`🍛 COMPLETE`);
  console.log(`  Success: ${success}/${toProcess.length}`);
  console.log(`  Errors:  ${errors}`);
  console.log(`  Tokens:  ${totalInput.toLocaleString()} input, ${totalOutput.toLocaleString()} output`);
  console.log(`  Cost:    $${(actualInputCost + actualOutputCost).toFixed(4)}`);
  console.log(`==================================\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
