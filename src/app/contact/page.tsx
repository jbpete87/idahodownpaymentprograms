"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, Button, Input } from "@/components/ui";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Star,
  Users,
} from "lucide-react";
import type { Metadata } from "next";

const teamMembers = [
  {
    name: "Tim Hawkes",
    role: "Team Lead & Program Advisor",
    subtitle: "Licensed Idaho Mortgage Loan Officer",
    email: "tim@thetimhawkesteam.com",
    phone: "(801) 820-7620",
    nmls: "8785",
  },
  {
    name: "Jake Peterson",
    role: "Mortgage Professional & Program Advisor",
    subtitle: "Licensed Idaho Mortgage Loan Officer",
    email: "jake@thetimhawkesteam.com",
    phone: "(801) 820-7620",
    nmls: "1692825",
  },
];

const reviews = [
  { platform: "Google", count: 72 },
  { platform: "Birdeye", count: 99 },
  { platform: "Facebook", count: 10 },
  { platform: "Zillow", count: 9 },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    console.log("Contact form submitted:", formState);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Get Help Understanding Idaho Down Payment Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Questions about a specific program? Not sure how eligibility works? 
            Our team helps Idaho homebuyers understand their options and next steps.
          </p>
        </div>

        {/* Reviews Banner */}
        <Card padding="md" className="mb-10 border border-gray-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-900 font-semibold">5.0 Stars · 190+ Reviews</span>
            <span className="text-gray-500 text-sm hidden sm:inline">
              ({reviews.map(r => r.platform).join(", ")})
            </span>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info & Team */}
          <div className="space-y-6">
            {/* Main Contact Card */}
            <Card padding="lg" className="border border-gray-200">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-6">
                The Tim Hawkes Team
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                Cornerstone Home Lending
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <a href="tel:8018207620" className="font-semibold text-gray-900 hover:text-[#10B981] transition-colors block">
                      (801) 820-7620 <span className="text-xs font-normal text-gray-500">Call</span>
                    </a>
                    <a href="sms:8016986071" className="text-sm text-gray-600 hover:text-[#10B981] transition-colors block">
                      (801) 698-6071 <span className="text-xs text-gray-500">Text</span>
                    </a>
                  </div>
                </div>

                <a 
                  href="mailto:jake@thetimhawkesteam.com"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">jake@thetimhawkesteam.com</div>
                    <div className="text-xs text-gray-500">or tim@thetimhawkesteam.com</div>
                  </div>
                </a>

                <a 
                  href="https://maps.google.com/?q=1725+E+1450+S+Ste+100+Clearfield+UT+84015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">1725 E 1450 S Ste 100</div>
                    <div className="text-xs text-gray-500">Clearfield, UT 84015</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Mon–Fri: 9am–6pm</div>
                    <div className="text-xs text-gray-500">Sat: By Appointment</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Program Advisors & Maintainers */}
            <Card padding="lg" className="border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-[#10B981]" />
                <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-gray-900">
                  Program Advisors & Maintainers
                </h2>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div 
                    key={member.name}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-xl">
                      👨‍💼
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-xs text-[#10B981] font-medium">{member.role}</div>
                      <div className="text-xs text-gray-500">{member.subtitle}</div>
                      <div className="text-xs text-gray-400">NMLS #{member.nmls}</div>
                    </div>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-sm text-gray-500 hover:text-[#10B981] transition-colors"
                    >
                      Email
                    </a>
                  </div>
                ))}
              </div>
            </Card>

            {/* Educational Help (Primary) */}
            <Card padding="md" className="border border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">
                We can help you understand:
              </h3>
              <ul className="space-y-3">
                {[
                  "Understanding your quiz results",
                  "Comparing multiple programs",
                  "Explaining eligibility requirements",
                  "How programs can be combined",
                  "General application guidance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Disclosure + Application Assistance (Secondary) */}
            <Card padding="md" className="border border-[#10B981]/30 bg-[#10B981]/5">
              <h3 className="font-semibold text-gray-900 mb-2">
                Optional Application Assistance
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Idaho DPA Finder is an educational resource. If you choose, licensed mortgage professionals 
                from <span className="font-medium">The Tim Hawkes Team</span> at{" "}
                <span className="font-medium">Cornerstone Home Lending</span> can assist with 
                applications and pre-approvals.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card padding="lg" className="border border-gray-200 sticky top-24">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We&apos;ll get back to you within 1 business day.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", phone: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone (Optional)
                      </label>
                      <Input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder="(801) 555-1234"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How can we help?
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        placeholder="Tell us about your situation..."
                        className="w-full rounded-xl bg-white border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all duration-200 resize-none"
                      />
                    </div>

                    <Button type="submit" fullWidth size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      We typically respond within 1 business day.
                    </p>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
