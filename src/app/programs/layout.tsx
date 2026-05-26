import type { Metadata } from "next";
import { CONTENT_UPDATED } from "@/lib/seo-metadata";
import { PROGRAMS } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Idaho Down Payment Assistance Programs 2026 | All DPA Grants & Loans",
  description:
    `Browse ${PROGRAMS.length}+ Idaho down payment assistance programs for 2026. IHFA up to 8% of sales price for Boise, Meridian, Nampa, and statewide. Free quiz — updated ${CONTENT_UPDATED}.`,
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
    title: "Idaho Down Payment Assistance Programs 2026",
    description:
      "10+ Idaho DPA programs for 2026. Filter by county, city, and buyer type. IHFA up to 8% of sales price.",
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

