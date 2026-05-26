/**
 * Mortgage Calculator Configuration
 * 
 * All rate data in one file for easy updates.
 * Interest rates sourced from Optimal Blue OBMMI (https://www2.optimalblue.com/obmmi)
 */

// ========================================
// INTEREST RATES (from Optimal Blue OBMMI)
// ========================================
/**
 * Rates from OBMMI as of Feb 13, 2026.
 * These reflect average locked rates which include approximately
 * 1 discount point — common in the current market where sellers
 * are frequently covering this cost via concessions.
 */
export const RATES_LAST_UPDATED = "2026-02-13";

export const INTEREST_RATES = {
  /** 30-Yr Conforming index rate */
  conventional: 5.976,
  /** 30-Yr FHA index rate */
  fha: 5.900,
  /** 30-Yr VA index rate */
  va: 5.589,
} as const;

/**
 * Conventional rates by credit score for LTV > 80% (i.e. < 20% down).
 * Since first-time buyers typically put 3-5% down, these are the
 * most applicable rates from OBMMI.
 *
 * OBMMI Feb 13, 2026 — 30-Yr Conforming, LTV > 80%:
 */
export const CONVENTIONAL_RATES_BY_CREDIT: Record<string, number> = {
  "740+": 5.984,
  "720-739": 6.089,
  "700-719": 6.141,
  "680-699": 6.266,
  "<680": 6.287,
};

// ========================================
// LOAN TYPE CONFIGURATIONS
// ========================================
export type LoanType = "conventional" | "fha" | "va";

export interface LoanTypeConfig {
  label: string;
  shortLabel: string;
  minDownPaymentPercent: number;
  minCreditScore: number;
  interestRate: number;
  // For FHA: upfront MIP financed into loan (1.75%)
  upfrontFeePct: number;
  description: string;
  color: string;
}

export const LOAN_TYPES: Record<LoanType, LoanTypeConfig> = {
  conventional: {
    label: "Conventional",
    shortLabel: "Conv",
    minDownPaymentPercent: 3,
    minCreditScore: 620,
    interestRate: INTEREST_RATES.conventional,
    upfrontFeePct: 0,
    description: "3% down, best rates with 740+ credit",
    color: "#3B82F6", // blue
  },
  fha: {
    label: "FHA",
    shortLabel: "FHA",
    minDownPaymentPercent: 3.5,
    minCreditScore: 580,
    interestRate: INTEREST_RATES.fha,
    upfrontFeePct: 1.75, // UFMIP financed into loan
    description: "3.5% down, flexible credit requirements",
    color: "#10B981", // green
  },
  va: {
    label: "VA",
    shortLabel: "VA",
    minDownPaymentPercent: 0,
    minCreditScore: 580,
    interestRate: INTEREST_RATES.va,
    upfrontFeePct: 2.15, // VA funding fee (first use, 0% down)
    description: "0% down for eligible veterans",
    color: "#8B5CF6", // purple
  },
};

// ========================================
// HOME TYPE CONFIGURATIONS
// ========================================
export type HomeType = "single_family" | "townhome" | "condo";

export interface HomeTypeConfig {
  label: string;
  description: string;
  /** Monthly HOA fee average for this home type */
  defaultHOA: number;
  /** Property tax rate multiplier (1.0 = baseline single family) */
  propertyTaxMultiplier: number;
  icon: string;
}

/**
 * Home type configurations for Idaho market.
 * 
 * HOA fees based on Treasure Valley averages:
 * - Single family: Most don't have HOAs ($0 default)
 * - Townhome: $100-150/mo typical ($125 default)
 * - Condo: $200-300/mo typical ($250 default)
 * 
 * Property tax adjustments account for:
 * - Townhomes: ~10% lower (smaller lots, shared walls)
 * - Condos: ~20% lower (shared building, smaller footprint)
 */
