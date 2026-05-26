import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button } from "@/components/ui";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Home,
  MapPin,
  GraduationCap,
  Clock,
  FileText,
  Users,
  TrendingUp,
  ChevronRight,
  Star,
  Building2,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";
import { getFAQSchema, getArticleSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Idaho First Time Home Buyer Programs 2026 | Down Payment Assistance",
  description:
    "Idaho first time home buyer programs down payment assistance 2026. Grants up to 8% of sales price, income limits, requirements, and how to qualify. Free eligibility quiz — updated May 2026.",
  alternates: {
    canonical: "/first-time-home-buyer",
  },
  keywords: [
    "idaho down payment assistance programs 2026",
    "idaho first time home buyer programs down payment assistance 2026",
    "idaho first time home buyer 2026",
    "first time home buyer idaho",
    "ihfa down payment assistance",
    "boise first time home buyer",
    "idaho first time home buyer income limits",
    "first time home buyer programs idaho 2026",
  ],
  openGraph: {
    title: "Idaho First Time Home Buyer Programs 2026 | Down Payment Assistance",
    description:
      "2026 guide to Idaho first time home buyer programs with up to 8% of sales price in grants and forgivable loans.",
    type: "article",
  },
};

const guideFAQs = [
  {
    question: "What qualifies as a first-time home buyer in Idaho?",
    answer:
      "In Idaho, a first-time home buyer is generally defined as someone who has not owned a home in the past 3 years. This includes people who have never owned a home, as well as those who owned previously but have been renting for at least 3 years. Some programs have additional requirements.",
  },
  {
    question: "How much down payment assistance can first-time buyers get in Idaho?",
    answer:
      "Idaho first-time home buyers can access up to 8% of sales price in combined down payment assistance by stacking multiple programs. Individual programs range from $2,500 (IHFA DPA) to $60,000+ (Boise HOP). The average buyer uses $30,000-$50,000 in assistance.",
  },
  {
    question: "What are the income limits for first-time buyer programs in Idaho?",
    answer:
      "Most Idaho first-time buyer programs use 80% of Area Median Income (AMI) as the limit. For 2026, this ranges from approximately $70,000-$100,000 for a family of 4 depending on the county. IHFA standard programs allow household income up to $170,000.",
  },
  {
    question: "Do I need perfect credit to qualify for Idaho first-time buyer programs?",
    answer:
      "No, perfect credit is not required. Most programs require a minimum credit score of 620-680, depending on the program and loan type. FHA loans (popular with first-time buyers) allow scores as low as 580 with 3.5% down. Some programs help buyers with credit repair.",
  },
  {
    question: "Can I buy any home with first-time buyer assistance in Idaho?",
    answer:
      "Most programs require the home to be your primary residence and have purchase price limits (typically $400,000-$600,000 depending on the county). Single-family homes, condos, and townhomes usually qualify. Investment properties and second homes do not qualify.",
  },
  {
    question: "Do I have to pay back first-time buyer assistance?",
    answer:
      "It depends on the program type: Grants require no repayment. Forgivable loans are forgiven if you stay 5-10 years. Deferred loans are repaid when you sell, refinance, or pay off the mortgage. Second mortgages have monthly payments but at below-market rates.",
  },
  {
    question: "How long does it take to get first-time buyer assistance in Idaho?",
    answer:
      "The timeline varies by program but typically takes 30-60 days from application to closing. Most programs require a homebuyer education course (4-8 hours) which can be completed online. Pre-approval usually takes 1-3 days.",
  },
  {
    question: "Can I combine multiple first-time buyer programs in Idaho?",
    answer:
      "Yes! Many programs can be stacked for maximum assistance. For example, you could combine IHFA statewide DPA (up to 8% of sales price) with Boise HOP ($45,000–$65,000 in city limits). Some buyers access $50,000+ by combining 2–3 programs.",
  },
];

const steps = [
  {
    number: "01",
    title: "Check Your Eligibility",
    description:
      "Take our free 5-minute quiz to see which programs you may qualify for based on your income, location, and situation.",
    icon: CheckCircle2,
  },
  {
    number: "02",
    title: "Complete Homebuyer Education",
    description:
      "Most programs require a HUD-approved homebuyer education course. Many are available online and take 4-8 hours.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Get Pre-Approved",
    description:
      "Work with a participating lender to get pre-approved for a mortgage and verify your DPA eligibility.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Find Your Home",
    description:
      "Search for homes within program price limits. Your real estate agent can help identify eligible properties.",
    icon: Home,
  },
  {
    number: "05",
    title: "Apply for Assistance",
    description:
      "Submit your DPA application through your lender. They'll coordinate with the program administrators.",
    icon: DollarSign,
  },
  {
    number: "06",
    title: "Close on Your Home",
    description:
      "Your assistance funds are applied at closing, reducing your out-of-pocket costs significantly.",
    icon: TrendingUp,
  },
];

