/**
 * API Route: Update Mortgage Rates
 * 
 * Called by Vercel Cron to fetch latest rates from OBMMI
 * and store them in Upstash Redis.
 * 
 * POST /api/rates/update
 * 
 * Security: Protected by CRON_SECRET header
 */

import { NextResponse } from "next/server";
import { updateRatesFromOBMMI, getStaticRates } from "@/lib/rates-service";

export const runtime = "edge"; // Use edge runtime for faster cold starts
export const dynamic = "force-dynamic"; // Never cache this route

export async function POST(request: Request) {
  // Verify the request is from Vercel Cron or has valid secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // In production, require the secret
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    console.log("Starting rate update from OBMMI...");
    
    const rates = await updateRatesFromOBMMI();

    if (rates) {
      return NextResponse.json({
        success: true,
        rates,
        message: "Rates updated successfully from OBMMI",
      });
    } else {
      // Fetch failed, return static rates info
      const staticRates = getStaticRates();
      return NextResponse.json({
        success: false,
        rates: staticRates,
        message: "OBMMI fetch failed, using static fallback rates",
      });
    }
  } catch (error) {
    console.error("Rate update error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Rate update failed",
      },
      { status: 500 }
    );
  }
}

// Also allow GET for manual testing (with auth)
export async function GET(request: Request) {
  return POST(request);
}

