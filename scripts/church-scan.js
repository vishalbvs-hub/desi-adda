require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const API_KEY = process.env.GOOGLE_API_KEY;

const LAT = 42.6064, LNG = -83.1498, RADIUS = 128748;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function makeSlug(n, c) { return (n + " " + (c || "")).toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 80); }

const QUERIES = [
  "Indian church Michigan", "Malayalam church Michigan", "Syro-Malabar church Michigan",
  "Mar Thoma church Michigan", "Syrian Orthodox church Michigan", "Tamil church Michigan",
  "Telugu church Michigan", "Hindi church Michigan", "Punjabi church Michigan",
  "South Asian church Michigan", "Kerala Christian Michigan", "Indian Catholic church Michigan",
  "CSI church Michigan", "Indian Pentecostal church Michigan",
];

function classifyChurch(name, query) {
  const n = (name || "").toLowerCase();
  const q = (query || "").toLowerCase();

  let denomination = "Non-denominational";
  if (n.includes("syro-malabar") || n.includes("syro malabar")) denomination = "Syro-Malabar";
  else if (n.includes("mar thoma")) denomination = "Mar Thoma";
  else if (n.includes("syrian orthodox") || n.includes("malankara orthodox")) denomination = "Syrian Orthodox";
  else if (n.includes("csi ") || n.includes("church of south india")) denomination = "CSI";
  else if (n.includes("pentecostal") || n.includes("assembly of god")) denomination = "Pentecostal";
  else if (n.includes("catholic") || n.includes("st.") || n.includes("saint")) denomination = "Catholic";
  else if (n.includes("methodist") || n.includes("lutheran") || n.includes("presbyterian") || n.includes("baptist")) denomination = "Protestant";
  else if (q.includes("syro-malabar")) denomination = "Syro-Malabar";
  else if (q.includes("mar thoma")) denomination = "Mar Thoma";
  else if (q.includes("syrian orthodox")) denomination = "Syrian Orthodox";
  else if (q.includes("csi")) denomination = "CSI";
  else if (q.includes("pentecostal")) denomination = "Pentecostal";
  else if (q.includes("catholic")) denomination = "Catholic";

  let language = "Multi";
  if (n.includes("malayalam") || n.includes("kerala") || q.includes("malayalam") || q.includes("kerala") || denomination === "Syro-Malabar" || denomination === "Mar Thoma" || denomination === "Syrian Orthodox") language = "Malayalam";
  else if (n.includes("tamil") || q.includes("tamil") || denomination === "CSI") language = "Tamil";
  else if (n.includes("telugu") || q.includes("telugu")) language = "Telugu";
  else if (n.includes("hindi") || q.includes("hindi")) language = "Hindi";
  else if (n.includes("punjabi") || q.includes("punjabi")) language = "Punjabi";

  return { denomination, language };
}

async function textSearch(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${LAT},${LNG}&radius=${RADIUS}&key=${API_KEY}`;
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

async function main() {
  console.log("\n⛪ Indian Christian Churches Scan");
  console.log("═════════════════════════════════\n");

  // Get existing
  const { data: existing } = await supabase.from("temples").select("name, google_place_id");
  const existingPlaceIds = new Set((existing || []).filter(r => r.google_place_id).map(r => r.google_place_id));
  const existingNames = new Set((existing || []).map(r => r.name.toLowerCase().trim()));

  // Scan
  const found = new Map();
  for (let i = 0; i < QUERIES.length; i++) {
    process.stdout.write(`${i+1}/${QUERIES.length}: "${QUERIES[i]}"... `);
    const data = await textSearch(QUERIES[i]);
    const miResults = (data.results || []).filter(r => r.formatted_address?.includes(", MI ") || r.formatted_address?.includes(", Michigan"));
    console.log(`${miResults.length} MI results`);
    for (const r of miResults) {
      if (!found.has(r.place_id) && !existingPlaceIds.has(r.place_id)) {
        found.set(r.place_id, { ...r, _query: QUERIES[i] });
      }
    }
    await sleep(200);
  }

  const unique = [...found.values()];
  console.log(`\nUnique new: ${unique.length}\n`);

  // Filter to South Asian churches only (name must contain Indian/South Asian/language keywords)
  const saKeywords = ["indian", "malayalam", "syro", "mar thoma", "syrian", "tamil", "telugu", "hindi", "punjabi", "kerala", "south asian", "desi", "csi", "bethel", "sharon", "emmanuel", "pentecostal", "assembly"];
  const saChurches = unique.filter(r => {
    const n = r.name.toLowerCase();
    return saKeywords.some(kw => n.includes(kw)) || r._query.includes("Indian") || r._query.includes("Kerala") || r._query.includes("Malayalam");
  });
  console.log(`South Asian churches: ${saChurches.length}\n`);

  // Enrich and import
  let imported = 0;
  for (let i = 0; i < saChurches.length; i++) {
    const r = saChurches[i];
    if (existingNames.has(r.name.toLowerCase().trim())) continue;

    process.stdout.write(`  ${i+1}/${saChurches.length}: ${r.name}... `);
    const details = await getDetails(r.place_id);
    if (!details) { console.log("❌"); await sleep(200); continue; }

    const city = (details.formatted_address || "").split(",").slice(-3, -2)[0]?.trim() || "";
    const { denomination, language } = classifyChurch(details.name, r._query);
    const photos = (details.photos || []).slice(0, 5).map(p =>
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${API_KEY}`
    );

    const { error } = await supabase.from("temples").insert({
      name: details.name, city, slug: makeSlug(details.name, city),
      description: `${denomination} ${language !== "Multi" ? language + " " : ""}Christian church`,
      subcategories: ["Christian", denomination, language !== "Multi" ? language : null].filter(Boolean),
      badges: [], address: details.formatted_address,
      phone: details.formatted_phone_number || null,
      url: details.website || null,
      rating: details.rating || null, reviews: details.user_ratings_total || null,
      hours: details.opening_hours?.weekday_text?.join(" | ") || null,
      google_place_id: r.place_id,
      latitude: details.geometry?.location?.lat, longitude: details.geometry?.location?.lng,
      metro: "detroit", photos,
    });

    if (error) { console.log(`❌ ${error.message.substring(0, 50)}`); }
    else { console.log(`✅ ${denomination} (${language})`); imported++; }
    existingNames.add(details.name.toLowerCase().trim());
    await sleep(200);
  }

  const { count } = await supabase.from("temples").select("*", { count: "exact", head: true });
  console.log(`\n═════════════════════════════════`);
  console.log(`⛪ Imported: ${imported} churches`);
  console.log(`🛕 Total temples/worship: ${count}`);
  console.log(`═════════════════════════════════\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
