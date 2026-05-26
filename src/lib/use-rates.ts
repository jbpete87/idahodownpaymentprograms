"use client";

/**
 * React hook for fetching current mortgage rates.
 * 
 * Fetches rates from /api/rates and falls back to static config if fetch fails.
 * Caches rates in memory to avoid redundant fetches during session.
 */

import { useState, useEffect, useCallback } from "react";
import { INTEREST_RATES, RATES_LAST_UPDATED } from "./calculator-config";

export interface RatesData {
  conventional: number;
  fha: number;
  va: number;
  lastUpdated: string;
  source: "obmmi" | "static";
}

interface UseRatesReturn {
  rates: RatesData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// In-memory cache for rates (persists across component re-renders)
let cachedRates: RatesData | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

// Static fallback rates from config
const STATIC_RATES: RatesData = {
  conventional: INTEREST_RATES.conventional,
  fha: INTEREST_RATES.fha,
  va: INTEREST_RATES.va,
  lastUpdated: RATES_LAST_UPDATED,
  source: "static",
};

export function useRates(): UseRatesReturn {
  const [rates, setRates] = useState<RatesData>(cachedRates || STATIC_RATES);
  const [isLoading, setIsLoading] = useState(!cachedRates);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    // Check if cached rates are still fresh
    if (cachedRates && Date.now() - cacheTimestamp < CACHE_TTL) {
      setRates(cachedRates);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/rates", {
        // Use stale-while-revalidate for better UX
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.rates) {
        const newRates: RatesData = {
          conventional: data.rates.conventional,
          fha: data.rates.fha,
          va: data.rates.va,
          lastUpdated: data.rates.lastUpdated,
          source: data.rates.source,
        };

        // Update cache
        cachedRates = newRates;
        cacheTimestamp = Date.now();

        setRates(newRates);
      } else {
        // API returned but rates not available
        setRates(STATIC_RATES);
      }
    } catch (err) {
      console.error("Failed to fetch rates:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch rates");
      // Fall back to static rates
      setRates(STATIC_RATES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return {
    rates,
    isLoading,
    error,
    refetch: fetchRates,
  };
}

/**
 * Get rates synchronously (for initial render).
 * Returns cached rates if available, otherwise static fallback.
 */
export function getRatesSync(): RatesData {
  if (cachedRates && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedRates;
  }
  return STATIC_RATES;
}

