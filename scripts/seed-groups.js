require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function main() {
  console.log("👥 Seeding Groups directory...\n");

  const verified = "2026-04-01";

  const groups = [
    // ═══ FACEBOOK — GENERAL COMMUNITY ═══
    {
      name: "Indians Community Michigan",
      platform: "Facebook",
      category: "social",
      language: ["Multi"],
      description: "General community group for Indians living in Michigan. Discussions, events, and connections.",
      invite_url: "https://www.facebook.com/groups/indianscommunitymichigan",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Desi Michigan",
      platform: "Facebook",
      category: "social",
      language: ["Multi"],
      description: "Desi community discussions, events, and connections in Michigan.",
      invite_url: "https://www.facebook.com/groups/278466419640022",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Michigan Desi Community",
      platform: "Facebook",
      category: "social",
      language: ["Multi"],
      description: "Community group for South Asians in Michigan. News, events, recommendations.",
      invite_url: "https://www.facebook.com/groups/1633173647011127",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Michigan Indian Community",
      platform: "Facebook",
      category: "social",
      language: ["Multi"],
      description: "One of the oldest Indian community groups for Michigan. Active discussions and community support.",
      invite_url: "https://www.facebook.com/groups/6258988633",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Indians in Michigan",
      platform: "Facebook",
      category: "social",
      language: ["Multi"],
      description: "Connecting Indians across Michigan — housing, jobs, events, and more.",
      invite_url: "https://www.facebook.com/groups/1482845758656534",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Indian Community Near Grand Rapids Michigan",
      platform: "Facebook",
      category: "social",
      language: ["Multi"],
      description: "For Indians in the Grand Rapids area. Community events, local recommendations.",
      invite_url: "https://www.facebook.com/groups/1484247601859549",
      is_active: true,
      verified_date: verified,
    },

    // ═══ FACEBOOK — HOUSING ═══
    {
      name: "Indian Students Housing & Travel",
      platform: "Facebook",
      category: "housing",
      language: ["Multi"],
      description: "Housing, roommates, and travel coordination for Indian students in Michigan.",
      invite_url: "https://www.facebook.com/groups/943141462418591",
      is_active: true,
      verified_date: verified,
    },

    // ═══ MEETUP ═══
    {
      name: "Michigan Desi Social Group 20s and 30s",
      platform: "Meetup",
      category: "social",
      language: ["Multi"],
      description: "Chai meetups, sports events, celebrations, and networking for desi professionals in their 20s and 30s.",
      invite_url: "https://www.meetup.com/michigan-desi-social-group-20s-30s",
      is_active: true,
      verified_date: verified,
    },

    // ═══ WEBSITES — HOUSING ═══
    {
      name: "Sulekha Roommates — Detroit",
      platform: "Website",
      category: "housing",
      language: ["Multi"],
      description: "Largest Indian roommate listing site in the US. Filter by city, gender, diet, language. Average Detroit rent: $750-800/month.",
      invite_url: "https://indianroommates.sulekha.com/detroit-metro-area",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "MiIndia Roommates",
      platform: "Website",
      category: "housing",
      language: ["Multi"],
      description: "Detroit-specific roommate board run by MiIndia community portal.",
      invite_url: "https://miindia.com/roommates",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "IndianRoommates.in — Detroit",
      platform: "Website",
      category: "housing",
      language: ["Multi"],
      description: "International Indian roommate platform with Detroit listings. Search by gender, diet, and move-in date.",
      invite_url: "https://indianroommates.in/Detroit",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "DetroitIndian.net",
      platform: "Website",
      category: "housing",
      language: ["Multi"],
      description: "Detroit Indian community portal with roommate and housing discussions.",
      invite_url: "https://detroitindian.net",
      is_active: true,
      verified_date: verified,
    },

    // ═══ WEBSITES — JOBS ═══
    {
      name: "MiIndia Jobs",
      platform: "Website",
      category: "jobs",
      language: ["Multi"],
      description: "Job postings from Detroit's Indian community portal. IT, healthcare, and local business opportunities.",
      invite_url: "https://miindia.com/jobs",
      is_active: true,
      verified_date: verified,
    },

    // ═══ LANGUAGE-SPECIFIC ═══
    {
      name: "Detroit Telugu Association",
      platform: "Facebook",
      category: "language",
      language: ["Telugu"],
      member_count: 2780,
      description: "Official DTA Facebook page. Telugu cultural events, community updates, and networking in Metro Detroit.",
      invite_url: "https://www.facebook.com/dta.contact",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Michigan Tamil Sangam",
      platform: "Facebook",
      category: "language",
      language: ["Tamil"],
      member_count: 4770,
      description: "Official MTS Facebook page. Tamil cultural events, Pongal, Deepavali celebrations, and community support.",
      invite_url: "https://www.facebook.com/michigan.tamilsangam",
      is_active: true,
      verified_date: verified,
    },
    {
      name: "Gujarati Samaj of Detroit",
      platform: "Website",
      category: "language",
      language: ["Gujarati"],
      member_count: 900,
      description: "900+ member families. Navratri, Garba, Diwali events, and Gujarati community networking.",
      invite_url: "https://gsod.org",
      is_active: true,
      verified_date: verified,
    },
  ];

  const { error } = await s.from("groups").insert(groups);
  if (error) {
    console.log("Error:", error.message);
    console.log("\nYou need to create the groups table first. Run this SQL in Supabase SQL Editor:\n");
    console.log(`
CREATE TABLE IF NOT EXISTS groups (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  platform text NOT NULL,
  category text NOT NULL,
  language text[],
  description text,
  member_count integer,
  invite_url text NOT NULL,
  verified_date date,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active groups" ON groups;
CREATE POLICY "Public read active groups" ON groups FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Public insert groups" ON groups;
CREATE POLICY "Public insert groups" ON groups FOR INSERT WITH CHECK (true);
    `);
  } else {
    console.log(`✅ ${groups.length} groups seeded`);
    console.log(`   ${groups.filter(g => g.platform === "Facebook").length} Facebook groups`);
    console.log(`   ${groups.filter(g => g.platform === "Meetup").length} Meetup groups`);
    console.log(`   ${groups.filter(g => g.platform === "Website").length} Websites`);
    console.log(`   ${groups.filter(g => g.category === "language").length} Language-specific`);
  }
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
