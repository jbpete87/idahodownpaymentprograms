import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UpdatedBadge, Button } from "@/components/ui";
import { ProgramsPageClient } from "@/components/programs/ProgramsPageClient";
import { PROGRAMS } from "@/lib/programs-data";
import { CONTENT_UPDATED } from "@/lib/seo-metadata";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Home, ArrowRight, Star } from "lucide-react";

const locationLinks = [
  { href: "/locations/boise", label: "Boise Down Payment Assistance" },
  { href: "/locations/meridian", label: "Meridian Idaho DPA" },
  { href: "/locations/nampa", label: "Nampa / Canyon County DPA" },
  { href: "/locations/idaho-falls", label: "Idaho Falls DPA" },
  { href: "/locations/coeur-d-alene", label: "Coeur d'Alene DPA" },
];

const featuredProgramSlugs = [
  "ihfa-dpa",
  "boise-city",
  "idaho-heroes",
  "ihfa-first-loan",
  "treasure-valley",
] as const;

const featuredPrograms = featuredProgramSlugs
  .map((slug) => PROGRAMS.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => p != null);

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
            2026 — IHFA up to 8% statewide, Boise HOP up to $65,000, and Idaho Heroes for
            nurses, teachers, and first responders. Grants, forgivable loans, and deferred
            loans for first time and repeat buyers.
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

        <section className="mb-10" aria-labelledby="featured-programs-heading">
          <h2
            id="featured-programs-heading"
            className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
          >
            <Star className="w-5 h-5 text-[#10B981]" />
            Most Popular Idaho DPA Programs 2026
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group block p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-[#10B981] hover:shadow-md transition-all"
              >
                <p className="font-semibold text-gray-900 group-hover:text-[#10B981] transition-colors">
                  {program.name}
                </p>
                <p className="text-sm text-[#10B981] font-medium mt-1">
                  Up to {formatCurrency(program.maxAmount)}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {program.termsSummary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <ProgramsPageClient />
      </main>

      <Footer />
    </div>
  );
}
