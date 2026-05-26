import type {
  QuizAnswers,
  Program,
  ProgramMatch,
  ConfidenceLevel,
  AMILimit,
} from "@/types";
import { calculateAMI } from "./utils";
import { CITY_TO_COUNTY } from "./programs-data";

interface MatchResult {
  matches: boolean;
  confidence: ConfidenceLevel;
  reasons: string[];
  warnings: string[];
}

/**
 * Check if user's location matches program geography
 */
function checkGeography(
  program: Program,
  answers: Partial<QuizAnswers>
): MatchResult {
  const result: MatchResult = {
    matches: false,
    confidence: "likely",
    reasons: [],
    warnings: [],
  };

  if (!answers.propertyCounty && !answers.propertyCity) {
    return {
      ...result,
      matches: true,
      confidence: "possible",
      warnings: ["Location not specified - we'll verify eligibility"],
    };
  }

  switch (program.geographyType) {
    case "statewide":
      result.matches = true;
      result.reasons.push("Available statewide in Idaho");
      break;

    case "county":
      if (answers.propertyCounty) {
        const countyMatch = program.geographyValues.some(
          (county) =>
            county.toLowerCase() === answers.propertyCounty?.toLowerCase()
        );
        if (countyMatch) {
          // Check if user's city is in the excluded cities list
          if (program.excludedCities && answers.propertyCity) {
            const isExcluded = program.excludedCities.some(
              (excludedCity) => 
                excludedCity.toLowerCase() === answers.propertyCity?.toLowerCase()
            );
            if (isExcluded) {
              result.matches = false;
              result.warnings.push(`Not available in ${answers.propertyCity}`);
              break;
            }
          }
          result.matches = true;
          if (program.excludedCities && program.excludedCities.length > 0) {
            result.reasons.push(`Available in ${answers.propertyCounty} County (excludes ${program.excludedCities.join(", ")})`);
          } else {
            result.reasons.push(`Available in ${answers.propertyCounty} County`);
          }
        }
      }
      break;

    case "city":
      // First, check if user specified a city that matches
      if (answers.propertyCity) {
        const cityMatch = program.geographyValues.some(
          (city) => city.toLowerCase() === answers.propertyCity?.toLowerCase()
        );
        if (cityMatch) {
          result.matches = true;
          result.reasons.push(`Available in ${answers.propertyCity}`);
          break;
        }
      }
      
      // If no city specified or no match, check if user's county contains any program cities
      if (answers.propertyCounty) {
        const citiesInUserCounty = program.geographyValues.filter(
          (city) => CITY_TO_COUNTY[city]?.toLowerCase() === answers.propertyCounty?.toLowerCase()
        );
        if (citiesInUserCounty.length > 0) {
          result.matches = true;
          result.confidence = "possible";
          result.reasons.push(`Available in ${citiesInUserCounty.join(", ")} (${answers.propertyCounty} County)`);
        }
      }
      break;
  }

  return result;
}

/**
 * Check if user's income is within program limits
 */
function checkIncome(
  program: Program,
  answers: Partial<QuizAnswers>,
  amiLimits: AMILimit[]
): MatchResult {
  const result: MatchResult = {
    matches: false,
    confidence: "likely",
    reasons: [],
    warnings: [],
  };

  if (!answers.annualIncome || !answers.householdSize) {
    return {
      ...result,
      matches: true,
      confidence: "possible",
      warnings: ["Income eligibility needs verification"],
    };
  }

  // IHFA and similar programs with a flat household income cap
  if (program.maxHouseholdIncome) {
    if (answers.annualIncome <= program.maxHouseholdIncome) {
      result.matches = true;
      result.reasons.push(
        `Income within $${program.maxHouseholdIncome.toLocaleString()} household limit`
      );
    } else {
      result.warnings.push(
        `Income may exceed $${program.maxHouseholdIncome.toLocaleString()} household limit`
      );
      result.confidence = "needs_review";
    }
    return result;
  }

  // Find the AMI limit for this county and household size
  const amiLimit = amiLimits.find(
    (ami) =>
      ami.county.toLowerCase() === answers.propertyCounty?.toLowerCase() &&
      ami.householdSize === answers.householdSize
  );

  if (!amiLimit) {
    // Use a default/statewide AMI if county-specific not found
    return {
      ...result,
      matches: true,
      confidence: "possible",
      warnings: ["AMI limits need verification for your area"],
    };
  }

  // Calculate the income limit based on program's AMI percentage
  let incomeLimit: number;
  if (program.amiPercent <= 80) {
    incomeLimit = amiLimit.ami80;
  } else if (program.amiPercent <= 100) {
    incomeLimit = amiLimit.ami100;
  } else {
    incomeLimit = amiLimit.ami120;
  }

  if (answers.annualIncome <= incomeLimit) {
    result.matches = true;
    result.reasons.push(
      `Income within ${program.amiPercent}% AMI limit`
    );
  } else {
    result.warnings.push(
      `Income may exceed ${program.amiPercent}% AMI limit`
    );
    result.confidence = "needs_review";
  }

  return result;
}

/**
 * Check buyer type eligibility
 */
