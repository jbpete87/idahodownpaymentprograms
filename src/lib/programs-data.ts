import type { Program, AMILimit } from "@/types";

/**
 * Idaho down payment assistance program data
 * Primary source: Idaho Housing and Finance Association (IHFA)
 * Last verified: May 2026
 */
export const IHFA_DPA_URL =
  "https://www.idahohousing.com/homebuyers/down-payment-closing-cost-assistance/";
export const IHFA_LOAN_PRODUCTS_URL =
  "https://www.idahohousing.com/partners/lenders-realtors/loan-product/";
export const IHFA_FIND_LENDER_URL =
  "https://www.idahohousing.com/homebuyers/find-a-lender/";

/** Shared IHFA 15-year DPA second mortgage terms (2026 rate sheet) */
export const IHFA_DPA_SECOND_MORTGAGE_SUMMARY =
  "15-year fixed-rate second mortgage up to 8% of the lesser of sales price or appraised value (within MI LTV/CLTV limits). Interest rate = first mortgage rate plus 2.00%. Toward down payment and/or closing costs. Finally Home!® homebuyer education required. Purchase transactions for the standard 15-year product.";

export const PROGRAMS: Program[] = [
  // ========================================
  // IHFA STATEWIDE PROGRAMS
  // ========================================
  {
    id: "1",
    name: "IHFA Down Payment & Closing Cost Assistance",
    slug: "ihfa-dpa",
    agency: "Idaho Housing and Finance Association (IHFA)",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "Find an IHFA-approved lender at idahohousing.com/find-a-lender",
    geographyType: "statewide",
    geographyValues: [],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "second_mortgage",
    maxAmount: 56000,
    termsSummary:
      `${IHFA_DPA_SECOND_MORTGAGE_SUMMARY} Minimum $500 of the borrower's own funds required. Open to first-time and repeat buyers. Household income up to $170,000 (exceptions on specialized First Loan Tax Exempt products). Manufactured homes allowed per agency guidelines.`,
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Complete Finally Home!® homebuyer education at finallyhome.org (required for IHFA DPA).\n2. Find an IHFA-approved lender (directory at idahohousing.com/homebuyers/find-a-lender/).\n3. Get pre-approved for an IHFA first mortgage (Conventional, FHA, VA, USDA/RD, or HFA Preferred).\n4. Tell your lender you want IHFA down payment and closing cost assistance.\n5. Contribute at least $500 of your own funds into the transaction.\n6. Both loans close simultaneously — up to 8% assistance applied at closing.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Finally Home! homebuyer education certificate",
      "Income verification (household income ≤ $170,000)",
      "Proof of $500 minimum borrower contribution",
      "IHFA first mortgage pre-approval",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "2",
    name: "IHFA First Loan + DPA Combo",
    slug: "ihfa-first-loan",
    agency: "Idaho Housing and Finance Association (IHFA)",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "Work with an IHFA-approved lender",
    geographyType: "statewide",
    geographyValues: [],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "first_mortgage",
    maxAmount: 56000,
    termsSummary:
      "IHFA first mortgage products (HFA Preferred, HFA Advantage, FHA/RD, VA, Conventional, and First Loan Tax Exempt on select purchases) paired with up to 8% DPCC second mortgage assistance. Household income up to $170,000 for standard programs. No first-time buyer requirement on FHA/RD, VA, and HFA Preferred/Advantage purchases. Manufactured homes allowed per agency guidelines on eligible products.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Complete Finally Home!® education if using IHFA DPA or if required by AUS.\n2. Choose an IHFA-approved lender from the directory.\n3. Get pre-approved for the IHFA first loan product that fits your scenario.\n4. Apply for the 15-year DPCC second mortgage (up to 8%) simultaneously.\n5. Your lender packages both loans together at closing.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Finally Home! education certificate",
      "Income verification",
      "Credit report (typically 620+ for FHA, 640+ for First Loan)",
      "Purchase contract",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "3",
    name: "Idaho Heroes 15 Year Second Mortgage",
    slug: "idaho-heroes",
    agency: "Idaho Housing and Finance Association (IHFA)",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "Available through IHFA-approved lenders",
    geographyType: "statewide",
    geographyValues: [],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["teacher", "first_responder", "healthcare"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 0,
    },
    assistanceType: "second_mortgage",
    maxAmount: 56000,
    termsSummary:
      "Purchase-only 15-year fixed second mortgage for nurses, teachers, and first responders (firefighters, police, paramedics, and EMTs). Up to 8% of the lesser of sales price or appraised value. Interest rate = first mortgage rate plus 2.00%. $500 borrower contribution waived. First mortgage DPA rate add-on waived. Finally Home!® education required. Household income up to $170,000.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Confirm you qualify as a nurse, teacher, or first responder.\n2. Complete Finally Home!® homebuyer education.\n3. Work with an IHFA-approved lender and request the Idaho Heroes second mortgage.\n4. No $500 minimum contribution required for eligible heroes.\n5. Receive up to 8% assistance at closing on eligible purchase transactions.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Employment verification (nurse, teacher, or first responder)",
      "Finally Home!® education certificate",
      "Income verification (household income ≤ $170,000)",
      "IHFA first mortgage pre-approval",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "4",
    name: "IHFA Forgiving DPA (Discontinued)",
    slug: "ihfa-forgiving",
    agency: "Idaho Housing and Finance Association (IHFA)",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "See IHFA repayable second mortgage program",
    geographyType: "statewide",
    geographyValues: [],
    buyerTypes: ["any"],
    occupations: ["any"],
    amiPercent: 120,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome"],
    },
    assistanceType: "forgivable_loan",
    maxAmount: 0,
    termsSummary:
      "DISCONTINUED: IHFA no longer offers a forgivable down payment assistance product as of 2026. Assistance is now a 15-year repayable second mortgage (up to 8% of sales price or appraised value). See IHFA Down Payment & Closing Cost Assistance for current options.",
    fundingStatus: "closed",
    lastVerified: "2026-05-26",
    applicationSteps:
      "This program is no longer available. Apply for IHFA's repayable second mortgage DPA instead — up to 8% of sales price with as little as $500 out of pocket.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [],
    requiresEducationCourse: false,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },

  // ========================================
  // TREASURE VALLEY / LOCAL PROGRAMS
  // ========================================
  {
    id: "5",
    name: "Boise Homeownership Opportunity Program (HOP)",
    slug: "boise-city",
    agency: "City of Boise Housing & Community Development",
    websiteUrl: "https://www.cityofboise.org/departments/planning-and-development-services/housing-and-community-development/",
    contactInfo: "Apply through NeighborWorks Boise or LEAP Housing",
    geographyType: "city",
    geographyValues: ["Boise"],
    buyerTypes: ["first_time", "repeat"],
    occupations: ["any"],
    amiPercent: 80,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome"],
      minBuyerContribution: 500,
      maxLiquidAssets: 35000,
    },
    assistanceType: "deferred_loan",
    maxAmount: 65000,
    termsSummary:
      "City of Boise deferred mortgage assistance: up to $45,000 for fee-simple properties or up to $65,000 for deed-restricted/land trust properties. Income must be 50–80% AMI. Can pay down payment, closing costs, or buy down the first mortgage. Deferred subordinate loan repaid on sale or refinance. Can stack with IHFA programs in many cases.",
    fundingStatus: "limited",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Verify income is 50–80% of Ada County AMI.\n2. Contact NeighborWorks Boise or LEAP Housing to start application.\n3. Complete homebuyer education if required.\n4. Get pre-approved with a mortgage lender.\n5. Find a home within Boise city limits.\n6. Receive HOP funds as deferred mortgage at closing.",
    requiredDocs: [
      "Income verification (50–80% AMI)",
      "Proof of employment and liquid assets",
      "Pre-approval letter",
      "Purchase contract for Boise property",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "6",
    name: "Treasure Valley Down Payment Assistance",
    slug: "treasure-valley",
    agency: "Multiple (IHFA + local partners)",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "IHFA-approved lenders + City of Boise HOP partners",
    geographyType: "county",
    geographyValues: ["Ada", "Canyon"],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "second_mortgage",
    maxAmount: 65000,
    termsSummary:
      "Treasure Valley (Ada + Canyon counties) buyers can combine IHFA 15-year DPCC assistance (up to 8% of sales price or appraised value) with local programs like Boise HOP ($45,000–$65,000 in Boise city limits). Most Treasure Valley buyers start with IHFA — the primary path for Boise, Meridian, Nampa, and Caldwell.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Take our quiz to see IHFA + local program matches.\n2. Start with an IHFA-approved lender for statewide DPA.\n3. If buying in Boise city limits, also contact NeighborWorks Boise or LEAP Housing for HOP.\n4. Stack programs where lender guidelines allow.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Finally Home! education certificate",
      "Income verification",
      "Pre-approval letter",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "7",
    name: "Canyon County Homebuyer Assistance",
    slug: "canyon-county",
    agency: "Canyon County / IHFA",
    websiteUrl: "https://www.canyoncounty.id.gov/",
    contactInfo: "IHFA-approved lenders serve Canyon County buyers",
    geographyType: "county",
    geographyValues: ["Canyon"],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "second_mortgage",
    maxAmount: 56000,
    termsSummary:
      "Canyon County buyers (Nampa, Caldwell, Middleton) primarily use IHFA 15-year DPCC assistance — up to 8% of the lesser of sales price or appraised value with $500 minimum contribution. No active county-wide DPA program; IHFA is the main resource for Canyon County homebuyers.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Complete Finally Home! homebuyer education.\n2. Find an IHFA-approved lender.\n3. Get pre-approved for IHFA First Loan + DPA.\n4. Purchase in Nampa, Caldwell, or elsewhere in Canyon County.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Finally Home! education certificate",
      "Income verification (≤ $170,000 household)",
      "Purchase contract in Canyon County",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "8",
    name: "Idaho Falls Area Homebuyer Assistance",
    slug: "idaho-falls-local",
    agency: "IHFA + Bonneville County partners",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "IHFA-approved lenders in East Idaho",
    geographyType: "county",
    geographyValues: ["Bonneville"],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "second_mortgage",
    maxAmount: 56000,
    termsSummary:
      "East Idaho buyers in Idaho Falls and Bonneville County use IHFA 15-year DPCC assistance — up to 8% of sales price or appraised value toward down payment and closing costs. $500 minimum contribution. Household income up to $170,000. Local city programs are limited; IHFA carries most of the value in this market.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Complete Finally Home! homebuyer education.\n2. Connect with an IHFA-approved lender serving East Idaho.\n3. Get pre-approved for IHFA loan + DPA combo.\n4. Purchase in Idaho Falls or Bonneville County.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Finally Home! education certificate",
      "Income verification",
      "Pre-approval letter",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "9",
    name: "Kootenai County / Coeur d'Alene Assistance",
    slug: "coeur-d-alene-local",
    agency: "IHFA + North Idaho partners",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "IHFA-approved lenders in North Idaho",
    geographyType: "county",
    geographyValues: ["Kootenai"],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "second_mortgage",
    maxAmount: 56000,
    termsSummary:
      "North Idaho buyers in Coeur d'Alene and Kootenai County use IHFA 15-year DPCC assistance — up to 8% of sales price or appraised value. $500 minimum out-of-pocket. Open to first-time and repeat buyers. Income limit up to $170,000 household. Competitive market — get pre-approved early.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Complete Finally Home! homebuyer education.\n2. Find an IHFA-approved lender serving Kootenai County.\n3. Get pre-approved before house hunting in North Idaho's competitive market.\n4. Apply for IHFA DPA with your first mortgage.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Finally Home! education certificate",
      "Income verification",
      "Pre-approval letter",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
  {
    id: "10",
    name: "IHFA HFA Preferred / Conventional",
    slug: "ihfa-conventional",
    agency: "Idaho Housing and Finance Association (IHFA)",
    websiteUrl: IHFA_LOAN_PRODUCTS_URL,
    contactInfo: "IHFA-approved lenders · Program questions: resloan@ihfa.org",
    geographyType: "statewide",
    geographyValues: [],
    buyerTypes: ["first_time", "repeat", "any"],
    occupations: ["any"],
    amiPercent: 120,
    maxHouseholdIncome: 170000,
    propertyRules: {
      primaryResidenceRequired: true,
      propertyTypesAllowed: ["single_family", "condo", "townhome", "manufactured"],
      minBuyerContribution: 500,
    },
    assistanceType: "first_mortgage",
    maxAmount: 56000,
    termsSummary:
      "Fannie Mae HFA Preferred and Freddie Mac HFA Advantage purchase programs through IHFA. Up to 97% LTV. No first-time buyer requirement. Standard MI required above 80% AMI. Pair with DPCC second mortgage up to 8%. Lower rates on loan amounts $350,000 or less. AUS approval required. Manufactured homes allowed per agency guidelines.",
    fundingStatus: "open",
    lastVerified: "2026-05-26",
    applicationSteps:
      "1. Complete Finally Home!® education if using IHFA DPA or if required by AUS.\n2. Work with an IHFA-approved lender on HFA Preferred or HFA Advantage.\n3. Get AUS approval (DU for Fannie, LPA for Freddie).\n4. Add the 15-year DPCC second mortgage (up to 8%) if desired.\n5. Close with both loans packaged together.",
    applicationUrl: IHFA_DPA_URL,
    requiredDocs: [
      "Credit report (680+ recommended)",
      "Income verification",
      "Finally Home! certificate",
    ],
    requiresEducationCourse: true,
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
  },
];

