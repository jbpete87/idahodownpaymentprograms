import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UpdatedBadge, Button } from "@/components/ui";
import { ProgramsPageClient } from "@/components/programs/ProgramsPageClient";
import { PROGRAMS } from "@/lib/programs-data";
import { CONTENT_UPDATED } from "@/lib/seo-metadata";
import { MapPin, Home, ArrowRight } from "lucide-react";

const locationLinks = [
  { href: "/locations/boise", label: "Boise Down Payment Assistance" },
  { href: "/locations/meridian", label: "Meridian Idaho DPA" },
  { href: "/locations/nampa", label: "Nampa / Canyon County DPA" },
  { href: "/locations/idaho-falls", label: "Idaho Falls DPA" },
  { href: "/locations/coeur-d-alene", label: "Coeur d'Alene DPA" },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <UpdatedBadge date={CONTENT_UPDATED} className="mb-4" />
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Idaho Down Payment Assistance Programs 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Browse all {PROGRAMS.length} active Idaho down payment assistance programs for
            2026 — grants, forgivable loans, and deferred loans for first time home buyers.
            Up to 8% of sales price in combined assistance. Use filters below or jump to your city or
            county guide.
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto mb-6">
            Looking for a specific area? Local guides cover program details, income limits,
            and funding status for{" "}
            <Link href="/locations/boise" className="text-[#10B981] hover:underline">
              Boise
            </Link>
            ,{" "}
            <Link href="/locations/meridian" className="text-[#10B981] hover:underline">
              Meridian
            </Link>
            ,{" "}
            <Link href="/locations/nampa" className="text-[#10B981] hover:underline">
              Nampa
            </Link>
            , and{" "}
            <Link href="/locations/idaho-falls" className="text-[#10B981] hover:underline">
              Idaho Falls
            </Link>
            .
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm mb-4">
            <Link
              href="/first-time-home-buyer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              First Time Buyer Guide
            </Link>
            {locationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
            <Link
              href="/locations"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              All Locations →
            </Link>
          </div>

          <Link href="/quiz">
            <Button variant="primary" size="sm">
              Free Eligibility Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <ProgramsPageClient />
      </main>

      <Footer />
    </div>
  );
}
