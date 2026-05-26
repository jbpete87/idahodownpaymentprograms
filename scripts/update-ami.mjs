#!/usr/bin/env node
// @ts-check
/**
 * update-ami.mjs
 *
 * Refresh the AMI_LIMITS export inside src/lib/programs-data.ts using the
 * HUD User API. Designed to be portable between this repo and the
 * utahdownpaymentprograms.com repo (same AMILimit shape).
 *
 * Requirements:
 *   - Node 18+ (uses global fetch)
 *   - HUD_API_TOKEN env var. Get a free token at
 *     https://www.huduser.gov/portal/dataset/fmr-api.html
 *
 * Usage:
 *   HUD_API_TOKEN=xxx node scripts/update-ami.mjs              # default (all UT counties, current FY)
 *   HUD_API_TOKEN=xxx node scripts/update-ami.mjs --year 2026
 *   HUD_API_TOKEN=xxx node scripts/update-ami.mjs --counties "Salt Lake,Utah,Davis,Weber"
 *   HUD_API_TOKEN=xxx node scripts/update-ami.mjs --dry-run    # print, don't write
 *   HUD_API_TOKEN=xxx node scripts/update-ami.mjs --file path/to/programs-data.ts
 *
 * The script:
 *   1. Lists all Utah counties via the HUD listCounties endpoint.
 *   2. For each requested county, fetches il/data/{entityId} for the target year.
 *   3. Builds AMI_LIMITS rows (ami80 from HUD's "low" object; ami100 = round(ami80/0.8); ami120 = round(ami100*1.2)).
 *      Same convention used by current data in this repo.
 *   4. Locates `export const AMI_LIMITS: AMILimit[] = [` ... `];` in the target TS file
 *      and rewrites just that block (everything else is preserved).
 *   5. Writes a .bak alongside the file before any write.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CLI argument parsing -------------------------------------------------

/** @typedef {{ year: number, counties: string[] | "all", dryRun: boolean, file: string, state: string }} Args */

/** @returns {Args} */
function parseArgs() {
  const args = process.argv.slice(2);
  const out = {
    year: new Date().getFullYear(),
    counties: /** @type {string[] | "all"} */ ("all"),
    dryRun: false,
    file: path.resolve(__dirname, "..", "src", "lib", "programs-data.ts"),
    state: "UT",
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--year") out.year = Number(args[++i]);
    else if (arg === "--counties") {
      const v = args[++i];
      out.counties = v.toLowerCase() === "all"
        ? "all"
        : v.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (arg === "--dry-run") out.dryRun = true;
    else if (arg === "--file") out.file = path.resolve(args[++i]);
    else if (arg === "--state") out.state = args[++i].toUpperCase();
    else if (arg === "--help" || arg === "-h") {
      console.log(HELP);
      process.exit(0);
    } else {
      console.error(`Unknown arg: ${arg}`);
      console.error(HELP);
      process.exit(1);
    }
  }
  return out;
}

const HELP = `\
update-ami.mjs — refresh AMI_LIMITS from HUD's API

Flags:
  --year <YYYY>          HUD income-limits year (default: current calendar year)
  --counties <list|all>  Comma-separated county names, or "all" (default: all)
  --state <code>         Two-letter state code (default: UT)
  --file <path>          Path to programs-data.ts (default: ../src/lib/programs-data.ts)
  --dry-run              Print proposed file contents and exit
`;

// --- HUD API ---------------------------------------------------------------

const HUD_BASE = "https://www.huduser.gov/hudapi/public";

/**
 * @param {string} pathAndQuery
 * @param {string} token
 */
async function hudGet(pathAndQuery, token) {
  const url = `${HUD_BASE}${pathAndQuery}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HUD ${pathAndQuery} → ${res.status} ${res.statusText}\n${body}`);
  }
  return res.json();
}

/**
 * @typedef {{ fips_code: string, cntyname?: string, county_name?: string, state_code: string, town_name?: string, category?: string }} HudCounty
 */

