import { SITE_URL } from "@/lib/seo-metadata";

/** IndexNow key (also hosted at /{key}.txt for Bing ownership verification). */
export const INDEXNOW_KEY = "23b1cb69c66945b9b87d41c32ed6dc7d";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** High-priority URLs to notify Bing about after SEO/content updates. */
export const INDEXNOW_PRIORITY_PATHS = [
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
] as const;

function toAbsoluteUrls(paths: string[]): string[] {
  const base = SITE_URL.replace(/\/$/, "");
  const seen = new Set<string>();
  const urls: string[] = [];

  for (const path of paths) {
    const normalized = path.startsWith("http")
      ? path
      : `${base}${path.startsWith("/") ? path : `/${path}`}`;
    if (!seen.has(normalized)) {
      seen.add(normalized);
      urls.push(normalized);
    }
  }

  return urls;
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: number;
  body: string;
};

/**
 * Notify Bing (and other IndexNow engines) that URLs were created/updated.
 * Does not guarantee indexing — only queues a crawl.
 */
export async function submitToIndexNow(
  paths: string[] = [...INDEXNOW_PRIORITY_PATHS]
): Promise<IndexNowResult> {
  const host = new URL(SITE_URL).host;
  const urlList = toAbsoluteUrls(paths);

  if (urlList.length === 0) {
    return { ok: false, status: 400, submitted: 0, body: "No URLs to submit" };
  }

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL.replace(/\/$/, "")}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await response.text();

  return {
    ok: response.ok || response.status === 202,
    status: response.status,
    submitted: urlList.length,
    body: body || response.statusText,
  };
}
