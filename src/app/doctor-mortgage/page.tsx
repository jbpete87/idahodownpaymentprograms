import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button } from "@/components/ui";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShieldCheck,
  Stethoscope,
  Scale,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { CONTENT_UPDATED, DOCTOR_MORTGAGE_SEO } from "@/lib/seo-metadata";
import {
  getFAQSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

const SOURCE_URL = "https://www.thetimhawkesteam.com/loans/doctor-mortgage";
const BOOK_URL =
  "https://www.thetimhawkesteam.com/book?topic=doctor-mortgage&loanType=Purchase&utm_source=idaho-dpa";

export const metadata: Metadata = {
  title: DOCTOR_MORTGAGE_SEO.title,
  description: DOCTOR_MORTGAGE_SEO.description,
  alternates: {
    canonical: "/doctor-mortgage",
  },
  keywords: [
    "idaho doctor mortgage",
    "idaho physician loan",
    "doctor loan idaho",
    "physician mortgage boise",
    "100% financing idaho",
    "doctor mortgage no pmi",
    "nurse mortgage idaho",
    "physician assistant mortgage idaho",
    "attorney mortgage idaho",
    "cpa home loan idaho",
  ],
  openGraph: {
    title: DOCTOR_MORTGAGE_SEO.title,
    description: DOCTOR_MORTGAGE_SEO.openGraphDescription,
    type: "article",
  },
};

const faqs = [
  {
    question: "Is a doctor mortgage the same as down payment assistance?",
    answer:
      "No. A doctor or professional mortgage is a specialty first mortgage that can finance most or all of a primary home, with no monthly mortgage insurance. It is not a grant, a forgivable second, or a deferred DPA loan. Professionals Plus cannot be combined with a second mortgage or a down-payment-assistance lien. The Medical Professionals loan and the Med Pro Program also do not allow a DPA second mortgage.",
  },
  {
    question: "Can I buy with no down payment and no mortgage insurance?",
    answer:
      "On Professionals Plus, 100% financing applies when the loan is $250,000 up to the county conforming limit, the score is at least 720, and the debt ratio is 38% or less. In most counties the 2026 one-unit conforming limit is $832,750. Above that limit, up to $1.5 million, Professionals Plus is 95% financing with 5% of your own funds and a 36% debt ratio. On the Medical Professionals loan, 100% financing goes to $1.5 million with a 680 score, or to $2 million with a 720 score. That loan is for financing more than 90% of the price. The Med Pro Program goes up to 100% financing, with loan amounts up to $2 million. None of the three charges monthly mortgage insurance.",
  },
  {
    question: "Do nurses, attorneys, CPAs, physician assistants, or dentists qualify?",
    answer:
      "It depends on the program. Registered nurses, nurse practitioners, practicing attorneys, and CPAs qualify for Professionals Plus. Dentists qualify for all three programs. Pharmacists (PharmD), veterinarians, and CRNAs qualify for the Medical Professionals loan and the Med Pro Program, along with physicians and dentists. Physician assistants and optometrists qualify for the Med Pro Program only. A law degree has to be paired with work as an associate, partner, or counsel.",
  },
  {
    question: "Is a doctor loan a 30-year fixed mortgage?",
    answer:
      "Professionals Plus is a 5/6 adjustable-rate mortgage. The rate stays the same for 5 years, then it can change every 6 months. The first change is capped at 2 percentage points, later changes at 1 point, and the rate cannot rise more than 5 points over the start rate. The Medical Professionals loan can be a 15-, 20-, 25-, or 30-year fixed rate, or a 5/6, 7/6, or 10/6 adjustable-rate mortgage. The Med Pro Program offers a 30-year fixed rate, or a 5/6, 7/6, or 10/6 adjustable-rate mortgage.",
  },
  {
    question: "Do deferred student loans count?",
    answer:
      "On Professionals Plus, student loans deferred for at least 12 months at closing can be left out of the debt ratio for any eligible borrower. On the Medical Professionals loan, student loans in deferment, forbearance, or a $0 income-driven payment can be left out only when you are in residency or a medical fellowship, or about to start one, and you qualify on that income. Loans in repayment still count.",
  },
  {
    question: "Can I refinance, or buy a second home?",
    answer:
      "Professionals Plus is for a primary-home purchase only. The Medical Professionals loan can be used for a primary-home purchase or a rate-and-term refinance. Neither loan allows a second home, a rental, or a second mortgage on top. Ask us whether the Med Pro Program fits a refinance.",
  },
];

const pageSchemas = combineSchemas(
  getArticleSchema({
    title: DOCTOR_MORTGAGE_SEO.title,
    description: DOCTOR_MORTGAGE_SEO.description,
    url: "/doctor-mortgage",
    datePublished: "2026-10-05",
    dateModified: "2026-10-05",
  }),
  getFAQSchema(faqs),
  getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Programs", url: "/programs" },
    { name: "Doctor Mortgage Loans", url: "/doctor-mortgage" },
  ])
);

