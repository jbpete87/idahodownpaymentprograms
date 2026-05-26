import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button } from "@/components/ui";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  RefreshCw,
  Shield,
  Users,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";
import { getArticleSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How We Track Programs | Idaho Down Payment Assistance Finder",
  description:
    "Learn how Idaho DPA Finder tracks, verifies, and updates down payment assistance program information across Idaho.",
  alternates: {
    canonical: "/methodology",
  },
};

// Structured data for Methodology page
const methodologySchemas = combineSchemas(
  getArticleSchema({
    title: "How We Track Idaho Down Payment Assistance Programs",
    description:
      "Learn how Idaho DPA Finder tracks, verifies, and updates down payment assistance program information across Idaho.",
    url: "/methodology",
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  }),
  getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "How We Track Programs", url: "/methodology" },
  ])
);

const dataSources = [
  {
    name: "Idaho Housing — Down Payment Assistance",
    url: "https://www.idahohousing.com/homebuyers/down-payment-closing-cost-assistance/",
    description: "Official IHFA DPA overview, eligibility, and how to apply",
  },
  {
    name: "Idaho Housing — Loan Product Overview",
    url: "https://www.idahohousing.com/partners/lenders-realtors/loan-product/",
    description: "IHFA first mortgage and DPA product details for lenders and buyers",
  },
  {
    name: "City & County Websites",
    url: null,
    description: "Direct from municipal housing departments and grant programs",
  },
  {
    name: "HUD Resources",
    url: "https://www.hud.gov",
    description: "Federal guidelines, AMI data, and compliance requirements",
  },
  {
    name: "Program Administrators",
    url: null,
    description: "Direct communication with program contacts for verification",
  },
];

const updateProcess = [
  {
    icon: Database,
    title: "Monitor Official Sources",
    description:
      "We regularly check official program websites, housing authority announcements, and HUD updates for changes to income limits, funding status, and eligibility requirements.",
  },
  {
    icon: RefreshCw,
    title: "Verify & Update Data",
    description:
      "When changes are detected, we verify the information with multiple sources before updating our database. This includes contacting program administrators when needed.",
  },
  {
    icon: Users,
    title: "Expert Review",
    description:
      "Tim Hawkes and Jake Peterson, licensed Idaho mortgage professionals, review all program data for accuracy and completeness based on their direct experience with these programs.",
  },
  {
    icon: Clock,
    title: "Publish Updates",
    description:
      "Verified changes are published to the site immediately. Each program listing includes a 'last verified' date so you know how current the information is.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Methodology page structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchemas) }}
      />
      
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-sm font-medium text-green-700 mb-6">
            <Shield className="w-4 h-4" />
            Transparency & Trust
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            How We Track Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Idaho DPA Finder is committed to providing accurate, up-to-date information 
            about down payment assistance programs. Here&apos;s how we do it.
          </p>
        </div>

        {/* Our Commitment */}
        <Card padding="lg" className="mb-10 border border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
                Our Commitment to Accuracy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Down payment assistance programs change frequently — funding runs out, income limits 
                update, new programs launch. We built this tool to help Idaho homebuyers navigate 
                these programs, and that only works if the information is reliable. When we&apos;re not 
                100% certain about something, we&apos;ll tell you.
              </p>
            </div>
          </div>
        </Card>

        {/* Data Sources */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-6">
            Where Our Data Comes From
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {dataSources.map((source) => (
              <Card key={source.name} padding="md" className="border border-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {source.name}
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#10B981] hover:text-[#059669]"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{source.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Update Process */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-6">
            How We Keep Information Current
          </h2>
          <div className="space-y-6">
            {updateProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#10B981]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
                        Step {index + 1}
                      </span>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why This Site Exists */}
        <Card padding="lg" className="mb-12 border border-green-100 bg-green-50/50">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
            Why This Site Exists
          </h2>
          <p className="text-gray-600 mb-4">
            Idaho Down Payment Programs is a <strong>free educational resource</strong> created to help 
            Idaho homebuyers understand and compare the many down payment assistance programs available 
            across the state.
          </p>
          <p className="text-gray-600 mb-4">
            This site is funded and maintained by licensed mortgage professionals who work in the 
            industry, but the resource itself is offered completely free — no registration, no 
            hidden fees, no obligation. Our goal is simply to help buyers understand their options.
          </p>
          <p className="text-gray-600">
            If you find this tool helpful and decide you want professional assistance with a mortgage, 
            we're happy to help — but that's entirely your choice. The educational content stands on 
            its own regardless.
          </p>
        </Card>

        {/* Important Disclaimers */}
        <Card padding="lg" className="mb-12 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
            Important Things to Know
          </h2>
          <ul className="space-y-4">
            {[
              {
                title: "Programs Change",
                description:
                  "Funding status, income limits, and eligibility requirements can change at any time. Always verify current requirements with the program administrator before applying.",
              },
              {
                title: "Estimates Only",
                description:
                  "Quiz results are estimates based on the information you provide. Final eligibility is determined by the administering agency and your chosen lender.",
              },
              {
                title: "Not Legal or Financial Advice",
                description:
                  "This tool is for educational purposes only. Consult with a licensed mortgage professional for personalized advice about your situation.",
              },
              {
                title: "Third-Party Programs",
                description:
                  "We are not affiliated with or endorsed by any government agency or housing authority. We simply aggregate publicly available program information.",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900">{item.title}:</span>{" "}
                  <span className="text-gray-600">{item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Who Maintains This */}
        <Card padding="lg" className="mb-12 border border-gray-200 bg-gray-50">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
            Who Maintains This Resource
          </h2>
          <p className="text-gray-600 mb-6">
            Idaho DPA Finder is maintained by Tim Hawkes and Jake Peterson, licensed Idaho mortgage 
            loan officers with The Tim Hawkes Team at Cornerstone Home Lending. With combined 
            experience of 25+ years helping Idaho families navigate home financing, they created 
            this tool to make down payment assistance information more accessible.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="font-medium text-gray-700">Tim Hawkes</span>
              <span>NMLS #8785</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="font-medium text-gray-700">Jake Peterson</span>
              <span>NMLS #1692825</span>
            </div>
            <div className="text-gray-400">|</div>
            <div className="text-gray-500">
              Cornerstone Home Lending · NMLS #2258
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-4">
            Ready to Find Your Programs?
          </h2>
          <p className="text-gray-600 mb-6">
            Take our free eligibility quiz to see which Idaho DPA programs you may qualify for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button size="lg">
                Start Free Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="secondary" size="lg">
                Browse All Programs
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

