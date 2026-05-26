import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button } from "@/components/ui";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import type { Metadata } from "next";
import { LOCATIONS, getLocationsByType } from "@/lib/locations-data";

export const metadata: Metadata = {
  title: "Idaho DPA by Location | Down Payment Assistance Finder",
  description:
    "Find down payment assistance programs by city in Idaho. Local guides for Boise, Meridian, Nampa, Idaho Falls, Coeur d'Alene, and more.",
  alternates: {
    canonical: "/locations",
  },
};

export default function LocationsPage() {
  const counties = getLocationsByType("county");
  const cities = getLocationsByType("city");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-sm font-medium text-green-700 mb-6">
            <MapPin className="w-4 h-4" />
            Local DPA Guides
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Find DPA Programs by Location
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Down payment assistance varies by where you buy. Explore programs available 
            in your city or county to maximize your home buying assistance.
          </p>
        </div>

        {/* Counties */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-[#10B981]" />
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
              Browse by County
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {counties.map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`}>
                <Card
                  padding="lg"
                  hover
                  className="h-full border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
                        {location.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {location.population} residents
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium">
                      County
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {location.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Median home: {location.medianHomePrice}
                    </span>
                    <span className="text-[#10B981] text-sm font-medium flex items-center gap-1">
                      View Programs
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Cities */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-[#10B981]" />
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
              Browse by City
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`}>
                <Card
                  padding="md"
                  hover
                  className="h-full border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {location.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {location.county} County
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {location.medianHomePrice}
                    </span>
                    <span className="text-[#10B981] font-medium">
                      View →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-4">
            Not Sure Where You&apos;re Buying?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Our eligibility quiz works for any Idaho location. Tell us where you&apos;re 
            looking and we&apos;ll match you with available programs.
          </p>
          <Link href="/quiz">
            <Button size="lg">
              Start Free Eligibility Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

