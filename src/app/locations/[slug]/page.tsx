import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button, UpdatedBadge } from "@/components/ui";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Users,
  Home,
  DollarSign,
  Phone,
  ChevronRight,
  Building2,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import {
  getLocationBySlug,
  getAllLocationSlugs,
  getLocationBySlug as getLocation,
  type Location,
} from "@/lib/locations-data";
import { PROGRAMS } from "@/lib/programs-data";
import { getLocationMetadata, SITE_URL, CONTENT_UPDATED } from "@/lib/seo-metadata";

// Generate static params for all locations
export async function generateStaticParams() {
  const slugs = getAllLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each location
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  const isCity = location.type === "city";
  const titleSuffix = isCity ? `, Idaho` : "";
  const defaultTitle = `${location.name}${titleSuffix} Down Payment Assistance 2026 | First Time Home Buyer Programs`;
  const defaultDescription = `${location.metaDescription} Updated ${CONTENT_UPDATED}. Find grants, forgivable loans, and first time home buyer programs.`;

  return {
    ...getLocationMetadata(slug, {
      title: defaultTitle,
      description: defaultDescription,
    }),
    keywords: [
      `${location.name.toLowerCase()} down payment assistance`,
      `${location.name.toLowerCase()} first time buyer programs`,
      `${location.name.toLowerCase()} home buyer grants`,
      `${location.county.toLowerCase()} county down payment assistance`,
      `down payment assistance ${location.name.toLowerCase()} idaho`,
      `first time home buyer ${location.name.toLowerCase()}`,
      `${location.name.toLowerCase()} dpa programs 2026`,
    ],
  };
}

// JSON-LD Schema for FAQPage
function generateFAQSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// JSON-LD Schema for BreadcrumbList
function generateBreadcrumbSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${SITE_URL}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `${SITE_URL}/locations/${location.slug}`,
      },
    ],
  };
}

