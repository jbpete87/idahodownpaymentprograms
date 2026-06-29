import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProgramDetailView } from "@/components/programs/ProgramDetailView";
import { PROGRAMS } from "@/lib/programs-data";
import { formatCurrency } from "@/lib/utils";
import { getProgramSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { getProgramMetadata } from "@/lib/seo-metadata";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  return {
    ...getProgramMetadata(slug, {
      title: `${program.name} | Idaho Down Payment Assistance`,
      description: `${program.termsSummary} Up to ${formatCurrency(program.maxAmount)} available.`,
    }),
  };
}

export async function generateStaticParams() {
  return PROGRAMS.map((program) => ({
    slug: program.slug,
  }));
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const programSchema = getProgramSchema({
    name: program.name,
    slug: program.slug,
    description: program.termsSummary,
    maxAmount: program.maxAmount,
    type: program.assistanceType,
    agency: program.agency,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: program.name, url: `/programs/${program.slug}` },
  ]);

  const pageSchemas = combineSchemas(programSchema, breadcrumbSchema);

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />

      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ProgramDetailView program={program} />
      </main>

      <Footer />
    </div>
  );
}
