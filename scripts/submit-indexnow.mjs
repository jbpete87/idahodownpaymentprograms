/**
 * Submit priority (or custom) URLs to IndexNow / Bing.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs /programs /first-time-home-buyer
 *
 * Requires the key file to be live:
 *   https://www.idahodownpaymentprograms.com/23b1cb69c66945b9b87d41c32ed6dc7d.txt
 */

const KEY = "23b1cb69c66945b9b87d41c32ed6dc7d";
const HOST = "www.idahodownpaymentprograms.com";
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

const DEFAULT_PATHS = [
  "/",
  "/programs",
  "/guide",
  "/first-time-home-buyer",
  "/quiz",
  "/calculator",
  "/income-limits",
  "/locations",
  "/locations/boise",
  "/locations/meridian",
  "/locations/nampa",
  "/locations/idaho-falls",
  "/locations/coeur-d-alene",
  "/programs/ihfa-dpa",
  "/programs/ihfa-first-loan",
  "/programs/idaho-heroes",
  "/programs/boise-city",
  "/programs/treasure-valley",
  "/programs/autumn-gold",
  "/first-time-homebuyer-class",
];

const paths = process.argv.slice(2);
const urlList = (paths.length ? paths : DEFAULT_PATHS).map((p) =>
  p.startsWith("http") ? p : `${BASE}${p.startsWith("/") ? p : `/${p}`}`
);

async function main() {
  console.log(`Checking key file: ${KEY_LOCATION}`);
  const keyRes = await fetch(KEY_LOCATION);
  if (!keyRes.ok) {
    console.error(
      `Key file not reachable (${keyRes.status}). Deploy public/${KEY}.txt first, then re-run.`
    );
    process.exit(1);
  }
  const keyBody = (await keyRes.text()).trim();
  if (keyBody !== KEY) {
    console.error("Key file contents do not match expected key.");
    process.exit(1);
  }
  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const text = await res.text();
  console.log(`Status: ${res.status}`);
  if (text) console.log(text);

  if (!(res.ok || res.status === 202)) {
    process.exit(1);
  }
  console.log("Done. Bing should queue these for crawl (often within hours).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
