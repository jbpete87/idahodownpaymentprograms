import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button } from "@/components/ui";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  Heart,
  Shield,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import { getArticleSchema, getBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us | Idaho Down Payment Assistance Finder",
  description:
    "Learn about The Tim Hawkes Team and our mission to help Idaho homebuyers find and access down payment assistance programs.",
  alternates: {
    canonical: "/about",
  },
};

// Structured data for About page
const aboutSchemas = combineSchemas(
  getArticleSchema({
    title: "About Idaho DPA Finder",
    description:
      "Learn about The Tim Hawkes Team and our mission to help Idaho homebuyers find and access down payment assistance programs.",
    url: "/about",
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  }),
  getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ])
);

const reviews = [
  { platform: "Google", rating: 5, count: 72 },
  { platform: "Birdeye", rating: 5, count: 99 },
  { platform: "Facebook", rating: 5, count: 10 },
  { platform: "Zillow", rating: 5, count: 9 },
];

const teamMembers = [
  {
    name: "Tim Hawkes",
    role: "Team Lead & Program Advisor",
    subtitle: "Licensed Idaho Mortgage Loan Officer",
    email: "tim@thetimhawkesteam.com",
    nmls: "8785",
    years: "15+",
  },
  {
    name: "Jake Peterson",
    role: "Mortgage Professional & Program Advisor",
    subtitle: "Licensed Idaho Mortgage Loan Officer",
    email: "jake@thetimhawkesteam.com",
    nmls: "1692825",
    years: "10+",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* About page structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchemas) }}
      />
      
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Helping Idaho Families
            <span className="block text-[#10B981]">Achieve Homeownership</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe everyone deserves a chance to own their home. This free tool 
            was built to help Idaho homebuyers discover the financial assistance they qualify for.
          </p>
        </div>

        {/* Reviews Banner */}
        <Card padding="md" className="mb-12 border border-gray-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">5.0 Rating</span>
                <span className="text-gray-600 ml-2">· 190+ Reviews</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {reviews.map((review) => (
                <div key={review.platform} className="flex items-center gap-1 text-gray-600">
                  <span className="font-medium">{review.platform}</span>
                  <span className="text-gray-400">({review.count})</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-8 text-center">
            Program Advisors & Maintainers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} padding="lg" className="border border-gray-200">
                <div className="flex items-start gap-4">
                  {/* Photo Placeholder */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-3xl">👨‍💼</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#10B981] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {member.years} yrs
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#10B981] font-medium">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500 mb-1">
                      {member.subtitle}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      NMLS #{member.nmls}
                    </p>
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#10B981] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <Card padding="lg" className="mb-12 border border-gray-200">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-4">
            Why We Built This Tool
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              After helping hundreds of Idaho families navigate the home buying process, 
              we noticed a pattern: most buyers had no idea how much assistance was available 
              to them. Many missed out on tens of thousands of dollars simply because they 
              didn&apos;t know where to look.
            </p>
            <p>
              We built this tool to change that. Now, in just 5 minutes, you can discover 
              every program you might qualify for — completely free, no strings attached. 
              And if you want help applying, our team is here for you.
            </p>
          </div>
        </Card>

        {/* Contact Info */}
        <Card padding="lg" className="mb-12 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <a href="tel:8018207620" className="font-semibold text-gray-900 hover:text-[#10B981] transition-colors block">
                  (801) 820-7620 <span className="text-sm font-normal text-gray-500">Call</span>
                </a>
                <a href="sms:8016986071" className="text-sm text-gray-600 hover:text-[#10B981] transition-colors block">
                  (801) 698-6071 <span className="text-gray-500">Text</span>
                </a>
              </div>
            </div>
            
            <a 
              href="mailto:jake@thetimhawkesteam.com"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Email Us</div>
                <div className="text-sm text-gray-500">jake@thetimhawkesteam.com</div>
              </div>
            </a>
            
            <a 
              href="https://maps.google.com/?q=1725+E+1450+S+Ste+100+Clearfield+UT+84015"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Visit Us</div>
                <div className="text-sm text-gray-500">Clearfield, UT</div>
              </div>
            </a>
          </div>
        </Card>

        {/* Cornerstone Branding */}
        <Card padding="md" className="mb-12 border border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Cornerstone Logo Placeholder */}
              <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center text-white text-xl font-bold">
                CHL
              </div>
              <div>
                <div className="font-semibold text-gray-900">Cornerstone Home Lending</div>
                <div className="text-sm text-gray-500">NMLS #2258 | Equal Housing Lender</div>
              </div>
            </div>
            <div className="text-center sm:text-right text-sm text-gray-500">
              <div>1725 E 1450 S Ste 100</div>
              <div>Clearfield, UT 84015</div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Target, value: "13+", label: "Programs Tracked" },
            { icon: Users, value: "29", label: "Counties Covered" },
            { icon: Heart, value: "100%", label: "Free to Use" },
            { icon: Shield, value: "0", label: "SSN Required" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} padding="md" className="text-center border border-gray-200">
                <Icon className="w-6 h-6 mx-auto text-[#10B981] mb-2" />
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Our Commitment */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Commitment to You
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Accuracy",
                description:
                  "We verify program information regularly. When we're not 100% sure, we'll tell you.",
              },
              {
                title: "Privacy",
                description:
                  "We never ask for SSN or bank details. Your info is only shared if you request help.",
              },
              {
                title: "Transparency",
                description:
                  "This tool provides estimates. Final approval comes from program administrators.",
              },
              {
                title: "No Pressure",
                description:
                  "Use the tool completely free. You're never obligated to contact us.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="flex items-start gap-4 p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card padding="lg" className="text-center bg-[#10B981] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-4">
              Ready to Find Your Assistance?
            </h2>
            <p className="text-green-50 mb-6 max-w-xl mx-auto">
              Take our free 5-minute quiz and discover which Idaho down payment 
              assistance programs you may qualify for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                  Start Eligibility Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
