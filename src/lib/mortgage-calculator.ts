/**
 * Mortgage Calculator - Pure calculation functions
 * 
 * Computes max affordable purchase price, monthly payment breakdowns,
 * and DTI ratios for Conventional, FHA, and VA loans.
 */

import {
  type LoanType,
  type HomeType,
  LOAN_TYPES,
  HOME_TYPES,
  UTAH_PROPERTY_TAX_RATE,
  UTAH_INSURANCE_RATE,
  MAX_FRONT_END_DTI,
  MAX_BACK_END_DTI,
  CONVENTIONAL_PMI_RATES,
  CONVENTIONAL_RATES_BY_CREDIT,
  FHA_ANNUAL_MIP_RATE,
  DEFAULT_LOAN_TERM_YEARS,
} from "./calculator-config";

// ========================================
// TYPES
// ========================================

export interface CalculatorInputs {
  grossAnnualIncome: number;
  monthlyDebts: number;
  creditScore: number;
  householdSize: number;
  homeType?: HomeType;
  /** Optional per-loan-type down payment % overrides (null = use minimum) */
  downPaymentOverrides?: Partial<Record<LoanType, number | null>>;
  /** Optional per-loan-type purchase price overrides (null = use max affordable) */
  purchasePriceOverrides?: Partial<Record<LoanType, number | null>>;
  /** Optional rate overrides for dynamic rates from API */
  rateOverrides?: {
    conventional?: number;
    fha?: number;
    va?: number;
  };
}

export interface MonthlyBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  mortgageInsurance: number;
  hoaFees: number;
  totalPayment: number;
}

export interface LoanResult {
  loanType: LoanType;
  label: string;
  color: string;
  maxPurchasePrice: number;
  /** The price used for all breakdown calculations (may be <= maxPurchasePrice) */
  selectedPurchasePrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  minDownPaymentPercent: number;
  baseLoanAmount: number;
  totalLoanAmount: number; // includes financed fees (UFMIP, VA funding fee)
  interestRate: number;
  monthlyBreakdown: MonthlyBreakdown;
  frontEndDTI: number;
  backEndDTI: number;
  meetsMinCreditScore: boolean;
  miRateAnnual: number; // annual MI rate used
}

