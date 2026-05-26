import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { CalculatorResults } from "@/components/calculator/CalculatorResults";
import { Calculator, Info } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Utah Mortgage Affordability Calculator | How Much Home Can I Afford?",
  description:
    "Free mortgage affordability calculator for Idaho homebuyers. See max purchase price and monthly payments for Conventional, FHA, and VA loans with Utah-specific tax and insurance rates.",
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    title: "Utah Mortgage Affordability Calculator",
    description:
      "Find out how much home you can afford in Idaho. Compare Conventional, FHA, and VA loan options with real-time rate estimates.",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-[#10B981]" />
              </div>
              <span className="text-sm font-medium text-[#10B981] bg-green-50 px-3 py-1 rounded-full">
                Free Tool
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How Much Home Can I Afford?
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Get a quick estimate of your maximum purchase price and monthly
              payment for Conventional, FHA, and VA loans — using current Utah
              rates, taxes, and insurance.
            </p>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                This is an <strong>estimate</strong> for educational purposes.
                Adjust the sliders below and see results update in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
                Your Information
              </h2>
              <CalculatorForm />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4">
              What You Can Afford
            </h2>
            <CalculatorResults />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

