"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  Users,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Download,
  Home,
  Shield,
} from "lucide-react";
import {
  Button,
  Card,
  FundingBadge,
  Badge,
  IncomeLimitsTable,
  getProgramCounty,
} from "@/components/ui";
import type { Program } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { AnalyticsEvents } from "@/lib/analytics";

const FUNDING_STATUS_LABELS: Record<Program["fundingStatus"], string> = {
  open: "Funds Available",
  limited: "Limited Funds",
  waitlist: "Waitlist",
  paused: "Temporarily Paused",
  closed: "Funding Closed",
};

function getAssistanceTypeLabel(type: Program["assistanceType"]) {
  switch (type) {
    case "grant":
      return "Grant";
    case "forgivable_loan":
      return "Forgivable Loan";
    case "deferred_loan":
      return "Deferred Loan";
    case "second_mortgage":
      return "Second Mortgage";
    default:
      return "Assistance";
  }
}

function getBuyerTypeLabel(program: Program) {
  if (
    program.buyerTypes.includes("first_time") &&
    program.buyerTypes.includes("repeat")
  ) {
    return "First-time & repeat buyers";
  }
  if (program.buyerTypes.includes("first_time")) {
    return "First-time buyers only";
  }
  return "Repeat buyers welcome";
}

function getGeographyLabel(program: Program) {
  if (program.geographyType === "statewide") {
    return "Available statewide in Idaho";
  }
  return program.geographyValues.join(" · ");
}

function getIncomeLabel(program: Program) {
  if (program.maxHouseholdIncome) {
    return `Up to ${formatCurrency(program.maxHouseholdIncome)} household income`;
  }
  if (program.amiPercent === 999) return "No income limit";
  if (program.minAmiPercent) {
    return `${program.minAmiPercent}–${program.amiPercent}% AMI`;
  }
  return `${program.amiPercent}% AMI limit`;
}

function parseApplicationSteps(steps: string) {
  return steps
    .split("\n")
    .map((step) => step.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter(Boolean);
}

function getOfferBullets(program: Program): string[] {
  const fromSummary = program.termsSummary
    .split(/(?<=[.!])\s+/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 12);

  if (fromSummary.length >= 2) {
    return fromSummary;
  }

  const fallback: string[] = [
    `Up to ${formatCurrency(program.maxAmount)} in ${getAssistanceTypeLabel(program.assistanceType).toLowerCase()} assistance`,
    getGeographyLabel(program),
    getBuyerTypeLabel(program),
  ];

  if (program.forgivenessYears) {
    fallback.push(`Forgivable after ${program.forgivenessYears} years in the home`);
  } else if (program.assistanceType === "deferred_loan") {
    fallback.push("0% interest — repaid when you sell, refinance, or move out");
  }

  if (program.maxHouseholdIncome) {
    fallback.push(`Household income up to ${formatCurrency(program.maxHouseholdIncome)}`);
  } else if (program.amiPercent !== 999) {
    fallback.push(`Household income at or below ${program.amiPercent}% AMI`);
  }

  if (program.propertyRules.maxPurchasePrice) {
    fallback.push(
      `Maximum home price: ${formatCurrency(program.propertyRules.maxPurchasePrice)}`
    );
  }

  return fallback;
}

function OfferBulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
        >
          <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700 leading-relaxed">{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

type QuickFact = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

function QuickFactCard({ icon: Icon, label, value }: QuickFact) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm h-full">
      <Icon className="w-5 h-5 text-[#10B981] mb-2" />
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-900 leading-snug">{value}</p>
    </div>
  );
}

