/**
 * Shared helpers for the DPA API (Area Pulse / external consumers).
 * Reuses PROGRAMS + matchPrograms — does not invent a parallel catalog.
 */

import { timingSafeEqual } from "crypto";
import type {
  AssistanceType,
  BuyerType,
  FundingStatus,
  Occupation,
  Program,
  ProgramMatch,
  QuizAnswers,
} from "@/types";
import { PROGRAMS, AMI_LIMITS, CITY_TO_COUNTY } from "@/lib/programs-data";
import { matchPrograms } from "@/lib/matching-engine";
import { SITE_URL } from "@/lib/seo-metadata";

export type DpaProgramSummary = {
  id: string;
  slug: string;
  name: string;
  agency: string;
  assistanceType: AssistanceType;
  maxAmount: number;
  amiPercent: number;
  geographyType: Program["geographyType"];
  geographyValues: string[];
  excludedCities?: string[];
  buyerTypes: BuyerType[];
  occupations: Occupation[];
  fundingStatus: FundingStatus;
  summary: string;
  websiteUrl?: string;
  applicationUrl?: string;
  contactInfo?: string;
  requiresEducationCourse: boolean;
  programUrl: string;
  lastVerified: string;
  updatedAt: string;
};

export type DpaMatchResult = {
  confidence: ProgramMatch["confidence"];
  estimatedAmount: number;
  matchReasons: string[];
  warnings: string[];
  program: DpaProgramSummary;
};

export type DiscoverRequest = {
  state?: string;
  county?: string;
  city?: string;
  zip?: string;
  buyerType?: BuyerType;
  assistanceType?: AssistanceType;
  includeClosed?: boolean;
  includePaused?: boolean;
  limit?: number;
};

export type ScreenRequest = Partial<QuizAnswers> & {
  state?: string;
  county?: string;
  city?: string;
  zip?: string;
  limit?: number;
};

const BUYER_TYPES: BuyerType[] = ["first_time", "repeat", "veteran", "any"];
const ASSISTANCE_TYPES: AssistanceType[] = [
  "grant",
  "forgivable_loan",
  "deferred_loan",
  "second_mortgage",
  "first_mortgage",
];
const OCCUPATIONS: Occupation[] = [
  "teacher",
  "first_responder",
  "healthcare",
  "government",
  "any",
  "other",
];
const PROPERTY_TYPES = [
  "single_family",
  "condo",
  "townhome",
  "2-4_unit",
] as const;
const VETERAN_STATUSES = [
  "veteran",
  "active_duty",
  "reservist",
  "surviving_spouse",
  "none",
] as const;

