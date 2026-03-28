#!/usr/bin/env node
/**
 * fix-descriptions.js
 *
 * 1. Shortens long descriptions/bios (>80 chars) to punchy one-liners
 * 2. Fills in empty subcategories based on description content
 *
 * Idempotent: running twice produces the same result.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Description shortening ──────────────────────────────────────────────────

/**
 * Shorten a professional's bio.
 * Input pattern: "Practice: X. Type: Doctor. Languages: A, B, C. Some description"
 * Output: "[specialty]. [non-English languages]"
 */
function shortenProfessionalBio(bio) {
  if (!bio || bio.length <= 80) return null;

  // Extract languages
  const langMatch = bio.match(/Languages?:\s*([^.]+)/i);
  let languages = [];
  if (langMatch) {
    languages = langMatch[1]
      .split(',')
      .map(l => l.trim())
      .filter(l => l.toLowerCase() !== 'english');
  }

  // Extract the "tail" description after all the prefix fields
  // Remove "Practice: ...", "Type: ...", "Languages: ..." prefixes
  let desc = bio;
  desc = desc.replace(/Practice:\s*[^.]+\.\s*/gi, '');
  desc = desc.replace(/Type:\s*[^.]+\.\s*/gi, '');
  desc = desc.replace(/Languages?:\s*[^.]+\.\s*/gi, '');
  desc = desc.trim();

  // Clean up the description part
  desc = desc.replace(/\s+serving\s+.*$/i, '');
  desc = desc.replace(/\s+at\s+.*$/i, '');
  desc = desc.replace(/\s+in\s+metro\s+Detroit.*$/i, '');
  desc = desc.replace(/\s+serving\s+the\s+community.*$/i, '');

  if (!desc) desc = 'Doctor';

  let result = desc;
  if (languages.length > 0) {
    result += '. ' + languages.join(', ');
  }

  // If still too long, truncate languages list
  if (result.length > 80 && languages.length > 2) {
    result = desc + '. ' + languages.slice(0, 2).join(', ');
  }

  // Final safety: if still over 80, just trim desc further
  if (result.length > 80) {
    // Try to cut at a natural break
    const short = desc.substring(0, 50).replace(/\s+\S*$/, '');
    result = short;
    if (languages.length > 0) {
      result += '. ' + languages.slice(0, 2).join(', ');
    }
  }

  return result.length < bio.length ? result : null;
}

/**
 * Shorten a generic description to under 80 chars.
 */
function shortenDescription(desc) {
  if (!desc || desc.length <= 80) return null;

  let s = desc;

  // Drop common filler phrases
  const fillers = [
    /,?\s*serving the\s+\w+\s+community/gi,
    /,?\s*serving\s+the\s+community/gi,
    /,?\s*in\s+metro\s+Detroit\s+area?/gi,
    /,?\s*in\s+metro\s+Detroit/gi,
    /,?\s*specializing\s+in\s+/gi,
    /\s*The architecture alone is worth a visit[^.]*\./gi,
    /\s*people drive in from across the state\./gi,
    /\s*and the \w+ community programming runs deep\./gi,
    /\s*and the weekend programming keeps families connected\./gi,
    /\.\s*The\s+.*$/g, // Cut after first sentence if there's a second
    /\s+—\s+.*$/g, // Cut after em-dash clause
    /\s+that handles everything from.*$/gi,
    /\s+that does everything well.*$/gi,
    /\s+without trying to be fancy.*$/gi,
    /\.\s+One of the few.*$/gi,
    /\.\s+The kind of place.*$/gi,
    /\.\s+Running since.*$/gi,
  ];

  for (const f of fillers) {
    s = s.replace(f, '');
  }

  // "Ornate Swaminarayan tradition temple in Canton" → keep
  // Drop "tradition" if it doesn't add info
  s = s.replace(/\s+tradition\s+/g, ' ');

  // "Bengali community home in Warren" → keep as is if short enough
  s = s.trim().replace(/\s+/g, ' ');

  if (s.length <= 80) return s;

  // If still too long, try to cut intelligently
  // First: cut at sentence boundary (period) before 80
  const cut = s.substring(0, 80);
  const lastPeriod = cut.lastIndexOf('.');
  if (lastPeriod > 30) {
    s = s.substring(0, lastPeriod).trim();
  } else {
    // Try cutting at a natural phrase boundary (comma, dash, semicolon)
    const lastComma = cut.lastIndexOf(',');
    const lastDash = cut.lastIndexOf(' — ');
    const lastSemi = cut.lastIndexOf(';');
    const breakAt = Math.max(lastComma, lastDash, lastSemi);
    if (breakAt > 30) {
      s = s.substring(0, breakAt).trim();
    } else {
      // Cut at last word boundary before 78 chars to avoid mid-word cuts
      s = s.substring(0, 78).replace(/\s+\S*$/, '').trim();
    }
  }

  return s.length < desc.length ? s : null;
}

