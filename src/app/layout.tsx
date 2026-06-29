import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  combineSchemas,
} from "@/lib/schema";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.idahodownpaymentprograms.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Idaho Down Payment Assistance Programs 2026 | First Time Home Buyer Guide",
    template: "%s | Idaho DPA Finder 2026",
  },
  description:
    "2026 Idaho down payment assistance programs guide. IHFA offers up to 8% of sales price with $500 out-of-pocket. Free eligibility quiz covering IHFA and local programs. Updated May 2026.",
  keywords: [
    "idaho down payment assistance 2026",
    "idaho first time home buyer 2026",
    "first time home buyer idaho",
    "ihfa down payment assistance",
    "idaho housing down payment assistance",
    "boise down payment assistance",
    "idaho dpa programs 2026",
    "down payment help Idaho",
    "home buyer programs Idaho 2026",
    "treasure valley down payment assistance",
    "meridian idaho down payment assistance",
    "nampa down payment assistance",
  ],
  authors: [
    { name: "Tim Hawkes", url: "https://www.idahodownpaymentprograms.com/about" },
    { name: "Jake Peterson", url: "https://www.idahodownpaymentprograms.com/about" },
  ],
  creator: "The Tim Hawkes Team",
  publisher: "Idaho DPA Finder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.idahodownpaymentprograms.com",
    siteName: "Idaho DPA Finder",
    title: "Idaho Down Payment Assistance Programs 2026 Guide",
    description:
      "2026 Idaho down payment assistance guide. IHFA up to 8% of sales price. Free quiz for Boise, Meridian, Nampa, and statewide programs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Idaho Down Payment Assistance Programs 2026 Guide",
    description:
      "2026 Idaho down payment assistance guide. IHFA up to 8% of sales price. Free quiz for Boise, Meridian, Nampa, and statewide programs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
  },
};

// Site-wide structured data (Organization + WebSite only)
// Note: LocalBusiness schema intentionally omitted - this is an educational resource,
// not a business site. LocalBusiness should be on thetimhawkesteam.com instead.
const siteSchemas = combineSchemas(
  getOrganizationSchema(),
  getWebSiteSchema()
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Site-wide structured data for SEO and AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas) }}
        />
        {/* LLM-friendly content references for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Site Info" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="LLM Full Content" />
      </head>
      <body
        className={`${plusJakarta.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <GoogleAnalytics />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
