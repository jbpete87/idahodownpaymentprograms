/**
 * Location data for Idaho local SEO pages
 */

export interface Location {
  slug: string;
  name: string;
  type: "city" | "county";
  county: string;
  population: string;
  medianHomePrice: string;
  description: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  localPrograms: string[];
  nearbyAreas: string[];
  localFacts: string[];
  faqs: { question: string; answer: string }[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "boise",
    name: "Boise",
    type: "city",
    county: "Ada",
    population: "240,000+",
    medianHomePrice: "$485,000",
    description:
      "Boise down payment assistance programs help homebuyers in Idaho's capital and largest city. IHFA statewide DPA (up to 8% of sales price) is available everywhere in Boise, plus City of Boise HOP offers up to $45,000 (fee-simple) or $65,000 (deed-restricted/land trust) for buyers at 50–80% AMI through NeighborWorks Boise or LEAP Housing.",
    metaDescription:
      "Boise down payment assistance 2026 for first time home buyers. IHFA up to 8% + City of Boise HOP up to $65,000. Idaho Housing DPA via NeighborWorks Boise or LEAP Housing. Free quiz.",
    heroTitle: "Boise Down Payment Assistance 2026",
    heroSubtitle:
      "First time home buyer programs in Boise — IHFA statewide DPA + City HOP up to $65,000 (funds available now)",
    localPrograms: ["1", "2", "5", "6", "10"],
    nearbyAreas: ["meridian", "nampa", "treasure-valley"],
    localFacts: [
      "IHFA DPA: Up to 8% of sales price statewide — $500 minimum out-of-pocket",
      "City of Boise HOP: Up to $45,000 (fee-simple) or $65,000 (deed-restricted) in city limits",
      "Household income limit up to $170,000 for IHFA programs",
      "Finally Home! homebuyer education required for IHFA assistance",
    ],
    faqs: [
      {
        question: "What down payment assistance is available in Boise in 2026?",
        answer:
          "Boise buyers can access IHFA down payment assistance (up to 8% of sales price, $500 minimum contribution) statewide, plus City of Boise HOP up to $45,000–$65,000 for buyers at 50–80% AMI within city limits. Apply through NeighborWorks Boise or LEAP Housing. Programs can often be stacked — take our quiz to see your options.",
      },
      {
        question: "Does IHFA work for repeat buyers in Boise?",
        answer:
          "Yes. IHFA down payment assistance is available to first-time AND repeat homebuyers with household income up to $170,000. You must work with an IHFA-approved lender and complete Finally Home! homebuyer education.",
      },
      {
        question: "What are the income limits for Boise down payment assistance?",
        answer:
          "IHFA programs use a statewide household income limit of $170,000. City of Boise HOP requires income between 50–80% of Ada County AMI (approximately $43,000–$86,000 for a family of four in 2026). Take our free quiz to see which programs fit your income.",
      },
      {
        question: "Can I combine IHFA and Boise city programs?",
        answer:
          "In many cases, yes — IHFA DPA and City of Boise HOP can be stacked when lender guidelines allow. NeighborWorks Boise, LEAP Housing, or your IHFA-approved lender can confirm stacking rules for your scenario.",
      },
      {
        question: "Does Idaho Housing (IHFA) offer down payment assistance in Boise?",
        answer:
          "Yes. Idaho Housing and Finance Association (IHFA) offers statewide down payment assistance up to 8% of the sales price with as little as $500 out-of-pocket. Boise buyers also qualify for City of Boise HOP through NeighborWorks Boise or LEAP Housing if income is 50–80% AMI.",
      },
    ],
  },
  {
    slug: "meridian",
    name: "Meridian",
    type: "city",
    county: "Ada",
    population: "135,000+",
    medianHomePrice: "$475,000",
    description:
      "Meridian is one of Idaho's fastest-growing cities in Ada County. Homebuyers here primarily use IHFA statewide down payment assistance — up to 8% of the sales price with as little as $500 out of pocket. No separate Meridian city DPA program; IHFA carries most of the value.",
    metaDescription:
      "Meridian Idaho down payment assistance 2026. IHFA Idaho Housing programs up to 8% for first time home buyers in Ada County. Repeat buyers welcome. Free eligibility quiz.",
    heroTitle: "Meridian Down Payment Assistance 2026",
    heroSubtitle:
      "Idaho down payment assistance for Meridian buyers — IHFA up to 8% with $500 minimum out-of-pocket (available now)",
    localPrograms: ["1", "2", "6", "10"],
    nearbyAreas: ["boise", "nampa", "treasure-valley"],
    localFacts: [
      "IHFA DPA available statewide — up to 8% of sales price",
      "Meridian has no separate city DPA — IHFA is the primary path",
      "Household income up to $170,000 qualifies for IHFA",
      "Finally Home! education required before closing",
    ],
    faqs: [
      {
        question: "Is there Meridian-specific down payment assistance?",
        answer:
          "Meridian does not have a city-run DPA program. Ada County buyers in Meridian use IHFA statewide assistance — up to 8% of the sales price toward down payment and closing costs, with a $500 minimum borrower contribution.",
      },
      {
        question: "How much can I get with IHFA in Meridian?",
        answer:
          "IHFA provides up to 8% of the sales price. On a $450,000 home, that's up to $36,000 in assistance — enough to cover minimum down payment and much of your closing costs while keeping $500+ in savings.",
      },
      {
        question: "What credit score do I need for IHFA in Meridian?",
        answer:
          "Typically 620+ for FHA financing, 640+ for IHFA First Loan products, and 680+ for conventional Advantage loans. Idaho Heroes uses the same IHFA credit guidelines as standard DPA.",
      },
      {
        question: "Is down payment assistance available for first time home buyers in Meridian?",
        answer:
          "Yes. First time home buyers in Meridian use IHFA down payment assistance — up to 8% of the sales price toward down payment and closing costs. Repeat buyers also qualify with household income up to $170,000.",
      },
    ],
  },
  {
    slug: "nampa",
    name: "Nampa",
    type: "city",
    county: "Canyon",
    population: "110,000+",
    medianHomePrice: "$395,000",
    description:
      "Nampa homebuyers in Canyon County access IHFA statewide down payment assistance — the primary DPA resource for Treasure Valley's west side. Up to 8% of sales price with $500 minimum contribution. More affordable entry point than Ada County with the same IHFA programs.",
    metaDescription:
      "Nampa down payment assistance 2026 in Canyon County. IHFA up to 8% for first time home buyers. Idaho housing down payment assistance — free eligibility quiz.",
    heroTitle: "Nampa Down Payment Assistance 2026",
    heroSubtitle:
      "Down payment assistance Idaho programs for Nampa and Canyon County — IHFA up to 8% (funds available now)",
    localPrograms: ["1", "2", "6", "7", "10", "11"],
    nearbyAreas: ["boise", "meridian", "treasure-valley"],
    localFacts: [
      "Canyon County shares Boise metro AMI limits with Ada County",
      "IHFA DPA: up to 8% of sales price — primary program for Nampa",
      "AutumnGold Affordable Housing — DPA on select renovated/new homes (Caldwell-based, Treasure Valley)",
      "Lower median prices than Boise/Meridian — same IHFA benefits",
      "No active Canyon County government DPA — IHFA is the main resource",
    ],
    faqs: [
      {
        question: "What down payment assistance is available in Nampa?",
        answer:
          "Nampa and Canyon County buyers use IHFA statewide down payment assistance — up to 8% of the sales price with a $500 minimum contribution. AutumnGold Affordable Housing (Caldwell) also offers down payment and closing cost help on select renovated or new homes for income-qualified buyers — join their waitlist at autumngold.org.",
      },
      {
        question: "Are Nampa income limits different from Boise?",
        answer:
          "Ada and Canyon counties share the same HUD metro income limits. IHFA also uses a statewide $170,000 household income cap regardless of county.",
      },
      {
        question: "Can repeat buyers get DPA in Nampa?",
        answer:
          "Yes. IHFA down payment assistance is open to repeat buyers, not just first-time purchasers. Complete Finally Home! education and work with an IHFA-approved lender.",
      },
      {
        question: "What first time home buyer programs are available in Nampa?",
        answer:
          "Nampa first time home buyers primarily use IHFA down payment assistance (up to 8% of sales price) and may also qualify for AutumnGold Affordable Housing on select Treasure Valley homes. Take our free quiz to see all Canyon County options.",
      },
    ],
  },
  {
    slug: "idaho-falls",
    name: "Idaho Falls",
    type: "city",
    county: "Bonneville",
    population: "68,000+",
    medianHomePrice: "$365,000",
    description:
      "Idaho Falls and East Idaho homebuyers rely on IHFA statewide down payment assistance — up to 8% of the sales price with $500 minimum out-of-pocket. Bonneville County has lower AMI limits than Treasure Valley, making IHFA's $170,000 household income cap especially valuable here.",
    metaDescription:
      "Idaho Falls down payment assistance 2026. IHFA up to 8% in Bonneville County for first time home buyers. East Idaho down payment assistance — free quiz.",
    heroTitle: "Idaho Falls Down Payment Assistance 2026",
    heroSubtitle:
      "East Idaho first time home buyer programs — IHFA up to 8% for Bonneville County (available now)",
    localPrograms: ["1", "2", "8", "10"],
    nearbyAreas: ["boise", "coeur-d-alene"],
    localFacts: [
      "IHFA DPA available statewide — primary East Idaho resource",
      "Lower home prices than Treasure Valley — assistance goes further",
      "Household income up to $170,000 for IHFA programs",
      "Growing tech and healthcare economy in Idaho Falls",
    ],
    faqs: [
      {
        question: "What DPA programs are available in Idaho Falls?",
        answer:
          "Idaho Falls buyers primarily use IHFA statewide down payment assistance — up to 8% of the sales price. Local city/county programs are limited in East Idaho; IHFA carries most of the value in Bonneville County.",
      },
      {
        question: "What are income limits in Bonneville County?",
        answer:
          "IHFA uses a statewide $170,000 household income limit. Bonneville County HUD 80% AMI for a family of four is approximately $67,600 — relevant for any local programs but IHFA's cap is much higher.",
      },
      {
        question: "Do I need to be a first-time buyer in Idaho Falls?",
        answer:
          "No. IHFA down payment assistance is available to repeat buyers as well as first-time purchasers in Idaho Falls and throughout Bonneville County.",
      },
      {
        question: "What down payment assistance is available in Idaho?",
        answer:
          "Statewide, Idaho Housing (IHFA) offers up to 8% of the sales price as a 15-year second mortgage with $500 minimum out-of-pocket. Idaho Falls buyers use this as the primary East Idaho program — local city grants are limited in Bonneville County.",
      },
    ],
  },
  {
    slug: "coeur-d-alene",
    name: "Coeur d'Alene",
    type: "city",
    county: "Kootenai",
    population: "58,000+",
    medianHomePrice: "$495,000",
    description:
      "Coeur d'Alene and North Idaho homebuyers use IHFA statewide down payment assistance — up to 8% of the sales price. Kootenai County's competitive market makes pre-approval essential. IHFA programs work for first-time and repeat buyers with household income up to $170,000.",
    metaDescription:
      "Coeur d'Alene down payment assistance 2026. IHFA up to 8% in Kootenai County for first time home buyers. North Idaho down payment assistance — free quiz.",
    heroTitle: "Coeur d'Alene Down Payment Assistance 2026",
    heroSubtitle:
      "North Idaho down payment assistance — IHFA up to 8% for Kootenai County buyers (available now)",
    localPrograms: ["1", "2", "9", "10"],
    nearbyAreas: ["boise", "idaho-falls"],
    localFacts: [
      "IHFA DPA: up to 8% of sales price — primary North Idaho resource",
      "Competitive Kootenai County market — get pre-approved early",
      "Post Falls and Hayden buyers also qualify for same IHFA programs",
      "Utah adjacency — many buyers compare Idaho vs Utah markets",
    ],
    faqs: [
      {
        question: "What down payment assistance is available in Coeur d'Alene?",
        answer:
          "Kootenai County buyers use IHFA statewide DPA — up to 8% of the sales price with $500 minimum contribution. This applies in Coeur d'Alene, Post Falls, Hayden, and throughout North Idaho.",
      },
      {
        question: "Are North Idaho home prices affecting DPA amounts?",
        answer:
          "IHFA assistance is calculated as a percentage of sales price (up to 8%), so higher-priced Coeur d'Alene homes receive proportionally more assistance — up to the program maximum based on your purchase price.",
      },
      {
        question: "Can I use IHFA DPA as a repeat buyer in Coeur d'Alene?",
        answer:
          "Yes. IHFA programs are open to repeat buyers with household income up to $170,000. Complete Finally Home! education and work with an IHFA-approved lender serving Kootenai County.",
      },
      {
        question: "Are there first time home buyer grants in Coeur d'Alene?",
        answer:
          "IHFA does not offer forgivable grants as of 2026. Coeur d'Alene buyers use IHFA's repayable second mortgage DPA (up to 8% of sales price) or Idaho Heroes for nurses, teachers, and first responders — with the $500 contribution waived for Heroes.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((loc) => loc.slug);
}

export function getLocationsByType(type: "city" | "county"): Location[] {
  return LOCATIONS.filter((loc) => loc.type === type);
}

export function getLocationsByCounty(county: string): Location[] {
  return LOCATIONS.filter((loc) => loc.county === county);
}