const highlights = [
  {
    icon: Stethoscope,
    title: "Up to 100% financing",
    body: "Professionals Plus goes to 100% up to the county conforming limit. The Medical Professionals loan goes to 100% up to $1.5 million, or $2 million with a 720 score. The Med Pro Program goes up to 100%, with loans up to $2 million.",
  },
  {
    icon: ShieldCheck,
    title: "No monthly mortgage insurance",
    body: "None of the three programs charges monthly mortgage insurance on these high-financing loans.",
  },
  {
    icon: Briefcase,
    title: "More than physicians",
    body: "Nurses, attorneys, and CPAs use Professionals Plus. Pharmacists, veterinarians, and CRNAs use the medical programs. Physician assistants and optometrists now qualify through the new Med Pro Program.",
  },
  {
    icon: Scale,
    title: "Three programs, three rule sets",
    body: "The credential, the rate type, the loan amount, and the student-loan rule depend on which program you use. With three lenders, we compare pricing on your scenario.",
  },
];

const comparisonRows = [
  ["Rate", "5/6 ARM only", "15- to 30-year fixed, or 5/6, 7/6, and 10/6 ARM", "30-year fixed, or 5/6, 7/6, and 10/6 ARM"],
  ["Use", "Primary-home purchase", "Primary-home purchase or rate-and-term refinance", "Ask us"],
  [
    "100% financing",
    "Up to the county conforming limit, from $250,000",
    "Up to $1.5 million at 680, or $2 million at 720",
    "Up to 100%, with loans up to $2 million",
  ],
  [
    "Above that",
    "95% up to $1.5 million, with 5% of your own funds",
    "95% up to $2 million at 680",
    "Ask us",
  ],
  ["Credit score", "720", "680 or 720, depending on the amount", "Ask us"],
  [
    "Who",
    "Physicians, dentists, residents, fellows, nurses, nurse practitioners, practicing attorneys, CPAs",
    "Physicians, dentists, pharmacists, veterinarians, podiatrists, CRNAs, nurse practitioners, residents, fellows, interns",
    "Physicians, physician assistants, dentists, pharmacists, veterinarians, podiatrists, optometrists, CRNAs, nurse practitioners, residents, fellows, interns",
  ],
  [
    "Student loans",
    "Deferred 12 months or more can be excluded",
    "Excluded for residents and fellows in deferment, forbearance, or a $0 income-driven plan",
    "Ask us",
  ],
  [
    "Gift funds",
    "Allowed after your own minimum. That minimum is $0 at 100%",
    "Can cover the down payment, closing costs, and reserves",
    "Ask us",
  ],
];

const MED_PRO_ELIGIBLE = [
  "Medical doctors (MD) and doctors of osteopathic medicine (DO), including ophthalmologists and psychiatrists",
  "Physician assistants and associates (PA)",
  "Dentists: DDS and DMD",
  "Pharmacists (PharmD)",
  "Veterinarians (DVM or VMD)",
  "Podiatrists (DPM)",
  "Optometrists (OD)",
  "CRNAs with a DNAP or DNP, and nurse practitioners (NP)",
  "Medical residents, fellows, and interns with an eligible degree",
];

