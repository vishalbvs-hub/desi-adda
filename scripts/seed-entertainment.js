require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function main() {
  console.log("🎬 Seeding Entertainment data...\n");

  // OTT Releases
  const ottReleases = [
    { title: "Pushpa 2: The Rule", language: "Telugu", platform: "Netflix", genre: "Action, Drama", year: 2025, poster_url: "https://m.media-amazon.com/images/M/MV5BNGMyNTAzNzEtYjJhYS00NTdhLTk3YjItMmY4OGFmODI1OTk3XkEyXkFqcGc@._V1_.jpg", youtube_video_id: "mR9P0UNrofk", streaming_url: "https://www.netflix.com/title/81773441", release_date: "2026-03-15", release_type: "new", synopsis: "Pushpa Raj returns in this action-packed sequel, navigating the sandalwood smuggling world while facing new enemies." },
    { title: "Vidaamuyarchi", language: "Tamil", platform: "Netflix", genre: "Action, Thriller", year: 2025, poster_url: "https://upload.wikimedia.org/wikipedia/en/7/7f/Vidaamuyarchi_poster.jpg", youtube_video_id: "0KTzJLR8Iho", streaming_url: "https://www.netflix.com/search?q=vidaamuyarchi", release_date: "2026-03-10", release_type: "new", synopsis: "A man fights to rescue his wife from dangerous circumstances in a foreign land." },
    { title: "Thandel", language: "Telugu", platform: "Prime Video", genre: "Drama, Thriller", year: 2025, poster_url: "https://upload.wikimedia.org/wikipedia/en/d/d1/Thandel_poster.jpg", youtube_video_id: "ZIZYpEQRX3g", streaming_url: "https://www.primevideo.com/search?phrase=thandel", release_date: "2026-03-20", release_type: "new", synopsis: "Based on true events of fishermen from Srikakulam who unknowingly cross into Pakistani waters." },
    { title: "Aadu 3", language: "Malayalam", platform: "Disney+ Hotstar", genre: "Comedy", year: 2026, poster_url: "https://upload.wikimedia.org/wikipedia/en/4/4e/Aadu_3_poster.jpg", youtube_video_id: "MhVX9dGXBfg", streaming_url: "https://www.hotstar.com/search?q=aadu+3", release_date: "2026-03-25", release_type: "new", synopsis: "Jayasurya returns in the third installment of the hit comedy franchise." },
    { title: "Housefull 5", language: "Hindi", platform: "Prime Video", genre: "Comedy", year: 2025, poster_url: "https://m.media-amazon.com/images/M/MV5BMzE0YjQ4ODctMzc1OC00ZDI2LTg2MjktYzRhNjJlMTkyNmY4XkEyXkFqcGc@._V1_.jpg", youtube_video_id: "gLPWo9jKHVs", streaming_url: "https://www.primevideo.com/search?phrase=housefull+5", release_date: "2026-03-28", release_type: "new", synopsis: "The Housefull franchise continues with more comedy chaos on a cruise ship." },
    { title: "Marco", language: "Malayalam", platform: "Disney+ Hotstar", genre: "Action, Crime", year: 2024, poster_url: "https://upload.wikimedia.org/wikipedia/en/3/35/Marco_2024_film_poster.jpg", youtube_video_id: "sT06mem2uDY", streaming_url: "https://www.hotstar.com/search?q=marco+malayalam", release_date: "2026-02-15", release_type: "new", synopsis: "A young man's journey into the underworld seeking vengeance." },
    { title: "Daaku Maharaaj", language: "Telugu", platform: "Netflix", genre: "Action", year: 2025, poster_url: "https://m.media-amazon.com/images/M/MV5BYWU5NjFhMTktMTNlYi00NWM5LWFkYzktOTA2MmVkZmFlYzJhXkEyXkFqcGc@._V1_.jpg", youtube_video_id: "aBNfH6gVWMA", streaming_url: "https://www.netflix.com/search?q=daaku+maharaaj", release_date: "2026-03-01", release_type: "new", synopsis: "A fierce dacoit rises to power in this action-packed Telugu film." },
    { title: "Sikandar", language: "Hindi", platform: "Coming Soon", genre: "Action, Drama", year: 2026, poster_url: "https://m.media-amazon.com/images/M/MV5BOGZkMjFiM2ItMzc2ZS00MDM0LWIyMzktMTdlNzVhYWViMzIyXkEyXkFqcGc@._V1_.jpg", youtube_video_id: null, streaming_url: null, release_date: "2026-06-15", release_type: "coming_soon", synopsis: "Salman Khan stars in this Eid 2026 release about a man with a mysterious past." },
    { title: "Toxic", language: "Kannada", platform: "Coming Soon", genre: "Action, Thriller", year: 2026, poster_url: "https://upload.wikimedia.org/wikipedia/en/4/42/Toxic_film_poster.jpg", youtube_video_id: null, streaming_url: null, release_date: "2026-06-04", release_type: "coming_soon", synopsis: "Yash returns in this dark action thriller set in the underworld of Goa." },
    { title: "Thaai Kizhavi", language: "Tamil", platform: "Sun NXT", genre: "Drama", year: 2026, poster_url: null, youtube_video_id: null, streaming_url: "https://www.sunnxt.com", release_date: "2026-04-10", release_type: "coming_soon", synopsis: "Tamil cinema's surprise blockbuster about a grandmother's fight for justice." },
  ];

  const { error: ottErr } = await s.from("ott_releases").insert(ottReleases);
  if (ottErr) console.log("OTT error:", ottErr.message);
  else console.log(`✅ ${ottReleases.length} OTT releases seeded`);

  // Curated Lists
  const lists = [
    {
      slug: "best-telugu-thrillers-prime", title: "Best Telugu Thrillers on Prime", subtitle: "Edge-of-your-seat Telugu films streaming on Amazon Prime Video", film_count: 8,
      films: JSON.stringify([
        { title: "HIT: The First Case", year: 2020, platform: "Prime Video", description: "A cop dealing with PTSD investigates a missing woman case" },
        { title: "Evaru", year: 2019, platform: "Prime Video", description: "A prosecutor and a woman accused of murder trade versions of truth" },
        { title: "Kshanam", year: 2016, platform: "Prime Video", description: "An NRI returns to India to find his ex-girlfriend's missing daughter" },
        { title: "Goodachari", year: 2018, platform: "Prime Video", description: "A spy thriller following an agent infiltrating a terrorist organization" },
        { title: "Agent Sai Srinivasa Athreya", year: 2019, platform: "Prime Video", description: "A self-proclaimed detective in Nellore solves a real murder case" },
        { title: "Brochevarevarura", year: 2019, platform: "Prime Video", description: "College students get entangled in a crime they didn't commit" },
        { title: "Mathu Vadalara", year: 2019, platform: "Prime Video", description: "Two friends accidentally witness a crime and get pulled into chaos" },
        { title: "Pellichoopulu", year: 2016, platform: "Prime Video", description: "A arranged-marriage meeting leads to an unexpected food truck business" },
      ]),
    },
    {
      slug: "top-malayalam-netflix", title: "Top 10 Malayalam Films on Netflix", subtitle: "The best of Malayalam cinema streaming right now", film_count: 10,
      films: JSON.stringify([
        { title: "Drishyam", year: 2013, platform: "Netflix", description: "A father protects his family after an accidental death" },
        { title: "Kumbalangi Nights", year: 2019, platform: "Netflix", description: "Four brothers navigate love and dysfunction in a Kerala fishing village" },
        { title: "Joji", year: 2021, platform: "Netflix", description: "A Macbeth-inspired tale of greed and ambition in rural Kerala" },
        { title: "The Great Indian Kitchen", year: 2021, platform: "Netflix", description: "A newlywed woman confronts patriarchy through kitchen labor" },
        { title: "Jallikattu", year: 2019, platform: "Netflix", description: "A buffalo escapes in a remote village, unleashing human chaos" },
        { title: "Virus", year: 2019, platform: "Netflix", description: "Based on the 2018 Nipah virus outbreak in Kerala" },
        { title: "Maheshinte Prathikaaram", year: 2016, platform: "Netflix", description: "A photographer vows not to wear sandals until he avenges an insult" },
        { title: "Angamaly Diaries", year: 2017, platform: "Netflix", description: "A coming-of-age tale in Angamaly's pork business underworld" },
        { title: "Ustad Hotel", year: 2012, platform: "Netflix", description: "A young chef finds purpose cooking at his grandfather's restaurant" },
        { title: "Premam", year: 2015, platform: "Netflix", description: "Three phases of love across a young man's life in Aluva" },
      ]),
    },
  ];

  const { error: listErr } = await s.from("curated_lists").insert(lists);
  if (listErr) console.log("Lists error:", listErr.message);
  else console.log(`✅ ${lists.length} curated lists seeded`);

  // Curated Playlists (real Spotify playlist URLs)
  const playlists = [
    { name: "Bollywood Wedding Hits", language: "Hindi", mood: "Wedding vibes, sangeet energy", platform: "Spotify", playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DX0XUfTFmNBRM", description: "Every song you need for a desi wedding — from sangeet to baraat", song_count: 50 },
    { name: "Telugu Hits 2026", language: "Telugu", mood: "Latest Telugu chart-toppers", platform: "Spotify", playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DX6XceWZP1znT", description: "Trending Telugu songs from the latest movies and albums", song_count: 50 },
    { name: "Tamil Chill", language: "Tamil", mood: "Relaxed Tamil melodies", platform: "Spotify", playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DX5Ozry5U6bkC", description: "Soothing Tamil tracks for a lazy afternoon", song_count: 40 },
    { name: "Punjabi Party Anthems", language: "Punjabi", mood: "High energy bhangra bangers", platform: "Spotify", playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DX5cZuAHLNjGz", description: "Diljit, AP Dhillon, and the best Punjabi party tracks", song_count: 50 },
    { name: "Carnatic Classical Essentials", language: "Multi", mood: "Meditative, devotional", platform: "Spotify", playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DWYFxmDnAIjPO", description: "Essential Carnatic ragas from masters like MS Subbulakshmi", song_count: 30 },
    { name: "90s Bollywood Nostalgia", language: "Hindi", mood: "Nostalgic 90s vibes", platform: "Spotify", playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DWTujiO2wnBer", description: "SRK, Aamir, the golden era — every 90s kid's soundtrack", song_count: 50 },
  ];

  const { error: plErr } = await s.from("curated_playlists").insert(playlists);
  if (plErr) console.log("Playlists error:", plErr.message);
  else console.log(`✅ ${playlists.length} playlists seeded`);

  console.log("\n🎬 Entertainment data seeded!");
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