/**
 * AMI limits for Idaho counties - FY 2026 HUD Income Limits
 * Source: HUD User / City of Boise income guidelines (Boise City HUD Metro FMR Area)
 * Ada and Canyon share Boise City metro limits
 */
export const AMI_LIMITS: AMILimit[] = [
  // Ada County (Boise City, ID HUD Metro FMR Area)
  { id: "1", county: "Ada", householdSize: 1, ami80: 59950, ami100: 74938, ami120: 89926, effectiveYear: 2026 },
  { id: "2", county: "Ada", householdSize: 2, ami80: 68500, ami100: 85625, ami120: 102750, effectiveYear: 2026 },
  { id: "3", county: "Ada", householdSize: 3, ami80: 77050, ami100: 96313, ami120: 115576, effectiveYear: 2026 },
  { id: "4", county: "Ada", householdSize: 4, ami80: 85600, ami100: 107000, ami120: 128400, effectiveYear: 2026 },
  { id: "5", county: "Ada", householdSize: 5, ami80: 92450, ami100: 115563, ami120: 138676, effectiveYear: 2026 },
  { id: "6", county: "Ada", householdSize: 6, ami80: 99300, ami100: 124125, ami120: 148950, effectiveYear: 2026 },
  { id: "7", county: "Ada", householdSize: 7, ami80: 106150, ami100: 132688, ami120: 159226, effectiveYear: 2026 },
  { id: "8", county: "Ada", householdSize: 8, ami80: 113000, ami100: 141250, ami120: 169500, effectiveYear: 2026 },

  // Canyon County (Boise City, ID HUD Metro FMR Area)
  { id: "9", county: "Canyon", householdSize: 1, ami80: 59950, ami100: 74938, ami120: 89926, effectiveYear: 2026 },
  { id: "10", county: "Canyon", householdSize: 2, ami80: 68500, ami100: 85625, ami120: 102750, effectiveYear: 2026 },
  { id: "11", county: "Canyon", householdSize: 3, ami80: 77050, ami100: 96313, ami120: 115576, effectiveYear: 2026 },
  { id: "12", county: "Canyon", householdSize: 4, ami80: 85600, ami100: 107000, ami120: 128400, effectiveYear: 2026 },
  { id: "13", county: "Canyon", householdSize: 5, ami80: 92450, ami100: 115563, ami120: 138676, effectiveYear: 2026 },
  { id: "14", county: "Canyon", householdSize: 6, ami80: 99300, ami100: 124125, ami120: 148950, effectiveYear: 2026 },
  { id: "15", county: "Canyon", householdSize: 7, ami80: 106150, ami100: 132688, ami120: 159226, effectiveYear: 2026 },
  { id: "16", county: "Canyon", householdSize: 8, ami80: 113000, ami100: 141250, ami120: 169500, effectiveYear: 2026 },

  // Bonneville County (Idaho Falls, ID HUD Metro FMR Area)
  { id: "17", county: "Bonneville", householdSize: 1, ami80: 47350, ami100: 59188, ami120: 71026, effectiveYear: 2026 },
  { id: "18", county: "Bonneville", householdSize: 2, ami80: 54100, ami100: 67625, ami120: 81150, effectiveYear: 2026 },
  { id: "19", county: "Bonneville", householdSize: 3, ami80: 60850, ami100: 76063, ami120: 91276, effectiveYear: 2026 },
  { id: "20", county: "Bonneville", householdSize: 4, ami80: 67600, ami100: 84500, ami120: 101400, effectiveYear: 2026 },
  { id: "21", county: "Bonneville", householdSize: 5, ami80: 73050, ami100: 91313, ami120: 109576, effectiveYear: 2026 },
  { id: "22", county: "Bonneville", householdSize: 6, ami80: 78450, ami100: 98063, ami120: 117676, effectiveYear: 2026 },
  { id: "23", county: "Bonneville", householdSize: 7, ami80: 83850, ami100: 104813, ami120: 125776, effectiveYear: 2026 },
  { id: "24", county: "Bonneville", householdSize: 8, ami80: 89250, ami100: 111563, ami120: 133876, effectiveYear: 2026 },

  // Kootenai County (Coeur d'Alene, ID MSA)
  { id: "25", county: "Kootenai", householdSize: 1, ami80: 52750, ami100: 65938, ami120: 79126, effectiveYear: 2026 },
  { id: "26", county: "Kootenai", householdSize: 2, ami80: 60250, ami100: 75313, ami120: 90376, effectiveYear: 2026 },
  { id: "27", county: "Kootenai", householdSize: 3, ami80: 67800, ami100: 84750, ami120: 101700, effectiveYear: 2026 },
  { id: "28", county: "Kootenai", householdSize: 4, ami80: 75300, ami100: 94125, ami120: 112950, effectiveYear: 2026 },
  { id: "29", county: "Kootenai", householdSize: 5, ami80: 81350, ami100: 101688, ami120: 122026, effectiveYear: 2026 },
  { id: "30", county: "Kootenai", householdSize: 6, ami80: 87350, ami100: 109188, ami120: 131026, effectiveYear: 2026 },
  { id: "31", county: "Kootenai", householdSize: 7, ami80: 93400, ami100: 116750, ami120: 140100, effectiveYear: 2026 },
  { id: "32", county: "Kootenai", householdSize: 8, ami80: 99400, ami100: 124250, ami120: 149100, effectiveYear: 2026 },
];

