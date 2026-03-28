#!/usr/bin/env node
/**
 * convert-sql.js
 *
 * Reads deep-research.sql, maps columns to the production Supabase schema,
 * deduplicates against existing rows, and writes import-ready.sql.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const INPUT  = '/Users/vishalbvs/Downloads/deep-research.sql';
const OUTPUT = '/Users/vishalbvs/Downloads/import-ready.sql';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ---------------------------------------------------------------------------
// SQL value parser – handles quoted strings (with escaped quotes), NULL, numbers
// ---------------------------------------------------------------------------

function parseValueList(valuesStr) {
  const vals = [];
  let i = 0;
  const s = valuesStr.trim();

  while (i < s.length) {
    // skip whitespace / commas
    while (i < s.length && (s[i] === ' ' || s[i] === ',' || s[i] === '\t' || s[i] === '\n' || s[i] === '\r')) i++;
    if (i >= s.length) break;

    if (s[i] === "'") {
      // quoted string
      i++; // skip opening quote
      let val = '';
      while (i < s.length) {
        if (s[i] === "'" && i + 1 < s.length && s[i + 1] === "'") {
          val += "'";
          i += 2;
        } else if (s[i] === "'") {
          i++; // skip closing quote
          break;
        } else {
          val += s[i];
          i++;
        }
      }
      vals.push(val);
    } else if (s.substring(i, i + 4).toUpperCase() === 'NULL') {
      vals.push(null);
      i += 4;
    } else {
      // number or other literal
      let val = '';
      while (i < s.length && s[i] !== ',' && s[i] !== ')') {
        val += s[i];
        i++;
      }
      vals.push(val.trim());
    }
  }
  return vals;
}

// ---------------------------------------------------------------------------
// Parse all INSERT blocks from the SQL file
// Returns: [{ table, columns: [...], rows: [[...], ...] }, ...]
// ---------------------------------------------------------------------------

function parseInserts(sql) {
  const blocks = [];

  // Regex to capture INSERT INTO table (cols) VALUES  ... ;
  // We use a manual approach because VALUES span many lines with comments.
  const insertRe = /INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*/gi;
  let match;

  while ((match = insertRe.exec(sql)) !== null) {
    const table = match[1];
    const columns = match[2].split(',').map(c => c.trim());
    const startIdx = match.index + match[0].length;

    // Find the terminating semicolon for this INSERT block
    let endIdx = sql.indexOf(';', startIdx);
    if (endIdx === -1) endIdx = sql.length;

    const body = sql.substring(startIdx, endIdx);

    // Extract rows: split on top-level ),(  while respecting quoted strings
    const rows = [];
    // Remove comment lines from body
    const cleanBody = body.split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');

    // Find each (...) tuple
    let depth = 0;
    let tupleStart = -1;
    for (let ci = 0; ci < cleanBody.length; ci++) {
      const ch = cleanBody[ci];
      if (ch === '(' && depth === 0) {
        depth = 1;
        tupleStart = ci + 1;
      } else if (ch === '(' && depth > 0) {
        depth++;
      } else if (ch === ')' && depth > 1) {
        depth--;
      } else if (ch === ')' && depth === 1) {
        depth = 0;
        const tupleStr = cleanBody.substring(tupleStart, ci);
        const vals = parseValueList(tupleStr);
        if (vals.length > 0) {
          rows.push(vals);
        }
      } else if (ch === "'" && depth > 0) {
        // skip inside string
        ci++;
        while (ci < cleanBody.length) {
          if (cleanBody[ci] === "'" && ci + 1 < cleanBody.length && cleanBody[ci + 1] === "'") {
            ci += 2;
            continue;
          }
          if (cleanBody[ci] === "'") break;
          ci++;
        }
      }
    }

    blocks.push({ table, columns, rows });
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Escape a string for SQL single-quote context
// ---------------------------------------------------------------------------
function sqlEsc(s) {
  if (s === null || s === undefined) return 'NULL';
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function pgArray(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  const items = arr.map(v => '"' + String(v).replace(/"/g, '\\"') + '"');
  return "'{" + items.join(',') + "}'";
}

// ---------------------------------------------------------------------------
// Transform a parsed block into output INSERT lines
// ---------------------------------------------------------------------------

function transformBlock(block) {
  const { table, columns, rows } = block;

  switch (table) {
    case 'restaurants':
      return rows.map(r => {
        // Input: name, city, cuisine_type, subcategory, phone, website, description
        const obj = mapCols(columns, r);
        const subcats = splitToArray(obj.cuisine_type);
        return {
          table: 'restaurants',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'groceries':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        const subcats = splitToArray(obj.subcategory);
        return {
          table: 'groceries',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'temples':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        const subcats = [obj.religion, obj.denomination].filter(Boolean);
        return {
          table: 'temples',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'wedding_vendors':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        const subcats = splitToArray(obj.vendor_type);
        return {
          table: 'wedding_vendors',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'event_halls':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        let desc = obj.description || '';
        if (obj.capacity) desc = `Capacity: ${obj.capacity}. ${desc}`;
        return {
          table: 'event_halls',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", description, metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, '{}', ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(desc)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'professionals':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        // Build enriched desc
        let desc = obj.description || '';
        const extras = [];
        if (obj.practice_name) extras.push(`Practice: ${obj.practice_name}`);
        if (obj.profession_type) extras.push(`Type: ${obj.profession_type}`);
        if (obj.languages) extras.push(`Languages: ${obj.languages}`);
        if (extras.length) desc = extras.join('. ') + '. ' + desc;
        return {
          table: 'professionals',
          name: obj.full_name,
          cols: '(name, title, city, specialty, phone, url, "desc", featured, metro)',
          vals: `(${sqlEsc(obj.full_name)}, ${sqlEsc(obj.title)}, ${sqlEsc(obj.city)}, ${sqlEsc(obj.specialty)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(desc)}, false, 'detroit')`
        };
      });

    case 'kids':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        const subcats = splitToArray(obj.program_type);
        return {
          table: 'kids',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'beauty_brands':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        const subcats = splitToArray(obj.service_type);
        return {
          table: 'beauty_brands',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'health_wellness':
      return rows.map(r => {
        // Handle rows with extra columns (therapists: 9 values)
        // Standard: name, city, service_type, phone, website, description
        // Therapist: name, title, practice_name, city, service_type, phone, website, languages, description
        let obj;
        if (r.length > columns.length) {
          // Therapist row with extra fields
          obj = {
            name: r[0],
            city: r[3],
            service_type: r[4],
            phone: r[5],
            website: r[6],
            description: r[8] || r[r.length - 1]
          };
          // Include extra info in description
          const extras = [];
          if (r[1]) extras.push(r[1]); // title
          if (r[2]) extras.push(`Practice: ${r[2]}`); // practice_name
          if (r[7]) extras.push(`Languages: ${r[7]}`); // languages
          if (extras.length) {
            obj.description = extras.join('. ') + '. ' + (obj.description || '');
          }
        } else {
          obj = mapCols(columns, r);
        }
        const subcats = splitToArray(obj.service_type);
        return {
          table: 'health_wellness',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    case 'community_networking':
      return rows.map(r => {
        const obj = mapCols(columns, r);
        const subcats = splitToArray(obj.org_type);
        return {
          table: 'community_networking',
          name: obj.name,
          cols: '(name, city, subcategories, phone, url, "desc", metro, badges)',
          vals: `(${sqlEsc(obj.name)}, ${sqlEsc(obj.city)}, ${pgArray(subcats)}, ${sqlEsc(obj.phone)}, ${sqlEsc(obj.website)}, ${sqlEsc(obj.description)}, 'detroit', '{}')`
        };
      });

    default:
      console.warn(`  [WARN] Unknown table: ${table}, skipping`);
      return [];
  }
}

function mapCols(columns, values) {
  const obj = {};
  columns.forEach((col, i) => {
    obj[col] = i < values.length ? values[i] : null;
  });
  return obj;
}

function splitToArray(val) {
  if (!val) return [];
  return val.split(',').map(s => s.trim()).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Reading input SQL...');
  const sql = fs.readFileSync(INPUT, 'utf-8');

  console.log('Parsing INSERT blocks...');
  const blocks = parseInserts(sql);
  console.log(`Found ${blocks.length} INSERT blocks`);
  for (const b of blocks) {
    console.log(`  ${b.table}: ${b.rows.length} rows (${b.columns.length} cols)`);
  }

  // Fetch existing names from Supabase for deduplication
  console.log('\nFetching existing data from Supabase for deduplication...');
  const tables = ['restaurants', 'groceries', 'temples', 'wedding_vendors',
    'event_halls', 'professionals', 'kids', 'beauty_brands',
    'health_wellness', 'community_networking'];

  const existingNames = {};
  for (const t of tables) {
    const nameCol = t === 'professionals' ? 'name' : 'name';
    const { data, error } = await supabase.from(t).select(nameCol);
    if (error) {
      console.warn(`  [WARN] Could not fetch ${t}: ${error.message}`);
      existingNames[t] = new Set();
    } else {
      existingNames[t] = new Set((data || []).map(r => (r[nameCol] || '').toLowerCase()));
      console.log(`  ${t}: ${existingNames[t].size} existing rows`);
    }
  }

  // Transform and deduplicate
  console.log('\nTransforming and deduplicating...');
  const outputLines = [];
  const stats = {};

  for (const block of blocks) {
    const transformed = transformBlock(block);
    if (transformed.length === 0) continue;

    const tableName = transformed[0].table;
    if (!stats[tableName]) stats[tableName] = { total: 0, skipped: 0, included: 0 };

    const existing = existingNames[tableName] || new Set();
    const inserts = [];

    for (const row of transformed) {
      stats[tableName].total++;
      const nameLC = (row.name || '').toLowerCase();
      if (existing.has(nameLC)) {
        stats[tableName].skipped++;
        continue;
      }
      stats[tableName].included++;
      // Add to existing set so later dupes within the same file are caught
      existing.add(nameLC);
      inserts.push(`INSERT INTO ${tableName} ${row.cols} VALUES ${row.vals};`);
    }

    if (inserts.length > 0) {
      outputLines.push(`\n-- ============================================================`);
      outputLines.push(`-- ${tableName.toUpperCase()} (${inserts.length} new rows)`);
      outputLines.push(`-- ============================================================`);
      outputLines.push(...inserts);
    }
  }

  // Write output
  const header = `-- import-ready.sql\n-- Generated: ${new Date().toISOString()}\n-- Deduplicated against existing Supabase data\n`;
  fs.writeFileSync(OUTPUT, header + outputLines.join('\n') + '\n', 'utf-8');

  // Report
  console.log('\n=== RESULTS ===');
  let totalIncluded = 0, totalSkipped = 0;
  for (const [table, s] of Object.entries(stats)) {
    console.log(`  ${table}: ${s.included} included, ${s.skipped} skipped (of ${s.total} total)`);
    totalIncluded += s.included;
    totalSkipped += s.skipped;
  }
  console.log(`\n  TOTAL: ${totalIncluded} included, ${totalSkipped} skipped`);
  console.log(`\nOutput written to: ${OUTPUT}`);
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
