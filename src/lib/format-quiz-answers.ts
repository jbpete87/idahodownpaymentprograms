import type { QuizAnswers } from "@/types";

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const TIMELINE_LABELS: Record<NonNullable<QuizAnswers["purchaseTimeline"]>, string> = {
  "0-3": "0–3 months (actively looking)",
  "3-6": "3–6 months",
  "6-12": "6–12 months",
  "12+": "12+ months (exploring)",
};

const PROPERTY_TYPE_LABELS: Record<QuizAnswers["propertyType"], string> = {
  single_family: "Single-family home",
  condo: "Condo",
  townhome: "Townhome",
  "2-4_unit": "2–4 unit property",
};

const VETERAN_LABELS: Record<QuizAnswers["veteranStatus"], string> = {
  none: "Not a veteran",
  veteran: "Veteran (honorably discharged)",
  active_duty: "Active duty",
  reservist: "Reservist / National Guard",
  surviving_spouse: "Surviving spouse of veteran",
};

const OCCUPATION_LABELS: Record<QuizAnswers["occupation"], string> = {
  other: "Other occupation",
  teacher: "Teacher (K–12)",
  first_responder: "First responder (police, fire, EMS)",
  healthcare: "Healthcare worker",
  government: "Government employee",
  any: "Any occupation",
};

const CREDIT_LABELS: Record<NonNullable<QuizAnswers["creditScoreRange"]>, string> = {
  "<600": "Below 600",
  "600-619": "600–619",
  "620-639": "620–639",
  "640-679": "640–679",
  "680+": "680 or higher",
};

const FUNDS_LABELS: Record<NonNullable<QuizAnswers["availableFunds"]>, string> = {
  "$0-2k": "$0 – $2,000",
  "$2-5k": "$2,000 – $5,000",
  "$5-10k": "$5,000 – $10,000",
  "$10k+": "$10,000+",
};

const PRICE_LABELS: Record<NonNullable<QuizAnswers["targetPriceRange"]>, string> = {
  "<300k": "Under $300,000",
  "300-450k": "$300,000 – $450,000",
  "450-600k": "$450,000 – $600,000",
  "600k+": "Over $600,000",
};

const LOAN_TYPE_LABELS: Record<NonNullable<QuizAnswers["loanTypeInterest"]>, string> = {
  FHA: "FHA",
  VA: "VA",
  Conventional: "Conventional",
  USDA: "USDA",
  not_sure: "Not sure yet",
};

export type QuizAnswerRow = { label: string; value: string };

/** Human-readable quiz answers for lead notification emails. */
export function formatQuizAnswersSummary(
  answers: Partial<QuizAnswers>
): QuizAnswerRow[] {
  const rows: QuizAnswerRow[] = [];

  const add = (label: string, value: string | undefined) => {
    rows.push({ label, value: value?.trim() ? value : "Not provided" });
  };

  add(
    "Target county",
    answers.propertyCounty ? `${answers.propertyCounty} County` : undefined
  );
  add(
    "Target city",
    answers.propertyCity
      ? answers.propertyCity === "other"
        ? "Other city"
        : answers.propertyCity
      : undefined
  );
  add("ZIP code", answers.propertyZip);
  add(
    "Purchase timeline",
    answers.purchaseTimeline ? TIMELINE_LABELS[answers.purchaseTimeline] : undefined
  );
  add(
    "Household size",
    answers.householdSize ? `${answers.householdSize} people` : undefined
  );
  add(
    "Borrowers on loan",
    answers.numberOfBorrowers
      ? answers.numberOfBorrowers === 1
        ? "1 borrower"
        : "2 borrowers (with co-borrower)"
      : undefined
  );
  add(
    "Annual household income",
    answers.annualIncome ? formatCurrency(answers.annualIncome) : undefined
  );
  add("Income varies month-to-month", answers.incomeVaries ? "Yes" : "No");
  add("Self-employment income", answers.isSelfEmployed ? "Yes" : "No");
  add(
    "Owned home in last 3 years",
    answers.ownedHomeInLast3Years === null
      ? "Not sure"
      : answers.ownedHomeInLast3Years === undefined
        ? undefined
        : answers.ownedHomeInLast3Years
          ? "Yes"
          : "No (first-time buyer)"
  );
  add(
    "Primary residence",
    answers.isPrimaryResidence === undefined
      ? undefined
      : answers.isPrimaryResidence
        ? "Yes — will live there"
        : "No — investment/second home"
  );
  add(
    "Property type",
    answers.propertyType ? PROPERTY_TYPE_LABELS[answers.propertyType] : undefined
  );
  add(
    "Military / veteran status",
    answers.veteranStatus ? VETERAN_LABELS[answers.veteranStatus] : undefined
  );
  add(
    "Occupation",
    answers.occupation ? OCCUPATION_LABELS[answers.occupation] : undefined
  );
  add(
    "Credit score range",
    answers.creditScoreRange ? CREDIT_LABELS[answers.creditScoreRange] : undefined
  );
  add(
    "Available funds for closing",
    answers.availableFunds ? FUNDS_LABELS[answers.availableFunds] : undefined
  );
  add(
    "Target purchase price",
    answers.targetPriceRange ? PRICE_LABELS[answers.targetPriceRange] : undefined
  );
  add(
    "Loan type preference",
    answers.loanTypeInterest ? LOAN_TYPE_LABELS[answers.loanTypeInterest] : undefined
  );

  return rows;
}

export function quizAnswersToEmailHtml(answers: Partial<QuizAnswers>): string {
  const rows = formatQuizAnswersSummary(answers);

  const tableRows = rows
    .map(
      (row) =>
        `<tr><td style="padding: 8px 12px 8px 0; font-weight: 600; color: #374151; width: 180px; vertical-align: top;">${escapeHtml(row.label)}</td><td style="padding: 8px 0; color: #4b5563;">${escapeHtml(row.value)}</td></tr>`
    )
    .join("");

  return `
    <h3 style="margin: 24px 0 8px; font-size: 14px; color: #374151;">Quiz Responses</h3>
    <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px;">
      ${tableRows}
    </table>
  `;
}