/** @returns {Promise<HudCounty[]>} */
async function listCounties(state, year, token) {
  // HUD's listCounties endpoint lives under fmr/ even though it's used for IL queries.
  // The `updated=2025` flag is a one-time FIPS remapping switch (only valid value is 2025;
  // any other year returns 400). Apply it whenever requesting >=2025 data.
  const useUpdated = year >= 2025;
  const path = `/fmr/listCounties/${state}${useUpdated ? "?updated=2025" : ""}`;
  const data = await hudGet(path, token);
  const arr = Array.isArray(data) ? data : data.data || [];
  return arr;
}

/** @typedef {{
 *   median_income: number | string,
 *   low: Record<string, number | string>,
 *   county_name?: string, area_name?: string,
 * }} HudIncomeLimits
 */

/** @returns {Promise<HudIncomeLimits>} */
async function getCountyIL(entityId, year, token) {
  const data = await hudGet(`/il/data/${entityId}?year=${year}`, token);
  return data.data || data;
}

// --- Calculations ---------------------------------------------------------

const num = (v) => (typeof v === "number" ? v : Number(String(v).replace(/[$,\s]/g, "")));

/**
 * Convert a HUD county's "low" (80%) limits into AMILimit rows. ami100 is derived as
 * ami80 / 0.8 (matches the convention used by Provo/Ogden/Davis DPA programs and
 * the existing data in this repo). ami120 = ami100 * 1.2.
 * @param {{ countyName: string, low: Record<string, number | string>, year: number, idStart: number }} args
 */
function rowsForCounty({ countyName, low, year, idStart }) {
  const rows = [];
  for (let p = 1; p <= 8; p++) {
    const ami80 = num(low[`il80_p${p}`]);
    if (!Number.isFinite(ami80) || ami80 <= 0) continue;
    const ami100 = Math.round(ami80 / 0.8);
    const ami120 = Math.round(ami100 * 1.2);
    rows.push({
      id: String(idStart + p - 1),
      county: countyName,
      householdSize: p,
      ami80,
      ami100,
      ami120,
      effectiveYear: year,
    });
  }
  return rows;
}

// --- File rewriting -------------------------------------------------------

/**
 * @param {Array<{ id: string, county: string, householdSize: number, ami80: number, ami100: number, ami120: number, effectiveYear: number }>} rows
 * @param {Record<string, string>} countyComments  county → comment line shown above its rows
 * @param {number} year
 */
function renderAmiBlock(rows, countyComments, year) {
  const groups = new Map();
  for (const r of rows) {
    if (!groups.has(r.county)) groups.set(r.county, []);
    groups.get(r.county).push(r);
  }
  const lines = [];
  lines.push("/**");
  lines.push(` * AMI limits for Utah counties - FY ${year} HUD Income Limits`);
  lines.push(" * Source: https://www.huduser.gov/portal/datasets/il.html (HUD User API)");
  lines.push(" * 80% = HUD Low Income Limit; 100% = round(80% / 0.8); 120% = round(100% * 1.2)");
  lines.push(` * Last updated: ${new Date().toISOString().slice(0, 10)} (via scripts/update-ami.mjs)`);
  lines.push(" */");
  lines.push("export const AMI_LIMITS: AMILimit[] = [");
  let first = true;
  for (const [county, list] of groups) {
    if (!first) lines.push("  ");
    first = false;
    const comment = countyComments[county];
    if (comment) lines.push(`  // ${comment}`);
    for (const r of list) {
      lines.push(
        `  { id: ${JSON.stringify(r.id)}, county: ${JSON.stringify(r.county)}, ` +
          `householdSize: ${r.householdSize}, ami80: ${r.ami80}, ` +
          `ami100: ${r.ami100}, ami120: ${r.ami120}, effectiveYear: ${r.effectiveYear} },`
      );
    }
  }
  lines.push("];");
  return lines.join("\n");
}

/**
 * Replace the AMI_LIMITS block + its leading JSDoc comment in the source file.
 * Preserves everything else (including the rest of PROGRAMS, UTAH_COUNTIES, etc.).
 * @param {string} src
 * @param {string} block
 */
