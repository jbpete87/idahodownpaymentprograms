/**
 * API Route: Get Current Mortgage Rates
 * 
 * Returns the current mortgage rates from cache or static fallback.
 * Used by the calculator to display current rates.
 * 
 * GET /api/rates
 */

import { NextResponse } from "next/server";
import { getCurrentRates } from "@/lib/rates-service";

export const runtime = "edge"; // Use edge runtime for faster response
export const revalidate = 3600; // Cache response for 1 hour

export async function GET() {
  try {
    const rates = await getCurrentRates();

    return NextResponse.json({
      success: true,
      rates,
    }, {
      headers: {
        // Allow caching for 1 hour
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching rates:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