function normalizeText(value: string | undefined | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function equalsIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function findCityKey(city: string): string | undefined {
  return Object.keys(CITY_TO_COUNTY).find((key) => equalsIgnoreCase(key, city));
}

/** Resolve county from city when county omitted. */
export function resolveCounty(
  county?: string,
  city?: string
): string | undefined {
  const normalizedCounty = normalizeText(county);
  if (normalizedCounty) return normalizedCounty;

  const normalizedCity = normalizeText(city);
  if (!normalizedCity) return undefined;

  const cityKey = findCityKey(normalizedCity);
  return cityKey ? CITY_TO_COUNTY[cityKey] : undefined;
}

export function toProgramSummary(program: Program): DpaProgramSummary {
  return {
    id: program.id,
    slug: program.slug,
    name: program.name,
    agency: program.agency,
    assistanceType: program.assistanceType,
    maxAmount: program.maxAmount,
    amiPercent: program.amiPercent,
    geographyType: program.geographyType,
    geographyValues: program.geographyValues,
    ...(program.excludedCities?.length
      ? { excludedCities: program.excludedCities }
      : {}),
    buyerTypes: program.buyerTypes,
    occupations: program.occupations,
    fundingStatus: program.fundingStatus,
    summary: program.termsSummary,
    ...(program.websiteUrl ? { websiteUrl: program.websiteUrl } : {}),
    ...(program.applicationUrl ? { applicationUrl: program.applicationUrl } : {}),
    ...(program.contactInfo ? { contactInfo: program.contactInfo } : {}),
    requiresEducationCourse: program.requiresEducationCourse,
    programUrl: `${SITE_URL}/programs/${program.slug}`,
    lastVerified: program.lastVerified,
    updatedAt: program.updatedAt,
  };
}

function programMatchesGeography(
  program: Program,
  county?: string,
  city?: string
): boolean {
  if (!county && !city) return true;

  if (program.geographyType === "statewide") return true;

  if (city) {
    const cityKey = findCityKey(city) ?? city;

    if (program.excludedCities?.some((c) => equalsIgnoreCase(c, cityKey))) {
      return false;
    }

    if (program.geographyType === "city") {
      return program.geographyValues.some((v) => equalsIgnoreCase(v, cityKey));
    }

    if (program.geographyType === "county") {
      const cityCounty = CITY_TO_COUNTY[cityKey] ?? county;
      if (!cityCounty) return false;
      return program.geographyValues.some((v) =>
        equalsIgnoreCase(v, cityCounty)
      );
    }
  }

  if (county) {
    if (program.geographyType === "county") {
      return program.geographyValues.some((v) => equalsIgnoreCase(v, county));
    }
    if (program.geographyType === "city") {
      return program.geographyValues.some(
        (programCity) =>
          CITY_TO_COUNTY[programCity] &&
          equalsIgnoreCase(CITY_TO_COUNTY[programCity], county)
      );
    }
  }

  return false;
}

function programMatchesBuyerType(
  program: Program,
  buyerType?: BuyerType
): boolean {
  if (!buyerType) return true;
  if (program.buyerTypes.includes("any")) return true;
  return program.buyerTypes.includes(buyerType);
}

export function discoverPrograms(input: DiscoverRequest): {
  programs: DpaProgramSummary[];
  filters: {
    state: string;
    county?: string;
    city?: string;
    buyerType?: BuyerType;
    assistanceType?: AssistanceType;
    includeClosed: boolean;
    includePaused: boolean;
  };
} {
  const state = (normalizeText(input.state) ?? "ID").toUpperCase();
  const city = normalizeText(input.city);
  const county = resolveCounty(input.county, city);
  const includeClosed = Boolean(input.includeClosed);
  const includePaused = input.includePaused !== false;
  const limit =
    typeof input.limit === "number" && Number.isFinite(input.limit)
      ? Math.min(Math.max(Math.floor(input.limit), 1), 200)
      : undefined;

  let filtered = PROGRAMS.filter((program) => {
    if (!includeClosed && program.fundingStatus === "closed") return false;
    if (!includePaused && program.fundingStatus === "paused") return false;
    if (!programMatchesGeography(program, county, city)) return false;
    if (!programMatchesBuyerType(program, input.buyerType)) return false;
    if (
      input.assistanceType &&
      program.assistanceType !== input.assistanceType
    ) {
      return false;
    }
    return true;
  });

  // Prefer open/limited, then higher max amount
  filtered = filtered.sort((a, b) => {
    const statusOrder: Record<FundingStatus, number> = {
      open: 0,
      limited: 1,
      waitlist: 2,
      paused: 3,
      closed: 4,
    };
    const statusDiff = statusOrder[a.fundingStatus] - statusOrder[b.fundingStatus];
    if (statusDiff !== 0) return statusDiff;
    return b.maxAmount - a.maxAmount;
  });

  if (limit) filtered = filtered.slice(0, limit);

  return {
    programs: filtered.map(toProgramSummary),
    filters: {
      state,
      ...(county ? { county } : {}),
      ...(city ? { city } : {}),
      ...(input.buyerType ? { buyerType: input.buyerType } : {}),
      ...(input.assistanceType ? { assistanceType: input.assistanceType } : {}),
      includeClosed,
      includePaused,
    },
  };
}

export function screenPrograms(input: ScreenRequest): {
  matches: DpaMatchResult[];
  answers: Partial<QuizAnswers>;
} {
  const city = normalizeText(input.propertyCity ?? input.city);
  const county = resolveCounty(input.propertyCounty ?? input.county, city);

  const answers: Partial<QuizAnswers> = {
    propertyCity: city,
    propertyCounty: county,
    propertyZip: normalizeText(input.propertyZip ?? input.zip),
    propertyAddress: input.propertyAddress,
    purchaseTimeline: input.purchaseTimeline,
    householdSize: input.householdSize,
    numberOfBorrowers: input.numberOfBorrowers,
    annualIncome: input.annualIncome,
    incomeVaries: input.incomeVaries,
    isSelfEmployed: input.isSelfEmployed,
    ownedHomeInLast3Years: input.ownedHomeInLast3Years,
    isPrimaryResidence: input.isPrimaryResidence,
    propertyType: input.propertyType,
    veteranStatus: input.veteranStatus,
    occupation: input.occupation,
    creditScoreRange: input.creditScoreRange,
    availableFunds: input.availableFunds,
    targetPriceRange: input.targetPriceRange,
    loanTypeInterest: input.loanTypeInterest,
  };

  // Strip undefined so response stays clean / JSON-stable
  for (const key of Object.keys(answers) as (keyof QuizAnswers)[]) {
    if (answers[key] === undefined) {
      delete answers[key];
    }
  }

  let matches = matchPrograms(PROGRAMS, answers, AMI_LIMITS);

  const limit =
    typeof input.limit === "number" && Number.isFinite(input.limit)
      ? Math.min(Math.max(Math.floor(input.limit), 1), 200)
      : undefined;

  if (limit) matches = matches.slice(0, limit);

  return {
    answers,
    matches: matches.map((m) => ({
      confidence: m.confidence,
      estimatedAmount: m.estimatedAmount,
      matchReasons: m.matchReasons,
      warnings: m.warnings,
      program: toProgramSummary(m.program),
    })),
  };
}

export function parseJsonBody(raw: unknown): Record<string, unknown> {
  if (raw === null || raw === undefined) return {};
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new DpaApiError(400, "Request body must be a JSON object");
  }
  return raw as Record<string, unknown>;
}

