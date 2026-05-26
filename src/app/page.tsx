import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Clock,
  Shield,
  MapPin,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  getHowToSchema,
  getServiceSchema,
  getFAQSchema,
  combineSchemas,
} from "@/lib/schema";

const benefits = [
  {
    icon: DollarSign,
    title: "Up to 8%",
    description: "IHFA assistance of sales price statewide",
  },
  {
    icon: Clock,
    title: "5 Minutes",
    description: "Quick eligibility quiz to find your programs",
  },
  {
    icon: Shield,
    title: "100% Free",
    description: "No cost, no obligation, no sensitive data required",
  },
];

const features = [
  "10+ Idaho DPA programs for 2026",
  "IHFA statewide + Boise city programs",
  "First-time buyer and repeat buyer programs",
  "Treasure Valley, East Idaho, and North Idaho",
  "Repayable second mortgages and deferred loans",
  "Updated monthly with latest funding status",
];

const stats = [
  { value: "8%", label: "Max IHFA assistance of price" },
  { value: "10+", label: "Programs tracked" },
  { value: "$500", label: "Minimum out-of-pocket (IHFA)" },
];

// Homepage FAQs for schema markup
const homepageFAQs = [
  {
    question: "What is down payment assistance in Idaho?",
    answer:
      "Down payment assistance (DPA) programs in Idaho help homebuyers cover down payment and closing costs. IHFA (Idaho Housing) offers up to 8% of the sales price as a repayable second mortgage with as little as $500 out-of-pocket. Boise city programs add up to $45,000–$65,000 for eligible buyers.",
  },
  {
    question: "Who qualifies for Idaho down payment assistance?",
    answer:
      "IHFA programs are open to first-time and repeat buyers with household income up to $170,000. You must work with an IHFA-approved lender and complete Finally Home! homebuyer education. Local programs like Boise HOP have additional income limits (50–80% AMI).",
  },
  {
    question: "How much down payment assistance can I get in Idaho?",
    answer:
      "IHFA provides up to 8% of the sales price — on a $450,000 home, that's up to $36,000. Boise city buyers may also qualify for HOP assistance up to $45,000–$65,000. Good Credit Rewards offers up to $8,000 for creditworthy buyers.",
  },
  {
    question: "Do I have to pay back Idaho down payment assistance?",
    answer:
      "IHFA's primary DPA is a repayable second mortgage with monthly payments alongside your first mortgage. Boise HOP uses a deferred loan repaid when you sell or refinance. IHFA no longer offers forgivable grants as of 2026.",
  },
  {
    question: "How do I apply for Idaho down payment assistance?",
    answer:
      "Take our free eligibility quiz, then work with an IHFA-approved lender like The Tim Hawkes Team. Complete Finally Home! education at finallyhome.org before closing. Your lender packages the first mortgage and DPA together.",
  },
];

// Combine page-specific schemas
const pageSchemas = combineSchemas(
  getHowToSchema(),
  getServiceSchema(),
  getFAQSchema(homepageFAQs)
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      
      <Header />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-white">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              {/* Badge row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-sm font-medium text-green-700">
                  <MapPin className="w-4 h-4" />
                  Serving All of Idaho
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-800 shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span>Updated May 2026</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </div>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Idaho Down Payment
                <span className="block text-[#10B981]">Assistance 2026</span>
                Programs
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Find IHFA and local down payment assistance programs for Idaho homebuyers.
                Take our free 5-minute quiz — IHFA offers up to{" "}
                <strong className="text-gray-900">8% of sales price</strong> with as
                little as $500 out-of-pocket.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/quiz">
                  <Button size="lg" className="w-full sm:w-auto">
                    Check My Eligibility
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/guide">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Read 2026 Guide
                  </Button>
                </Link>
              </div>

              {/* Neutral disclaimer */}
              <p className="mt-6 text-xs text-gray-400 text-center lg:text-left max-w-lg">
                Idaho DPA Finder is a free educational resource. Program eligibility is determined by administering agencies and participating lenders.
              </p>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  No SSN required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  Results in 5 min
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span>190+ Reviews</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Visual */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <div className="relative z-10 p-8 rounded-3xl bg-white border border-gray-200 shadow-xl">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6 text-4xl">
                    🏡
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-2">
                    Your Home Awaits
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Idaho IHFA programs help Treasure Valley and statewide buyers
                  </p>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="font-[family-name:var(--font-display)] text-xl font-bold text-[#10B981]">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating decoration */}
              <div className="absolute -top-6 -right-6 z-20 w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center animate-float border border-gray-100">
                <DollarSign className="w-10 h-10 text-[#10B981]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  padding="lg"
                  hover
                  className="text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your down payment assistance in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform translate-y-1/2" />

            {[
              {
                step: "01",
                title: "Take the Quiz",
                description:
                  "Answer a few simple questions about your situation. No SSN or sensitive info required.",
                icon: "📝",
              },
              {
                step: "02",
                title: "See Your Matches",
                description:
                  "We instantly match you with programs you may qualify for, showing potential assistance amounts.",
                icon: "🎯",
              },
              {
                step: "03",
                title: "Get Expert Help",
                description:
                  "Optionally connect with a licensed lender who can verify eligibility and guide your application.",
                icon: "🤝",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold mb-6 text-lg shadow-md ring-4 ring-white">
                  {item.step}
                </div>

                <div className="text-4xl mb-4">{item.icon}</div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/quiz">
              <Button size="lg">
                Start Your Free Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Idaho&apos;s IHFA-Centric
                <span className="block text-[#10B981]">2026 DPA Guide</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We track all available down payment assistance programs across
                Idaho so you don&apos;t miss out on money you&apos;re eligible for.
                <strong> Updated April 2026</strong> with the latest funding status for every program.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-lg">
                <div className="space-y-4">
                  {[
                    { city: "Provo", amount: "$60,000", type: "Deferred Loan" },
                    { city: "Ogden", amount: "$50,000", type: "Carry-Back Mortgage" },
                    { city: "Murray", amount: "$30,000", type: "Forgivable Loan" },
                    { city: "Midvale", amount: "$30,000", type: "Forgivable Loan" },
                  ].map((program) => (
                    <div
                      key={program.city}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div>
                        <div className="font-bold text-gray-900">
                          {program.city}
                        </div>
                        <div className="text-sm text-gray-500">
                          {program.type}
                        </div>
                      </div>
                      <div className="font-[family-name:var(--font-display)] text-xl font-bold text-[#10B981]">
                        {program.amount}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center text-sm text-gray-500 font-medium">
                  ...and many more programs available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-[#10B981] text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
                Ready to Own Your Home?
              </h2>
              <p className="text-lg text-green-50 max-w-xl mx-auto mb-8">
                Take the first step today. Our free eligibility quiz takes just 5
                minutes and could save you tens of thousands of dollars.
              </p>
              <Link href="/quiz">
                <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100 ring-offset-transparent ring-white">
                  Check My Eligibility Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Trust Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Maintained by licensed Idaho mortgage professionals</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white text-lg font-bold">
                TH
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] font-bold text-gray-900 text-lg">
                  Tim Hawkes & Jake Peterson
                </div>
                <div className="text-gray-500 text-sm">The Tim Hawkes Team | Cornerstone Home Lending</div>
              </div>
            </div>
            
            {/* Trust Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span>Highly rated professionals verified on multiple platforms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