// ── Subcategory inference ───────────────────────────────────────────────────

const SUBCATEGORY_RULES = {
  restaurants: [
    'North Indian', 'South Indian', 'Telugu', 'Tamil', 'Biryani', 'Indo-Chinese',
    'Mughlai', 'Gujarati', 'Punjabi', 'Bengali', 'Kerala', 'Hyderabadi',
    'Street Food', 'Chaat', 'Dosa', 'Vegetarian', 'Vegan', 'Pakistani',
    'Bangladeshi', 'Nepali', 'Sri Lankan', 'Fast Food', 'Fine Dining',
    'Buffet', 'Catering', 'Sweets', 'Bakery', 'Halal',
  ],
  groceries: [
    'Indian Grocery', 'Halal', 'Bangladeshi', 'Pakistani', 'South Indian',
    'Gujarati', 'Spices', 'Sweets', 'Organic', 'Frozen Foods',
    'Middle Eastern', 'Pan-Asian',
  ],
  temples: [
    'Hindu', 'Sikh', 'Muslim', 'Jain', 'Buddhist', 'Christian',
    'Swaminarayan', 'ISKCON', 'Tamil', 'Telugu', 'Bengali', 'Gujarati',
    'Punjabi', 'Malayalam', 'Kannada', 'Marathi',
  ],
  wedding_vendors: [
    'Photographer', 'DJ', 'Mehndi', 'Decorator', 'Florist', 'Caterer',
    'Makeup Artist', 'Wedding Planner', 'Videographer', 'Mandap',
    'Priest', 'Bridal', 'Jeweler', 'Invitation', 'Choreographer',
    'Sangeet', 'Henna', 'Cinematographer', 'Photo Booth',
  ],
  event_halls: [
    'Banquet Hall', 'Hotel', 'Temple Hall', 'Country Club', 'Convention Center',
    'Community Center', 'Restaurant Venue', 'Outdoor Venue', 'Garden',
    'Ballroom', 'Conference Center',
  ],
  kids: [
    'Dance', 'Music', 'Language', 'Tutoring', 'Cultural', 'Coding',
    'Art', 'Bharatanatyam', 'Kathak', 'Bollywood Dance', 'Tabla',
    'Hindi', 'Tamil', 'Telugu', 'Sanskrit', 'Carnatic', 'Hindustani',
    'STEM', 'Math', 'Cricket', 'Yoga',
  ],
  beauty_brands: [
    'Threading', 'Henna', 'Salon', 'MedSpa', 'Spa', 'Skincare',
    'Ayurvedic', 'Bridal Makeup', 'Hair', 'Nails', 'Waxing', 'Facial',
  ],
  health_wellness: [
    'Ayurveda', 'Yoga', 'Therapy', 'Homeopathy', 'Acupuncture',
    'Meditation', 'Naturopathy', 'Massage', 'Chiropractic', 'Wellness',
    'Fitness', 'Nutrition', 'Mental Health', 'Physical Therapy',
  ],
  community_networking: [
    'Cultural', 'Professional', 'Student', 'Religious', 'Social',
    'Nonprofit', 'Alumni', 'Women', 'Youth', 'Senior', 'Business',
    'Telugu', 'Tamil', 'Bengali', 'Gujarati', 'Punjabi', 'Marathi',
    'Malayalam', 'Kannada', 'Hindi',
  ],
};

