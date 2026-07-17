/**
 * POST /api/indexnow
 *
 * Notifies Bing (IndexNow) that priority URLs were updated.
 * Protected by CRON_SECRET when set (same pattern as /api/rates/update).
 *
 * Body (optional JSON):
 *   { "urls": ["/programs", "/first-time-home-buyer"] }
 * Omit body to submit the default priority URL list.
 */

import { NextResponse } from "next/server";
import {
  INDEXNOW_PRIORITY_PATHS,
  submitToIndexNow,
} from "@/lib/indexnow";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let paths: string[] = [...INDEXNOW_PRIORITY_PATHS];

  try {
    const body = (await request.json()) as { urls?: string[] };
    if (Array.isArray(body.urls) && body.urls.length > 0) {
      paths = body.urls.filter((u) => typeof u === "string" && u.length > 0);
    }
  } catch {
    // empty / non-JSON body → use priority list
  }

  try {
    const result = await submitToIndexNow(paths);
    return NextResponse.json(
      {
        success: result.ok,
        status: result.status,
        submitted: result.submitted,
        detail: result.body,
      },
      { status: result.ok ? 200 : 502 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "IndexNow failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