export function validateDiscoverBody(
  body: Record<string, unknown>
): DiscoverRequest {
  const state = optionalString(body.state, "state");
  if (state && !["ID", "IDAHO"].includes(state.toUpperCase())) {
    throw new DpaApiError(
      400,
      "This API currently covers Idaho only. Set state to \"ID\"."
    );
  }

  const buyerType = optionalEnum(body.buyerType, BUYER_TYPES, "buyerType");
  const assistanceType = optionalEnum(
    body.assistanceType,
    ASSISTANCE_TYPES,
    "assistanceType"
  );

  return {
    state: state ?? "ID",
    county: optionalString(body.county, "county"),
    city: optionalString(body.city, "city"),
    zip: optionalString(body.zip, "zip"),
    buyerType,
    assistanceType,
    includeClosed: optionalBoolean(body.includeClosed, "includeClosed"),
    includePaused: optionalBoolean(body.includePaused, "includePaused"),
    limit: optionalNumber(body.limit, "limit"),
  };
}

export function validateScreenBody(
  body: Record<string, unknown>
): ScreenRequest {
  const state = optionalString(body.state, "state");
  if (state && !["ID", "IDAHO"].includes(state.toUpperCase())) {
    throw new DpaApiError(
      400,
      "This API currently covers Idaho only. Set state to \"ID\"."
    );
  }

  const county = optionalString(body.county ?? body.propertyCounty, "county");
  const city = optionalString(body.city ?? body.propertyCity, "city");

  if (!county && !city) {
    throw new DpaApiError(
      400,
      "Screen requires at least county or city (propertyCounty / propertyCity also accepted)."
    );
  }

  const ownedHome = body.ownedHomeInLast3Years;
  let ownedHomeInLast3Years: boolean | null | undefined;
  if (ownedHome === null) {
    ownedHomeInLast3Years = null;
  } else if (ownedHome !== undefined) {
    ownedHomeInLast3Years = optionalBoolean(
      ownedHome,
      "ownedHomeInLast3Years"
    );
  }

  return {
    state: state ?? "ID",
    county,
    city,
    zip: optionalString(body.zip ?? body.propertyZip, "zip"),
    propertyCounty: county,
    propertyCity: city,
    propertyZip: optionalString(body.propertyZip ?? body.zip, "propertyZip"),
    propertyAddress: optionalString(body.propertyAddress, "propertyAddress"),
    purchaseTimeline: optionalEnum(
      body.purchaseTimeline,
      ["0-3", "3-6", "6-12", "12+"] as const,
      "purchaseTimeline"
    ),
    householdSize: optionalNumber(body.householdSize, "householdSize"),
    numberOfBorrowers: optionalEnum(
      body.numberOfBorrowers,
      [1, 2] as const,
      "numberOfBorrowers"
    ),
    annualIncome: optionalNumber(body.annualIncome, "annualIncome"),
    incomeVaries: optionalBoolean(body.incomeVaries, "incomeVaries"),
    isSelfEmployed: optionalBoolean(body.isSelfEmployed, "isSelfEmployed"),
    ownedHomeInLast3Years,
    isPrimaryResidence: optionalBoolean(
      body.isPrimaryResidence,
      "isPrimaryResidence"
    ),
    propertyType: optionalEnum(body.propertyType, PROPERTY_TYPES, "propertyType"),
    veteranStatus: optionalEnum(
      body.veteranStatus,
      VETERAN_STATUSES,
      "veteranStatus"
    ),
    occupation: optionalEnum(body.occupation, OCCUPATIONS, "occupation"),
    creditScoreRange: optionalEnum(
      body.creditScoreRange,
      ["<600", "600-619", "620-639", "640-679", "680+"] as const,
      "creditScoreRange"
    ),
    availableFunds: optionalEnum(
      body.availableFunds,
      ["$0-2k", "$2-5k", "$5-10k", "$10k+"] as const,
      "availableFunds"
    ),
    targetPriceRange: optionalEnum(
      body.targetPriceRange,
      ["<300k", "300-450k", "450-600k", "600k+"] as const,
      "targetPriceRange"
    ),
    loanTypeInterest: optionalEnum(
      body.loanTypeInterest,
      ["FHA", "VA", "Conventional", "USDA", "not_sure"] as const,
      "loanTypeInterest"
    ),
    limit: optionalNumber(body.limit, "limit"),
  };
}

