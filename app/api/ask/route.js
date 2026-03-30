import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const TABLES = [
  { name: "restaurants", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Restaurant", keywords: ["restaurant", "food", "eat", "dining", "biryani", "dosa", "curry", "tandoori", "indian", "south indian", "north indian", "telugu", "gujarati", "punjabi", "halal", "vegetarian", "vegan", "catering", "tiffin", "chaat"] },
  { name: "groceries", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Grocery", keywords: ["grocery", "groceries", "store", "market", "spice", "produce", "halal", "meat"] },
  { name: "temples", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Temple", keywords: ["temple", "mandir", "gurudwara", "mosque", "masjid", "church", "religious", "spiritual", "hindu", "sikh", "muslim", "jain", "buddhist", "prayer"] },
  { name: "wedding_vendors", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Wedding Vendor", keywords: ["wedding", "mehndi", "henna", "photographer", "dj", "decorator", "mandap", "bridal", "shaadi", "sangeet", "garba", "jewelry", "lehenga", "saree"] },
  { name: "event_halls", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Event Hall", keywords: ["venue", "hall", "banquet", "event hall", "reception", "party"] },
  { name: "kids", fields: "id, name, city, rating, reviews, phone, description, subcategories", label: "Kids & Education", keywords: ["kids", "children", "dance", "music", "tutoring", "school", "language", "bharatanatyam", "kathak", "carnatic", "tabla", "hindi", "telugu", "tamil"] },
  { name: "beauty_brands", fields: "id, name, city, description, subcategories", label: "Beauty", keywords: ["beauty", "threading", "salon", "spa", "henna", "skincare", "makeup"] },
  { name: "health_wellness", fields: "id, name, city, description, subcategories", label: "Health & Wellness", keywords: ["ayurveda", "yoga", "meditation", "homeopathy", "therapy", "therapist", "mental health", "nutrition", "wellness"] },
  { name: "community_networking", fields: "id, name, city, description, subcategories", label: "Community", keywords: ["community", "association", "organization", "networking", "cultural", "volunteer"] },
  { name: "professionals", fields: "id, name, title, city, specialty, phone, bio, languages, practice_name", label: "Professional", keywords: ["doctor", "dentist", "lawyer", "attorney", "cpa", "tax", "realtor", "real estate", "insurance", "mortgage", "financial", "immigration", "h1b", "visa", "dermatologist", "cardiologist", "pediatrician", "psychiatrist", "optometrist"] },
];

const SYSTEM_PROMPT = `You are Ask Adda, a friendly concierge for the South Asian community in Metro Detroit. You help people find businesses, restaurants, temples, doctors, and services from the Desi Adda directory.

Rules:
- You ONLY recommend businesses that are in the provided listings data — never make up or hallucinate businesses.
- If no matching results are found, say so honestly and suggest they try different search terms.
- Keep responses concise, warm, and helpful.

Formatting:
- Start with a brief intro sentence (1 line).
- List each recommended business on its own line with the format: **Business Name** (rating) — brief description.
- End with a short closing recommendation or tip.
- Use line breaks between each recommendation for readability.`;

export async function POST(request) {
  const { query } = await request.json();
  if (!query || !query.trim()) {
    return Response.json({ response: "Please enter a search query.", listings: [] });
  }

  const words = query.trim().toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const queryLower = query.toLowerCase();

  // Determine which tables are relevant based on category keywords
  const relevantTables = TABLES.filter(table =>
    table.keywords.some(kw => queryLower.includes(kw))
  );
  const tablesToSearch = relevantTables.length > 0 ? relevantTables : TABLES;

  // Search and score results
  const scored = [];

  for (const table of tablesToSearch) {
    const searchCols = ["name", "city", "description"];
    if (table.name === "professionals") searchCols.push("specialty", "bio", "practice_name");

    // Search for all words at once using OR across columns
    for (const word of words) {
      const orFilter = searchCols.map(col => `${col}.ilike.%${word}%`).join(",");
      const { data } = await supabase
        .from(table.name)
        .select(table.fields)
        .or(orFilter)
        .limit(10);

      if (data) {
        for (const row of data) {
          const existing = scored.find(r => r._table === table.name && r.id === row.id);
          if (existing) {
            existing._score++;
          } else {
            scored.push({ ...row, _table: table.name, _category: table.label, _score: 1 });
          }
        }
      }
    }
  }

  // Sort by score (most keyword matches first), then by rating
  scored.sort((a, b) => {
    if (b._score !== a._score) return b._score - a._score;
    return (b.rating || 0) - (a.rating || 0);
  });

  const listings = scored.slice(0, 8);

  // Build context for Claude
  const listingsContext = listings.length > 0
    ? listings.map(l => {
        const parts = [`Name: ${l.name}`, `Category: ${l._category}`];
        if (l.city) parts.push(`City: ${l.city}`);
        if (l.rating) parts.push(`Rating: ${l.rating}/5`);
        if (l.phone) parts.push(`Phone: ${l.phone}`);
        if (l.specialty) parts.push(`Specialty: ${l.specialty}`);
        if (l.description || l.bio) parts.push(`About: ${l.description || l.bio}`);
        return parts.join(", ");
      }).join("\n")
    : "No matching listings found in the directory.";

  const userMessage = `User is asking: ${query}\n\nHere are the matching listings from our directory:\n${listingsContext}`;

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
      ? `I found ${listings.length} results for "${query}".\n\nHere's what we have in the directory:`
      : `I couldn't find any matches for "${query}".\n\nTry searching for something like "biryani", "temple", "immigration lawyer", or "mehndi artist".`;
  }

  return Response.json({ response: aiResponse, listings });
}