export interface CalculatorResults {
  inputs: CalculatorInputs;
  maxMonthlyHousingPayment: number;
  grossMonthlyIncome: number;
  loans: LoanResult[];
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calculate the monthly P&I payment factor for a given annual rate and term.
 * Returns the multiplier: multiply by loan amount to get monthly P&I.
 */
function getMonthlyPaymentFactor(annualRate: number, termYears: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;

  if (monthlyRate === 0) return 1 / numPayments;

  return (
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

/**
 * Get the conventional PMI rate for a given credit score.
 * Finds the closest score bracket at or below the given score.
 */
function getConventionalPMIRate(creditScore: number): number {
  const brackets = Object.keys(CONVENTIONAL_PMI_RATES)
    .map(Number)
    .sort((a, b) => b - a);

  for (const bracket of brackets) {
    if (creditScore >= bracket) {
      return CONVENTIONAL_PMI_RATES[bracket] / 100; // convert to decimal
    }
  }

  // Below minimum bracket, use highest rate
  return CONVENTIONAL_PMI_RATES[brackets[brackets.length - 1]] / 100;
}

/**
 * Get the conventional interest rate adjusted for credit score.
 * Uses OBMMI LTV > 80% rates broken out by FICO bucket.
 * Falls back to the base conventional rate if no match.
 */
function getConventionalRateByCredit(creditScore: number): number {
  if (creditScore >= 740) return CONVENTIONAL_RATES_BY_CREDIT["740+"];
  if (creditScore >= 720) return CONVENTIONAL_RATES_BY_CREDIT["720-739"];
  if (creditScore >= 700) return CONVENTIONAL_RATES_BY_CREDIT["700-719"];
  if (creditScore >= 680) return CONVENTIONAL_RATES_BY_CREDIT["680-699"];
  return CONVENTIONAL_RATES_BY_CREDIT["<680"];
}

/**
 * Get the effective interest rate for a loan type, accounting for
 * credit-score-based rate adjustments on conventional loans.
 * 
 * @param rateOverride - Optional rate override from dynamic rates API
 */
function getEffectiveRate(
  loanType: LoanType,
  creditScore: number,
  rateOverride?: number
): number {
  // If we have a rate override and it's for conventional,
  // we still need to apply credit score adjustments
  if (loanType === "conventional") {
    // Credit score adjustment from the base rate
    const baseConvRate = rateOverride ?? LOAN_TYPES.conventional.interestRate;
    const creditAdjustment = getConventionalRateByCredit(creditScore) - LOAN_TYPES.conventional.interestRate;
    return baseConvRate + creditAdjustment;
  }
  
  // For FHA/VA, just use the override or default
  return rateOverride ?? LOAN_TYPES[loanType].interestRate;
}

/**
 * Get annual MI rate for a loan type given credit score.
 */
function getMIRate(loanType: LoanType, creditScore: number): number {
  switch (loanType) {
    case "conventional":
      return getConventionalPMIRate(creditScore);
    case "fha":
      return FHA_ANNUAL_MIP_RATE; // 0.55% regardless of credit
    case "va":
      return 0; // VA has no monthly MI
  }
}

// ========================================
// CORE CALCULATION
// ========================================

/**
 * Calculate the maximum affordable housing payment.
 * 
 * This is the lesser of:
 * 1. 47% of gross monthly income (front-end DTI)
 * 2. 50% of gross monthly income minus existing debts (back-end DTI constraint)
 */
export function calculateMaxHousingPayment(
  grossAnnualIncome: number,
  monthlyDebts: number
): number {
  const grossMonthly = grossAnnualIncome / 12;
  const frontEndMax = grossMonthly * MAX_FRONT_END_DTI;
  const backEndMax = grossMonthly * MAX_BACK_END_DTI - monthlyDebts;

  return Math.max(0, Math.min(frontEndMax, backEndMax));
}

/**
 * Reverse-solve for max purchase price given a max housing payment.
 * 
 * Total Payment = Loan * M + P * taxRate/12 + P * insuranceRate/12 + Loan * miRate/12 + HOA
 * 
 * Where:
 *   Loan = P * (1 - downPct) * (1 + upfrontFeePct)
 *   M = monthly P&I factor
 *   HOA = fixed monthly HOA fee based on home type
 *   
 * Solving for P:
 *   P = (maxPayment - HOA) / 
 *       [(1-downPct)*(1+upfrontFeePct)*M + taxRate/12 + insuranceRate/12 + (1-downPct)*(1+upfrontFeePct)*miRate/12]
 *
 * @param customDownPct - Optional override for down payment % (e.g. 10 for 10%)
 * @param homeType - Home type for HOA and property tax adjustments
 * @param rateOverride - Optional rate override from dynamic rates API
 */
function calculateMaxPurchasePrice(
  maxHousingPayment: number,
  loanType: LoanType,
  creditScore: number,
  termYears: number = DEFAULT_LOAN_TERM_YEARS,
  customDownPct?: number,
  homeType: HomeType = "single_family",
  rateOverride?: number
): number {
  const config = LOAN_TYPES[loanType];
  const homeConfig = HOME_TYPES[homeType];
  const effectiveRate = getEffectiveRate(loanType, creditScore, rateOverride);
  const downPct = (customDownPct ?? config.minDownPaymentPercent) / 100;
  const upfrontFeePct = config.upfrontFeePct / 100;
  const monthlyPIFactor = getMonthlyPaymentFactor(effectiveRate, termYears);

  // If down payment is 20%+, no MI on conventional; FHA MIP still applies
  const ltv = 1 - downPct;
  const miRateMonthly = (loanType === "conventional" && ltv <= 0.80)
    ? 0
    : getMIRate(loanType, creditScore) / 12;

  const insuranceRateMonthly = UTAH_INSURANCE_RATE / 12;
  // Apply property tax multiplier based on home type
  const taxRateMonthly = (UTAH_PROPERTY_TAX_RATE * homeConfig.propertyTaxMultiplier) / 12;

  // Loan multiplier: how loan amount relates to purchase price
  const loanMultiplier = ltv * (1 + upfrontFeePct);

  // Insurance now scales with purchase price, so it's in the denominator
  const denominator =
    loanMultiplier * monthlyPIFactor +
    taxRateMonthly +
    insuranceRateMonthly +
    loanMultiplier * miRateMonthly;

  if (denominator <= 0) return 0;

  // Subtract fixed HOA fee from max housing payment before calculating price
  const availableForMortgage = maxHousingPayment - homeConfig.defaultHOA;
  if (availableForMortgage <= 0) return 0;

  const maxPrice = availableForMortgage / denominator;

  // Round down to nearest $1,000
  return Math.max(0, Math.floor(maxPrice / 1000) * 1000);
}

/**
 * Calculate full monthly payment breakdown for a given purchase price and loan type.
 *
 * @param customDownPct - Optional override for down payment % (e.g. 10 for 10%)
 * @param homeType - Home type for HOA and property tax adjustments
 * @param rateOverride - Optional rate override from dynamic rates API
 */
export function calculateMonthlyBreakdown(
  purchasePrice: number,
  loanType: LoanType,
  creditScore: number,
  termYears: number = DEFAULT_LOAN_TERM_YEARS,
  customDownPct?: number,
  homeType: HomeType = "single_family",
  rateOverride?: number
): MonthlyBreakdown {
  const config = LOAN_TYPES[loanType];
  const homeConfig = HOME_TYPES[homeType];
  const effectiveRate = getEffectiveRate(loanType, creditScore, rateOverride);
  const downPct = (customDownPct ?? config.minDownPaymentPercent) / 100;
  const upfrontFeePct = config.upfrontFeePct / 100;

  const ltv = 1 - downPct;
  const baseLoan = purchasePrice * ltv;
  const totalLoan = baseLoan * (1 + upfrontFeePct);
  const monthlyPIFactor = getMonthlyPaymentFactor(effectiveRate, termYears);

  // No PMI on conventional if LTV <= 80%
  const miRateAnnual = (loanType === "conventional" && ltv <= 0.80)
    ? 0
    : getMIRate(loanType, creditScore);

  const principalAndInterest = totalLoan * monthlyPIFactor;
  // Apply property tax multiplier based on home type
  const propertyTax = purchasePrice * UTAH_PROPERTY_TAX_RATE * homeConfig.propertyTaxMultiplier / 12;
  const homeInsurance = purchasePrice * UTAH_INSURANCE_RATE / 12;
  const mortgageInsurance = totalLoan * miRateAnnual / 12;
  const hoaFees = homeConfig.defaultHOA;

  const totalPayment = principalAndInterest + propertyTax + homeInsurance + mortgageInsurance + hoaFees;

  return {
    principalAndInterest: Math.round(principalAndInterest),
    propertyTax: Math.round(propertyTax),
    homeInsurance: Math.round(homeInsurance),
    mortgageInsurance: Math.round(mortgageInsurance),
    hoaFees: Math.round(hoaFees),
    totalPayment: Math.round(totalPayment),
  };
}

// ========================================
// MAIN CALCULATOR
// ========================================

/**
 * Run the full affordability calculation for all three loan types.
 */
export function calculateAffordability(inputs: CalculatorInputs): CalculatorResults {
  const grossMonthly = inputs.grossAnnualIncome / 12;
  const maxHousingPayment = calculateMaxHousingPayment(
    inputs.grossAnnualIncome,
    inputs.monthlyDebts
  );

  const homeType = inputs.homeType ?? "single_family";
  const loanTypes: LoanType[] = ["conventional", "fha", "va"];

  const loans: LoanResult[] = loanTypes.map((loanType) => {
    const config = LOAN_TYPES[loanType];
    
    // Get rate override if provided
    const rateOverride = inputs.rateOverrides?.[loanType];
    const effectiveRate = getEffectiveRate(loanType, inputs.creditScore, rateOverride);

    // Use custom down payment if provided, otherwise use the loan type minimum
    const customDown = inputs.downPaymentOverrides?.[loanType] ?? null;
    const downPaymentPct = customDown ?? config.minDownPaymentPercent;

    // Always compute max affordable price (the ceiling)
    const maxPrice = calculateMaxPurchasePrice(
      maxHousingPayment,
      loanType,
      inputs.creditScore,
      DEFAULT_LOAN_TERM_YEARS,
      downPaymentPct,
      homeType,
      rateOverride
    );

    // Use custom purchase price if set, capped at max
    const customPrice = inputs.purchasePriceOverrides?.[loanType] ?? null;
    const selectedPrice = customPrice !== null
      ? Math.min(customPrice, maxPrice)
      : maxPrice;

    const downPct = downPaymentPct / 100;
    const upfrontFeePct = config.upfrontFeePct / 100;
    const ltv = 1 - downPct;
    const baseLoan = selectedPrice * ltv;
    const totalLoan = baseLoan * (1 + upfrontFeePct);
    const breakdown = calculateMonthlyBreakdown(
      selectedPrice,
      loanType,
      inputs.creditScore,
      DEFAULT_LOAN_TERM_YEARS,
      downPaymentPct,
      homeType,
      rateOverride
    );

    // No PMI on conventional if LTV <= 80%
    const miRateAnnual = (loanType === "conventional" && ltv <= 0.80)
      ? 0
      : getMIRate(loanType, inputs.creditScore);

    const frontEndDTI = grossMonthly > 0 ? (breakdown.totalPayment / grossMonthly) * 100 : 0;
    const backEndDTI =
      grossMonthly > 0
        ? ((breakdown.totalPayment + inputs.monthlyDebts) / grossMonthly) * 100
        : 0;

    return {
      loanType,
      label: config.label,
      color: config.color,
      maxPurchasePrice: maxPrice,
      selectedPurchasePrice: selectedPrice,
      downPaymentAmount: Math.round(selectedPrice * downPct),
      downPaymentPercent: downPaymentPct,
      minDownPaymentPercent: config.minDownPaymentPercent,
      baseLoanAmount: Math.round(baseLoan),
      totalLoanAmount: Math.round(totalLoan),
      interestRate: effectiveRate,
      monthlyBreakdown: breakdown,
      frontEndDTI: Math.round(frontEndDTI * 10) / 10,
      backEndDTI: Math.round(backEndDTI * 10) / 10,
      meetsMinCreditScore: inputs.creditScore >= config.minCreditScore,
      miRateAnnual: Math.round(miRateAnnual * 10000) / 100, // as percentage with 2 decimals
    };
  });

  return {
    inputs,
    maxMonthlyHousingPayment: Math.round(maxHousingPayment),
    grossMonthlyIncome: Math.round(grossMonthly),
    loans,
  };
}

