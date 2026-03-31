require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) DesiAdda/1.0" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}

// Extract event-like content from HTML
function extractEvents(html, baseUrl) {
  const events = [];
  if (!html) return events;

  // Look for common event patterns in HTML
  // Pattern 1: dates like "April 5, 2026" or "04/05/2026" near event-like text
  const datePatterns = [
    /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4}/gi,
    /\d{1,2}\/\d{1,2}\/\d{4}/g,
    /\d{4}-\d{2}-\d{2}/g,
  ];

  // Strip HTML tags for text analysis
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

  // Find dates and surrounding context
  for (const pattern of datePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const pos = match.index;
      const context = text.substring(Math.max(0, pos - 100), Math.min(text.length, pos + 200)).trim();

      // Try to parse the date
      const dateStr = match[0];
      const parsed = new Date(dateStr);
      if (isNaN(parsed.getTime())) continue;
      if (parsed < new Date()) continue; // skip past dates
      if (parsed.getFullYear() > 2027) continue; // skip far future

      // Extract event name from context (text before the date)
      const before = text.substring(Math.max(0, pos - 100), pos).trim();
      const lines = before.split(/[.\n\r]/).filter(l => l.trim().length > 3);
      const eventName = lines[lines.length - 1]?.trim() || "";

      if (eventName.length > 3 && eventName.length < 100) {
        events.push({
          event_name: eventName.substring(0, 80),
          event_date: parsed.toISOString().split("T")[0],
          event_description: context.substring(0, 200),
          source: baseUrl,
        });
      }
    }
  }

  return events;
}

// Find event page links in HTML
function findEventLinks(html, baseUrl) {
  const links = [];
  const linkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
  const eventKeywords = /event|calendar|program|schedule|upcoming|activit|festival/i;
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const href = match[1];
    const text = match[2];
    if (eventKeywords.test(href) || eventKeywords.test(text)) {
      let fullUrl = href;
      if (href.startsWith("/")) {
        const base = new URL(baseUrl);
        fullUrl = `${base.protocol}//${base.host}${href}`;
      } else if (!href.startsWith("http")) {
        fullUrl = `${baseUrl.replace(/\/$/, "")}/${href}`;
      }
      if (!links.includes(fullUrl)) links.push(fullUrl);
    }
  }
  return links.slice(0, 5); // max 5 subpages
}

async function scrapeTemples() {
  console.log("\n🛕 Scraping temple websites for events...\n");

  const { data: temples } = await supabase.from("temples").select("id, name, url").not("url", "is", null);
  const withUrl = temples.filter(t => t.url && t.url.startsWith("http"));
  console.log(`  ${withUrl.length} temples have website URLs\n`);

  let totalEvents = 0;
  for (const temple of withUrl) {
    process.stdout.write(`  ${temple.name}: `);

    const html = await fetchPage(temple.url);
    if (!html) { console.log("❌ unreachable"); await sleep(500); continue; }

    // Find event subpages
    const eventLinks = findEventLinks(html, temple.url);
    let allEvents = extractEvents(html, temple.url);

    for (const link of eventLinks) {
      const subHtml = await fetchPage(link);
      if (subHtml) {
        allEvents.push(...extractEvents(subHtml, link));
      }
      await sleep(300);
    }

    // Deduplicate by date + name
    const seen = new Set();
    allEvents = allEvents.filter(e => {
      const key = `${e.event_date}-${e.event_name.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (allEvents.length === 0) {
      console.log(`no events found (checked ${eventLinks.length + 1} pages)`);
    } else {
      // Check for existing events
      const { data: existing } = await supabase.from("temple_events").select("event_name, event_date").eq("temple_id", temple.id);
      const existingKeys = new Set((existing || []).map(e => `${e.event_date}-${e.event_name.toLowerCase()}`));

      const newEvents = allEvents.filter(e => !existingKeys.has(`${e.event_date}-${e.event_name.toLowerCase()}`));

      if (newEvents.length > 0) {
        const rows = newEvents.map(e => ({
          temple_id: temple.id,
          event_name: e.event_name,
          event_description: e.event_description,
          event_date: e.event_date,
          is_all_day: true,
        }));
        const { error } = await supabase.from("temple_events").insert(rows);
        if (error) console.log(`❌ ${error.message.substring(0, 50)}`);
        else { console.log(`✅ ${newEvents.length} new events`); totalEvents += newEvents.length; }
      } else {
        console.log(`${allEvents.length} found, all already imported`);
      }
    }
    await sleep(500);
  }

  console.log(`\n  Total new temple events scraped: ${totalEvents}`);
}

async function scrapeCommunity() {
  console.log("\n🏛️ Scraping community org websites for events...\n");

  const { data: orgs } = await supabase.from("community_networking").select("id, name, website, url");
  const withUrl = orgs.filter(o => (o.website || o.url)?.startsWith("http"));
  console.log(`  ${withUrl.length} orgs have website URLs\n`);

  let totalEvents = 0;
  for (const org of withUrl) {
    const siteUrl = org.website || org.url;
    process.stdout.write(`  ${org.name}: `);

    const html = await fetchPage(siteUrl);
    if (!html) { console.log("❌ unreachable"); await sleep(500); continue; }

    const eventLinks = findEventLinks(html, siteUrl);
    let allEvents = extractEvents(html, siteUrl);

    for (const link of eventLinks) {
      const subHtml = await fetchPage(link);
      if (subHtml) allEvents.push(...extractEvents(subHtml, link));
      await sleep(300);
    }

    const seen = new Set();
    allEvents = allEvents.filter(e => {
      const key = `${e.event_date}-${e.event_name.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (allEvents.length === 0) {
      console.log(`no events found (checked ${eventLinks.length + 1} pages)`);
    } else {
      const { data: existing } = await supabase.from("community_events").select("event_name, event_date").eq("org_id", org.id);
      const existingKeys = new Set((existing || []).map(e => `${e.event_date}-${e.event_name.toLowerCase()}`));
      const newEvents = allEvents.filter(e => !existingKeys.has(`${e.event_date}-${e.event_name.toLowerCase()}`));

      if (newEvents.length > 0) {
        const rows = newEvents.map(e => ({
          org_id: org.id,
          event_name: e.event_name,
          event_description: e.event_description,
          event_date: e.event_date,
          is_all_day: true,
        }));
        const { error } = await supabase.from("community_events").insert(rows);
        if (error) console.log(`❌ ${error.message.substring(0, 50)}`);
        else { console.log(`✅ ${newEvents.length} new events`); totalEvents += newEvents.length; }
      } else {
        console.log(`${allEvents.length} found, all already imported`);
      }
    }
    await sleep(500);
  }

  console.log(`\n  Total new community events scraped: ${totalEvents}`);
}

async function main() {
  console.log("🔍 Event Scraper — fetching real events from websites");
  console.log("═══════════════════════════════════════════════════\n");

  await scrapeTemples();
  await scrapeCommunity();

  const { count: tc } = await supabase.from("temple_events").select("*", { count: "exact", head: true });
  const { count: cc } = await supabase.from("community_events").select("*", { count: "exact", head: true });
  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`📊 Total: ${tc} temple events, ${cc} community events`);
  console.log(`═══════════════════════════════════════════════════\n`);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
