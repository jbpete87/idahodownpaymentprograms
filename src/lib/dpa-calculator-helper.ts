/**
 * DPA Calculator Helper
 *
 * Filters down payment assistance programs for use in the affordability
 * calculator and computes the impact on cash-to-close.
 *
 * Uses Ada County AMI limits as the baseline for income eligibility
 * (Treasure Valley / Boise metro — Idaho's largest market).
 */

import { PROGRAMS, AMI_LIMITS } from "./programs-data";
import type { Program, AssistanceType, AMILimit } from "@/types";

// ========================================
// TYPES
// ========================================

export interface DPAOption {
  id: string;
  name: string;
  maxAmount: number;
  assistanceType: AssistanceType;
  /** Human-readable label for the dropdown */
  dropdownLabel: string;
  /** Short description for the results card */
  shortDescription: string;
  /** Geography scope for context */
  geographyNote: string;
  fundingStatus: "open" | "limited" | "waitlist" | "paused";
}

export interface CashToCloseBreakdown {
  downPayment: number;
  estimatedClosingCosts: number;
  sellerConcession: number;
  buyerClosingCosts: number;
  totalCashNeeded: number;
  dpaAmount: number;
  netOutOfPocket: number;
  dpaProgram: DPAOption | null;
}

// ========================================
// CONSTANTS
// ========================================

/** Default county for AMI income-limit checks */
const DEFAULT_COUNTY = "Ada";

// ========================================
// HELPERS
// ========================================

function assistanceTypeLabel(type: AssistanceType): string {
  switch (type) {
    case "grant":
      return "Grant (no repayment)";
    case "forgivable_loan":
      return "Forgivable Loan";
    case "deferred_loan":
      return "Deferred Loan (no monthly payment)";
    case "second_mortgage":
      return "Second Mortgage";
    default:
      return type;
  }
}

function geographyLabel(program: Program): string {
  if (program.geographyType === "statewide") return "Statewide";
  if (program.geographyType === "county") {
    return program.geographyValues.join(", ") + " County";
  }
  return program.geographyValues.join(", ");
}

function fundingBadge(status: string): string {
  switch (status) {
    case "limited":
      return " ⚡ Limited";
    case "waitlist":
      return " ⏳ Waitlist";
    case "paused":
      return " ⏸ Paused";
    default:
      return "";
  }
}

/**
 * Get the AMI income limit for a given program based on household size.
 * Uses Ada County AMI data.
 *
 * Programs specify an amiPercent (80, 100, or 120). We look up the
 * corresponding threshold for the user's household size.
 */
function getIncomeLimit(
  program: Program,
  householdSize: number
): number | null {
  const amiEntry = AMI_LIMITS.find(
    (a) =>
      a.county.toLowerCase() === DEFAULT_COUNTY.toLowerCase() &&
      a.householdSize === Math.min(householdSize, 8)
  );

  if (!amiEntry) return null;

  if (program.amiPercent <= 80) return amiEntry.ami80;
  if (program.amiPercent <= 100) return amiEntry.ami100;
  return amiEntry.ami120;
}

// ========================================
// MAIN FUNCTIONS
// ========================================

/**
 * Get DPA programs that the user likely qualifies for based on
 * income and household size, using Ada County AMI limits.
 *
 * Filters:
 *  - Excludes first_mortgage programs (DPA only)
 *  - Excludes closed programs
 *  - Excludes programs where user income exceeds the AMI limit
 *
 * Sorted by: statewide first, then by max amount descending.
 */
export function getDPAPrograms(
  grossAnnualIncome: number,
  householdSize: number
): DPAOption[] {
  return PROGRAMS
    .filter((p) => {
      // Only DPA-type programs
      if (p.assistanceType === "first_mortgage") return false;
      // Must not be closed
      if (p.fundingStatus === "closed") return false;

      // Income check against Ada County AMI
      const incomeLimit = getIncomeLimit(p, householdSize);
      if (incomeLimit !== null && grossAnnualIncome > incomeLimit) {
        return false; // Income exceeds program limit
      }

      return true;
    })
    .sort((a, b) => {
      // Statewide first
      if (a.geographyType === "statewide" && b.geographyType !== "statewide") return -1;
      if (a.geographyType !== "statewide" && b.geographyType === "statewide") return 1;
      // Then by max amount descending
      return b.maxAmount - a.maxAmount;
    })
    .map((p) => {
      const geo = geographyLabel(p);
      const badge = fundingBadge(p.fundingStatus);

      return {
        id: p.id,
        name: p.name,
        maxAmount: p.maxAmount,
        assistanceType: p.assistanceType,
        dropdownLabel: `${p.name} — up to $${p.maxAmount.toLocaleString()}${badge}`,
        shortDescription: assistanceTypeLabel(p.assistanceType),
        geographyNote: geo,
        fundingStatus: p.fundingStatus as DPAOption["fundingStatus"],
      };
    });
}

/** Estimated total buyer-side closing costs as % of loan amount */
const CLOSING_COSTS_PERCENT = 0.025; // ~2.5%

/**
 * Percentage of closing costs the seller is covering via concessions
 * in the current market. Sellers commonly cover ~60-70% of buyer
 * closing costs right now.
 */
const SELLER_CONCESSION_PERCENT = 0.65;

/**
 * Calculate the cash-to-close breakdown with and without DPA.
 *
 * Estimates total closing costs at ~2.5% of the loan, then applies
 * a seller concession (~65%) since sellers are commonly helping with
 * closing costs in the current market. The buyer's remaining share
 * is roughly ~1% of the loan.
 *
 * @param downPaymentAmount - Down payment required for this loan type
 * @param baseLoanAmount - Base loan amount (before financed fees)
 * @param selectedProgramId - ID of the selected DPA program (or null)
 * @param grossAnnualIncome - For filtering programs by AMI
 * @param householdSize - For filtering programs by AMI
 */
export function calculateCashToClose(
  downPaymentAmount: number,
  baseLoanAmount: number,
  selectedProgramId: string | null,
  grossAnnualIncome: number,
  householdSize: number
): CashToCloseBreakdown {
  const estimatedClosingCosts = Math.round(baseLoanAmount * CLOSING_COSTS_PERCENT);
  const sellerConcession = Math.round(estimatedClosingCosts * SELLER_CONCESSION_PERCENT);
  const buyerClosingCosts = estimatedClosingCosts - sellerConcession;
  const totalCashNeeded = downPaymentAmount + buyerClosingCosts;

  const allDPA = getDPAPrograms(grossAnnualIncome, householdSize);
  const dpaProgram = selectedProgramId
    ? allDPA.find((p) => p.id === selectedProgramId) ?? null
    : null;

  // DPA amount is capped at the lesser of program max and total cash needed
  const dpaAmount = dpaProgram
    ? Math.min(dpaProgram.maxAmount, totalCashNeeded)
    : 0;

  const netOutOfPocket = Math.max(0, totalCashNeeded - dpaAmount);

  return {
    downPayment: downPaymentAmount,
    estimatedClosingCosts,
    sellerConcession,
    buyerClosingCosts,
    totalCashNeeded,
    dpaAmount,
    netOutOfPocket,
    dpaProgram,
  };
}
