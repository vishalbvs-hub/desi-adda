require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const API_KEY = process.env.GOOGLE_API_KEY;

function slug(name, city) {
  return (name + " " + (city || "")).toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 80);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══ PART 1: Google Places scan ═══
const QUERIES = [
  "Telugu association Michigan", "Tamil sangam Michigan", "Kannada association Michigan",
  "Malayalam association Michigan", "Gujarati samaj Michigan", "Marathi mandal Michigan",
  "Bengali association Michigan", "Punjabi association Michigan", "Pakistani association Michigan",
  "Bangladeshi association Michigan", "Nepali association Michigan", "Indian American organization Michigan",
  "South Asian organization Michigan", "Indian student association Michigan", "Indian cricket league Michigan",
  "desi cricket Michigan", "Indian badminton club Michigan", "Sikh gurdwara Michigan",
  "Jain center Michigan", "India league Michigan", "Indian cultural center Michigan",
  "Indian seniors group Michigan", "Indian women association Michigan", "Indian professional network Michigan",
];

async function textSearch(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=42.6064,-83.1498&radius=128748&key=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}

async function getDetails(placeId) {
  const fields = "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,geometry,place_id,photos,business_status";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.status === "OK" ? data.result : null;
}

// ═══ PART 2: Manual orgs ═══
const MANUAL_ORGS = [
  { name: "Detroit Telugu Association (DTA)", city: "Novi", org_type: "Cultural Association", language: "Telugu", ethnicity: "Telugu", website: "https://detroittelugu.org", description: "Since 1976. Promotes Telugu culture — Ugadi, Diwali, literary events, youth programs. One of the oldest Indian cultural organizations in Michigan." },
  { name: "TANA Michigan Chapter", city: "Metro Detroit", org_type: "Cultural Association", language: "Telugu", ethnicity: "Telugu", description: "Telugu Association of North America — Michigan chapter. National federation connecting Telugu Americans." },
  { name: "Detroit Telugu Literary Club (DTLC)", city: "Metro Detroit", org_type: "Cultural Association", language: "Telugu", ethnicity: "Telugu", description: "Telugu vocabulary contests, literary events, and cultural programs." },
  { name: "Michigan Tamil Sangam (MTS)", city: "Farmington Hills", org_type: "Cultural Association", language: "Tamil", ethnicity: "Tamil", website: "https://mitamilsangam.org", description: "Preserves Tamil language, culture, and arts. Celebrates Pongal, Diwali. Golden jubilee year." },
  { name: "Gujarati Samaj of Detroit (GSOD)", city: "Troy", org_type: "Cultural Association", language: "Gujarati", ethnicity: "Gujarati", website: "https://gsod.org", description: "Since 1975. 900+ member families. Navratri Garba (5000+ attendees), Diwali, Holi celebrations." },
  { name: "Vaishnav Samaj of Michigan", city: "Metro Detroit", org_type: "Religious/Spiritual", language: "Gujarati", ethnicity: "Gujarati", description: "Pushti Marg Vaishnav community in Michigan." },
  { name: "Maharashtra Mandal of Detroit (MMD)", city: "Troy", org_type: "Cultural Association", language: "Marathi", ethnicity: "Marathi", website: "https://mmdet.org", description: "Since 1977. Dramas, Ganesh Utsav, Diwali, marathon team, youth volunteering." },
  { name: "Ann Arbor Marathi Mandal (A2MM)", city: "Ann Arbor", org_type: "Cultural Association", language: "Marathi", ethnicity: "Marathi", description: "Marathi cultural events and community in the Ann Arbor area." },
  { name: "MILAN - Michigan Malayalee Literary Association", city: "Metro Detroit", org_type: "Cultural Association", language: "Malayalam", ethnicity: "Malayali", description: "Malayalam literary and cultural association." },
  { name: "Kerala Association of West Michigan (KAWM)", city: "Ada", org_type: "Cultural Association", language: "Malayalam", ethnicity: "Malayali", description: "Onam celebrations, cultural programs for the Kerala community in West Michigan." },
  { name: "Kannada Koota Michigan", city: "Metro Detroit", org_type: "Cultural Association", language: "Kannada", ethnicity: "Kannadiga", description: "Kannada cultural events including Rajyotsava celebrations." },
  { name: "Bengali Association of Michigan", city: "Metro Detroit", org_type: "Cultural Association", language: "Bengali", ethnicity: "Bengali", description: "Bengali cultural events, Durga Puja, and community gatherings." },
  { name: "Bangladesh Association of Metro Detroit", city: "Hamtramck", org_type: "Cultural Association", language: "Bengali", ethnicity: "Bangladeshi", description: "Serves 15-20K Bangladeshis in the Hamtramck/Detroit area. Pohela Boishakh, community events." },
  { name: "Punjabi Cultural Society of Michigan", city: "Metro Detroit", org_type: "Cultural Association", language: "Punjabi", ethnicity: "Punjabi", description: "Vaisakhi celebrations, Bhangra events, Punjabi cultural programs." },
  { name: "India League of America - Michigan (ILA)", city: "Detroit", org_type: "Cultural Association", language: "Multi", ethnicity: "Pan-Indian", description: "Runs the annual India Day festival at Hart Plaza. One of Detroit's premier Indian cultural events." },
  { name: "Pakistani American Association of Michigan", city: "Metro Detroit", org_type: "Cultural Association", language: "Urdu", ethnicity: "Pakistani", description: "Community events, Eid celebrations, Pakistan Day, cultural programs." },
  { name: "MICS - Michigan Indian Community Service", city: "Metro Detroit", org_type: "Service/Charity", language: "Multi", ethnicity: "Pan-Indian", website: "https://micsgroup.org", description: "Unites 25+ Indian orgs. Crisis support, emergency relief, community coordination." },
  { name: "United South Asian Promotions (USAP)", city: "Detroit", org_type: "Cultural Association", language: "Multi", ethnicity: "Multi-South Asian", description: "Runs Festival of India at Hart Plaza Detroit. Major South Asian cultural festival." },
  { name: "NetIP Michigan", city: "Metro Detroit", org_type: "Professional Network", language: "Multi", ethnicity: "Pan-Indian", description: "Indian professional networking for young professionals. Mentoring, career events." },
  { name: "FOMAPI", city: "Metro Detroit", org_type: "Professional Network", language: "Multi", ethnicity: "Pan-Indian", description: "Federation of Michigan Asian Physicians of Indian origin. Professional medical association." },
  { name: "Maheshwari Mahasabha of North America", city: "West Bloomfield", org_type: "Cultural Association", language: "Hindi", ethnicity: "Pan-Indian", description: "Maheshwari business community organization." },
  { name: "Rajasthani Association of Michigan", city: "Metro Detroit", org_type: "Cultural Association", language: "Hindi, Rajasthani", ethnicity: "Pan-Indian", description: "Rajasthani cultural events and community gatherings." },
  { name: "Sankara Eye Foundation Michigan Chapter", city: "Metro Detroit", org_type: "Service/Charity", language: "Multi", ethnicity: "Pan-Indian", description: "Eye care camps, fundraising for vision restoration in India." },
  { name: "Jain Society of Greater Detroit", city: "Farmington Hills", org_type: "Religious/Spiritual", language: "Gujarati, Hindi", ethnicity: "Pan-Indian", description: "Jain community center with temple, pathshala, and community events." },
  { name: "Sai Brindavanam Michigan", city: "Metro Detroit", org_type: "Religious/Spiritual", language: "Telugu, Multi", ethnicity: "Pan-Indian", description: "Sai Baba devotional community." },
  { name: "Chinmaya Mission Detroit", city: "Ann Arbor", org_type: "Religious/Spiritual", language: "Sanskrit, Multi", ethnicity: "Pan-Indian", description: "Vedanta study groups, Bala Vihar youth programs, cultural education." },
  { name: "Art of Living Michigan", city: "Troy", org_type: "Religious/Spiritual", language: "Multi", ethnicity: "Pan-Indian", description: "Sudarshan Kriya, meditation, yoga, community service projects." },
  { name: "ISKCON Detroit", city: "Detroit", org_type: "Religious/Spiritual", language: "Multi", ethnicity: "Pan-Indian", description: "International Society for Krishna Consciousness. Sunday feasts, festivals, Bhagavad Gita study." },
  { name: "Michigan Cricket Association", city: "Metro Detroit", org_type: "Sports/Recreation", language: "Multi", ethnicity: "Multi-South Asian", description: "Organizes cricket leagues and tournaments across Metro Detroit." },
  { name: "Detroit Cricket Club", city: "Detroit", org_type: "Sports/Recreation", language: "Multi", ethnicity: "Multi-South Asian", description: "Cricket club for players of all levels in the Detroit area." },
  { name: "Indian Badminton Club Michigan", city: "Metro Detroit", org_type: "Sports/Recreation", language: "Multi", ethnicity: "Pan-Indian", description: "Badminton club for the South Asian community." },
  { name: "Indian Students Association - University of Michigan", city: "Ann Arbor", org_type: "Student Organization", language: "Multi", ethnicity: "Pan-Indian", description: "Largest South Asian student org at U-M. Cultural shows, Diwali, Holi celebrations." },
  { name: "Indian Students Association - Wayne State University", city: "Detroit", org_type: "Student Organization", language: "Multi", ethnicity: "Pan-Indian", description: "Indian student community at Wayne State." },
  { name: "Indian Students Association - Michigan State University", city: "East Lansing", org_type: "Student Organization", language: "Multi", ethnicity: "Pan-Indian", description: "Indian student organization at MSU." },
  { name: "Desi Students Organization - Oakland University", city: "Rochester", org_type: "Student Organization", language: "Multi", ethnicity: "Pan-Indian", description: "South Asian student organization at Oakland University." },
  { name: "Indian Seniors Group of Metro Detroit", city: "Metro Detroit", org_type: "Seniors Group", language: "Multi", ethnicity: "Pan-Indian", description: "Social gatherings, health talks, cultural programs for Indian seniors." },
  { name: "Indian Women's Association of Michigan", city: "Metro Detroit", org_type: "Women's Group", language: "Multi", ethnicity: "Pan-Indian", description: "Empowerment, networking, cultural events for Indian women in Michigan." },
  { name: "Sikh Gurdwara of Michigan", city: "Rochester Hills", org_type: "Religious/Spiritual", language: "Punjabi", ethnicity: "Punjabi", description: "Sikh worship, langar, community service." },
];

