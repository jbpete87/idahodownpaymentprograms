// ========================================
// PROGRAM TYPES
// ========================================

export type GeographyType = "statewide" | "county" | "city";
export type BuyerType = "first_time" | "repeat" | "veteran" | "any";
export type Occupation = "teacher" | "first_responder" | "healthcare" | "government" | "any" | "other";
export type AssistanceType = "grant" | "forgivable_loan" | "deferred_loan" | "second_mortgage" | "first_mortgage";
export type FundingStatus = "open" | "limited" | "waitlist" | "paused" | "closed";
export type ConfidenceLevel = "likely" | "possible" | "needs_review";

export interface PropertyRules {
  primaryResidenceRequired: boolean;
  maxPurchasePrice?: number;
  propertyTypesAllowed: string[];
  minBuyerContribution?: number;
  maxLiquidAssets?: number;
  newConstructionOnly?: boolean;
  specialGeographicArea?: boolean; // Requires property to be in designated CRA/census tract
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  agency: string;
  websiteUrl?: string;
  contactInfo?: string;
  geographyType: GeographyType;
  geographyValues: string[]; // county or city names
  excludedCities?: string[]; // cities excluded from a county-wide program
  buyerTypes: BuyerType[];
  occupations: Occupation[];
  amiPercent: number; // e.g., 80 for 80% AMI
  propertyRules: PropertyRules;
  assistanceType: AssistanceType;
  maxAmount: number;
  termsSummary: string;
  forgivenessYears?: number;
  fundingStatus: FundingStatus;
  lastVerified: string;
  applicationSteps: string;
  applicationUrl?: string; // Direct link to application form/PDF
  requiredDocs: string[];
  requiresEducationCourse: boolean;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// QUIZ TYPES
// ========================================

export interface QuizAnswers {
  // Step 1: Property Location
  propertyAddress?: string;
  propertyCity?: string;
  propertyZip?: string;
  propertyCounty?: string;
  purchaseTimeline?: "0-3" | "3-6" | "6-12" | "12+";
  
  // Step 2: Household Profile
  householdSize: number;
  numberOfBorrowers: 1 | 2;
  
  // Step 3: Income
  annualIncome: number;
  incomeVaries: boolean;
  isSelfEmployed: boolean;
  
  // Step 4: Buyer Type
  ownedHomeInLast3Years: boolean | null; // null = not sure
  isPrimaryResidence: boolean;
  propertyType: "single_family" | "condo" | "townhome" | "2-4_unit";
  
  // Step 5: Veteran / Occupation
  veteranStatus: "veteran" | "active_duty" | "reservist" | "surviving_spouse" | "none";
  occupation: Occupation;
  
  // Step 6: Financing (optional)
  creditScoreRange?: "<600" | "600-619" | "620-639" | "640-679" | "680+";
  availableFunds?: "$0-2k" | "$2-5k" | "$5-10k" | "$10k+";
  targetPriceRange?: "<300k" | "300-450k" | "450-600k" | "600k+";
  loanTypeInterest?: "FHA" | "VA" | "Conventional" | "USDA" | "not_sure";
}

export interface ProgramMatch {
  program: Program;
  confidence: ConfidenceLevel;
  estimatedAmount: number;
  matchReasons: string[];
  warnings: string[];
}

export interface QuizSubmission {
  id: string;
  answers: QuizAnswers;
  matchedPrograms: ProgramMatch[];
  createdAt: string;
}

// ========================================
// LEAD TYPES
// ========================================

export interface Lead {
  id: string;
  submissionId: string;
  name: string;
  email: string;
  phone: string;
  contactPreference: "call" | "text" | "email";
  bestTime: "morning" | "afternoon" | "evening";
  notes?: string;
  marketingConsent: boolean;
  createdAt: string;
}

// ========================================
// AMI DATA TYPES
// ========================================

export interface AMILimit {
  id: string;
  county: string;
  householdSize: number;
  ami80: number;
  ami100: number;
  ami120: number;
  effectiveYear: number;
}

// ========================================
// UI TYPES
// ========================================

export type QuizStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface QuizStepInfo {
  step: QuizStep;
  title: string;
  description: string;
}

