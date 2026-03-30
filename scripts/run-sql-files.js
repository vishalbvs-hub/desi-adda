require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const SQL_DIR = path.join(__dirname, "sql");

const FILES = [
  "01-schema.sql",
  "02-upserts-part1.sql",
  "02-upserts-part2.sql",
  "02-upserts-part3.sql",
  "02-upserts-part4.sql",
  "03-reviews-part1.sql",
  "03-reviews-part2.sql",
  "03-reviews-part3.sql",
  "03-reviews-part4.sql",
  "03-reviews-part5.sql",
];

// Split SQL into individual statements, respecting quoted strings
function splitStatements(sql) {
  const stmts = [];
  let current = "";
  let inString = false;
  let inDollar = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'" && !inDollar) {
      if (inString && i + 1 < sql.length && sql[i + 1] === "'") {
        current += "''";
        i++;
        continue;
      }
      inString = !inString;
    }
    if (ch === ";" && !inString && !inDollar) {
      const stmt = current.trim();
      if (stmt && !stmt.startsWith("--")) {
        stmts.push(stmt);
      }
      current = "";
      continue;
    }
    current += ch;
  }
  const last = current.trim();
  if (last && !last.startsWith("--")) stmts.push(last);
  return stmts;
}

// Execute a single SQL statement via Supabase's pg_query or rpc
// We'll use the postgrest endpoint to call a helper function
// Actually: just use supabase-js .rpc() — but we need a function.
// Simplest: execute ALTER/CREATE/INSERT via the management API

async function execViaFetch(sql) {
  // Use Supabase's pg-meta SQL endpoint
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/pg/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.substring(0, 300)}`);
  }
  return await res.json();
}

async function main() {
  console.log("🗄️  Running SQL files against Supabase...\n");

  for (const file of FILES) {
    const filePath = path.join(SQL_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${file} not found, skipping`);
      continue;
    }

    const sql = fs.readFileSync(filePath, "utf8");
    const stmts = splitStatements(sql);
    const sizeKB = (sql.length / 1024).toFixed(1);
    console.log(`📄 ${file} (${sizeKB} KB, ${stmts.length} statements)`);

    let success = 0;
    let errors = 0;

    for (let i = 0; i < stmts.length; i++) {
      const stmt = stmts[i];
      // Skip pure comments
      if (stmt.split("\n").every(l => l.trim().startsWith("--") || l.trim() === "")) continue;

      try {
        await execViaFetch(stmt);
        success++;
      } catch (e) {
        errors++;
        // Show first 80 chars of the statement for context
        const preview = stmt.replace(/\n/g, " ").substring(0, 80);
        console.log(`   ❌ Statement ${i + 1}: ${e.message.substring(0, 150)}`);
        console.log(`      ${preview}...`);
      }
    }

    console.log(`   ✅ ${success} succeeded, ${errors} failed\n`);
  }

  // Verify counts
  const { count: rCount } = await supabase.from("restaurants").select("*", { count: "exact", head: true });
  const { count: revCount } = await supabase.from("restaurant_reviews").select("*", { count: "exact", head: true }).catch(() => ({ count: "?" }));
  console.log(`📊 Final counts: ${rCount} restaurants, ${revCount} reviews`);
  console.log("🗄️  All done!");
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