function inferSubcategories(table, row) {
  const rules = SUBCATEGORY_RULES[table];
  if (!rules) return null;

  const text = [row.name, row.description, row.city].filter(Boolean).join(' ').toLowerCase();
  const matches = rules.filter(kw => text.includes(kw.toLowerCase()));

  // For event_halls, also check for specific patterns
  if (table === 'event_halls') {
    const isReligious = text.includes('temple') || text.includes('mandir') ||
                        text.includes('gurdwara') || text.includes('gurudwara') ||
                        text.includes('mosque') || text.includes('masjid') ||
                        text.includes('church') || text.includes('swaminarayan') ||
                        text.includes('jain') || text.includes('sikh') ||
                        text.includes('iskcon') || text.includes('hindu');
    if (isReligious && !matches.includes('Temple Hall')) matches.push('Temple Hall');
    if (text.includes('hotel') && !matches.includes('Hotel')) matches.push('Hotel');
    if (text.includes('country club') && !matches.includes('Country Club')) matches.push('Country Club');
    if (text.includes('conference') && !matches.includes('Conference Center')) matches.push('Conference Center');
    if (text.includes('convention') && !matches.includes('Convention Center')) matches.push('Convention Center');
    if (text.includes('community center') && !matches.includes('Community Center')) matches.push('Community Center');
    if (text.includes('garden') && !matches.includes('Garden')) matches.push('Garden');
    if (text.includes('outdoor') && !matches.includes('Outdoor Venue')) matches.push('Outdoor Venue');
    // Only add Banquet Hall if not a religious hall and nothing else matched
    if (!isReligious && (text.includes('banquet') || text.includes('hall') || text.includes('manor'))) {
      if (!matches.includes('Banquet Hall')) matches.push('Banquet Hall');
    }
    // Default to Banquet Hall if nothing matched
    if (matches.length === 0) matches.push('Banquet Hall');
  }

  // Deduplicate
  return [...new Set(matches)];
}

// ── Main ────────────────────────────────────────────────────────────────────

const TABLES = [
  'restaurants', 'groceries', 'temples', 'wedding_vendors', 'event_halls',
  'kids', 'beauty_brands', 'health_wellness', 'community_networking', 'professionals',
];

async function processTable(table) {
  const descCol = table === 'professionals' ? 'bio' : 'description';
  const hasSubcategories = table !== 'professionals';

  const selectCols = `id, name, city, ${descCol}` + (hasSubcategories ? ', subcategories' : '');
  const { data: rows, error } = await supabase.from(table).select(selectCols);

  if (error) {
    console.error(`  ERROR fetching ${table}:`, error.message);
    return { table, descUpdated: 0, subcatUpdated: 0, errors: 1 };
  }

  let descUpdated = 0;
  let subcatUpdated = 0;

  for (const row of rows) {
    const updates = {};
    const originalDesc = row[descCol];

    // 1. Shorten description
    if (table === 'professionals') {
      const shortened = shortenProfessionalBio(originalDesc);
      if (shortened) {
        updates[descCol] = shortened;
      }
    } else {
      const shortened = shortenDescription(originalDesc);
      if (shortened) {
        updates[descCol] = shortened;
      }
    }

    // 2. Fill empty subcategories
    if (hasSubcategories) {
      const subcats = row.subcategories;
      const isEmpty = !subcats || (Array.isArray(subcats) && subcats.length === 0) ||
                       subcats === '{}' || JSON.stringify(subcats) === '[]';
      if (isEmpty) {
        // Use original description for inference (before shortening)
        const inferred = inferSubcategories(table, {
          name: row.name,
          description: originalDesc,
          city: row.city,
        });
        if (inferred && inferred.length > 0) {
          updates.subcategories = inferred;
        }
      }
    }

    // 3. Apply updates
    if (Object.keys(updates).length > 0) {
      const { error: updateErr } = await supabase
        .from(table)
        .update(updates)
        .eq('id', row.id);

      if (updateErr) {
        console.error(`  ERROR updating ${table}/${row.id} (${row.name}):`, updateErr.message);
      } else {
        if (updates[descCol]) {
          descUpdated++;
          console.log(`  [${table}] ${row.name}: "${originalDesc}" → "${updates[descCol]}"`);
        }
        if (updates.subcategories) {
          subcatUpdated++;
          console.log(`  [${table}] ${row.name}: subcategories → ${JSON.stringify(updates.subcategories)}`);
        }
      }
    }
  }

  return { table, descUpdated, subcatUpdated, errors: 0 };
}

async function main() {
  console.log('fix-descriptions.js — starting\n');

  const results = [];
  for (const table of TABLES) {
    console.log(`Processing ${table}...`);
    const result = await processTable(table);
    results.push(result);
    console.log(`  Done: ${result.descUpdated} descriptions shortened, ${result.subcatUpdated} subcategories filled\n`);
  }

  console.log('=== Summary ===');
  let totalDesc = 0, totalSubcat = 0;
  for (const r of results) {
    console.log(`  ${r.table}: ${r.descUpdated} desc, ${r.subcatUpdated} subcats`);
    totalDesc += r.descUpdated;
    totalSubcat += r.subcatUpdated;
  }
  console.log(`\nTotal: ${totalDesc} descriptions shortened, ${totalSubcat} subcategories filled`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
