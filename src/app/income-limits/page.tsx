import { Metadata } from "next";
import Link from "next/link";
import { AMI_LIMITS } from "@/lib/programs-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Info, Users, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "2026 Idaho Income Limits by County | AMI Calculator",
  description:
    "2026 HUD income limits for Idaho down payment assistance programs. Find 80%, 100%, and 120% AMI limits for Ada, Canyon, Bonneville, and Kootenai counties.",
  alternates: {
    canonical: "/income-limits",
  },
  keywords: [
    "Idaho AMI limits 2026",
    "Ada County income limits",
    "Canyon County income limits",
    "Idaho down payment assistance income limits",
    "HUD income limits Idaho",
    "80% AMI Idaho",
  ],
};

// Group AMI limits by county
const getCountyData = () => {
  const counties: Record<string, typeof AMI_LIMITS> = {};
  AMI_LIMITS.forEach((limit) => {
    if (!counties[limit.county]) {
      counties[limit.county] = [];
    }
    counties[limit.county].push(limit);
  });
  // Sort each county's limits by household size
  Object.keys(counties).forEach((county) => {
    counties[county].sort((a, b) => a.householdSize - b.householdSize);
  });
  return counties;
};

// Priority counties (main areas with full tables)
const priorityCounties = ["Ada", "Canyon", "Bonneville", "Kootenai"];

export default function IncomeLimitsPage() {
  const countyData = getCountyData();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#10B981]/10 via-white to-blue-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <DollarSign className="w-4 h-4" />
                FY 2026 HUD Income Limits
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Idaho Income Limits
                <span className="block text-[#10B981]">by County 2026</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Most Idaho down payment assistance programs use income limits based on
                Area Median Income (AMI). IHFA programs allow household income up to
                $170,000 statewide. City of Boise HOP uses 50–80% AMI.
              </p>
            </div>
          </div>
        </section>

        {/* Info Box */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <div className="p-4 sm:p-6">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    How to Use These Income Limits
                  </h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>
                      • <strong>50–80% AMI</strong> — City of Boise HOP
                    </li>
                    <li>
                      • <strong>80% AMI</strong> — NeighborWorks Boise DPA intake and many local programs
                    </li>
                    <li>
                      • <strong>$170,000</strong> — IHFA standard household income cap (all counties)
                    </li>
                    <li>
                      • <strong>Tax Exempt First Loan</strong> — lower AMI limits apply (see IHFA rate sheet)
                    </li>
                    <li>
                      • Count <strong>all household members</strong> living in
                      the home, not just those on the loan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Priority Counties */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#10B981]" />
            Income Limits by County &amp; Household Size
          </h2>

          <div className="space-y-8">
            {priorityCounties.map((county) => {
              const limits = countyData[county];
              if (!limits) return null;

              return (
                <Card key={county} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-[#10B981] to-emerald-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">
                      {county} County
                    </h3>
                    <p className="text-emerald-100 text-sm">
                      FY 2026 HUD Income Limits
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Household Size
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            80% AMI
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            100% AMI
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            120% AMI
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {limits.map((limit, index) => (
                          <tr
                            key={limit.id}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }
                          >
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-sm font-bold">
                                  {limit.householdSize}
                                </span>
                                <span className="text-gray-700">
                                  {limit.householdSize === 1
                                    ? "1 Person"
                                    : `${limit.householdSize} Persons`}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-sm">
                              <span className="text-[#10B981] font-semibold">
                                {formatCurrency(limit.ami80)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-sm text-gray-600">
                              {formatCurrency(limit.ami100)}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-sm text-gray-600">
                              {formatCurrency(limit.ami120)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              );
            })}

            {/* Other Counties */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Other Idaho Counties
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.keys(countyData)
                  .filter((county) => !priorityCounties.includes(county))
                  .sort()
                  .map((county) => {
                    const limits = countyData[county];
                    const fourPerson = limits.find(
                      (l) => l.householdSize === 4
                    );
                    if (!fourPerson) return null;

                    return (
                      <Card key={county} className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {county} County
                        </h4>
                        <p className="text-sm text-gray-600">
                          80% AMI (family of 4):{" "}
                          <span className="font-semibold text-[#10B981]">
                            {formatCurrency(fourPerson.ami80)}
                          </span>
                        </p>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Source & CTA */}
          <div className="mt-12 space-y-6">
            <Card className="bg-gray-50 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Data Source</h3>
              <p className="text-sm text-gray-600 mb-3">
                Income limits are from the U.S. Department of Housing and Urban
                Development (HUD) FY 2026 Income Limits Documentation System.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <p className="text-sm text-amber-800">
                  <strong>📅 When do income limits update?</strong> HUD updates income limits 
                  each fiscal year, typically around <strong>April-July</strong>. The FY 2026 
                  income limits are expected to be released around <strong>July 2026</strong>. 
                  We&apos;ll update this page as soon as new limits are published.
                </p>
              </div>
              <a
                href="https://www.huduser.gov/portal/datasets/il.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#10B981] hover:text-emerald-700 text-sm font-medium"
              >
                View Official HUD Income Limits
                <ExternalLink className="w-4 h-4" />
              </a>
            </Card>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Ready to see which programs you qualify for?
              </h3>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#10B981] text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Take the Free Eligibility Quiz →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

