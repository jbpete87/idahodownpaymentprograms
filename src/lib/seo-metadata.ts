import type { Metadata } from "next";

/** Tier 1 GSC queries to re-check ~30 days after SEO updates */
export const GSC_MONITORING_QUERIES = [
  "idaho down payment assistance",
  "idaho first time home buyer programs",
  "ihfa down payment assistance",
  "boise down payment assistance",
  "idaho housing down payment assistance",
  "idaho dpa programs 2026",
  "meridian idaho down payment assistance",
  "nampa down payment assistance",
  "idaho falls down payment assistance",
  "coeur d alene down payment assistance",
] as const;

export const SITE_URL = "https://www.idahodownpaymentprograms.com";
export const CONTENT_UPDATED = "May 2026";

export const LOCATION_SEO: Record<
  string,
  { title: string; description: string }
> = {
  boise: {
    title: "Boise Down Payment Assistance 2026 | IHFA + City Programs",
    description:
      "Boise down payment assistance 2026: IHFA up to 8% of sales price + Boise HOP up to $65,000. First time and repeat buyers. Free eligibility quiz — updated May 2026.",
  },
  meridian: {
    title: "Meridian Idaho Down Payment Assistance 2026",
    description:
      "Meridian Idaho down payment assistance 2026. IHFA up to 8% of sales price in Ada County. $500 minimum out-of-pocket. Free eligibility quiz — updated May 2026.",
  },
  nampa: {
    title: "Nampa Idaho Down Payment Assistance 2026",
    description:
      "Nampa down payment assistance 2026. IHFA programs up to 8% in Canyon County. First time and repeat buyers welcome. Free quiz — updated May 2026.",
  },
  "idaho-falls": {
    title: "Idaho Falls Down Payment Assistance 2026",
    description:
      "Idaho Falls down payment assistance 2026. IHFA up to 8% in Bonneville County. East Idaho first time buyer programs. Free eligibility quiz — updated May 2026.",
  },
  "coeur-d-alene": {
    title: "Coeur d'Alene Down Payment Assistance 2026",
    description:
      "Coeur d'Alene down payment assistance 2026. IHFA up to 8% in Kootenai County. North Idaho homebuyer programs. Free quiz — updated May 2026.",
  },
};

export const PROGRAM_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "ihfa-dpa": {
    title: "IHFA Down Payment Assistance 2026 | Idaho Housing DPA",
    description:
      "IHFA down payment assistance 2026: up to 8% of sales price, $500 minimum out-of-pocket. First time and repeat buyers. Income limit $170,000. Updated May 2026.",
  },
  "ihfa-first-loan": {
    title: "IHFA First Loan + Down Payment Assistance 2026",
    description:
      "IHFA First Loan paired with DPA 2026. Competitive rates + up to 8% assistance. FHA, VA, Conventional, USDA. Find an approved lender — updated May 2026.",
  },
  "ihfa-good-credit": {
    title: "IHFA Good Credit Rewards Program 2026",
    description:
      "IHFA Good Credit Rewards 2026: up to $8,000 DPA for creditworthy buyers. 640–680+ credit score required. Pairs with IHFA first mortgage — updated May 2026.",
  },
  "boise-city": {
    title: "Boise Homeownership Opportunity Program (HOP) 2026",
    description:
      "Boise HOP down payment assistance 2026: up to $45,000–$65,000 deferred loan. 50–80% AMI. Apply through NeighborWorks Boise or LEAP Housing — updated May 2026.",
  },
  "treasure-valley": {
    title: "Treasure Valley Down Payment Assistance 2026",
    description:
      "Treasure Valley DPA 2026: IHFA + Boise programs for Ada and Canyon County. Boise, Meridian, Nampa, Caldwell. Free eligibility quiz — updated May 2026.",
  },
};

export function getLocationMetadata(
  slug: string,
  fallback: { title: string; description: string }
): Metadata {
  const seo = LOCATION_SEO[slug];
  const title = seo?.title ?? fallback.title;
  const description = seo?.description ?? fallback.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/locations/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/locations/${slug}` },
  };
}

export function getProgramMetadata(
  slug: string,
  fallback: { title: string; description: string }
): Metadata {
  const seo = PROGRAM_SEO[slug];
  const title = seo?.title ?? fallback.title;
  const description = seo?.description ?? fallback.description;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/programs/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/programs/${slug}` },
  };
}