function checkBuyerType(
  program: Program,
  answers: Partial<QuizAnswers>
): MatchResult {
  const result: MatchResult = {
    matches: false,
    confidence: "likely",
    reasons: [],
    warnings: [],
  };

  // Check if program allows any buyer type
  if (program.buyerTypes.includes("any")) {
    result.matches = true;
    result.reasons.push("Open to all buyer types");
    return result;
  }

  // Check first-time buyer status
  if (program.buyerTypes.includes("first_time")) {
    if (answers.ownedHomeInLast3Years === false) {
      result.matches = true;
      result.reasons.push("First-time buyer eligible");
    } else if (answers.ownedHomeInLast3Years === null) {
      result.matches = true;
      result.confidence = "possible";
      result.warnings.push("First-time buyer status needs verification");
    } else if (answers.ownedHomeInLast3Years === true) {
      // Check if repeat buyers are also allowed
      if (program.buyerTypes.includes("repeat")) {
        result.matches = true;
        result.reasons.push("Repeat buyers eligible");
      }
    }
  }

  // Check veteran status
  if (program.buyerTypes.includes("veteran")) {
    if (
      answers.veteranStatus &&
      ["veteran", "active_duty", "reservist", "surviving_spouse"].includes(
        answers.veteranStatus
      )
    ) {
      result.matches = true;
      result.reasons.push("Veteran/military eligible");
    }
  }

  return result;
}

/**
 * Check occupation-based eligibility
 */
function checkOccupation(
  program: Program,
  answers: Partial<QuizAnswers>
): MatchResult {
  const result: MatchResult = {
    matches: true, // Default to true if no occupation requirements
    confidence: "likely",
    reasons: [],
    warnings: [],
  };

  if (program.occupations.includes("any") || program.occupations.length === 0) {
    return result;
  }

  if (
    answers.occupation &&
    answers.occupation !== "other" &&
    program.occupations.includes(answers.occupation)
  ) {
    result.reasons.push(`Special benefits for ${answers.occupation.replace("_", " ")}s`);
    return result;
  }

  result.matches = false;
  result.warnings.push(
    "Requires eligible occupation (nurse, teacher, or first responder)"
  );
  return result;
}

/**
 * Check property requirements
 */
function checkPropertyRules(
  program: Program,
  answers: Partial<QuizAnswers>
): MatchResult {
  const result: MatchResult = {
    matches: true,
    confidence: "likely",
    reasons: [],
    warnings: [],
  };

  const rules = program.propertyRules;

  // Primary residence check
  if (rules.primaryResidenceRequired && answers.isPrimaryResidence === false) {
    result.matches = false;
    result.warnings.push("Primary residence required");
    return result;
  }

  // Property type check
  if (
    answers.propertyType &&
    rules.propertyTypesAllowed.length > 0 &&
    !rules.propertyTypesAllowed.includes(answers.propertyType)
  ) {
    result.matches = false;
    result.warnings.push("Property type may not be eligible");
  }

  return result;
}

/**
 * Estimate the assistance amount based on program rules and user data
 */
function estimateAmount(
  program: Program,
  answers: Partial<QuizAnswers>
): number {
  const priceEstimates: Record<string, number> = {
    "<300k": 250000,
    "300-450k": 375000,
    "450-600k": 525000,
    "600k+": 650000,
  };
  const estimatedPrice =
    priceEstimates[answers.targetPriceRange || "300-450k"] || 400000;

  // IHFA DPCC: up to 8% of lesser of sales price or appraised value
  if (
    program.termsSummary.includes("8%") ||
    program.termsSummary.includes("8.0%")
  ) {
    const eightPercent = estimatedPrice * 0.08;
    return program.maxAmount
      ? Math.min(eightPercent, program.maxAmount)
      : eightPercent;
  }

  // Legacy percentage-based estimate
  if (program.termsSummary.includes("% of")) {
    return Math.min(estimatedPrice * 0.035, program.maxAmount);
  }

  // For fixed amount programs
  return program.maxAmount;
}

/**
 * Main matching function
 */
export function matchPrograms(
  programs: Program[],
  answers: Partial<QuizAnswers>,
  amiLimits: AMILimit[]
): ProgramMatch[] {
  const matches: ProgramMatch[] = [];

  for (const program of programs) {
    // Skip programs that are closed
    if (program.fundingStatus === "closed") {
      continue;
    }

    const geoResult = checkGeography(program, answers);
    if (!geoResult.matches && geoResult.confidence !== "possible") {
      continue; // Skip if definitely not in service area
    }

    const incomeResult = checkIncome(program, answers, amiLimits);
    const buyerResult = checkBuyerType(program, answers);
    const occupationResult = checkOccupation(program, answers);
    const propertyResult = checkPropertyRules(program, answers);

    if (!occupationResult.matches) {
      continue;
    }

    // Combine all results
    const allReasons = [
      ...geoResult.reasons,
      ...incomeResult.reasons,
      ...buyerResult.reasons,
      ...occupationResult.reasons,
    ];

    const allWarnings = [
      ...geoResult.warnings,
      ...incomeResult.warnings,
      ...buyerResult.warnings,
      ...occupationResult.warnings,
      ...propertyResult.warnings,
    ];

    // Determine overall confidence
    let confidence: ConfidenceLevel = "likely";
    const confidenceLevels: ConfidenceLevel[] = [
      geoResult.confidence,
      incomeResult.confidence,
      buyerResult.confidence,
      propertyResult.confidence,
    ];

    if (confidenceLevels.includes("needs_review")) {
      confidence = "needs_review";
    } else if (confidenceLevels.includes("possible")) {
      confidence = "possible";
    }

    // Check if this is a match
    const isMatch =
      geoResult.matches &&
      (incomeResult.matches || incomeResult.confidence === "possible") &&
      (buyerResult.matches || buyerResult.confidence === "possible") &&
      propertyResult.matches;

    if (isMatch) {
      matches.push({
        program,
        confidence,
        estimatedAmount: estimateAmount(program, answers),
        matchReasons: allReasons,
        warnings: allWarnings,
      });
    }
  }

  // Sort by confidence (likely first) and then by amount
  return matches.sort((a, b) => {
    const confidenceOrder = { likely: 0, possible: 1, needs_review: 2 };
    const confDiff =
      confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
    if (confDiff !== 0) return confDiff;
    return b.estimatedAmount - a.estimatedAmount;
  });
}