const topPrograms = [
  {
    name: "Boise HOP",
    amount: "$65,000",
    type: "Deferred Loan",
    location: "Boise city limits",
    highlight: "Highest Local Amount",
  },
  {
    name: "IHFA Down Payment Assistance",
    amount: "Up to 8%",
    type: "Second Mortgage",
    location: "Statewide",
    highlight: "$500 Min Out-of-Pocket",
  },
  {
    name: "Idaho Heroes DPA",
    amount: "Up to 8%",
    type: "15-Year Second Mortgage",
    location: "Statewide",
    highlight: "$500 Contribution Waived",
  },
  {
    name: "IHFA First Loan + DPA",
    amount: "Up to 8%",
    type: "Combo Program",
    location: "Statewide",
    highlight: "First + Repeat Buyers",
  },
  {
    name: "Treasure Valley DPA",
    amount: "Up to 8%",
    type: "IHFA + Local",
    location: "Ada & Canyon Counties",
    highlight: "Boise Metro Area",
  },
];

const pageSchemas = combineSchemas(
  getArticleSchema({
    title: "Idaho First Time Home Buyer Programs 2026: Complete Guide",
    description: "Complete guide to first time home buyer programs in Idaho. Learn about grants up to 8% of sales price, income limits, requirements, and how to qualify.",
    url: "/first-time-home-buyer",
    datePublished: "2026-01-13",
    dateModified: "2026-01-21",
  }),
  getFAQSchema(guideFAQs),
  getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "First Time Home Buyer Guide", url: "/first-time-home-buyer" },
  ])
);

export default function FirstTimeHomeBuyerGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-white border-b border-gray-200 py-12 md:py-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent opacity-50" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#10B981]">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">First Time Home Buyer Guide</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-800 shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span>Updated April 2026</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-sm font-medium text-green-700">
                  <GraduationCap className="w-4 h-4" />
                  Complete 2026 Guide
                </div>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Idaho First Time Home Buyer Programs
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                Your complete guide to down payment assistance for first-time home buyers in Idaho.
                Learn about grants up to <strong className="text-gray-900">8% of sales price</strong>, income
                limits, requirements, and how to qualify for programs in your area.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <Button size="lg">
                    Check My Eligibility
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/programs">
                  <Button variant="secondary" size="lg">
                    View All Programs
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-gray-500">
                Free quiz • No SSN required • Results in 5 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: DollarSign, value: "8% of sales price+", label: "Max Combined Assistance" },
                { icon: Building2, value: "20+", label: "Active Programs" },
                { icon: MapPin, value: "29", label: "Counties Covered" },
                { icon: Users, value: "1000s", label: "Families Helped" },
              ].map((stat) => (
                <Card key={stat.label} padding="lg" className="text-center border border-gray-200">
                  <stat.icon className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What is a First-Time Buyer */}
        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  What Qualifies as a First-Time Home Buyer?
                </h2>
                <p className="text-gray-600 mb-6">
                  In Idaho, you're considered a <strong>first-time home buyer</strong> if you haven't
                  owned a home in the past 3 years. This includes:
                </p>
                <ul className="space-y-3">
                  {[
                    "People who have never owned a home",
                    "Renters who previously owned but sold 3+ years ago",
                    "Divorced individuals who only owned with a spouse",
                    "People who only owned a mobile home (not on permanent foundation)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-600">
                  <strong>Note:</strong> Some programs also serve repeat buyers who meet income
                  requirements. Take our quiz to see all programs you qualify for.
                </p>
              </div>

              <Card padding="lg" className="border border-gray-200 bg-green-50/50">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
                  Not Sure If You Qualify?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our free eligibility quiz checks your status against all Idaho programs in just 5
                  minutes. No SSN or sensitive information required.
                </p>
                <Link href="/quiz">
                  <Button className="w-full">
                    Take the Free Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Programs */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Top First-Time Buyer Programs in Idaho
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These programs offer the highest assistance amounts for first-time home buyers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPrograms.map((program) => (
                <Card key={program.name} padding="md" hover className="border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                      {program.highlight}
                    </span>
                    <span className="text-xs text-gray-500">{program.location}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981] mb-1">
                    Up to {program.amount}
                  </div>
                  <p className="text-sm text-gray-500">{program.type}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/programs">
                <Button variant="secondary" size="lg">
                  View All 20+ Programs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How to Qualify */}
        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                How to Get First-Time Buyer Assistance
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these steps to access your down payment assistance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <step.icon className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Income Limits Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Idaho First-Time Buyer Income Limits
                </h2>
                <p className="text-gray-600 mb-6">
                  Most programs use <strong>Area Median Income (AMI)</strong> to determine
                  eligibility. Here are typical 2025 limits for a family of 4:
                </p>

                <div className="space-y-4">
                  {[
                    { county: "Ada County", limit80: "$85,600", limit120: "$128,400" },
                    { county: "Canyon County", limit80: "$85,600", limit120: "$128,400" },
                    { county: "Bonneville County", limit80: "$67,600", limit120: "$101,400" },
                    { county: "Kootenai County", limit80: "$75,300", limit120: "$112,950" },
                  ].map((row) => (
                    <div
                      key={row.county}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <span className="font-medium text-gray-900">{row.county}</span>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">80% AMI: {row.limit80}</div>
                        <div className="text-xs text-gray-400">120% AMI: {row.limit120}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Limits vary by household size. Take our quiz for personalized limits.
                </p>
              </div>

              <Card padding="lg" className="border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Wallet className="w-8 h-8 text-[#10B981]" />
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
                    What Counts as Income?
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Programs typically count <strong>gross household income</strong> from all adults:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Wages and salaries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Self-employment income
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Alimony and child support received
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    Social Security and retirement income
                  </li>
                </ul>
                <p className="text-sm text-gray-500">
                  <strong>Tip:</strong> Some income like foster care payments may be excluded.
                  Check with your lender for specifics.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs by Location */}
        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                First-Time Buyer Programs by Location
              </h2>
              <p className="text-gray-600">Find programs available in your area</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Boise", slug: "boise", programs: "5+" },
                { name: "Meridian", slug: "meridian", programs: "4+" },
                { name: "Nampa", slug: "nampa", programs: "4+" },
                { name: "Idaho Falls", slug: "idaho-falls", programs: "4+" },
                { name: "Coeur d'Alene", slug: "coeur-d-alene", programs: "4+" },
                { name: "Caldwell", slug: "nampa", programs: "4+" },
                { name: "Treasure Valley", slug: "boise", programs: "5+" },
                { name: "Ada County", slug: "boise", programs: "5+" },
              ].map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`}>
                  <Card padding="md" hover className="border border-gray-200 text-center h-full">
                    <MapPin className="w-5 h-5 text-[#10B981] mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{loc.name}</div>
                    <div className="text-xs text-gray-500">{loc.programs} programs</div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/locations">
                <Button variant="secondary">
                  View All Locations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Idaho First-Time Home Buyer FAQ
              </h2>
              <p className="text-gray-600">Common questions about first-time buyer programs</p>
            </div>

            <div className="space-y-4">
              {guideFAQs.map((faq, i) => (
                <Card key={i} padding="lg" className="border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card
              padding="lg"
              className="text-center bg-[#10B981] text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-4">
                  Ready to Buy Your First Home?
                </h2>
                <p className="text-green-50 mb-6 max-w-xl mx-auto">
                  Take our free 5-minute quiz to see which Idaho first-time home buyer programs you
                  may qualify for. No SSN required.
                </p>
                <p className="text-green-100 text-sm mb-6 max-w-lg mx-auto">
                  Looking for a lender who can stack these programs?{" "}
                  <Link href="/contact" className="text-white underline hover:text-green-200">
                    Talk to an IHFA-approved lender
                  </Link>{" "}
                  or read our{" "}
                  <Link href="/guide" className="text-white underline hover:text-green-200">
                    complete Idaho DPA guide
                  </Link>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quiz">
                    <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                      Check My Eligibility
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Talk to an Expert
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                This guide is maintained by licensed Idaho mortgage professionals
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white text-lg font-bold">
                  TH
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] font-bold text-gray-900">
                    Tim Hawkes & Jake Peterson
                  </div>
                  <div className="text-gray-500 text-sm">
                    The Tim Hawkes Team | Cornerstone Home Lending
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span>190+ Reviews</span>
              </div>
              <p className="mt-4 text-xs text-gray-400 max-w-lg mx-auto">
                Idaho DPA Finder is a free educational resource. Program eligibility is determined
                by administering agencies and participating lenders.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