function EligibilityItem({
  icon: Icon,
  title,
  children,
  variant = "default",
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  variant?: "default" | "warning";
}) {
  const styles =
    variant === "warning"
      ? "bg-amber-50 border-amber-100"
      : "bg-white border-gray-200";

  return (
    <div className={`p-4 rounded-xl border ${styles}`}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
          <Icon
            className={`w-4 h-4 ${variant === "warning" ? "text-amber-600" : "text-[#10B981]"}`}
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SidebarCTA({ program }: { program: Program }) {
  return (
    <div className="space-y-4">
      <Card padding="lg" className="border border-gray-200 bg-white shadow-sm">
        <p className="text-sm font-medium text-gray-500 mb-1">Maximum assistance</p>
        <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[#10B981] mb-3">
          {formatCurrency(program.maxAmount)}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          <FundingBadge status={program.fundingStatus} />
          <Badge variant="info">{getAssistanceTypeLabel(program.assistanceType)}</Badge>
        </div>
        <ul className="text-sm text-gray-600 space-y-2 mb-5">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
            Free 5-minute eligibility quiz
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
            See if you qualify for this program
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
            No SSN required
          </li>
        </ul>
        <div className="space-y-3">
          <Link
            href="/quiz"
            onClick={() => AnalyticsEvents.programCtaClick(program.slug, "quiz")}
          >
            <Button variant="primary" size="lg" className="w-full">
              Check My Eligibility
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link
            href="/contact"
            onClick={() => AnalyticsEvents.programCtaClick(program.slug, "contact")}
          >
            <Button variant="secondary" size="lg" className="w-full">
              Talk to an Expert
            </Button>
          </Link>
        </div>
      </Card>

      {(program.contactInfo || program.websiteUrl) && (
        <Card padding="md" className="border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-3">Quick contact</p>
          <div className="space-y-2 text-sm">
            {program.contactInfo && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>{program.contactInfo}</span>
              </div>
            )}
            {program.websiteUrl && (
              <a
                href={program.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#10B981] hover:underline"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                {program.websiteUrl.includes("idahohousing.com")
                  ? "IHFA Program Details"
                  : "Official program website"}
              </a>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

export function ProgramDetailView({ program }: { program: Program }) {
  const applicationSteps = parseApplicationSteps(program.applicationSteps);
  const offerBullets = getOfferBullets(program);
  const county = getProgramCounty(program.geographyType, program.geographyValues);
  const quickFacts: QuickFact[] = [
    {
      icon: DollarSign,
      label: "Assistance",
      value: getAssistanceTypeLabel(program.assistanceType),
    },
    {
      icon: MapPin,
      label: "Area",
      value:
        program.geographyType === "statewide"
          ? "Statewide"
          : program.geographyValues[0] ?? "Local",
    },
    {
      icon: Users,
      label: "Buyers",
      value: getBuyerTypeLabel(program).replace(" only", ""),
    },
    {
      icon: Shield,
      label: "Income",
      value: getIncomeLabel(program),
    },
  ];

  return (
    <>
      <Link
        href="/programs"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#10B981] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Programs
      </Link>

      <section className="mb-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
              {getAssistanceTypeLabel(program.assistanceType)}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
              {program.geographyType === "statewide"
                ? "Statewide"
                : program.geographyValues.join(", ")}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
              {FUNDING_STATUS_LABELS[program.fundingStatus]}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight">
            {program.name}
          </h1>
          <p className="text-green-50 text-lg mb-6">{program.agency}</p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-green-100 mb-1">Up to</p>
              <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-extrabold">
                {formatCurrency(program.maxAmount)}
              </p>
            </div>
            {program.forgivenessYears && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm">
                <Clock className="w-4 h-4" />
                Forgiven after {program.forgivenessYears} years
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {quickFacts.map((fact) => (
          <QuickFactCard key={fact.label} {...fact} />
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:items-start">
        <div className="space-y-8 min-w-0">
          <Card padding="lg" className="border border-gray-200">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-3">
              What This Program Offers
            </h2>
            {offerBullets.length > 1 ? (
              <>
                <p className="text-gray-600 leading-relaxed mb-4">{offerBullets[0]}</p>
                <OfferBulletList bullets={offerBullets.slice(1)} />
              </>
            ) : (
              <OfferBulletList bullets={offerBullets} />
            )}
          </Card>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
              Who Qualifies
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <EligibilityItem icon={MapPin} title="Location">
                {getGeographyLabel(program)}
              </EligibilityItem>

              <EligibilityItem icon={Users} title="Buyer type">
                {getBuyerTypeLabel(program)}
              </EligibilityItem>

              {program.propertyRules.primaryResidenceRequired && (
                <EligibilityItem icon={Home} title="Primary residence">
                  Must be your primary home — not an investment property
                </EligibilityItem>
              )}

              {program.requiresEducationCourse && (
                <EligibilityItem icon={GraduationCap} title="Education course">
                  Finally Home! homebuyer education required before closing
                </EligibilityItem>
              )}

              {program.propertyRules.minBuyerContribution && (
                <EligibilityItem
                  icon={AlertCircle}
                  title="Your contribution"
                  variant="warning"
                >
                  You must contribute at least{" "}
                  {formatCurrency(program.propertyRules.minBuyerContribution)} of your own
                  funds
                </EligibilityItem>
              )}

              {program.propertyRules.maxLiquidAssets && (
                <EligibilityItem icon={DollarSign} title="Liquid assets">
                  Assets above {formatCurrency(program.propertyRules.maxLiquidAssets)} may
                  need to be applied toward the purchase before assistance is approved
                </EligibilityItem>
              )}
            </div>

            {program.amiPercent !== 999 && (
              <Card padding="lg" className="mt-4 border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <DollarSign className="w-5 h-5 text-[#10B981] mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Income limits</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {program.maxHouseholdIncome ? (
                        <>
                          Household income up to{" "}
                          {formatCurrency(program.maxHouseholdIncome)} for IHFA programs
                        </>
                      ) : program.minAmiPercent ? (
                        <>
                          Household income must be between {program.minAmiPercent}% and{" "}
                          {program.amiPercent}% AMI for {county} County
                        </>
                      ) : (
                        <>
                          Household income must not exceed {program.amiPercent}% AMI for{" "}
                          {county} County
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <IncomeLimitsTable
                  county={county}
                  amiPercent={program.amiPercent as 80 | 100 | 120}
                  compact
                />
              </Card>
            )}

            {program.amiPercent === 999 && (
              <Card padding="md" className="mt-4 border border-green-200 bg-green-50">
                <p className="text-sm text-green-800 font-medium">
                  No income limit — this program is available to all income levels.
                </p>
              </Card>
            )}
          </section>

          <Card padding="lg" className="border border-gray-200">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-5">
              How to Apply
            </h2>
            <ol className="space-y-0">
              {applicationSteps.map((step, index) => (
                <li key={index} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10B981] text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    {index < applicationSteps.length - 1 && (
                      <span className="w-0.5 flex-1 bg-green-100 mt-2 min-h-[24px]" />
                    )}
                  </div>
                  <p className="text-gray-600 pt-1 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>

            {program.applicationUrl && (
              <a
                href={program.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 bg-[#10B981] text-white rounded-xl font-medium hover:bg-[#059669] transition-colors"
              >
                <Download className="w-4 h-4" />
                {program.applicationUrl.includes("idahohousing.com")
                  ? "Apply on Idaho Housing"
                  : "Apply on Official Site"}
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            )}

            {program.requiredDocs.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Documents you&apos;ll need
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {program.requiredDocs.map((doc, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-sm text-gray-600 p-3 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card padding="lg" className="border border-gray-200 lg:hidden">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
              Program Contact
            </h2>
            <div className="space-y-3 text-sm">
              {program.contactInfo && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-[#10B981]" />
                  {program.contactInfo}
                </div>
              )}
              {program.websiteUrl && (
                <a
                  href={program.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#10B981] hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {program.websiteUrl.includes("idahohousing.com")
                    ? "IHFA Program Details"
                    : "Official Website"}
                </a>
              )}
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Last verified: {program.lastVerified}
            </p>
          </Card>
        </div>

        <aside className="hidden lg:block sticky top-24">
          <SidebarCTA program={program} />
          <p className="text-xs text-gray-500 text-center mt-4">
            Last verified: {program.lastVerified}
          </p>
        </aside>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 p-4 bg-white/95 backdrop-blur border-t border-gray-200 lg:hidden">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Link
            href="/quiz"
            className="flex-1"
            onClick={() => AnalyticsEvents.programCtaClick(program.slug, "quiz")}
          >
            <Button variant="primary" size="lg" className="w-full">
              Check Eligibility
            </Button>
          </Link>
          <Link
            href="/contact"
            onClick={() => AnalyticsEvents.programCtaClick(program.slug, "contact")}
          >
            <Button variant="secondary" size="lg">
              Contact
            </Button>
          </Link>
        </div>
      </div>

      <div className="h-24 lg:hidden" />
    </>
  );
}