export const HOME_TYPES: Record<HomeType, HomeTypeConfig> = {
  single_family: {
    label: "Single Family",
    description: "Detached home with private lot",
    defaultHOA: 0,
    propertyTaxMultiplier: 1.0,
    icon: "🏠",
  },
  townhome: {
    label: "Townhome",
    description: "Attached home, shared walls",
    defaultHOA: 125,
    propertyTaxMultiplier: 0.90, // ~10% lower
    icon: "🏘️",
  },
  condo: {
    label: "Condo",
    description: "Unit in shared building",
    defaultHOA: 250,
    propertyTaxMultiplier: 0.80, // ~20% lower
    icon: "🏢",
  },
};

export const HOME_TYPE_OPTIONS = [
  { value: "single_family" as HomeType, label: "🏠 Single Family", description: "Detached home" },
  { value: "townhome" as HomeType, label: "🏘️ Townhome", description: "$125/mo HOA avg" },
  { value: "condo" as HomeType, label: "🏢 Condo", description: "$250/mo HOA avg" },
];

// ========================================
// IDAHO-SPECIFIC DEFAULTS
// ========================================

/**
 * Idaho effective property tax rate for primary residences (single family baseline).
 * Idaho's average effective rate is approximately 0.62% of market value.
 */
export const IDAHO_PROPERTY_TAX_RATE = 0.0062;

/**
 * Idaho homeowners insurance rate as a percentage of home value.
 * ~0.35% annually, which works out to ~$1,400/yr on a $400k home.
 */
export const IDAHO_INSURANCE_RATE = 0.0035;

/** @deprecated Use IDAHO_PROPERTY_TAX_RATE */
export const UTAH_PROPERTY_TAX_RATE = IDAHO_PROPERTY_TAX_RATE;

/** @deprecated Use IDAHO_INSURANCE_RATE */
export const UTAH_INSURANCE_RATE = IDAHO_INSURANCE_RATE;

// ========================================
// DTI RATIO LIMITS
// ========================================

/** Max front-end DTI (housing payment / gross monthly income) */
export const MAX_FRONT_END_DTI = 0.47;

/** Max back-end DTI (total debts / gross monthly income) */
export const MAX_BACK_END_DTI = 0.50;

// ========================================
// MORTGAGE INSURANCE RATES
// ========================================

/**
 * Conventional PMI rates by credit score at ~97% LTV (3% down).
 * These are annual rates as a percentage of the loan amount.
 * Source: Industry-average BPMI rate cards.
 */
export const CONVENTIONAL_PMI_RATES: Record<number, number> = {
  800: 0.30,
  780: 0.32,
  760: 0.41,
  740: 0.53,
  720: 0.66,
  700: 0.80,
  680: 0.95,
  660: 1.19,
  640: 1.40,
  620: 1.65,
  600: 1.90,
};

/**
 * FHA annual MIP rate.
 * For most FHA loans (>15yr term, base loan <= $726,200, LTV > 95%):
 * 0.55% annual MIP for the life of the loan.
 */
export const FHA_ANNUAL_MIP_RATE = 0.0055;

// ========================================
// CREDIT SCORE OPTIONS
// ========================================
export const CREDIT_SCORE_OPTIONS = [
  { value: 800, label: "800" },
  { value: 780, label: "780" },
  { value: 760, label: "760" },
  { value: 740, label: "740" },
  { value: 720, label: "720" },
  { value: 700, label: "700" },
  { value: 680, label: "680" },
  { value: 660, label: "660" },
  { value: 640, label: "640" },
  { value: 620, label: "620" },
  { value: 600, label: "600" },
];

// ========================================
// HOUSEHOLD SIZE OPTIONS (for DPA)
// ========================================
export const HOUSEHOLD_SIZE_OPTIONS = [
  { value: 1, label: "1 person" },
  { value: 2, label: "2 people" },
  { value: 3, label: "3 people" },
  { value: 4, label: "4 people" },
  { value: 5, label: "5 people" },
  { value: 6, label: "6 people" },
  { value: 7, label: "7 people" },
  { value: 8, label: "8+ people" },
];

// ========================================
// DEFAULT LOAN TERM
// ========================================
export const DEFAULT_LOAN_TERM_YEARS = 30;