async function main() {
  console.log("\n🏛️  Community Organization Pipeline");
  console.log("════════════════════════════════════\n");

  // Get existing place_ids and names
  const { data: existing } = await supabase.from("community_networking").select("name, google_place_id");
  const existingNames = new Set((existing || []).map(r => r.name.toLowerCase().trim()));
  const existingPlaceIds = new Set((existing || []).filter(r => r.google_place_id).map(r => r.google_place_id));

  // PART 1: Google Places scan
  console.log("📍 PART 1: Google Places Scan (24 queries)...\n");
  const scanned = [];
  for (let i = 0; i < QUERIES.length; i++) {
    process.stdout.write(`  ${i+1}/${QUERIES.length}: "${QUERIES[i]}"... `);
    const data = await textSearch(QUERIES[i]);
    const results = (data.results || []).filter(r =>
      r.formatted_address?.includes(", MI ") || r.formatted_address?.includes(", Michigan")
    );
    console.log(`${results.length} MI results`);
    for (const r of results) {
      if (!existingPlaceIds.has(r.place_id) && !scanned.find(s => s.place_id === r.place_id)) {
        scanned.push({ ...r, _query: QUERIES[i] });
      }
    }
    await sleep(200);
  }
  console.log(`\n  Unique new from scan: ${scanned.length}`);

  // Enrich scanned results
  console.log("\n  Enriching scanned results...");
  let scanImported = 0;
  for (let i = 0; i < scanned.length; i++) {
    const r = scanned[i];
    if (existingNames.has(r.name.toLowerCase().trim())) continue;

    const details = await getDetails(r.place_id);
    if (!details) { await sleep(200); continue; }

    const city = (details.formatted_address || "").split(",").slice(-3, -2)[0]?.trim() || "";
    const photos = (details.photos || []).slice(0, 5).map(p =>
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${API_KEY}`
    );

    const { error } = await supabase.from("community_networking").insert({
      name: details.name, city, slug: slug(details.name, city),
      description: r._query.replace(/ Michigan$/i, ""),
      address: details.formatted_address, phone: details.formatted_phone_number || null,
      url: details.website || null, website: details.website || null,
      rating: details.rating || null, reviews: details.user_ratings_total || null,
      hours: details.opening_hours?.weekday_text?.join(" | ") || null,
      google_place_id: r.place_id, latitude: details.geometry?.location?.lat,
      longitude: details.geometry?.location?.lng, metro: "detroit",
      photos, subcategories: [], badges: [],
    });
    if (!error) scanImported++;
    existingNames.add(details.name.toLowerCase().trim());
    await sleep(200);
  }
  console.log(`  Imported from scan: ${scanImported}\n`);

  // PART 2: Manual import
  console.log("📝 PART 2: Manual Import (38 organizations)...\n");
  let manualImported = 0, manualSkipped = 0;
  for (const org of MANUAL_ORGS) {
    if (existingNames.has(org.name.toLowerCase().trim())) {
      // Update existing with new fields
      await supabase.from("community_networking")
        .update({ org_type: org.org_type, language: org.language, ethnicity: org.ethnicity, website: org.website || null })
        .ilike("name", org.name.split("(")[0].trim() + "%");
      manualSkipped++;
      continue;
    }

    const { error } = await supabase.from("community_networking").insert({
      name: org.name, city: org.city, slug: slug(org.name, org.city),
      description: org.description, org_type: org.org_type,
      language: org.language, ethnicity: org.ethnicity,
      website: org.website || null, url: org.website || null,
      metro: "detroit", subcategories: [], badges: [], photos: [],
    });
    if (error) {
      console.log(`  ❌ ${org.name}: ${error.message.substring(0, 60)}`);
    } else {
      manualImported++;
    }
  }
  console.log(`  Imported: ${manualImported}, Updated existing: ${manualSkipped}\n`);

  // Generate slugs for any missing
  const { data: noSlug } = await supabase.from("community_networking").select("id, name, city").is("slug", null);
  if (noSlug?.length) {
    for (const r of noSlug) {
      await supabase.from("community_networking").update({ slug: slug(r.name, r.city) }).eq("id", r.id);
    }
    console.log(`  Generated ${noSlug.length} slugs\n`);
  }

  // Final count
  const { count } = await supabase.from("community_networking").select("*", { count: "exact", head: true });
  console.log("════════════════════════════════════");
  console.log(`🏛️  TOTAL: ${count} community organizations`);
  console.log("════════════════════════════════════\n");
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