function spliceAmiBlock(src, block) {
  // Anchor the JSDoc match by requiring a JSDoc line that begins with " * AMI limits"
  // (i.e. the AMI_LIMITS-specific comment, not the file-top "Initial program data" one),
  // immediately followed by `export const AMI_LIMITS: AMILimit[] = [ ... ];`.
  const re =
    /\/\*\*\s*\n\s*\*\s*AMI limits[\s\S]*?\*\/\s*export const AMI_LIMITS\s*:\s*AMILimit\[\]\s*=\s*\[[\s\S]*?\n\];\s*/m;
  const match = src.match(re);
  if (!match) {
    throw new Error(
      "Could not locate the existing AMI_LIMITS block. Expected a JSDoc whose first line is\n" +
        "  /**\n   * AMI limits ...\n   */\n" +
        "immediately followed by 'export const AMI_LIMITS: AMILimit[] = [...]'."
    );
  }
  return src.replace(re, block + "\n\n");
}

// --- Main -----------------------------------------------------------------

async function main() {
  const args = parseArgs();
  const token = process.env.HUD_API_TOKEN;
  if (!token) {
    console.error("Error: HUD_API_TOKEN env var is required.");
    console.error("Get a free token at https://www.huduser.gov/portal/dataset/fmr-api.html");
    process.exit(1);
  }

  console.log(`HUD API → state=${args.state} year=${args.year}`);
  const counties = await listCounties(args.state, args.year, token);
  console.log(`  Listed ${counties.length} counties from HUD.`);

  const want = args.counties === "all"
    ? null
    : new Set(args.counties.map((s) => s.toLowerCase()));

  // Friendly comment for each county; falls back to area_name from HUD.
  const countyComments = {};
  const allRows = [];
  let nextId = 1;

  // HUD's listCounties uses `cntyname`; older docs sometimes reference `county_name`.
  const nameOf = (c) => (c.cntyname || c.county_name || "").replace(/\s+County$/, "");

  // Sort selected counties to a stable order: prioritized counties first, then alpha.
  const priority = ["Salt Lake", "Utah", "Davis", "Weber"];
  const ordered = [...counties].sort((a, b) => {
    const cleanA = nameOf(a);
    const cleanB = nameOf(b);
    const ai = priority.indexOf(cleanA);
    const bi = priority.indexOf(cleanB);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return cleanA.localeCompare(cleanB);
  });

  for (const c of ordered) {
    const cleanName = nameOf(c);
    if (want && !want.has(cleanName.toLowerCase())) continue;
    const entityId = c.fips_code || c.entity_id || c.fipsCode;
    if (!entityId) {
      console.warn(`  Skipping ${cleanName}: no entityId returned by HUD.`);
      continue;
    }
    process.stdout.write(`  Fetching ${cleanName} (${entityId})... `);
    const il = await getCountyIL(entityId, args.year, token);
    const rows = rowsForCounty({
      countyName: cleanName,
      low: il.low || {},
      year: args.year,
      idStart: nextId,
    });
    nextId += rows.length;
    if (rows.length === 0) {
      console.log("no rows (HUD returned no 'low' data)");
      continue;
    }
    allRows.push(...rows);
    const median = num(il.median_income);
    countyComments[cleanName] =
      `${cleanName} County${il.area_name ? ` (${il.area_name})` : ""} - FY ${args.year} HUD` +
      (median ? ` (Median Family Income: $${median.toLocaleString()})` : "");
    console.log(`${rows.length} rows`);
  }

  if (allRows.length === 0) {
    console.error("No AMI rows produced. Aborting.");
    process.exit(1);
  }

  const block = renderAmiBlock(allRows, countyComments, args.year);

  const targetPath = args.file;
  const original = await fs.readFile(targetPath, "utf8");
  const updated = spliceAmiBlock(original, block);

  if (args.dryRun) {
    console.log("\n--- DRY RUN: proposed AMI_LIMITS block ---\n");
    console.log(block);
    console.log("\n(File NOT written. Re-run without --dry-run to apply.)");
    return;
  }

  await fs.writeFile(targetPath + ".bak", original, "utf8");
  await fs.writeFile(targetPath, updated, "utf8");
  console.log(`\nWrote ${targetPath}`);
  console.log(`Backup at  ${targetPath}.bak`);
  console.log(`Wrote ${allRows.length} AMI rows for ${Object.keys(countyComments).length} counties.`);
}

main().catch((err) => {
  console.error("\nupdate-ami failed:");
  console.error(err.message || err);
  process.exit(1);
});
