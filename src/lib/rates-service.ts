/**
 * Mortgage Rates Service
 * 
 * Fetches rates from Optimal Blue OBMMI and caches them in Upstash Redis.
 * Falls back to static rates if Redis is unavailable or rates are stale.
 */

import { Redis } from "@upstash/redis";
import { INTEREST_RATES, RATES_LAST_UPDATED } from "./calculator-config";

// ========================================
// TYPES
// ========================================

export interface MortgageRates {
  conventional: number;
  fha: number;
  va: number;
  lastUpdated: string; // ISO date string
  source: "obmmi" | "static";
}

// ========================================
// REDIS CLIENT (lazy initialization)
// ========================================

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  
  try {
    // Redis.fromEnv() auto-detects UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN
    redis = Redis.fromEnv();
    return redis;
  } catch {
    console.warn("Upstash Redis not configured. Using static rates.");
    return null;
  }
}

// ========================================
// REDIS KEYS
// ========================================

const RATES_KEY = "mortgage_rates";
const RATES_TTL = 60 * 60 * 24 * 2; // 2 days (rates update daily, buffer for weekends)

// ========================================
// STATIC FALLBACK RATES
// ========================================

export function getStaticRates(): MortgageRates {
  return {
    conventional: INTEREST_RATES.conventional,
    fha: INTEREST_RATES.fha,
    va: INTEREST_RATES.va,
    lastUpdated: RATES_LAST_UPDATED,
    source: "static",
  };
}

// ========================================
// GET CURRENT RATES
// ========================================

/**
 * Get the current mortgage rates.
 * Tries Redis first, falls back to static rates if unavailable.
 */
export async function getCurrentRates(): Promise<MortgageRates> {
  try {
    const redisClient = getRedis();
    if (!redisClient) {
      return getStaticRates();
    }

    const cached = await redisClient.get<MortgageRates>(RATES_KEY);
    
    if (cached && isRatesFresh(cached.lastUpdated)) {
      return cached;
    }

    // Rates are stale or missing, return static as fallback
    // (the cron job will update them)
    return getStaticRates();
  } catch (error) {
    console.error("Error fetching rates from Redis:", error);
    return getStaticRates();
  }
}

/**
 * Check if rates are fresh (less than 3 days old).
 */
function isRatesFresh(lastUpdated: string): boolean {
  const updated = new Date(lastUpdated);
  const now = new Date();
  const diffMs = now.getTime() - updated.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays < 3; // Allow for weekends
}

// ========================================
// UPDATE RATES (called by cron)
// ========================================

/**
 * Fetch rates from OBMMI and store in Redis.
 * Returns the new rates or null if fetch failed.
 */
export async function updateRatesFromOBMMI(): Promise<MortgageRates | null> {
  try {
    const rates = await fetchOBMMIRates();
    if (!rates) {
      console.error("Failed to fetch OBMMI rates");
      return null;
    }

    const redisClient = getRedis();
    if (redisClient) {
      await redisClient.set(RATES_KEY, rates, { ex: RATES_TTL });
      console.log("Rates updated in Redis:", rates);
    }

    return rates;
  } catch (error) {
    console.error("Error updating rates:", error);
    return null;
  }
}

// ========================================
// OBMMI SCRAPER
// ========================================

/**
 * OBMMI JSON API endpoint.
 * This is the direct API that powers the OBMMI website.
 */
const OBMMI_API_URL = "https://prd-nc-obmmi-frontdoor-endpoint-cddkegaabwhpa6aa.a01.azurefd.net/api/blob/summaryData.json";

/**
 * OBMMI API response structure
 */
interface OBMMISummaryResponse {
  summary: {
    Conforming30YrFixed: { rate: number; change: number };
    FHA30YrFixed: { rate: number; change: number };
    VA30YrFixed: { rate: number; change: number };
    // FICO breakdowns for LTV > 80% (first-time buyers)
    "Conforming30YearFixedLTVGreaterThan80FICOLessthan680": { rate: number };
    "Conforming30YearFixedLTVGreaterThan80FICOBetween680and699": { rate: number };
    "Conforming30YearFixedLTVGreaterThan80FICOBetween700and719": { rate: number };
    "Conforming30YearFixedLTVGreaterThan80FICOBetween720and739": { rate: number };
    "Conforming30YearFixedLTVGreaterThan80FICOGreaterThanEqualTo740": { rate: number };
  };
  updated: string; // ISO date string
}

/**
 * Fetch rates from Optimal Blue OBMMI JSON API.
 * 
 * This calls the direct API endpoint that powers the OBMMI website,
 * returning clean JSON with all rate indices.
 */
async function fetchOBMMIRates(): Promise<MortgageRates | null> {
  try {
    const response = await fetch(OBMMI_API_URL, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "UtahDPA/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`OBMMI API fetch failed: ${response.status}`);
      return null;
    }

    const data: OBMMISummaryResponse = await response.json();
    
    // Extract the main rates
    const conventionalRate = data.summary.Conforming30YrFixed?.rate;
    const fhaRate = data.summary.FHA30YrFixed?.rate;
    const vaRate = data.summary.VA30YrFixed?.rate;
    
    // Extract the update date (format: "2026-02-13T00:00:00")
    const lastUpdated = data.updated?.split("T")[0] || new Date().toISOString().split("T")[0];

    console.log("OBMMI API rates:", { conventionalRate, fhaRate, vaRate, lastUpdated });

    // Validate we got all rates
    if (!conventionalRate || !fhaRate || !vaRate) {
      console.error("Missing rates in OBMMI response:", data.summary);
      return null;
    }

    // Sanity check: rates should be between 2% and 15%
    const rates = [conventionalRate, fhaRate, vaRate];
    if (rates.some(r => r < 2 || r > 15)) {
      console.error("Rate values out of expected range:", rates);
      return null;
    }

    return {
      conventional: conventionalRate,
      fha: fhaRate,
      va: vaRate,
      lastUpdated,
      source: "obmmi",
    };
  } catch (error) {
    console.error("Error fetching OBMMI API:", error);
    return null;
  }
}

// ========================================
// MANUAL RATE UPDATE (for admin use)
// ========================================

/**
 * Manually set rates in Redis (useful for corrections or manual updates).
 */
export async function setManualRates(rates: Omit<MortgageRates, "source">): Promise<boolean> {
  try {
    const redisClient = getRedis();
    if (!redisClient) {
      console.error("Redis not configured for manual rate update");
      return false;
    }

    const fullRates: MortgageRates = {
      ...rates,
      source: "obmmi", // Mark as official even if manually entered
    };

    await redisClient.set(RATES_KEY, fullRates, { ex: RATES_TTL });
    console.log("Manual rates set:", fullRates);
    return true;
  } catch (error) {
    console.error("Error setting manual rates:", error);
    return false;
  }
}

