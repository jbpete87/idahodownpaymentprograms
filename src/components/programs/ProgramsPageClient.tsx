"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Select,
  FundingBadge,
} from "@/components/ui";
import { PROGRAMS, IDAHO_COUNTIES, PROGRAM_CITIES, CITY_TO_COUNTY } from "@/lib/programs-data";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";

type FilterState = {
  search: string;
  county: string;
  city: string;
  buyerType: string;
  assistanceType: string;
  fundingStatus: string;
};

export function ProgramsPageClient() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    county: "",
    city: "",
    buyerType: "",
    assistanceType: "",
    fundingStatus: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((program) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();

        const matchesName = program.name.toLowerCase().includes(searchLower);
        const matchesAgency = program.agency.toLowerCase().includes(searchLower);
        const matchesGeography = program.geographyValues.some((v) =>
          v.toLowerCase().includes(searchLower)
        );

        const matchesCityCounty =
          program.geographyType === "city" &&
          program.geographyValues.some((city) => {
            const county = CITY_TO_COUNTY[city];
            return county && county.toLowerCase().includes(searchLower);
          });

        const matchesStatewide =
          program.geographyType === "statewide" &&
          IDAHO_COUNTIES.some((county) => county.toLowerCase().includes(searchLower));

        const matchesSearch =
          matchesName ||
          matchesAgency ||
          matchesGeography ||
          matchesCityCounty ||
          matchesStatewide;
        if (!matchesSearch) return false;
      }

      if (filters.county) {
        if (program.geographyType === "statewide") {
          // Statewide programs match all counties
        } else if (program.geographyType === "county") {
          if (!program.geographyValues.includes(filters.county)) return false;
        } else if (program.geographyType === "city") {
          const programCitiesInCounty = program.geographyValues.some(
            (city) => CITY_TO_COUNTY[city] === filters.county
          );
          if (!programCitiesInCounty) return false;
        }
      }

      if (filters.city) {
        if (program.geographyType === "statewide") {
          // Statewide programs apply to all cities
        } else if (program.geographyType === "county") {
          const cityCounty = CITY_TO_COUNTY[filters.city];
          if (!cityCounty || !program.geographyValues.includes(cityCounty)) {
            return false;
          }
        } else if (program.geographyType === "city") {
          if (!program.geographyValues.includes(filters.city)) {
            return false;
          }
        }
      }

      if (filters.buyerType) {
        if (!program.buyerTypes.includes(filters.buyerType as (typeof program.buyerTypes)[number])) {
          return false;
        }
      }

      if (filters.assistanceType) {
        if (program.assistanceType !== filters.assistanceType) return false;
      }

      if (filters.fundingStatus) {
        if (program.fundingStatus !== filters.fundingStatus) return false;
      }

      return true;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      search: "",
      county: "",
      city: "",
      buyerType: "",
      assistanceType: "",
      fundingStatus: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <>
      <Card padding="lg" className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full h-11 pl-12 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all"
            />
          </div>

          <Button
            variant={showFilters ? "primary" : "secondary"}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-5 h-5 rounded-full bg-white text-[#10B981] text-xs flex items-center justify-center font-bold">
                !
              </span>
            )}
          </Button>

          <Link href="/quiz" className="hidden md:block">
            <Button variant="primary">
              Check My Eligibility
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                label="County"
                options={[
                  { value: "", label: "All Counties" },
                  ...IDAHO_COUNTIES.map((c) => ({ value: c, label: c })),
                ]}
                value={filters.county}
                onChange={(e) => setFilters({ ...filters, county: e.target.value })}
              />
              <Select
                label="City"
                options={[
                  { value: "", label: "All Cities" },
                  ...PROGRAM_CITIES.map((c) => ({ value: c, label: c })),
                ]}
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
              <Select
                label="Buyer Type"
                options={[
                  { value: "", label: "All Buyers" },
                  { value: "first_time", label: "First-Time Buyer" },
                  { value: "repeat", label: "Repeat Buyer" },
                  { value: "veteran", label: "Veteran" },
                ]}
                value={filters.buyerType}
                onChange={(e) => setFilters({ ...filters, buyerType: e.target.value })}
              />
              <Select
                label="Assistance Type"
                options={[
                  { value: "", label: "All Types" },
                  { value: "grant", label: "Grant" },
                  { value: "forgivable_loan", label: "Forgivable Loan" },
                  { value: "deferred_loan", label: "Deferred Loan" },
                  { value: "second_mortgage", label: "Second Mortgage" },
                ]}
                value={filters.assistanceType}
                onChange={(e) =>
                  setFilters({ ...filters, assistanceType: e.target.value })
                }
              />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing{" "}
          <strong className="text-gray-900">{filteredPrograms.length}</strong> programs
        </p>
        <Link href="/quiz" className="md:hidden">
          <Button variant="primary" size="sm">
            Check Eligibility
          </Button>
        </Link>
      </div>

      {filteredPrograms.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <Card
              key={program.id}
              padding="lg"
              hover
              className="flex flex-col border border-gray-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <FundingBadge status={program.fundingStatus} />
                  <span className="text-sm text-gray-500 font-medium">
                    {program.geographyType === "statewide"
                      ? "Statewide"
                      : program.geographyValues[0]}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{program.name}</CardTitle>
                <p className="text-sm text-gray-500">{program.agency}</p>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                    <DollarSign className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-display)] text-xl font-bold text-[#10B981]">
                      {formatCurrency(program.maxAmount)}
                    </div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {program.assistanceType === "grant"
                        ? "Grant"
                        : program.assistanceType === "forgivable_loan"
                        ? "Forgivable Loan"
                        : program.assistanceType === "deferred_loan"
                        ? "Deferred Loan"
                        : "Second Mortgage"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mt-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>
                      {program.buyerTypes.includes("first_time") &&
                      program.buyerTypes.includes("repeat")
                        ? "All buyers"
                        : program.buyerTypes.includes("first_time")
                        ? "First-time buyers"
                        : "Repeat buyers"}
                    </span>
                  </div>
                  {program.forgivenessYears && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Forgiven after {program.forgivenessYears} years</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{program.amiPercent}% AMI income limit</span>
                  </div>
                </div>
              </CardContent>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href={`/programs/${program.slug}`}>
                  <Button variant="secondary" className="w-full justify-between group">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card padding="lg" className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
            No Programs Found
          </h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Card>
      )}

      <Card
        padding="lg"
        className="mt-12 text-center bg-gray-50 border-dashed border-2 border-gray-200 shadow-none"
      >
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
          Not Sure Which Programs You Qualify For?
        </h3>
        <p className="text-gray-600 mb-6">
          Take our 5-minute eligibility quiz to get personalized matches.
        </p>
        <Link href="/quiz">
          <Button variant="primary" size="lg">
            Start Eligibility Quiz
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </Card>
    </>
  );
}
