import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  MapPin,
  Users,
  Clock,
  FileText,
  GraduationCap,
  Home,
  Building,
  Landmark,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { PROGRAMS } from "@/lib/programs-data";
import { formatCurrency } from "@/lib/utils";
import {
  getArticleSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Idaho Down Payment Assistance Programs 2026 - Complete Guide",
  description:
    "The complete 2026 guide to Idaho down payment assistance. Learn about income limits, eligibility requirements, application steps, and compare 20+ programs offering up to 8% of sales price in grants and forgivable loans.",
  alternates: {
    canonical: "/guide",
  },
  keywords: [
    "idaho down payment assistance 2026",
    "idaho dpa programs",
    "idaho first time home buyer assistance",
    "ihfa down payment assistance",
    "down payment help idaho",
    "idaho homebuyer programs",
  ],
  openGraph: {
    title: "Idaho Down Payment Assistance Programs 2026 - Complete Guide",
    description:
      "The complete 2026 guide to Idaho down payment assistance. Compare 20+ programs offering up to 8% of sales price.",
  },
};

const guideFAQs = [
  {
    question: "What is down payment assistance (DPA)?",
    answer:
      "Down payment assistance programs help homebuyers cover down payment and closing costs. In Idaho, IHFA offers up to 8% of the sales price as a repayable second mortgage. City of Boise HOP adds up to $45,000–$65,000 through NeighborWorks Boise or LEAP Housing.",
  },
  {
    question: "How much down payment assistance can I get in Idaho in 2026?",
    answer:
      "IHFA provides up to 8% of the sales price or appraised value statewide — on a $450,000 home, that's up to $36,000. City of Boise HOP adds up to $45,000–$65,000 in city limits. Idaho Heroes offers the same 8% for nurses, teachers, and first responders with no $500 minimum.",
  },
  {
    question: "What are the income limits for Idaho DPA programs?",
    answer:
      "IHFA uses a statewide household income limit of $170,000. City of Boise HOP requires income between 50–80% of Ada County AMI. Local AMI tables for Ada, Canyon, Bonneville, and Kootenai counties are on our income limits page.",
  },
  {
    question: "Do I have to be a first-time homebuyer?",
    answer:
      "Not for IHFA! Idaho Housing down payment assistance is available to first-time AND repeat buyers. Some local programs may have additional requirements.",
  },
  {
    question: "Can I combine multiple DPA programs?",
    answer:
      "Often yes — IHFA DPA can stack with City of Boise HOP when lender guidelines allow. NeighborWorks Boise, LEAP Housing, or your IHFA-approved lender can confirm stacking rules.",
  },
  {
    question: "How do I apply for Idaho down payment assistance?",
    answer:
      "Complete Finally Home! education at finallyhome.org, take our eligibility quiz, then work with an IHFA-approved lender who packages your first mortgage and DPA together at closing.",
  },
];

// Get active programs count
const activePrograms = PROGRAMS.filter(p => p.fundingStatus !== "closed").length;
const maxAssistance = Math.max(...PROGRAMS.map(p => p.maxAmount));

