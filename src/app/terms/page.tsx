import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Idaho Down Payment Assistance Finder",
  description:
    "Terms of use for Idaho Down Payment Programs website and eligibility quiz tool.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Terms of Use
          </h1>
          <p className="text-gray-500">Last updated: January 12, 2026</p>
        </div>

        <Card padding="lg" className="border border-gray-200 prose prose-gray max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using idahodownpaymentprograms.com ("the Website"), 
            you agree to be bound by these Terms of Use. If you do not agree to 
            these terms, please do not use this Website.
          </p>

          <h2>About This Website</h2>
          <p>
            Idaho Down Payment Programs is a free educational resource designed to 
            help Idaho homebuyers discover down payment assistance programs they may 
            qualify for. This Website is maintained by The Tim Hawkes Team at 
            Cornerstone Home Lending.
          </p>
          <p>
            <strong>Important:</strong> This Website provides general information 
            and educational tools only. It does not constitute financial, legal, 
            or mortgage advice.
          </p>

          <h2>Educational Purpose Disclaimer</h2>
          <p>
            The eligibility quiz, program information, and all content on this 
            Website are provided for educational and informational purposes only. 
            Specifically:
          </p>
          <ul>
            <li>
              <strong>Quiz results are estimates only.</strong> They do not 
              guarantee eligibility for any program.
            </li>
            <li>
              <strong>Final eligibility</strong> is determined solely by the 
              administering agency (such as Idaho Housing and Finance Association (IHFA), city, or 
              county housing departments) and your chosen lender.
            </li>
            <li>
              <strong>Program information may change</strong> without notice. 
              Funding availability, income limits, and program terms are subject 
              to change by program administrators.
            </li>
            <li>
              <strong>We are not affiliated</strong> with any government agency 
              or housing authority. We aggregate publicly available information 
              for educational purposes.
            </li>
          </ul>

          <h2>No Guarantee of Assistance</h2>
          <p>
            Using this Website or completing our eligibility quiz does not:
          </p>
          <ul>
            <li>Guarantee approval for any down payment assistance program</li>
            <li>Reserve funds or place you on any waitlist</li>
            <li>Constitute an application for any program</li>
            <li>Create a lender-borrower relationship</li>
            <li>Constitute mortgage pre-approval or pre-qualification</li>
          </ul>

          <h2>Accuracy of Information</h2>
          <p>
            We strive to maintain accurate and up-to-date information about down 
            payment assistance programs. However:
          </p>
          <ul>
            <li>
              We cannot guarantee the accuracy, completeness, or timeliness of 
              all information
            </li>
            <li>
              Program details should be verified directly with program 
              administrators before making decisions
            </li>
            <li>
              Income limits are based on published Area Median Income (AMI) data 
              and may vary
            </li>
          </ul>

          <h2>User Responsibilities</h2>
          <p>By using this Website, you agree to:</p>
          <ul>
            <li>Provide accurate information when using our tools</li>
            <li>
              Verify program details with official sources before applying
            </li>
            <li>Not use the Website for any unlawful purpose</li>
            <li>Not attempt to interfere with the Website's operation</li>
            <li>Not misrepresent your identity or information</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on this Website, including text, graphics, logos, and 
            software, is the property of Idaho Down Payment Programs or its 
            licensors and is protected by copyright and trademark laws.
          </p>
          <p>
            You may not reproduce, distribute, or create derivative works without 
            our written permission.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            This Website contains links to third-party websites, including:
          </p>
          <ul>
            <li>
              <a
                href="https://www.idahohousing.com/homebuyers/down-payment-closing-cost-assistance/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] hover:underline"
              >
                Idaho Housing — Down Payment Assistance
              </a>
            </li>
            <li>
              <a
                href="https://www.idahohousing.com/partners/lenders-realtors/loan-product/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] hover:underline"
              >
                Idaho Housing — Loan Product Overview
              </a>
            </li>
            <li>City and county government websites</li>
            <li>HUD (hud.gov)</li>
            <li>Program administrator websites</li>
          </ul>
          <p>
            We are not responsible for the content, accuracy, or practices of 
            these external sites. Links are provided for convenience and do not 
            imply endorsement.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Idaho Down Payment Programs, 
            The Tim Hawkes Team, and Cornerstone Home Lending shall not be liable 
            for:
          </p>
          <ul>
            <li>
              Any indirect, incidental, special, or consequential damages arising 
              from your use of this Website
            </li>
            <li>
              Any loss of data, profits, or opportunities resulting from reliance 
              on information provided
            </li>
            <li>
              Any errors or omissions in program information or quiz results
            </li>
            <li>
              Denial of assistance by any program administrator
            </li>
          </ul>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Idaho Down Payment Programs, 
            its operators, and affiliates from any claims, damages, or expenses 
            arising from your use of the Website or violation of these Terms.
          </p>

          <h2>Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Changes 
            will be effective immediately upon posting. Your continued use of the 
            Website after changes constitutes acceptance of the modified terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Use are governed by the laws of the State of Idaho. Any 
            disputes shall be resolved in the courts of the State of Idaho.
          </p>

          <h2>Mortgage Lending Disclosures</h2>
          <p>
            Mortgage services, if requested, are provided by Cornerstone Home 
            Lending, a Division of Cornerstone Capital Bank, SSB. Member FDIC. 
            NMLS #2258. Equal Housing Lender.
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

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Use, please contact us:
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

