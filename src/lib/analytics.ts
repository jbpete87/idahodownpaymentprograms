type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 event when gtag is loaded (NEXT_PUBLIC_GA_ID set in production). */
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined" || !window.gtag) return;

  const cleaned = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined)
      )
    : undefined;

  window.gtag("event", eventName, cleaned);
}

export const AnalyticsEvents = {
  quizStart: () => trackEvent("quiz_start"),
  quizComplete: (matchCount: number, topAmount: number) =>
    trackEvent("quiz_complete", {
      match_count: matchCount,
      top_program_amount: topAmount,
    }),
  quizLeadFormOpen: () => trackEvent("quiz_lead_form_open"),
  generateLead: (params: {
    leadSource: "quiz" | "contact";
    matchCount?: number;
    county?: string;
    isFirstTimeBuyer?: boolean;
  }) =>
    trackEvent("generate_lead", {
      currency: "USD",
      value: params.matchCount ?? 1,
      lead_source: params.leadSource,
      property_county: params.county,
      first_time_buyer: params.isFirstTimeBuyer,
    }),
  programCtaClick: (programSlug: string, cta: "quiz" | "contact") =>
    trackEvent("program_cta_click", {
      program_slug: programSlug,
      cta_type: cta,
    }),
} as const;