export const IDAHO_COUNTIES = [
  "Ada", "Adams", "Bannock", "Bear Lake", "Benewah", "Bingham", "Blaine", "Boise",
  "Bonner", "Bonneville", "Boundary", "Butte", "Camas", "Canyon", "Caribou", "Cassia",
  "Clark", "Clearwater", "Custer", "Elmore", "Franklin", "Fremont", "Gem", "Gooding",
  "Idaho", "Jefferson", "Jerome", "Kootenai", "Latah", "Lemhi", "Lewis", "Lincoln",
  "Madison", "Minidoka", "Nez Perce", "Oneida", "Owyhee", "Payette", "Power",
  "Shoshone", "Teton", "Twin Falls", "Valley", "Washington",
];

export const PROGRAM_CITIES = [
  "Boise",
  "Meridian",
  "Nampa",
  "Caldwell",
  "Idaho Falls",
  "Coeur d'Alene",
];

export const CITY_TO_COUNTY: Record<string, string> = {
  "Boise": "Ada",
  "Meridian": "Ada",
  "Eagle": "Ada",
  "Garden City": "Ada",
  "Kuna": "Ada",
  "Star": "Ada",
  "Nampa": "Canyon",
  "Caldwell": "Canyon",
  "Middleton": "Canyon",
  "Idaho Falls": "Bonneville",
  "Ammon": "Bonneville",
  "Coeur d'Alene": "Kootenai",
  "Post Falls": "Kootenai",
  "Hayden": "Kootenai",
  "Twin Falls": "Twin Falls",
  "Pocatello": "Bannock",
};

/** @deprecated Use IDAHO_COUNTIES */
export const UTAH_COUNTIES = IDAHO_COUNTIES;
