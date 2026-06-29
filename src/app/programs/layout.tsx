import type { Metadata } from "next";
import { PROGRAMS_HUB_SEO } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: PROGRAMS_HUB_SEO.title,
  description: PROGRAMS_HUB_SEO.description,
  alternates: {
    canonical: "/programs",
  },
  keywords: [
    "idaho down payment assistance programs 2026",
    "idaho down payment assistance",
    "down payment assistance idaho",
    "ihfa down payment assistance",
    "boise down payment assistance",
    "idaho first time home buyer programs 2026",
  ],
  openGraph: {
    title: PROGRAMS_HUB_SEO.title,
    description: PROGRAMS_HUB_SEO.openGraphDescription,
    type: "website",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
