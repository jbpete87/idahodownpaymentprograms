import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button, FundingBadge, Badge, IncomeLimitsTable, getProgramCounty } from "@/components/ui";
import { PROGRAMS } from "@/lib/programs-data";
import { formatCurrency } from "@/lib/utils";
import { getProgramSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { getProgramMetadata } from "@/lib/seo-metadata";
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
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  return {
    ...getProgramMetadata(slug, {
      title: `${program.name} | Idaho Down Payment Assistance`,
      description: `${program.termsSummary} Up to ${formatCurrency(program.maxAmount)} available.`,
    }),
  };
}

export async function generateStaticParams() {
  return PROGRAMS.map((program) => ({
    slug: program.slug,
  }));
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  // Generate structured data for this program
  const programSchema = getProgramSchema({
    name: program.name,
    slug: program.slug,
    description: program.termsSummary,
    maxAmount: program.maxAmount,
    type: program.assistanceType,
    agency: program.agency,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: program.name, url: `/programs/${program.slug}` },
  ]);

  const pageSchemas = combineSchemas(programSchema, breadcrumbSchema);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Program-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#10B981] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Programs
        </Link>

        {/* Header */}
        <Card padding="lg" className="mb-8 border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-start gap-4 mb-6">
            <FundingBadge status={program.fundingStatus} />
            <Badge>
              {program.geographyType === "statewide"
                ? "Statewide"
                : program.geographyValues.join(", ")}
            </Badge>
            <Badge variant="info">
              {program.assistanceType === "grant"
                ? "Grant"
                : program.assistanceType === "forgivable_loan"
                ? "Forgivable Loan"
                : program.assistanceType === "deferred_loan"
                ? "Deferred Loan"
                : "Second Mortgage"}
            </Badge>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {program.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{program.agency}</p>

          {/* Key stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <DollarSign className="w-6 h-6 mx-auto text-[#10B981] mb-2" />
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981]">
                {formatCurrency(program.maxAmount)}
              </div>
              <div className="text-sm text-gray-500">Maximum Assistance</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <Users className="w-6 h-6 mx-auto text-[#10B981] mb-2" />
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
                {program.amiPercent === 999 ? "None" : `${program.amiPercent}%`}
              </div>
              <div className="text-sm text-gray-500">
                {program.amiPercent === 999 ? "No Income Limit" : "AMI Income Limit"}
              </div>
            </div>
            {program.forgivenessYears && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <Clock className="w-6 h-6 mx-auto text-[#10B981] mb-2" />
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
                  {program.forgivenessYears} years
                </div>
                <div className="text-sm text-gray-500">Until Forgiveness</div>
              </div>
            )}
          </div>
        </Card>

        {/* Summary */}
        <Card padding="lg" className="mb-8 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
            Program Summary
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {program.termsSummary}
          </p>
        </Card>

        {/* Eligibility */}
        <Card padding="lg" className="mb-8 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-6">
            Eligibility Requirements
          </h2>

          <div className="space-y-4">
            {/* Location */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <MapPin className="w-5 h-5 text-[#10B981] mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Location</div>
                <div className="text-gray-600">
                  {program.geographyType === "statewide"
                    ? "Available statewide in Idaho"
                    : `Property must be in ${program.geographyValues.join(
                        " or "
                      )}`}
                </div>
              </div>
            </div>

            {/* Buyer type */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Users className="w-5 h-5 text-[#10B981] mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Buyer Type</div>
                <div className="text-gray-600">
                  {program.buyerTypes.includes("first_time") &&
                  program.buyerTypes.includes("repeat")
                    ? "Open to all buyers (first-time and repeat)"
                    : program.buyerTypes.includes("first_time")
                    ? "First-time buyers only (no home ownership in past 3 years)"
                    : "Repeat buyers welcome"}
                </div>
              </div>
            </div>

            {/* Income */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <DollarSign className="w-5 h-5 text-[#10B981] mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Income Limit</div>
                  {program.amiPercent === 999 ? (
                    <div className="text-gray-600">
                      <span className="text-[#10B981] font-semibold">No income limit</span> — This program is available to all income levels.
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      Household income must not exceed {program.amiPercent}% AMI for{" "}
                      {getProgramCounty(program.geographyType, program.geographyValues)} County:
                    </div>
                  )}
                </div>
              </div>
              {program.amiPercent !== 999 && (
                <div className="ml-9">
                  <IncomeLimitsTable
                    county={getProgramCounty(program.geographyType, program.geographyValues)}
                    amiPercent={program.amiPercent as 80 | 100 | 120}
                    compact
                  />
                </div>
              )}
            </div>

            {/* Primary residence */}
            {program.propertyRules.primaryResidenceRequired && (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">
                    Primary Residence
                  </div>
                  <div className="text-gray-600">
                    Must be your primary residence (not investment property)
                  </div>
                </div>
              </div>
            )}

            {/* Min contribution */}
            {program.propertyRules.minBuyerContribution && (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">
                    Buyer Contribution
                  </div>
                  <div className="text-gray-600">
                    You must contribute at least{" "}
                    {formatCurrency(program.propertyRules.minBuyerContribution)}{" "}
                    of your own funds
                  </div>
                </div>
              </div>
            )}

            {/* Education course */}
            {program.requiresEducationCourse && (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <GraduationCap className="w-5 h-5 text-[#10B981] mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">
                    Homebuyer Education
                  </div>
                  <div className="text-gray-600">
                    Completion of a HUD-approved homebuyer education course is
                    required
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* How to Apply */}
        <Card padding="lg" className="mb-8 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
            How to Apply
          </h2>
          
          {/* Application Steps - rendered as numbered list */}
          <ol className="space-y-3 mb-6">
            {program.applicationSteps.split('\n').filter(step => step.trim()).map((step, index) => {
              // Remove leading number and period if present (e.g., "1. " or "1) ")
              const cleanStep = step.replace(/^\d+[\.\)]\s*/, '').trim();
              return (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-semibold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-600 pt-0.5">{cleanStep}</span>
                </li>
              );
            })}
          </ol>

          {/* Official application link */}
          {program.applicationUrl && (
            <a
              href={program.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#10B981] text-white rounded-lg font-medium hover:bg-[#059669] transition-colors mb-6"
            >
              <ExternalLink className="w-4 h-4" />
              {program.applicationUrl.includes("idahohousing.com")
                ? "Apply on Idaho Housing"
                : "Apply on Official Site"}
            </a>
          )}

          {program.requiredDocs.length > 0 && (
            <>
              <h3 className="font-semibold text-gray-900 mb-3 mt-6">
                Required Documents
              </h3>
              <ul className="space-y-2">
                {program.requiredDocs.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <FileText className="w-4 h-4 text-[#10B981]" />
                    {doc}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        {/* Contact */}
        <Card padding="lg" className="mb-8 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="flex flex-wrap gap-4">
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
          <p className="mt-4 text-sm text-gray-500">
            Last verified: {program.lastVerified}
          </p>
        </Card>

        {/* CTA */}
        <Card padding="lg" className="text-center bg-gray-50 border-dashed border-2 border-gray-200 shadow-none">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
            Think You Qualify?
          </h3>
          <p className="text-gray-600 mb-6">
            Take our quiz to confirm eligibility and discover other programs you
            may qualify for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button variant="primary" size="lg">
                Check My Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