// JSON-LD Schema for Article (educational content)
function generateArticleSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${location.name} Down Payment Assistance Programs 2026`,
    description: location.metaDescription,
    datePublished: "2025-01-01",
    dateModified: "2026-05-26",
    author: [
      {
        "@type": "Person",
        name: "Tim Hawkes",
        jobTitle: "Licensed Mortgage Loan Officer",
      },
      {
        "@type": "Person",
        name: "Jake Peterson",
        jobTitle: "Licensed Mortgage Loan Officer",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Idaho DPA Finder",
      url: SITE_URL,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  // Get the actual programs for this location
  const localPrograms = PROGRAMS.filter((p) =>
    location.localPrograms.includes(p.id)
  ).slice(0, 6); // Show top 6

  // Get nearby location data
  const nearbyLocations = location.nearbyAreas
    .map((s) => getLocation(s))
    .filter(Boolean)
    .slice(0, 4);

  const faqSchema = generateFAQSchema(location);
  const breadcrumbSchema = generateBreadcrumbSchema(location);
  const articleSchema = generateArticleSchema(location);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              <Link href="/locations" className="hover:text-[#10B981]">
                Locations
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{location.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <UpdatedBadge date={CONTENT_UPDATED} className="mb-4" />
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-sm font-medium text-green-700 mb-6">
                  <MapPin className="w-4 h-4" />
                  {location.type === "county" ? "County Guide" : `${location.county} County`}
                </div>

                <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                  {location.heroTitle}
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                  {location.heroSubtitle}
                </p>

                {slug === "ogden" && (
                  <p className="text-base text-gray-600 mb-6 -mt-4">
                    Learn more about the{" "}
                    <Link
                      href="/programs/own-in-ogden"
                      className="text-[#10B981] font-medium hover:underline"
                    >
                      Own in Ogden down payment assistance program
                    </Link>{" "}
                    — $10k–$20k for Ogden city purchases.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/quiz?county=${location.county}`}>
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

                <p className="mt-6 text-xs text-gray-400">
                  Free eligibility quiz • No SSN required • Results in 5 minutes
                </p>
              </div>

              {/* Stats Card */}
              <div className="hidden lg:block">
                <Card padding="lg" className="border border-gray-200 shadow-lg">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-6 text-center">
                    {location.name} at a Glance
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <Users className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                      <div className="font-bold text-gray-900">{location.population}</div>
                      <div className="text-xs text-gray-500">Population</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <Home className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                      <div className="font-bold text-gray-900">{location.medianHomePrice}</div>
                      <div className="text-xs text-gray-500">Median Home Price</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <DollarSign className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                      <div className="font-bold text-gray-900">{localPrograms.length}+</div>
                      <div className="text-xs text-gray-500">DPA Programs</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <Building2 className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                      <div className="font-bold text-gray-900">{location.county}</div>
                      <div className="text-xs text-gray-500">County</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Program Summary - KEY FOR SEO */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-6 text-center">
              {location.name} Down Payment Assistance Programs at a Glance
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localPrograms.slice(0, 6).map((program) => (
                <div key={program.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{program.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      program.fundingStatus === 'open' ? 'bg-green-100 text-green-700' :
                      program.fundingStatus === 'limited' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {program.fundingStatus === 'open' ? 'Available' : 
                       program.fundingStatus === 'limited' ? 'Limited' : 'Paused'}
                    </span>
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981]">
                    ${program.maxAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {program.assistanceType.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-4">
                  About {location.name} Down Payment Assistance
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {location.description}
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-3">
                  {location.name} DPA Program Highlights
                </h3>
                <ul className="space-y-2">
                  {location.localFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Stats (shown on mobile only) */}
              <div className="lg:hidden">
                <Card padding="md" className="border border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-bold text-[#10B981]">{location.population}</div>
                      <div className="text-xs text-gray-500">Population</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#10B981]">{location.medianHomePrice}</div>
                      <div className="text-xs text-gray-500">Median Price</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Card */}
              <div>
                <Card padding="lg" className="border border-gray-200 bg-[#10B981]/5">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-4">
                    Need Local Help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our team specializes in {location.county} County DPA programs. We're located in Clearfield and serve all of {location.name}.
                  </p>
                  <div className="space-y-3 text-sm">
                    <a
                      href="tel:8018207620"
                      className="flex items-center gap-2 text-gray-700 hover:text-[#10B981]"
                    >
                      <Phone className="w-4 h-4" />
                      (801) 820-7620
                    </a>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Clearfield, UT 84015</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>Highly rated on multiple platforms</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Available Programs */}
        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                DPA Programs Available in {location.name}
              </h2>
              <p className="text-gray-600">
                {localPrograms.length}+ down payment assistance programs serve {location.name} homebuyers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localPrograms.map((program) => (
                <Link key={program.id} href={`/programs/${program.slug}`}>
                  <Card
                    padding="md"
                    hover
                    className="h-full border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {program.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 whitespace-nowrap">
                        {program.assistanceType.replace("_", " ")}
                      </span>
                    </div>
                    <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981] mb-2">
                      Up to ${program.maxAmount.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {program.termsSummary}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href={`/quiz?county=${location.county}`}>
                <Button size="lg">
                  See Which Programs You Qualify For
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How to Apply Section - KEY FOR SEO */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Apply for {location.name} Down Payment Assistance
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Eligibility</h3>
                <p className="text-sm text-gray-600">
                  Take our free 5-minute quiz to see which {location.county} County programs you qualify for.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Pre-Approved</h3>
                <p className="text-sm text-gray-600">
                  Work with a participating lender to get pre-approved for a mortgage and DPA programs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Find Your Home</h3>
                <p className="text-sm text-gray-600">
                  Shop for a home in {location.name} within program purchase price limits.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Close & Move In</h3>
                <p className="text-sm text-gray-600">
                  Complete the loan process and receive your down payment assistance at closing.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/quiz">
                <Button size="lg">
                  Start Your Application
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {location.name} Down Payment Assistance FAQ
            </h2>

            <div className="space-y-4">
              {location.faqs.map((faq, i) => (
                <Card key={i} padding="lg" className="border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        {nearbyLocations.length > 0 && (
          <section className="py-12 md:py-16 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-6">
                Explore Nearby Areas
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nearbyLocations.map((nearby) => (
                  <Link key={nearby!.slug} href={`/locations/${nearby!.slug}`}>
                    <Card
                      padding="md"
                      hover
                      className="border border-gray-200 text-center"
                    >
                      <MapPin className="w-5 h-5 text-[#10B981] mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">
                        {nearby!.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {nearby!.type === "county" ? "County" : nearby!.county + " County"}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
                  Ready to Buy in {location.name}?
                </h2>
                <p className="text-green-50 mb-6 max-w-xl mx-auto">
                  Take our free 5-minute quiz to see which {location.county} County
                  down payment assistance programs you may qualify for.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/quiz?county=${location.county}`}>
                    <Button
                      size="lg"
                      className="bg-white text-[#10B981] hover:bg-gray-100"
                    >
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
                      Talk to Our Team
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

