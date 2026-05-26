/**
 * Schema.org structured data utilities for SEO and AI discoverability
 * These schemas help Google and AI systems understand our content
 */

// Organization schema - who maintains this site
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Idaho DPA Finder",
    alternateName: "Idaho Down Payment Assistance Finder",
    url: "https://www.idahodownpaymentprograms.com",
    logo: "https://www.idahodownpaymentprograms.com/logo.png",
    description:
      "Free educational resource helping Idaho homebuyers discover down payment assistance programs they may qualify for.",
    foundingDate: "2026",
    founder: [
      {
        "@type": "Person",
        name: "Tim Hawkes",
        jobTitle: "Team Lead & Program Advisor",
        identifier: "NMLS #8785",
      },
      {
        "@type": "Person",
        name: "Jake Peterson",
        jobTitle: "Mortgage Professional & Program Advisor",
        identifier: "NMLS #1692825",
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Cornerstone Home Lending",
      identifier: "NMLS #2258",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-801-820-7620",
      contactType: "customer service",
      areaServed: "US-ID",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1725 E 1450 S Ste 100",
      addressLocality: "Clearfield",
      addressRegion: "UT",
      postalCode: "84015",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.google.com/maps/place/...", // Add actual Google Maps link
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "190",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// WebSite schema - for sitelinks search box
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Idaho DPA Finder",
    alternateName: "Idaho Down Payment Assistance Finder",
    url: "https://www.idahodownpaymentprograms.com",
    description:
      "Find Idaho down payment assistance programs you may qualify for. Free eligibility quiz covering IHFA and local programs across Treasure Valley and statewide.",
    publisher: {
      "@type": "Organization",
      name: "Idaho DPA Finder",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.idahodownpaymentprograms.com/programs?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// LocalBusiness schema - physical presence
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "The Tim Hawkes Team - Idaho DPA Finder",
    alternateName: "Idaho Down Payment Assistance Finder",
    description:
      "Licensed Idaho mortgage professionals helping homebuyers find and access down payment assistance programs.",
    url: "https://www.idahodownpaymentprograms.com",
    telephone: "+1-801-820-7620",
    email: "jake@thetimhawkesteam.com",
    priceRange: "Free",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1725 E 1450 S Ste 100",
      addressLocality: "Clearfield",
      addressRegion: "UT",
      postalCode: "84015",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.1107,
      longitude: -111.9877,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: {
      "@type": "State",
      name: "Idaho",
      containsPlace: [
        { "@type": "AdministrativeArea", name: "Ada County" },
        { "@type": "AdministrativeArea", name: "Canyon County" },
        { "@type": "AdministrativeArea", name: "Bonneville County" },
        { "@type": "AdministrativeArea", name: "Kootenai County" },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "190",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Google Reviews",
        },
        reviewBody: "72 five-star reviews on Google",
      },
    ],
  };
}

// Service schema - for the DPA matching service
export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Idaho Down Payment Assistance Eligibility Quiz",
    alternateName: "Idaho DPA Finder",
    description:
      "Free eligibility quiz that matches Idaho homebuyers with down payment assistance programs based on their location, income, occupation, and buyer status.",
    provider: {
      "@type": "Organization",
      name: "Idaho DPA Finder",
    },
    serviceType: "Financial Education Service",
    areaServed: {
      "@type": "State",
      name: "Idaho",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free eligibility assessment",
    },
    termsOfService: "https://www.idahodownpaymentprograms.com/terms",
    audience: {
      "@type": "Audience",
      audienceType: "Homebuyers",
      geographicArea: {
        "@type": "State",
        name: "Idaho",
      },
    },
  };
}

// BreadcrumbList schema generator
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.idahodownpaymentprograms.com${item.url}`,
    })),
  };
}

// FAQPage schema generator
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// HowTo schema for the quiz process
export function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find Idaho Down Payment Assistance Programs",
    description:
      "A simple 3-step process to discover which Idaho down payment assistance programs you may qualify for.",
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Take the Quiz",
        text: "Answer a few simple questions about your situation including location, income, household size, and occupation. No SSN or sensitive information required.",
        url: "https://www.idahodownpaymentprograms.com/quiz",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "See Your Matches",
        text: "Instantly receive a list of down payment assistance programs you may qualify for, showing potential assistance amounts up to 8% of sales price.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Get Expert Help",
        text: "Optionally connect with a licensed lender who can verify eligibility and guide your application process.",
        url: "https://www.idahodownpaymentprograms.com/contact",
        position: 3,
      },
    ],
  };
}

// FinancialProduct schema for individual DPA programs
export function getProgramSchema(program: {
  name: string;
  slug: string;
  description: string;
  maxAmount: number;
  type: string;
  agency: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: program.name,
    url: `https://www.idahodownpaymentprograms.com/programs/${program.slug}`,
    description: program.description,
    provider: {
      "@type": "Organization",
      name: program.agency,
    },
    category: "Down Payment Assistance",
    amount: {
      "@type": "MonetaryAmount",
      maxValue: program.maxAmount,
      currency: "USD",
    },
    areaServed: {
      "@type": "State",
      name: "Idaho",
    },
    feesAndCommissionsSpecification: program.type,
  };
}

// Article schema for educational content
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `https://www.idahodownpaymentprograms.com${article.url}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: [
      {
        "@type": "Person",
        name: "Tim Hawkes",
        jobTitle: "Licensed Idaho Mortgage Loan Officer",
        identifier: "NMLS #8785",
      },
      {
        "@type": "Person",
        name: "Jake Peterson",
        jobTitle: "Licensed Idaho Mortgage Loan Officer",
        identifier: "NMLS #1692825",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Idaho DPA Finder",
      logo: {
        "@type": "ImageObject",
        url: "https://www.idahodownpaymentprograms.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.idahodownpaymentprograms.com${article.url}`,
    },
  };
}

// Combine multiple schemas into a single graph
export function combineSchemas(...schemas: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { "@context": _, ...rest } = schema as { "@context"?: string };
      return rest;
    }),
  };
}

