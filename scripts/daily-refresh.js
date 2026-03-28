const { createClient } = require("@supabase/supabase-js");

// ——— Config ———
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const log = [];
function logMsg(msg) {
  console.log(msg);
  log.push(msg);
}

// ——— Google Places: Refresh rating, hours, reviews, phone, photos, coordinates ———

async function getPlaceDetails(placeId) {
  const fields = "rating,user_ratings_total,formatted_phone_number,opening_hours,geometry,photos,website";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") {
    logMsg(`  ⚠️ Google Places error for ${placeId}: ${data.status}`);
    return null;
  }
  return data.result;
}

function getPhotoUrls(photos, maxPhotos = 3) {
  if (!photos || photos.length === 0) return [];
  return photos.slice(0, maxPhotos).map(
    (p) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${GOOGLE_API_KEY}`
  );
}

async function refreshTable(tableName) {
  logMsg(`\n📍 Refreshing ${tableName}...`);
  const { data: listings, error } = await supabase
    .from(tableName)
    .select("id, name, google_place_id")
    .not("google_place_id", "is", null);

  if (error) {
    logMsg(`  ❌ Error fetching ${tableName}: ${error.message}`);
    return 0;
  }

  let updated = 0;
  for (const listing of listings) {
    if (!listing.google_place_id) continue;

    const details = await getPlaceDetails(listing.google_place_id);
    if (!details) continue;

    const updates = {};
    if (details.rating) updates.rating = details.rating;
    if (details.user_ratings_total) updates.reviews = details.user_ratings_total;
    if (details.formatted_phone_number) updates.phone = details.formatted_phone_number;
    if (details.opening_hours?.weekday_text) {
      updates.hours = details.opening_hours.weekday_text.join(" | ");
    }
    if (details.geometry?.location) {
      updates.latitude = details.geometry.location.lat;
      updates.longitude = details.geometry.location.lng;
    }
    if (details.website) updates.url = details.website;
    if (details.photos) {
      updates.photos = getPhotoUrls(details.photos);
    }
    updates.updated_at = new Date().toISOString();

    // Try the update; if columns don't exist, remove them and retry
    let { error: updateError } = await supabase
      .from(tableName)
      .update(updates)
      .eq("id", listing.id);

    while (updateError && updateError.message.includes("does not exist")) {
      const missingCol = updateError.message.match(/column (\w+)\.(\w+)/)?.[2];
      if (!missingCol || updates[missingCol] === undefined) break;
      logMsg(`  ⚠️ Column "${missingCol}" missing in ${tableName}, skipping it`);
      delete updates[missingCol];
      ({ error: updateError } = await supabase
        .from(tableName)
        .update(updates)
        .eq("id", listing.id));
    }

    if (updateError) {
      logMsg(`  ❌ Error updating ${listing.name}: ${updateError.message}`);
    } else {
      logMsg(`  ✅ ${listing.name} — rating: ${updates.rating || "N/A"}, reviews: ${updates.reviews || "N/A"}, photos: ${updates.photos?.length || 0}`);
      updated++;
    }

    // Rate limit: 100ms between requests
    await new Promise((r) => setTimeout(r, 100));
  }

  logMsg(`  📊 ${updated}/${listings.length} listings updated in ${tableName}`);
  return updated;
}

// ——— Claude API: Check movie showtimes, events, new businesses ———

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  // Extract text from response
  const textBlocks = data.content?.filter((b) => b.type === "text") || [];
  return textBlocks.map((b) => b.text).join("\n");
}

async function refreshMovies() {
  logMsg("\n🎬 Checking Indian movie showtimes...");

  const prompt = `Search for Indian movies (Bollywood, Telugu, Tamil, Malayalam) currently showing or coming soon at these Detroit-area theaters: AMC Forum 30 Sterling Heights, Emagine Novi, MJR Troy Grand Digital Cinema.

Return ONLY a JSON array with this format, no other text:
[{"title": "Movie Name", "language": "Telugu", "genre": "Action", "status": "Now Showing", "theaters": ["AMC Forum 30"], "rating": "—"}]

If you cannot find current showtimes, return an empty array: []`;

  try {
    const response = await callClaude(prompt);
    // Try to extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      logMsg("  ⚠️ Could not parse movie data");
      return;
    }
    const movies = JSON.parse(jsonMatch[0]);
    if (movies.length === 0) {
      logMsg("  ℹ️ No new movie data found");
      return;
    }

    // Clear old movies and insert fresh ones
    await supabase.from("movies").delete().neq("id", 0);
    for (const movie of movies) {
      const { error } = await supabase.from("movies").insert({
        title: movie.title,
        language: movie.language,
        genre: movie.genre,
        status: movie.status,
        theaters: movie.theaters,
        rating: movie.rating || "—",
        url: "https://www.amctheatres.com",
        metro: "detroit",
      });
      if (error) {
        logMsg(`  ❌ Error inserting movie ${movie.title}: ${error.message}`);
      } else {
        logMsg(`  ✅ ${movie.title} (${movie.language}) — ${movie.status}`);
      }
    }
    logMsg(`  📊 ${movies.length} movies updated`);
  } catch (err) {
    logMsg(`  ❌ Movie refresh error: ${err.message}`);
  }
}

async function scanEvents() {
  logMsg("\n📅 Scanning for new desi events in Detroit...");

  const prompt = `Search for upcoming Indian, South Asian, or desi community events in the Detroit, Michigan metro area (Troy, Canton, Novi, Farmington Hills, Ann Arbor, Sterling Heights, Dearborn). Include temple events, cultural festivals, Bollywood nights, comedy shows, cricket matches, and community gatherings.

Return ONLY a JSON array with this format, no other text:
[{"name": "Event Name", "type": "Festival", "event_date": "April 15, 2026", "location": "Bharatiya Temple, Troy", "icon": "🎉", "description": "Brief description"}]

If you cannot find events, return an empty array: []`;

  try {
    const response = await callClaude(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      logMsg("  ⚠️ Could not parse event data");
      return;
    }
    const events = JSON.parse(jsonMatch[0]);
    if (events.length === 0) {
      logMsg("  ℹ️ No new events found");
      return;
    }

    let added = 0;
    for (const event of events) {
      // Check if event already exists
      const { data: existing } = await supabase
        .from("events")
        .select("id")
        .ilike("name", `%${event.name}%`)
        .limit(1);

      if (existing && existing.length > 0) {
        logMsg(`  ⏭️ Already exists: ${event.name}`);
        continue;
      }

      const { error } = await supabase.from("events").insert({
        name: event.name,
        type: event.type,
        event_date: event.event_date,
        location: event.location,
        icon: event.icon || "🎉",
        description: event.description,
        status: "approved",
        metro: "detroit",
      });

      if (error) {
        logMsg(`  ❌ Error adding event ${event.name}: ${error.message}`);
      } else {
        logMsg(`  ✅ New event: ${event.name} — ${event.event_date}`);
        added++;
      }
    }
    logMsg(`  📊 ${added} new events added`);
  } catch (err) {
    logMsg(`  ❌ Event scan error: ${err.message}`);
  }
}

async function scanNewBusinesses() {
  logMsg("\n🏪 Scanning for new Indian businesses in metro Detroit...");

  const prompt = `Search for any new Indian or South Asian restaurants, grocery stores, or businesses that have recently opened (last 3 months) in the Detroit, Michigan metro area — specifically Troy, Canton, Farmington Hills, Novi, Sterling Heights, Rochester Hills, Ann Arbor.

Return ONLY a JSON array with this format, no other text:
[{"name": "Business Name", "city": "Troy", "type": "restaurant", "description": "Brief description"}]

If you cannot find any new businesses, return an empty array: []`;

  try {
    const response = await callClaude(prompt);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      logMsg("  ⚠️ Could not parse business data");
      return;
    }
    const businesses = JSON.parse(jsonMatch[0]);
    if (businesses.length === 0) {
      logMsg("  ℹ️ No new businesses found");
      return;
    }

    for (const biz of businesses) {
      // Add to submissions table for manual review
      const { error } = await supabase.from("submissions").insert({
        business_name: biz.name,
        city: biz.city,
        category: biz.type,
        notes: `Auto-discovered: ${biz.description}`,
        status: "pending",
        metro: "detroit",
      });

      if (error) {
        logMsg(`  ❌ Error submitting ${biz.name}: ${error.message}`);
      } else {
        logMsg(`  🔍 Found: ${biz.name} (${biz.city}) — added to review queue`);
      }
    }
    logMsg(`  📊 ${businesses.length} potential new businesses queued for review`);
  } catch (err) {
    logMsg(`  ❌ Business scan error: ${err.message}`);
  }
}

// ——— Main ———

async function main() {
  logMsg("🚀 Desi Adda Daily Refresh — " + new Date().toLocaleString("en-US", { timeZone: "America/Detroit" }));
  logMsg("=".repeat(60));

  // Step 1: Refresh Google Places data for all listing tables
  const tables = ["restaurants", "groceries", "temples", "wedding_vendors", "kids", "professionals", "event_halls"];
  let totalUpdated = 0;
  for (const table of tables) {
    totalUpdated += await refreshTable(table);
  }

  // Step 2: Refresh movies (Claude API with web search)
  await refreshMovies();

  // Step 3: Scan for new events (Claude API with web search)
  await scanEvents();

  // Step 4: Scan for new businesses (Claude API with web search)
  await scanNewBusinesses();

  // Summary
  logMsg("\n" + "=".repeat(60));
  logMsg("📋 DAILY REFRESH SUMMARY");
  logMsg(`  Google Places: ${totalUpdated} listings refreshed`);
  logMsg("  Movies: checked");
  logMsg("  Events: scanned");
  logMsg("  New businesses: scanned");
  logMsg("  Timestamp: " + new Date().toISOString());
  logMsg("=".repeat(60));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
