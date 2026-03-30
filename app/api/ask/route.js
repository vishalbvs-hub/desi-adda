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
  const { query, history } = await request.json();
  if (!query || !query.trim()) {
    return Response.json({ response: "Please enter a search query.", listings: [] });
  }

  const isFollowUp = history && history.length > 0;

  // Stop words to filter out
  const STOP_WORDS = new Set([
    "best", "good", "great", "top", "find", "show", "looking", "need", "want",
    "near", "around", "nearby", "close", "area", "the", "for", "and", "but",
    "not", "with", "from", "that", "this", "what", "where", "which", "who",
    "how", "can", "does", "should", "would", "could", "any", "some", "all",
    "most", "very", "really", "just", "also", "please", "help", "recommend",
    "suggestion", "suggestions", "recommended",
  ]);

  // Basic stemming — strip trailing plurals
  function stem(w) {
    if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
    if (w.endsWith("es") && w.length > 4 && !w.endsWith("ss")) return w.slice(0, -2);
    if (w.endsWith("s") && w.length > 3 && !w.endsWith("ss")) return w.slice(0, -1);
    return w;
  }

  // Build search terms: filter stop words, add stemmed variants
  const rawWords = query.trim().toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const searchTerms = [...new Set(
    rawWords.filter(w => !STOP_WORDS.has(w)).flatMap(w => [w, stem(w)])
  )];
  const queryLower = query.toLowerCase();

  // Determine relevant tables from category keywords
  const relevantTables = TABLES.filter(table =>
    table.keywords.some(kw => queryLower.includes(kw))
  );
  const tablesToSearch = relevantTables.length > 0 ? relevantTables : TABLES;

  // Search Supabase with keyword matching
  const scored = [];
  if (searchTerms.length > 0) {
    for (const table of tablesToSearch) {
      const searchCols = ["name", "city", "description", "subcategories"];
      if (table.name === "professionals") searchCols.push("specialty", "bio", "practice_name", "languages");

      for (const word of searchTerms) {
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
  }

  // Fallback: if category keywords matched but word search found nothing, pull top results
  if (scored.length === 0 && relevantTables.length > 0) {
    for (const table of relevantTables) {
      const { data } = await supabase
        .from(table.name)
        .select(table.fields)
        .order("rating", { ascending: false, nullsFirst: false })
        .limit(8);

      if (data) {
        for (const row of data) {
          scored.push({ ...row, _table: table.name, _category: table.label, _score: 0 });
        }
      }
    }
  }

  scored.sort((a, b) => {
    if (b._score !== a._score) return b._score - a._score;
    return (b.rating || 0) - (a.rating || 0);
  });

  const listings = scored.slice(0, 8);

  // Build listings context
  const listingsContext = listings.length > 0
    ? listings.map(l => {
        const parts = [`Name: ${l.name}`, `Category: ${l._category}`];
        if (l.city) parts.push(`City: ${l.city}`);
        if (l.rating) parts.push(`Rating: ${l.rating}/5`);
        if (l.phone) parts.push(`Phone: ${l.phone}`);
        if (l.specialty) parts.push(`Specialty: ${l.specialty}`);
        if (l.title) parts.push(`Title: ${l.title}`);
        if (l.practice_name) parts.push(`Practice: ${l.practice_name}`);
        if (l.languages) parts.push(`Languages: ${l.languages}`);
        if (l.subcategories) parts.push(`Tags: ${l.subcategories}`);
        if (l.description || l.bio) parts.push(`About: ${l.description || l.bio}`);
        return parts.join(", ");
      }).join("\n")
    : "No matching listings found in the directory.";

  // Build Claude messages
  let claudeMessages = [];

  if (isFollowUp) {
    for (const h of history) {
      if (h.role === "user") claudeMessages.push({ role: "user", content: h.content });
      if (h.role === "assistant") claudeMessages.push({ role: "assistant", content: h.content });
    }
    claudeMessages.push({
      role: "user",
      content: `User is now asking: ${query}\n\nHere are the matching listings from our directory for this query:\n${listingsContext}`,
    });
  } else {
    claudeMessages.push({
      role: "user",
      content: `User is asking: ${query}\n\nHere are the matching listings from our directory:\n${listingsContext}`,
    });
  }

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
        messages: claudeMessages,
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