const professions = [
  {
    title: "Physicians and dentists",
    body: "MD, DO, and DPM physicians, including residents and fellows, qualify for all three programs. DDS and DMD dentists do too. The Medical Professionals loan and the Med Pro Program also include interns.",
  },
  {
    title: "Nurses",
    body: "Registered nurses and nurse practitioners (FNP, AGPCNP, PNP, and PMHNP) qualify for Professionals Plus. Nurse practitioners with an MSN or DNP, and CRNAs with a DNAP or DNP, qualify for the Medical Professionals loan. Registered nurses do not.",
  },
  {
    title: "Attorneys and CPAs",
    body: "Practicing attorneys working as an associate, partner, or counsel, and CPAs, qualify for Professionals Plus only. They are not eligible for the Medical Professionals loan.",
  },
  {
    title: "Pharmacists and veterinarians",
    body: "Pharmacists (PharmD) and veterinarians (DVM or VMD) qualify for the Medical Professionals loan and the Med Pro Program. They are not eligible for Professionals Plus.",
  },
  {
    title: "Physician assistants and optometrists",
    body: "New October 5, 2026: physician assistants (PA) and optometrists (OD) qualify for the Med Pro Program. They are not eligible for the other two loans.",
  },
];

export default function DoctorMortgagePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      <Header />

      <main>
        <section className="relative bg-white border-b border-gray-200 py-12 md:py-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent opacity-50" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#10B981]">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/programs" className="hover:text-[#10B981]">
                Programs
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Doctor Mortgage Loans</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-800">
                  <Clock className="w-4 h-4" />
                  Guidelines as of {CONTENT_UPDATED}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-sm font-medium text-green-700">
                  <Stethoscope className="w-4 h-4" />
                  100% financing, not a grant
                </div>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Idaho Doctor and Professional Mortgage Loans
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                A doctor loan, also called a physician mortgage, lets an eligible licensed
                professional buy a primary home with little or no money down and no monthly
                mortgage insurance. The Tim Hawkes Team offers three versions, including the
                new Med Pro Program for physician assistants and optometrists. Each one follows
                its own guidelines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={BOOK_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    See which loan fits
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg">
                    Full guidelines
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card padding="lg" className="border border-amber-200 bg-amber-50/60">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    These are specialty mortgages, not down payment grants
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    City, county, and IHFA programs on this site are
                    grants, forgivable loans, or second mortgages that help with cash to close.
                    Doctor and professional loans are the first mortgage itself. They can cover
                    up to 100% of the price for people who meet the credential, credit, and
                    loan-amount rules. Professionals Plus cannot be combined with a second
                    mortgage or a down-payment-assistance lien. The Medical Professionals loan
                    and the Med Pro Program do not allow a DPA second mortgage either.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item) => (
                <Card key={item.title} padding="lg" className="border border-gray-200">
                  <item.icon className="w-8 h-8 text-[#10B981] mb-3" />
                  <h2 className="font-semibold text-gray-900 mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Who else can use a professional loan
              </h2>
              <p className="text-gray-600">
                Physicians are the usual starting point. Several other licenses qualify, and
                the list is not the same on all three programs. Physician assistants and
                optometrists qualify only for the new Med Pro Program.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {professions.map((item) => (
                <Card key={item.title} padding="lg" className="border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Which loan fits
              </h2>
              <p className="text-gray-600">
                Compare the three programs before you assume 100% financing applies to your
                price, score, or license.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <caption className="sr-only">
                  Professionals Plus compared with the Medical Professionals loan and the Med Pro Program
                </caption>
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-4 px-4 font-semibold text-gray-900"> </th>
                    <th className="py-4 px-4 font-semibold text-gray-900">Professionals Plus</th>
                    <th className="py-4 px-4 font-semibold text-gray-900">Medical Professionals</th>
                    <th className="py-4 px-4 font-semibold text-gray-900">Med Pro (new)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {comparisonRows.map(([label, plus, medical, medPro], index) => (
                    <tr key={label} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                      <th className="py-4 px-4 font-semibold text-gray-900 align-top text-left">
                        {label}
                      </th>
                      <td className="py-4 px-4 align-top">{plus}</td>
                      <td className="py-4 px-4 align-top">{medical}</td>
                      <td className="py-4 px-4 align-top">{medPro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Professionals Plus
              </h2>
              <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                This is Cornerstone Capital Bank&apos;s portfolio loan. It is a 5/6 ARM for a
                primary-home purchase in any state, including Idaho. The rate is fixed for 5
                years, then adjusts every 6 months, with caps of 2, 1, and 5.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 mb-6">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <caption className="sr-only">Professionals Plus financing tiers</caption>
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="py-4 px-4 font-semibold text-gray-900">Loan amount</th>
                      <th className="py-4 px-4 font-semibold text-gray-900">Down payment</th>
                      <th className="py-4 px-4 font-semibold text-gray-900">Credit score</th>
                      <th className="py-4 px-4 font-semibold text-gray-900">Max payment ratio</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium">
                        $250,000 up to the conforming loan limit
                      </td>
                      <td className="py-4 px-4">0%</td>
                      <td className="py-4 px-4">720</td>
                      <td className="py-4 px-4">38%</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">
                        Conforming limit + $1 up to $1,500,000
                      </td>
                      <td className="py-4 px-4">5% of your own funds</td>
                      <td className="py-4 px-4">720</td>
                      <td className="py-4 px-4">36%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mb-6 max-w-3xl">
                In most counties the 2026 one-unit conforming limit is $832,750, and it is
                higher in high-cost counties. There is no monthly mortgage insurance. A seller
                can contribute up to 6% of the price. Gift funds are allowed once your own
                minimum is met.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">Who qualifies</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Physicians: MD, DO, and DPM, including medical residents and fellows",
                  "Dentists: DDS and DMD",
                  "Registered nurses, and nurse practitioners (FNP, AGPCNP, PNP, and PMHNP)",
                  "Attorneys working as an associate, partner, or counsel",
                  "CPAs",
                  "U.S. citizens, permanent residents, and non-permanent resident aliens",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "A cosigner is allowed. The Cornerstone Capital Bank checking account can be opened at closing.",
                  "Residents and fellows can use an employment contract when the job starts within 90 days of the note.",
                  "Student loans deferred at least 12 months at closing can be left out of the debt ratio.",
                  "You need 3 months of reserves after closing, and no more than two financed properties.",
                  "Pharmacists, veterinarians, optometrists, physician assistants, and foreign nationals are not eligible for this loan. Physician assistants and optometrists can use the Med Pro Program.",
                  "Eligible homes are a single-family house, townhome, condo, PUD, or modular home. You cannot add a second mortgage or a down-payment-assistance lien.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Medical Professionals loan
              </h2>
              <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                This is a separate program. It offers a 15-, 20-, 25-, or 30-year fixed rate,
                or a 5/6, 7/6, or 10/6 ARM, for a primary-home purchase or a rate-and-term
                refinance. It is for financing more than 90% of the price, with no monthly
                mortgage insurance and no second mortgage.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 mb-6">
                <table className="w-full text-left border-collapse min-w-[520px]">
                  <caption className="sr-only">Medical Professionals financing tiers</caption>
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="py-4 px-4 font-semibold text-gray-900">Score</th>
                      <th className="py-4 px-4 font-semibold text-gray-900">Financing</th>
                      <th className="py-4 px-4 font-semibold text-gray-900">Loan amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium">680</td>
                      <td className="py-4 px-4">100%</td>
                      <td className="py-4 px-4">Up to $1,500,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-medium">680</td>
                      <td className="py-4 px-4">95%</td>
                      <td className="py-4 px-4">Up to $2,000,000</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">720</td>
                      <td className="py-4 px-4">100%</td>
                      <td className="py-4 px-4">Up to $2,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mb-6 max-w-3xl">
                The minimum loan is $100,000 on a fixed rate and $350,000 on an ARM. The debt
                ratio can go to 50% at 95% financing or below, and to 45% above 95% and on
                ARMs and 15-year terms.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">Who qualifies</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "MD, DO, DDS, DMD, and DPM, including residents, fellows, and interns",
                  "Pharmacists (PharmD) and veterinarians (DVM)",
                  "CRNAs with a DNAP or DNP, and nurse practitioners with an MSN or DNP",
                  "U.S. citizens and permanent residents",
                  "Non-permanent residents with an unexpired visa and 24 months of U.S. employment, up to 95% financing",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Gift funds from an eligible donor can cover the full down payment, closing costs, and reserves.",
                  "A W-2 contract can start within 150 days of the note. A 1099 contract can start within 60 days of closing.",
                  "Student loans in deferment, forbearance, or a $0 income-driven plan can be left out when you are qualifying on residency or fellowship income.",
                  "You can own up to four financed properties, including this home.",
                  "Registered nurses, attorneys, CPAs, physician assistants, and foreign nationals are not eligible for this loan. Physician assistants can use the Med Pro Program. Professors and medical directors need active clinical duties in the contract.",
                  "Eligible homes are a one-unit primary residence, including a warrantable condo, PUD, or modular home.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#059669] mb-2">
                New October 5, 2026
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Med Pro Program
              </h2>
              <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                Our third medical professional loan, from a separate lender. It offers up to
                100% financing, loan amounts up to $2,000,000, and no monthly mortgage
                insurance, with a 30-year fixed rate or a 5/6, 7/6, or 10/6 ARM. It is the only
                one of the three open to physician assistants and optometrists.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">Who qualifies</h3>
              <ul className="space-y-2 mb-6">
                {MED_PRO_ELIGIBLE.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 max-w-3xl">
                Credit score, debt ratio, occupancy, and student-loan rules for the Med Pro
                Program follow its own guideline. Call the Tim Hawkes Team to check your
                scenario against it and confirm availability in Idaho.
              </p>
            </div>
          </div>
        </section>


        <section className="py-12 md:py-16 bg-white border-y border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Doctor mortgage FAQ
              </h2>
              <p className="text-gray-600">
                Rules below apply only to the program named
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.question} padding="lg" className="border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card padding="lg" className="text-center bg-[#10B981] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-4">
                  Match the loan to your license
                </h2>
                <p className="text-green-50 mb-6 max-w-xl mx-auto">
                  Tell the Tim Hawkes Team your credential, whether you are buying or
                  refinancing, and how your student loans are set up. The DPA quiz on this
                  site screens grants and second mortgages, not these professional loans.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={BOOK_URL} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                      Book a free call
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                  <a
                    href="tel:8018207620"
                    className="inline-flex items-center justify-center h-14 px-8 text-lg font-medium rounded-xl border border-white text-white hover:bg-white/10 transition-colors"
                  >
                    (801) 820-7620
                  </a>
                </div>
              </div>
            </Card>
            <p className="mt-8 text-sm text-gray-500 leading-relaxed">
              Professionals Plus is a Cornerstone Capital Bank portfolio loan, last revised
              July 20, 2026. The Medical Professionals loan follows a separate guideline,
              effective August 10, 2026. The Med Pro Program follows its own guideline,
              effective October 5, 2026. These programs are not a standard Fannie Mae or
              Freddie Mac loan, and the rules above apply only to the program named. All
              loans are subject to credit approval, property eligibility, and program
              guidelines, which can change. This page is not a commitment to lend. Equal
              Housing Lender. Cornerstone Home Lending, a division of Cornerstone Capital
              Bank, SSB. NMLS #2258. Tim Hawkes NMLS #8785. Jake Peterson NMLS #1692825.
              Source:{" "}
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] hover:underline"
              >
                thetimhawkesteam.com/loans/doctor-mortgage
              </a>
              . Looking for a grant instead? Start with the{" "}
              <Link href="/programs" className="text-[#10B981] hover:underline">
                Idaho DPA program directory
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
