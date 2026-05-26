import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Idaho Down Payment Assistance Finder",
  description:
    "Privacy policy for Idaho Down Payment Programs - how we collect, use, and protect your information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: January 12, 2026</p>
        </div>

        <Card padding="lg" className="border border-gray-200 prose prose-gray max-w-none">
          <h2>Introduction</h2>
          <p>
            Idaho Down Payment Programs ("we," "our," or "us") operates the website 
            idahodownpaymentprograms.com. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website 
            and use our eligibility quiz tool.
          </p>
          <p>
            This website is maintained by The Tim Hawkes Team at Cornerstone Home 
            Lending (NMLS #2258). By using this site, you also agree to Cornerstone 
            Home Lending's privacy practices.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Quiz Information</h3>
          <p>
            When you use our eligibility quiz, we collect the information you 
            voluntarily provide, including:
          </p>
          <ul>
            <li>Property location (county and/or city)</li>
            <li>Household size</li>
            <li>Annual household income</li>
            <li>First-time homebuyer status</li>
            <li>Veteran status</li>
            <li>Occupation category</li>
            <li>Expected purchase price range</li>
          </ul>
          <p>
            <strong>We do NOT collect:</strong> Social Security numbers, dates of 
            birth, bank account information, or credit card numbers through our 
            eligibility quiz.
          </p>

          <h3>Contact Information</h3>
          <p>
            If you choose to contact us or request follow-up assistance, we may 
            collect:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Any additional information you provide in your message</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            Like most websites, we automatically collect certain information when 
            you visit, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>Device information</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide personalized down payment assistance program recommendations</li>
            <li>Respond to your inquiries and requests</li>
            <li>Improve our website and services</li>
            <li>Connect you with mortgage professionals if you request assistance</li>
            <li>Send communications you have opted into</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information 
            with:
          </p>
          <ul>
            <li>
              <strong>Cornerstone Home Lending:</strong> As the parent organization, 
              they may receive information if you request mortgage assistance
            </li>
            <li>
              <strong>Service Providers:</strong> Third parties who help us operate 
              our website (hosting, analytics)
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect 
              our rights
            </li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to improve your experience. 
            You can control cookies through your browser settings. We may use:
          </p>
          <ul>
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand how visitors use our site</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to 
            protect your personal information. However, no internet transmission 
            is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href="mailto:jake@thetimhawkesteam.com">jake@thetimhawkesteam.com</a>.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website contains links to third-party websites, including program 
            administrator sites (Idaho Housing and Finance Association (IHFA), city and county 
            websites). We are not responsible for the privacy practices of these 
            external sites.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for individuals under 18 years of age. We 
            do not knowingly collect information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be 
            posted on this page with an updated "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:jake@thetimhawkesteam.com">jake@thetimhawkesteam.com</a>
            </li>
            <li>
              <strong>Phone:</strong> (801) 820-7620
            </li>
            <li>
              <strong>Address:</strong> 1725 E 1450 S Ste 100, Clearfield, UT 84015
            </li>
          </ul>

          <h2>Mortgage Lending Disclosures</h2>
          <p>
            Mortgage services provided by Cornerstone Home Lending, a Division of 
            Cornerstone Capital Bank, SSB. Member FDIC. NMLS #2258. Equal Housing 
            Lender.
          </p>
          <p>
            Tim Hawkes NMLS #8785 | Jake Peterson NMLS #1692825
          </p>
          <p>
            <a 
              href="https://www.nmlsconsumeraccess.org" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              NMLS Consumer Access
            </a>
          </p>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[#10B981] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