const pageSchemas = combineSchemas(
  getArticleSchema({
    title: "Idaho Down Payment Assistance Programs 2026 - Complete Guide",
    description: "The complete 2026 guide to Idaho down payment assistance programs. Compare 20+ programs offering up to 8% of sales price.",
    url: "https://www.idahodownpaymentprograms.com/guide",
    datePublished: "2026-01-01",
    dateModified: "2026-01-15",
  }),
  getFAQSchema(guideFAQs),
  getBreadcrumbSchema([
    { name: "Home", url: "https://www.idahodownpaymentprograms.com" },
    { name: "2026 Guide", url: "https://www.idahodownpaymentprograms.com/guide" },
  ])
);

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-800 shadow-sm mb-6">
                <Clock className="w-4 h-4" />
                <span>Updated May 2026</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              </div>
              
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Idaho Down Payment Assistance
                <span className="block text-[#10B981]">2026 Complete Guide</span>
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about getting help with your down payment in Idaho.
                Compare {activePrograms}+ active programs offering up to{" "}
                <strong className="text-gray-900">{formatCurrency(maxAssistance)}</strong> in assistance.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz" data-track="quiz_cta" data-track-detail="guide_hero">
                  <Button size="lg" className="w-full sm:w-auto">
                    Check My Eligibility
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/programs">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Browse All Programs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-gray-100 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#what-is-dpa" className="text-gray-600 hover:text-[#10B981]">What is DPA?</a>
              <span className="text-gray-300">•</span>
              <a href="#types" className="text-gray-600 hover:text-[#10B981]">Types of Assistance</a>
              <span className="text-gray-300">•</span>
              <a href="#eligibility" className="text-gray-600 hover:text-[#10B981]">Eligibility</a>
              <span className="text-gray-300">•</span>
              <a href="#programs" className="text-gray-600 hover:text-[#10B981]">Top Programs</a>
              <span className="text-gray-300">•</span>
              <a href="#by-location" className="text-gray-600 hover:text-[#10B981]">By Location</a>
              <span className="text-gray-300">•</span>
              <a href="#how-to-apply" className="text-gray-600 hover:text-[#10B981]">How to Apply</a>
              <span className="text-gray-300">•</span>
              <a href="#faq" className="text-gray-600 hover:text-[#10B981]">FAQ</a>
            </div>
          </div>
        </section>

        {/* What is DPA */}
        <section id="what-is-dpa" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-6">
              What is Down Payment Assistance?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Down payment assistance (DPA) programs help homebuyers cover their down payment and closing costs.
                In Idaho, these programs are offered by the state (<strong>Idaho Housing and Finance Association (IHFA)</strong>), 
                counties, cities, and nonprofit organizations.
              </p>
              <p>
                For most homebuyers, the down payment is the biggest barrier to homeownership. 
                Even with FHA loans requiring just 3.5% down, a $400,000 home still needs $14,000 upfront — 
                plus closing costs. DPA programs bridge this gap, sometimes covering 100% of your upfront costs.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              <Card padding="lg" className="text-center">
                <div className="text-4xl font-bold text-[#10B981] mb-2">{activePrograms}+</div>
                <div className="text-gray-600">Active Programs in Idaho</div>
              </Card>
              <Card padding="lg" className="text-center">
                <div className="text-4xl font-bold text-[#10B981] mb-2">{formatCurrency(maxAssistance)}</div>
                <div className="text-gray-600">Maximum Available</div>
              </Card>
              <Card padding="lg" className="text-center">
                <div className="text-4xl font-bold text-[#10B981] mb-2">44</div>
                <div className="text-gray-600">Idaho Counties Covered</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Types of Assistance */}
        <section id="types" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              Types of Down Payment Assistance in Idaho
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Understanding the different types of assistance helps you choose the best option for your situation.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: DollarSign,
                  title: "Grants",
                  subtitle: "Free money — no repayment required",
                  description: "Grants require no repayment. IHFA no longer offers forgivable grants as of 2026, but some local programs may still include grant-style assistance when funding is available.",
                  examples: "Idaho Heroes (8% DPA, $500 contribution waived for nurses, teachers, and first responders)",
                  color: "green",
                },
                {
                  icon: Clock,
                  title: "Forgivable Loans",
                  subtitle: "Forgiven after 5 years of occupancy",
                  description: "These are loans that become grants if you stay in your home for a set period (usually 5 years). If you sell or refinance early, you repay a prorated amount. Less common in Idaho since IHFA shifted to repayable second mortgages in 2026.",
                  examples: "City of Boise HOP (silent second via NeighborWorks Boise or LEAP Housing)",
                  color: "blue",
                },
                {
                  icon: FileText,
                  title: "Deferred Loans",
                  subtitle: "Repaid when you sell, refinance, or pay off mortgage",
                  description: "These loans have no monthly payments but must be repaid when you sell the home, refinance, or pay off your first mortgage. Interest rates are typically 0-3%. Good option if you plan to stay long-term.",
                  examples: "City of Boise HOP ($45,000 fee-simple or $65,000 deed-restricted in city limits)",
                  color: "purple",
                },
                {
                  icon: Building,
                  title: "Second Mortgages",
                  subtitle: "Monthly payments at below-market rates",
                  description: "IHFA's primary DPA is a 15-year fixed second mortgage — up to 8% of the lesser of sales price or appraised value, interest rate = first mortgage + 2.00%, with as little as $500 out of pocket.",
                  examples: "IHFA DPCC (up to 8%), Idaho Heroes (same 8% with $500 waived for eligible occupations)",
                  color: "orange",
                },
              ].map((type) => {
                const Icon = type.icon;
                return (
                  <Card key={type.title} padding="lg" className="border-l-4 border-l-[#10B981]">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#10B981]" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
                          {type.title}
                        </h3>
                        <p className="text-[#10B981] font-medium text-sm mb-2">{type.subtitle}</p>
                        <p className="text-gray-600 mb-3">{type.description}</p>
                        <p className="text-sm text-gray-500">
                          <strong>Examples:</strong> {type.examples}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              Idaho DPA Eligibility Requirements
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Most programs share similar requirements. Here's what you typically need to qualify:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#10B981]" />
                  Income Limits
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Most programs use <strong>Area Median Income (AMI)</strong> limits that vary by household size and county.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">2026 Typical Limits (Family of 4):</p>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>80% AMI (Ada Co., family of 4):</strong> ~$85,600/year</li>
                      <li>• <strong>100% AMI:</strong> ~$107,000/year</li>
                      <li>• <strong>IHFA household limit:</strong> up to $170,000/year</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    <Link href="/quiz" data-track="quiz_cta" data-track-detail="guide_income" className="text-[#10B981] hover:underline">Take our quiz</Link> to check income limits for your specific situation.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#10B981]" />
                  Property Requirements
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Must be your <strong>primary residence</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Located in the program's <strong>service area</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Meet <strong>purchase price limits</strong> (varies by program)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Usually single-family, condo, or townhome</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#10B981]" />
                  Credit Requirements
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>620+ credit score</strong> for most programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>660+ score</strong> for best options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Stable employment history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Acceptable debt-to-income ratio</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#10B981]" />
                  Education Requirements
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Most programs require a <strong>homebuyer education course</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Online courses available (2-8 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>HUD-approved counseling accepted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>Some programs waive this for repeat buyers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Top Programs */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              Top Idaho DPA Programs for 2026
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Here are the highest-value programs currently available:
            </p>

            <div className="space-y-4">
              {[
                { name: "IHFA Down Payment & Closing Cost Assistance", amount: 50000, type: "Second Mortgage", location: "Statewide", link: "/programs/ihfa-dpa" },
                { name: "Boise Homeownership Opportunity Program (HOP)", amount: 65000, type: "Deferred Loan", location: "Boise", link: "/programs/boise-city" },
                { name: "IHFA First Loan + DPA Combo", amount: 50000, type: "First Mortgage + DPA", location: "Statewide", link: "/programs/ihfa-first-loan" },
                { name: "Treasure Valley DPA Overview", amount: 65000, type: "Combined", location: "Ada + Canyon", link: "/programs/treasure-valley" },
                { name: "Idaho Heroes DPA", amount: 56000, type: "15-Year Second Mortgage", location: "Statewide", link: "/programs/idaho-heroes" },
              ].map((program, index) => (
                <Link key={program.name} href={program.link}>
                  <Card padding="md" hover className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{program.name}</h3>
                        <p className="text-sm text-gray-500">{program.location} • {program.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-[family-name:var(--font-display)] text-xl font-bold text-[#10B981]">
                        {formatCurrency(program.amount)}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/programs">
                <Button variant="secondary" size="lg">
                  View All {PROGRAMS.length} Programs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* By Location */}
        <section id="by-location" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              Programs by Location
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Many programs are location-specific. Find assistance available in your area:
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Boise", slug: "boise", programs: 5 },
                { name: "Meridian", slug: "meridian", programs: 4 },
                { name: "Nampa", slug: "nampa", programs: 5 },
                { name: "Idaho Falls", slug: "idaho-falls", programs: 4 },
                { name: "Coeur d'Alene", slug: "coeur-d-alene", programs: 4 },
              ].map((location) => (
                <Link key={location.slug} href={`/locations/${location.slug}`}>
                  <Card padding="md" hover className="text-center">
                    <MapPin className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                    <h3 className="font-bold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.programs}+ programs</p>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/locations">
                <Button variant="secondary">
                  View All Locations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              How to Apply for Idaho DPA
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Follow these steps to secure your down payment assistance:
            </p>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Check Your Eligibility",
                  description: "Take our free 5-minute quiz to see which programs you may qualify for. No SSN or sensitive info required.",
                  action: { text: "Take the Quiz", href: "/quiz" },
                },
                {
                  step: 2,
                  title: "Complete Homebuyer Education",
                  description: "Most programs require a HUD-approved homebuyer education course. Online courses take 2-8 hours and cost $50-100. Some programs reimburse this cost.",
                },
                {
                  step: 3,
                  title: "Get Pre-Approved with a Participating Lender",
                  description: "Work with a lender experienced in DPA programs. They'll verify your income, credit, and eligibility for specific programs. Not all lenders offer all programs.",
                },
                {
                  step: 4,
                  title: "Find Your Home",
                  description: "Search for homes within program price limits and geographic areas. Your lender can help you understand the limits for programs you're targeting.",
                },
                {
                  step: 5,
                  title: "Apply for DPA Programs",
                  description: "Your lender submits applications on your behalf. Some programs like city grants require separate applications. Processing times vary from 1 day to 2+ weeks.",
                },
                {
                  step: 6,
                  title: "Close on Your Home",
                  description: "DPA funds are disbursed at closing. You'll sign documents for your first mortgage plus any DPA loans. Congratulations — you're a homeowner!",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    {item.action && (
                      <Link href={item.action.href} className="inline-flex items-center gap-1 text-[#10B981] font-medium mt-2 hover:underline">
                        {item.action.text}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {guideFAQs.map((faq, index) => (
                <Card key={index} padding="lg">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#10B981]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-4">
              Ready to Find Your Down Payment Assistance?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Take our free 5-minute quiz and discover which Idaho programs you may qualify for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz" data-track="quiz_cta" data-track-detail="guide_bottom">
                <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                  Check My Eligibility Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact" data-track="contact_cta" data-track-detail="guide_bottom">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Talk to an IHFA Lender
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 bg-gray-100 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>
              <strong>Last updated:</strong> April 23, 2026 • 
              <Link href="/methodology" className="text-[#10B981] hover:underline ml-1">How we track programs</Link>
            </p>
            <p className="mt-2">
              Maintained by licensed Idaho mortgage professionals. 
              <Link href="/about" className="text-[#10B981] hover:underline ml-1">Learn about our team</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

