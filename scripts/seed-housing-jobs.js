require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function main() {
  console.log("🏠💼 Seeding Housing & Jobs listings...\n");

  const now = new Date();
  const expires = new Date(now);
  expires.setDate(expires.getDate() + 45);
  const expiresAt = expires.toISOString();

  const listings = [
    // ═══ HOUSING ═══
    {
      listing_type: "room_available",
      category: "housing",
      title: "Private room in 3BR townhouse — Troy",
      budget: "$750/month",
      city: "Troy",
      gender_pref: "Male",
      diet_pref: "Vegetarian Only",
      furnished: true,
      near_landmark: "Big Beaver & Rochester",
      duration: "Long term (6+ months)",
      body: "Quiet vegetarian household, two working professionals. Close to major IT offices. Includes utilities, WiFi, washer/dryer. Looking for a clean, working professional. No smoking. Available May 1.",
      languages: ["Telugu", "Hindi", "English"],
      contact_phone: "(248) 555-0101",
      contact_email: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "room_available",
      category: "housing",
      title: "Furnished master bedroom — Canton",
      budget: "$650/month",
      city: "Canton",
      gender_pref: "Female",
      diet_pref: "No Preference",
      furnished: true,
      near_landmark: "Hindu Temple of Canton",
      duration: "Flexible",
      body: "Spacious master bedroom with attached bathroom in a family home. Safe neighborhood, near grocery stores and temple. Short or long term OK. Indian family.",
      languages: ["Hindi", "Gujarati", "English"],
      contact_email: "canton.room@email.com",
      contact_phone: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "room_available",
      category: "housing",
      title: "Shared room near Farmington Hills",
      budget: "$450/month",
      city: "Farmington Hills",
      gender_pref: "Male",
      diet_pref: "Vegetarian Only",
      furnished: true,
      near_landmark: "12 Mile & Orchard Lake",
      duration: "Flexible",
      body: "Shared room in 2BR apartment. Great for new arrivals or students. Near Botsford Hospital and multiple Indian restaurants. Month to month OK.",
      languages: ["Telugu", "Hindi", "English"],
      contact_phone: "(248) 555-0103",
      contact_email: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "looking_for_room",
      category: "housing",
      title: "Software engineer relocating to Troy — need room",
      budget: "$800/month",
      city: "Troy",
      gender_pref: "Male",
      diet_pref: "Vegetarian Only",
      furnished: false,
      near_landmark: null,
      duration: "Long term (6+ months)",
      body: "Starting new role at auto company in May. Looking for vegetarian household, preferably Telugu or Hindi speaking. Clean, non-smoker, working professional. Can provide references.",
      languages: ["Telugu", "Hindi", "English"],
      contact_email: "swe.troy2026@email.com",
      contact_phone: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "sublease",
      category: "housing",
      title: "1BR apartment sublease — Novi",
      budget: "$1100/month",
      city: "Novi",
      gender_pref: "Any",
      diet_pref: "No Preference",
      furnished: false,
      near_landmark: "Twelve Oaks Mall",
      duration: "Short term (1-3 months)",
      body: "Breaking lease due to relocation. Available April 15 through August 31. Modern apartment complex near Twelve Oaks Mall. Gym, pool included.",
      languages: ["English"],
      contact_email: "novi.sublease@email.com",
      contact_phone: "(248) 555-0105",
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "looking_for_room",
      category: "housing",
      title: "Female grad student looking for room near UMich",
      budget: "$600/month",
      city: "Ann Arbor",
      gender_pref: "Female",
      diet_pref: "Vegetarian Only",
      furnished: false,
      near_landmark: "University of Michigan",
      duration: "Long term (6+ months)",
      body: "Starting masters at University of Michigan in fall. Looking for room in Ann Arbor or nearby. Vegetarian, non-smoker, quiet.",
      languages: ["Tamil", "English"],
      contact_email: "umich.student26@email.com",
      contact_phone: null,
      approved: true,
      expires_at: expiresAt,
    },

    // ═══ JOBS ═══
    {
      listing_type: "hiring",
      category: "jobs",
      title: "Weekend cashier needed — Indian grocery",
      budget: "$15/hr",
      city: "Novi",
      job_category: "Retail/Grocery",
      job_time: "Part-time",
      company_name: null,
      body: "Indian grocery store looking for part-time weekend help. Must speak Hindi or Gujarati. Friendly, reliable. Training provided.",
      languages: ["Hindi", "Gujarati"],
      contact_phone: "(248) 555-0201",
      contact_email: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "hiring",
      category: "jobs",
      title: "Experienced tandoor cook needed",
      budget: "$18-22/hr",
      city: "Troy",
      job_category: "Restaurant/Food",
      job_time: "Full-time",
      company_name: null,
      body: "Busy Indian restaurant in Troy looking for experienced tandoor and curry cook. Must have at least 2 years experience with Indian cuisine. Competitive pay based on experience.",
      languages: ["Hindi"],
      contact_phone: "(248) 555-0202",
      contact_email: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "hiring",
      category: "jobs",
      title: "Math tutor for high schooler",
      budget: "$35/hr",
      city: "Troy",
      job_category: "Tutoring/Teaching",
      job_time: "Flexible",
      company_name: null,
      body: "Looking for experienced math tutor for 10th grader preparing for SAT. Weekends preferred. Must have strong math background.",
      languages: ["English"],
      contact_email: "troy.tutor@email.com",
      contact_phone: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "looking_for_work",
      category: "jobs",
      title: "IT professional — available for contract roles",
      budget: "$80K+",
      city: "Metro Detroit",
      job_category: "IT/Tech",
      job_time: "Full-time",
      company_name: null,
      body: "12 years experience in Java, AWS, microservices. Currently on H1B, looking for full-time or contract roles in Metro Detroit area. Can start immediately.",
      languages: ["Telugu", "Hindi", "English"],
      contact_email: "java.dev.mi@email.com",
      contact_phone: null,
      approved: true,
      expires_at: expiresAt,
    },
    {
      listing_type: "hiring",
      category: "jobs",
      title: "Delivery driver — Indian restaurant",
      budget: "$14/hr + tips",
      city: "Farmington Hills",
      job_category: "Driving",
      job_time: "Part-time",
      company_name: null,
      body: "Need delivery driver for evening shifts. Must have own car and clean driving record. Good tips.",
      languages: ["Hindi", "English"],
      contact_phone: "(248) 555-0205",
      contact_email: null,
      approved: true,
      expires_at: expiresAt,
    },
  ];

  const { error } = await s.from("classifieds").insert(listings);
  if (error) {
    console.log("Error:", error.message);
    console.log("\nYou may need to run this SQL first to add the new columns:\n");
    console.log(`
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS listing_type text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS budget text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS gender_pref text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS diet_pref text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS furnished boolean DEFAULT false;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS near_landmark text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS available_from date;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS languages text[];
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS contact_phone text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS contact_email text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS approved boolean DEFAULT false;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS job_category text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS job_time text;
ALTER TABLE classifieds ADD COLUMN IF NOT EXISTS company_name text;

-- RLS
ALTER TABLE classifieds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read approved" ON classifieds;
CREATE POLICY "Public read approved" ON classifieds FOR SELECT USING (approved = true);
DROP POLICY IF EXISTS "Public insert" ON classifieds;
CREATE POLICY "Public insert" ON classifieds FOR INSERT WITH CHECK (true);
    `);
  } else {
    console.log(`✅ ${listings.length} listings seeded (${listings.filter(l => l.category === "housing").length} housing, ${listings.filter(l => l.category === "jobs").length} jobs)`);
  }
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
