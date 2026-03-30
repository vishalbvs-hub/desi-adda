import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE CONFIGURATION
// Each table defines: what columns to SELECT, what columns to SEARCH,
// what keywords trigger this table, and a human-readable label.
// ═══════════════════════════════════════════════════════════════════════════════

const TABLES = [
  {
    name: "restaurants",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Restaurant",
    keywords: ["restaurant", "food", "eat", "eating", "dining", "dine", "lunch", "dinner", "breakfast", "brunch",
      "biryani", "dosa", "idli", "curry", "tandoori", "naan", "tikka", "masala", "paneer", "chaat",
      "samosa", "pav bhaji", "vada", "pesarattu", "thali", "kebab", "korma", "vindaloo", "dal",
      "indian", "south indian", "north indian", "telugu", "gujarati", "punjabi", "tamil", "bengali",
      "pakistani", "hyderabadi", "andhra", "mughlai", "indo-chinese",
      "halal", "vegetarian", "vegan", "catering", "tiffin", "takeout", "delivery",
      "hungry", "crave", "craving"],
  },
  {
    name: "groceries",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Grocery Store",
    keywords: ["grocery", "groceries", "store", "market", "supermarket", "spice", "spices",
      "produce", "halal", "meat", "atta", "rice", "dal", "ghee", "pickle", "papad",
      "frozen", "snacks", "sweets", "mithai", "paan"],
  },
  {
    name: "temples",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Temple / Religious",
    keywords: ["temple", "temples", "mandir", "gurudwara", "gurdwara", "mosque", "masjid",
      "church", "religious", "spiritual", "hindu", "sikh", "muslim", "jain", "buddhist",
      "prayer", "puja", "pooja", "worship", "darshan", "aarti", "kirtan",
      "iskcon", "swaminarayan", "baps", "shirdi", "sai", "ganesh", "balaji", "venkateswara",
      "ram", "shiva", "vishnu", "lakshmi", "durga", "hanuman"],
  },
  {
    name: "professionals",
    fields: "*",
    searchCols: ["name", "city", "specialty", "bio", "practice_name", "languages", "title"],
    label: "Professional",
    keywords: ["doctor", "doc", "physician", "dentist", "dental", "lawyer", "attorney", "legal",
      "cpa", "accountant", "accounting", "tax", "taxes",
      "realtor", "real estate", "realty", "insurance", "mortgage", "loan",
      "financial", "advisor", "planner", "investment",
      "immigration", "h1b", "h-1b", "visa", "green card", "oci",
      "dermatologist", "dermatology", "cardiologist", "cardiology",
      "pediatrician", "pediatric", "pediatrics",
      "psychiatrist", "psychiatry", "psychologist", "psychology", "therapist",
      "optometrist", "optometry", "eye",
      "gynecologist", "obgyn", "ob-gyn", "ob/gyn",
      "orthopedic", "surgeon", "surgery", "gastroenterologist", "gastro",
      "ent", "pulmonologist", "endocrinologist", "nephrologist", "allergist",
      "oncologist", "urologist", "neurologist",
      "chiropractor", "physical therapist", "pt"],
  },
  {
    name: "professional_services",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Professional Service",
    keywords: ["immigration", "h1b", "h-1b", "visa", "green card", "oci",
      "tax", "taxes", "cpa", "accounting", "fbar", "fatca", "nri",
      "real estate", "realtor", "realty", "mortgage", "loan",
      "financial", "advisor", "planner", "investment",
      "insurance", "legal", "attorney", "lawyer", "notary"],
  },
  {
    name: "wedding_vendors",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Wedding Vendor",
    keywords: ["wedding", "weddings", "mehndi", "mehendi", "henna", "photographer", "photography",
      "dj", "decorator", "decoration", "decor", "mandap", "bridal", "bride", "groom",
      "shaadi", "sangeet", "garba", "jewelry", "jewellery", "lehenga", "saree", "sari",
      "makeup", "artist", "planner", "florist", "caterer", "videographer", "cinematographer",
      "pandit", "priest", "invitation", "card"],
  },
  {
    name: "event_halls",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Event Hall / Venue",
    keywords: ["venue", "hall", "banquet", "event hall", "reception", "party", "ballroom",
      "conference", "meeting room", "celebration"],
  },
  {
    name: "kids",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Kids & Education",
    keywords: ["kids", "kid", "children", "child", "baby", "toddler",
      "dance", "music", "tutoring", "tutor", "school", "class", "classes",
      "language", "bharatanatyam", "kathak", "kuchipudi", "carnatic", "tabla", "veena",
      "hindi", "telugu", "tamil", "sanskrit",
      "kumon", "mathnasium", "stem", "coding", "math",
      "bala vihar", "bal vihar", "sunday school"],
  },
  {
    name: "beauty_brands",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Beauty",
    keywords: ["beauty", "threading", "salon", "spa", "henna", "skincare", "makeup",
      "hair", "haircut", "barber", "waxing", "facial", "ayurvedic",
      "eyebrow", "bridal makeup", "parlor", "parlour"],
  },
  {
    name: "health_wellness",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Health & Wellness",
    keywords: ["ayurveda", "ayurvedic", "yoga", "meditation", "homeopathy",
      "therapy", "therapist", "counselor", "counseling",
      "mental health", "nutrition", "nutritionist", "dietitian",
      "wellness", "holistic", "acupuncture", "naturopathy"],
  },
  {
    name: "community_networking",
    fields: "*",
    searchCols: ["name", "city", "description", "subcategories"],
    label: "Community Organization",
    keywords: ["community", "association", "organization", "networking", "cultural",
      "volunteer", "ngo", "nonprofit", "charity", "group",
      "tana", "ata", "nata", "fomaa", "aapi"],
  },
  {
    name: "events",
    fields: "*",
    searchCols: ["name", "location", "description", "type"],
    label: "Event",
    keywords: ["event", "events", "show", "concert", "festival", "mela", "garba",
      "diwali", "holi", "navratri", "ugadi", "eid", "baisakhi", "pongal", "onam",
      "comedy", "standup", "bollywood night", "party", "mixer", "meetup",
      "workshop", "seminar", "conference"],
    filter: { column: "status", value: "approved" },
  },
  {
    name: "classifieds",
    fields: "*",
    searchCols: ["title", "description", "category", "city"],
    label: "Classified Post",
    keywords: ["roommate", "roommates", "room", "housing", "apartment", "rent", "rental",
      "job", "jobs", "hiring", "work", "career", "opening",
      "for sale", "selling", "buy", "buying",
      "carpool", "ride", "rideshare",
      "babysit", "babysitting", "babysitter", "nanny", "daycare",
      "home cooked", "homemade", "tiffin service", "dabba"],
    filter: { column: "status", value: "approved" },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════════════

const STOP_WORDS = new Set([
  "best", "good", "great", "top", "popular", "famous", "favorite", "favourite",
  "find", "show", "list", "give", "tell", "looking", "searching", "need", "want",
  "recommend", "recommended", "recommendation", "recommendations", "suggestion", "suggestions", "suggest",
  "near", "nearby", "around", "close", "closest", "area", "metro", "local",
  "the", "for", "and", "but", "not", "with", "from", "that", "this", "what",
  "where", "which", "who", "how", "can", "does", "should", "would", "could",
  "any", "some", "all", "most", "very", "really", "just", "also", "please",
  "help", "like", "know", "about", "there", "here", "have", "has", "are", "was",
  "were", "been", "being", "will", "shall", "may", "might", "must",
  "get", "got", "make", "made", "take", "took", "come", "came", "going",
]);

const SYNONYMS = {
  "doc": "doctor", "docs": "doctor", "dr": "doctor",
  "mandir": "temple", "masjid": "mosque", "gurdwara": "gurudwara",
  "lawyers": "attorney", "advocate": "attorney",
  "accountants": "cpa",
  "gym": "fitness", "workout": "fitness",
  "apt": "apartment", "apts": "apartment",
  "mehendi": "mehndi",
  "saree": "sari",
  "pandit": "priest",
  "puja": "pooja",
};

function stem(word) {
  if (word.endsWith("ies") && word.length > 4) return word.slice(0, -3) + "y";
  if (word.endsWith("ing") && word.length > 5) return word.slice(0, -3);
  if (word.endsWith("tion") && word.length > 5) return word;
  if (word.endsWith("es") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 3) return word.slice(0, -1);
  return word;
}

function cleanQuery(q) {
  return q.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, "").trim();
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `You are Ask Adda, a friendly and knowledgeable concierge for Desi Adda USA — the go-to directory for the South Asian community in Metro Detroit.

WHAT YOU DO:
- Help people find restaurants, temples, doctors, lawyers, groceries, salons, wedding vendors, events, roommates, and more from the Desi Adda directory.
- Give warm, concise, personalized recommendations based on the directory listings provided to you.

STRICT RULES:
- You ONLY recommend businesses/services that appear in the "listings data" provided with each message. NEVER make up, hallucinate, or guess businesses.
- If no listings are provided or the listings say "No matching listings found", say so honestly. Keep it brief — suggest 1-2 alternative search terms they could try, then ask if they need something else.
- Do NOT send people to Google, Yelp, or other sites. You are the concierge — if the directory doesn't have it, just say so warmly.
- Do NOT give generic advice like "check Facebook groups" or "ask friends". Just say we don't have that listing yet and suggest trying different keywords.

FORMATTING:
- Start with a brief 1-line intro.
- List each recommended place on its own line: **Name** (rating if available) — short description including city and phone if available.
- End with a 1-line tip or recommendation. Keep the whole response under 150 words.
- Use 1-2 relevant emojis max. Don't overdo it.

HANDLING FOLLOW-UPS:
- If the user asks "which one do you recommend?" or similar, pick one from the PREVIOUSLY listed results and explain why.
- If the user changes topic entirely (e.g. from restaurants to doctors), use the NEW listings data provided.

TONE: Warm, concise, helpful. Like a knowledgeable friend — not a customer service bot.`;

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN API HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function POST(request) {
  try {
    const { query, history } = await request.json();
    if (!query || !query.trim()) {
      return Response.json({ response: "Please enter a search query.", listings: [] });
    }

    const isFollowUp = history && history.length > 0;

    // ── Step 1: Clean and parse the query ──────────────────────────────────
    const cleaned = cleanQuery(query);
    const queryLower = cleaned.toLowerCase();
    const rawWords = queryLower.split(/\s+/).filter(w => w.length > 1);

    const expandedWords = rawWords.map(w => SYNONYMS[w] || w);
    const searchWords = expandedWords.filter(w => !STOP_WORDS.has(w) && w.length > 2);
    const allSearchTerms = [...new Set([...searchWords, ...searchWords.map(stem)])];

    // ── Step 2: Determine which tables to search ───────────────────────────
    const expandedQuery = expandedWords.join(" ");
    const relevantTables = TABLES.filter(table =>
      table.keywords.some(kw => expandedQuery.includes(kw) || queryLower.includes(kw))
    );
    const keywordMatched = relevantTables.length > 0;
    const tablesToSearch = keywordMatched ? relevantTables : TABLES;

    // ── Step 3: Search Supabase ────────────────────────────────────────────
    const scored = [];

    for (const table of tablesToSearch) {
      for (const word of allSearchTerms) {
        const orFilter = table.searchCols.map(col => `${col}.ilike.%${word}%`).join(",");

        try {
          let q = supabase.from(table.name).select(table.fields);
          if (table.filter) q = q.eq(table.filter.column, table.filter.value);
          const { data } = await q.or(orFilter).limit(10);

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
        } catch (e) {
          console.error(`Search error on ${table.name} for "${word}":`, e.message);
        }
      }
    }

    // ── Step 4: Fallback — keywords matched but no word hits ───────────────
    if (scored.length === 0 && keywordMatched) {
      for (const table of relevantTables) {
        try {
          const RATED_TABLES = new Set(["restaurants", "groceries", "temples", "wedding_vendors", "event_halls", "kids"]);
          const hasRating = RATED_TABLES.has(table.name);
          let q = supabase.from(table.name).select(table.fields);
          if (table.filter) q = q.eq(table.filter.column, table.filter.value);
          if (hasRating) {
            q = q.order("rating", { ascending: false, nullsFirst: false });
          } else {
            q = q.order("name");
          }
          const { data } = await q.limit(8);

          if (data) {
            for (const row of data) {
              scored.push({ ...row, _table: table.name, _category: table.label, _score: 1 });
            }
          }
        } catch (e) {
          console.error(`Fallback error on ${table.name}:`, e.message);
        }
      }
    }

    // ── Step 5: Sort and cap results ───────────────────────────────────────
    scored.sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return (b.rating || 0) - (a.rating || 0);
    });

    const listings = scored.slice(0, 8);

    // ── Step 6: Build rich context for Claude ──────────────────────────────
    const listingsContext = listings.length > 0
      ? listings.map(l => {
          const parts = [`Name: ${l.name}`, `Category: ${l._category}`];
          if (l.city) parts.push(`City: ${l.city}`);
          if (l.address) parts.push(`Address: ${l.address}`);
          if (l.rating) parts.push(`Rating: ${l.rating}/5`);
          if (l.reviews) parts.push(`Reviews: ${l.reviews}`);
          if (l.phone) parts.push(`Phone: ${l.phone}`);
          if (l.specialty) parts.push(`Specialty: ${l.specialty}`);
          if (l.title) parts.push(`Title: ${l.title}`);
          if (l.practice_name) parts.push(`Practice: ${l.practice_name}`);
          if (l.languages) parts.push(`Languages: ${Array.isArray(l.languages) ? l.languages.join(", ") : l.languages}`);
          if (l.subcategories) parts.push(`Tags: ${Array.isArray(l.subcategories) ? l.subcategories.join(", ") : l.subcategories}`);
          if (l.event_date) parts.push(`Date: ${l.event_date}`);
          if (l.location) parts.push(`Location: ${l.location}`);
          if (l.type) parts.push(`Type: ${l.type}`);
          if (l.description || l.bio) parts.push(`About: ${(l.description || l.bio).slice(0, 200)}`);
          return parts.join(", ");
        }).join("\n")
      : "No matching listings found in the directory.";

    // ── Step 7: Build Claude messages ──────────────────────────────────────
    let claudeMessages = [];

    if (isFollowUp) {
      const recentHistory = history.slice(-6);
      for (const h of recentHistory) {
        if (h.role === "user") claudeMessages.push({ role: "user", content: h.content });
        if (h.role === "assistant") claudeMessages.push({ role: "assistant", content: h.content });
      }
      claudeMessages.push({
        role: "user",
        content: `User is now asking: ${query}\n\nHere are the matching listings from our directory for this new query:\n${listingsContext}`,
      });
    } else {
      claudeMessages.push({
        role: "user",
        content: `User is asking: ${query}\n\nHere are the matching listings from our directory:\n${listingsContext}`,
      });
    }

    // ── Step 8: Call Claude Haiku ──────────────────────────────────────────
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
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: claudeMessages,
        }),
      });

      const data = await res.json();
      if (data.error) {
        console.error("Claude API error response:", data.error);
      }
      const textBlocks = data.content?.filter(b => b.type === "text") || [];
      aiResponse = textBlocks.map(b => b.text).join("\n");
    } catch (e) {
      console.error("Claude API call failed:", e);
    }

    // ── Step 9: Fallback if Claude fails ──────────────────────────────────
    if (!aiResponse) {
      aiResponse = listings.length > 0
        ? `I found ${listings.length} results for "${query}". Here's what we have in the directory:`
        : `I couldn't find any matches for "${query}". Try searching for something like "biryani in Troy", "Telugu temple", "immigration lawyer", or "mehndi artist".`;
    }

    return Response.json({ response: aiResponse, listings });

  } catch (e) {
    console.error("Ask Adda API error:", e);
    return Response.json(
      { response: "Something went wrong. Please try again.", listings: [] },
      { status: 500 }
    );
  }
}