function optionalString(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new DpaApiError(400, `${field} must be a string`);
  }
  return value.trim() || undefined;
}

function optionalBoolean(value: unknown, field: string): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "boolean") {
    throw new DpaApiError(400, `${field} must be a boolean`);
  }
  return value;
}

function optionalNumber(value: unknown, field: string): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new DpaApiError(400, `${field} must be a number`);
  }
  return value;
}

function optionalEnum<T extends string | number>(
  value: unknown,
  allowed: readonly T[],
  field: string
): T | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (!(allowed as readonly unknown[]).includes(value)) {
    throw new DpaApiError(
      400,
      `${field} must be one of: ${allowed.join(", ")}`
    );
  }
  return value as T;
}

export class DpaApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "DpaApiError";
    this.status = status;
  }
}

/**
 * Require Authorization: Bearer <DPA_API_SECRET>.
 * Returns a Response on failure, or null when authorized.
 */
export function authorizeDpaRequest(request: Request): Response | null {
  const secret = process.env.DPA_API_SECRET;
  if (!secret) {
    return Response.json(
      {
        ok: false,
        error: "DPA API is not configured",
        code: "not_configured",
      },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json(
      {
        ok: false,
        error: "Missing or invalid Authorization header. Use: Bearer <DPA_API_SECRET>",
        code: "unauthorized",
      },
      { status: 401 }
    );
  }

  const token = authHeader.slice("Bearer ".length).trim();
  if (!timingSafeEqualString(token, secret)) {
    return Response.json(
      {
        ok: false,
        error: "Invalid API secret",
        code: "unauthorized",
      },
      { status: 401 }
    );
  }

  return null;
}

function timingSafeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still compare to avoid short-circuit length leaks on equal-length paths
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function readJsonObject(request: Request): Promise<Record<string, unknown>> {
  let raw: unknown;
  try {
    const text = await request.text();
    if (!text.trim()) return {};
    raw = JSON.parse(text);
  } catch {
    throw new DpaApiError(400, "Invalid JSON body");
  }
  return parseJsonBody(raw);
}

export function jsonOk(data: Record<string, unknown>, status = 200): Response {
  return Response.json({ ok: true, ...data }, { status });
}

export function jsonError(err: unknown): Response {
  if (err instanceof DpaApiError) {
    return Response.json(
      { ok: false, error: err.message, code: statusToCode(err.status) },
      { status: err.status }
    );
  }
  console.error("DPA API error:", err);
  return Response.json(
    { ok: false, error: "Internal server error", code: "internal_error" },
    { status: 500 }
  );
}

function statusToCode(status: number): string {
  if (status === 400) return "bad_request";
  if (status === 401) return "unauthorized";
  return "error";
}
