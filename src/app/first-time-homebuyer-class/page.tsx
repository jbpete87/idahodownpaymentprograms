import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  CheckCircle2,
  CreditCard,
  DollarSign,
  Home,
  Calculator,
  ArrowRight,
  Shield,
  Phone,
  Mail,
  BookOpen,
  Search,
  Star,
  TrendingUp,
  Users,
  FileText,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "First-Time Homebuyer Class Resource Guide | Idaho 2026",
  description:
    "Everything you need to know about buying your first home in Idaho. Covers the homebuying process, credit requirements, down payment assistance, loan types, and affordability.",
  alternates: {
    canonical: "/first-time-homebuyer-class",
  },
};

const processSteps = [
  {
    step: 1,
    title: "Get Pre-Approved",
    description:
      "Talk to a licensed loan officer to understand what you can afford. This gives you a budget and shows sellers you're serious.",
    icon: FileText,
    tip: "Pre-approval is FREE and does not obligate you to anything.",
  },
  {
    step: 2,
    title: "Find Your Home",
    description:
      "Work with a real estate agent to search for homes in your price range. Your agent represents YOU and their service costs you nothing.",
    icon: Search,
    tip: "Stay within your pre-approved budget for the best experience.",
  },
  {
    step: 3,
    title: "Make an Offer & Go Under Contract",
    description:
      "Your agent helps you write a competitive offer. Once accepted, you're 'under contract' with a typical 30-45 day closing timeline.",
    icon: Home,
    tip: "Earnest money (typically $1,000-$5,000) shows good faith.",
  },
  {
    step: 4,
    title: "Inspection, Appraisal & Underwriting",
    description:
      "Get a home inspection, the lender orders an appraisal, and your loan goes through final underwriting. Stay in close contact with your loan officer.",
    icon: Shield,
    tip: "Do NOT open new credit, change jobs, or make large purchases during this time.",
  },
  {
    step: 5,
    title: "Close & Get Your Keys",
    description:
      "Sign final paperwork, pay closing costs, and receive the keys to your new home. Congratulations — you're a homeowner!",
    icon: Star,
    tip: "Closing typically takes about 1 hour. Bring a valid photo ID.",
  },
];

const loanTypes = [
  {
    name: "Conventional",
    downPayment: "3%",
    minCredit: "620",
    highlight: "Best rates with high credit scores (740+)",
    mi: "PMI required below 20% down (varies by credit score)",
    color: "#3B82F6",
  },
  {
    name: "FHA",
    downPayment: "3.5%",
    minCredit: "580",
    highlight: "Most flexible credit requirements",
    mi: "0.55%/yr MIP + 1.75% upfront (for life of loan if < 10% down)",
    color: "#10B981",
  },
  {
    name: "VA",
    downPayment: "0%",
    minCredit: "580",
    highlight: "Best deal for eligible veterans & active duty",
    mi: "No monthly MI — 2.15% one-time funding fee",
    color: "#8B5CF6",
  },
];

const creditTips = [
  "Pay all bills on time — payment history is #1",
  "Keep credit card balances below 30% of limits",
  "Don't open new accounts before applying",
  "Don't close old credit cards",
  "Check your credit report for errors at AnnualCreditReport.com",
  "Become an authorized user on a family member's card if needed",
];

const topPrograms = [
  {
    name: "IHFA Down Payment Assistance",
    amount: "Up to 8%",
    type: "Statewide",
    note: "Repayable second mortgage with as little as $500 out of pocket",
  },
  {
    name: "Boise HOP",
    amount: "Up to $45,000",
    type: "Boise city limits",
    note: "Apply through NeighborWorks Boise or LEAP Housing — silent second repaid at sale or refinance",
  },
    {
    name: "Idaho Heroes DPA",
    amount: "Up to 8%",
    type: "Statewide",
    note: "For nurses, teachers, and first responders — $500 contribution waived",
  },
  {
    name: "IHFA First Loan + DPA",
    amount: "Up to 8%",
    type: "Statewide",
    note: "Competitive first mortgage paired with down payment help",
  },
  {
    name: "Treasure Valley Programs",
    amount: "Up to 8%",
    type: "Ada & Canyon Counties",
    note: "IHFA statewide DPA for Boise metro buyers",
  },
];

export default function FirstTimeHomebuyerClassPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              header, footer, .no-print { display: none !important; }
              body { background: white !important; }
              .print-break { page-break-before: always; }
              a[href]::after { content: none !important; }
              .shadow-sm, .shadow-md, .shadow-lg { box-shadow: none !important; }
            }
          `,
        }}
      />

      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-medium text-[#10B981] bg-green-50 px-3 py-1 rounded-full">
              Class Resource
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            First-Time Homebuyer Guide
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Everything you need to know about buying your first home in Idaho — the process, 
            credit requirements, down payment options, and available assistance programs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#10B981] text-white font-medium hover:bg-[#059669] transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Try the Affordability Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Search className="w-5 h-5" />
              Find DPA Programs You Qualify For
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Section 1: The Homebuying Process */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
              The Homebuying Process
            </h2>
          </div>

          <div className="space-y-4">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg font-[family-name:var(--font-display)]">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-sm text-[#10B981] font-medium flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {item.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Credit Basics */}
        <section className="print-break">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
              Credit Basics
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4">
              Minimum Credit Scores by Loan Type
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {loanTypes.map((loan) => (
                <div
                  key={loan.name}
                  className="text-center p-4 rounded-xl bg-gray-50"
                >
                  <p className="text-sm font-medium text-gray-500 mb-1">{loan.name}</p>
                  <p
                    className="text-3xl font-bold font-[family-name:var(--font-display)]"
                    style={{ color: loan.color }}
                  >
                    {loan.minCredit}+
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Higher credit scores = lower interest rates and lower mortgage insurance costs.
              A 740+ score gets you the best conventional rates.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4">
              Tips to Improve Your Credit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {creditTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Down Payment & Loan Types */}
        <section className="print-break">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#10B981]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
              Down Payment Minimums & Loan Types
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loanTypes.map((loan) => (
              <div
                key={loan.name}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <div
                  className="px-5 py-4"
                  style={{
                    backgroundColor: loan.color + "10",
                    borderBottom: `2px solid ${loan.color}`,
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-display)] text-xl font-bold"
                    style={{ color: loan.color }}
                  >
                    {loan.name}
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Min Down Payment
                    </p>
                    <p
                      className="text-3xl font-bold font-[family-name:var(--font-display)]"
                      style={{ color: loan.color }}
                    >
                      {loan.downPayment}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{loan.highlight}</p>
                  <p className="text-xs text-gray-500">{loan.mi}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>On a $400,000 home:</strong> Conventional = $12,000 down, FHA = $14,000 down,
              VA = $0 down. Down payment assistance programs can cover these amounts!
            </p>
          </div>
        </section>

        {/* Section 4: Down Payment Assistance Programs */}
        <section className="print-break">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
              Idaho Down Payment Assistance Programs
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
            <p className="text-gray-700 mb-4">
              Idaho has <strong>10+ active programs</strong> offering repayable second mortgages, deferred loans, and
              local city assistance to help with your down payment and closing costs. Here are some
              highlights:
            </p>

            <div className="space-y-3">
              {topPrograms.map((program, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-900">{program.name}</h4>
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap font-medium">
                        {program.amount}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{program.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{program.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10B981] text-white text-sm font-medium hover:bg-[#059669] transition-colors"
              >
                View All 20+ Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Search className="w-4 h-4" />
                Check Which Programs I Qualify For
              </Link>
            </div>
          </div>

          {/* Eligibility basics */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-3">
              Typical Eligibility Requirements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Income Limits</p>
                  <p className="text-xs text-gray-500">Usually 80-120% of Area Median Income</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Credit Score</p>
                  <p className="text-xs text-gray-500">620-680 minimum depending on program</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Primary Residence</p>
                  <p className="text-xs text-gray-500">Must live in the home as your primary residence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Homebuyer Education</p>
                  <p className="text-xs text-gray-500">Most programs require a HUD-approved course</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive Tools CTA */}
        <section className="print-break">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
              Free Tools — Try Them Now
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Calculator CTA */}
            <Link
              href="/calculator"
              className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#10B981] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <Calculator className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
                Affordability Calculator
              </h3>
              <p className="text-gray-600 mb-4">
                Enter your income, debts, and credit score to see your estimated max purchase
                price and monthly payment for Conventional, FHA, and VA loans.
              </p>
              <span className="inline-flex items-center gap-2 text-[#10B981] font-medium group-hover:gap-3 transition-all">
                Try the Calculator
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Quiz CTA */}
            <Link
              href="/quiz"
              className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#10B981] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <Search className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
                DPA Eligibility Quiz
              </h3>
              <p className="text-gray-600 mb-4">
                Answer a few quick questions to find out which Idaho down payment assistance
                programs you may qualify for. Takes less than 5 minutes.
              </p>
              <span className="inline-flex items-center gap-2 text-purple-500 font-medium group-hover:gap-3 transition-all">
                Find My Programs
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-2">
              Ready to Take the Next Step?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Contact us for a free, no-obligation consultation. We can help you understand your
              options and get pre-approved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:8018207620"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#10B981] text-white font-medium hover:bg-[#059669] transition-colors"
              >
                <Phone className="w-5 h-5" />
                (801) 820-7620
              </a>
              <a
                href="sms:8016986071"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Text: (801) 698-6071
              </a>
              <a
                href="mailto:jake@thetimhawkesteam.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Jake Peterson &amp; Tim Hawkes &middot; The Tim Hawkes Team &middot; Cornerstone Home Lending &middot; NMLS #2258
            </p>
          </div>
        </section>

        {/* Website URL for printing */}
        <div className="text-center text-sm text-gray-400 pb-4">
          <p>
            <strong>idahodownpaymentprograms.com</strong> &mdash; Idaho&apos;s most comprehensive
            resource for down payment assistance
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

