import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const TABLES = [
  { name: "restaurants", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Restaurant" },
  { name: "groceries", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Grocery" },
  { name: "temples", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Temple" },
  { name: "wedding_vendors", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Wedding Vendor" },
  { name: "event_halls", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Event Hall" },
  { name: "kids", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Kids & Education" },
  { name: "beauty_brands", fields: "id, name, city, description, subcategories", label: "Beauty" },
  { name: "health_wellness", fields: "id, name, city, description, subcategories", label: "Health & Wellness" },
  { name: "community_networking", fields: "id, name, city, description, subcategories", label: "Community" },
  { name: "professionals", fields: "id, name, title, city, specialty, phone, bio, languages, practice_name", label: "Professional" },
];

const SYSTEM_PROMPT = `You are Ask Adda, a friendly concierge for the South Asian community in Metro Detroit. You help people find businesses, restaurants, temples, doctors, and services from the Desi Adda directory. You ONLY recommend businesses that are in the provided listings data — never make up or hallucinate businesses. If no matching results are found, say so honestly and suggest they try different search terms. Keep responses concise, warm, and helpful. Format your response as plain text with business names in bold using **name** markdown.`;

export async function POST(request) {
  const { query } = await request.json();
  if (!query || !query.trim()) {
    return Response.json({ response: "Please enter a search query.", listings: [] });
  }

  // Search across all tables
  const words = query.trim().toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const allResults = [];

  for (const table of TABLES) {
    // Build OR filter for each word across searchable text columns
    const searchCols = ["name", "city", "description"];
    if (table.name === "professionals") searchCols.push("specialty", "bio", "practice_name");

    for (const word of words) {
      const orFilter = searchCols.map(col => `${col}.ilike.%${word}%`).join(",");
      const { data } = await supabase
        .from(table.name)
        .select(table.fields)
        .or(orFilter)
        .limit(5);

      if (data) {
        for (const row of data) {
          if (!allResults.find(r => r._table === table.name && r.id === row.id)) {
            allResults.push({ ...row, _table: table.name, _category: table.label });
          }
        }
      }
    }
  }

  const listings = allResults.slice(0, 20);

  // Build context for Claude
  const listingsContext = listings.length > 0
    ? listings.map(l => {
        const parts = [`Name: ${l.name}`, `Category: ${l._category}`];
        if (l.city) parts.push(`City: ${l.city}`);
        if (l.rating) parts.push(`Rating: ${l.rating}`);
        if (l.phone) parts.push(`Phone: ${l.phone}`);
        if (l.specialty) parts.push(`Specialty: ${l.specialty}`);
        if (l.description || l.bio) parts.push(`Description: ${l.description || l.bio}`);
        return parts.join(", ");
      }).join("\n")
    : "No matching listings found in the directory.";

  const userMessage = `User is asking: ${query}\n\nHere are the matching listings from our directory:\n${listingsContext}`;

  // Call Claude
  let aiResponse = "";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await res.json();
    const textBlocks = data.content?.filter(b => b.type === "text") || [];
    aiResponse = textBlocks.map(b => b.text).join("\n");
  } catch (e) {
    console.error("Claude API error:", e);
  }

  if (!aiResponse) {
    aiResponse = listings.length > 0
      ? `I found ${listings.length} results for "${query}". Here's what we have in the directory:`
      : `I couldn't find any matches for "${query}". Try searching for something like "biryani", "temple", "immigration lawyer", or "mehndi artist".`;
  }

  return Response.json({ response: aiResponse, listings });
}
