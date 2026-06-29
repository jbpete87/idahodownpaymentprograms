"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuizStore } from "@/stores/quiz-store";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  FundingBadge,
  ConfidenceBadge,
} from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

export function StepResults() {
  const { matches, answers, submissionId, reset } = useQuizStore();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    contactPreference: "email" as "call" | "text" | "email",
    bestTime: "morning" as "morning" | "afternoon" | "evening",
    notes: "",
    marketingConsent: false,
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const likelyMatches = matches.filter((m) => m.confidence === "likely");
  const topAmount = matches[0]?.estimatedAmount || 0;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          submissionId,
          answers,
          matches: matches.map((m) => ({
            programName: m.program.name,
            agency: m.program.agency,
            estimatedAmount: m.estimatedAmount,
            confidence: m.confidence,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      AnalyticsEvents.generateLead({
        leadSource: "quiz",
        matchCount: matches.length,
        county: answers.propertyCounty,
        isFirstTimeBuyer: answers.ownedHomeInLast3Years === false,
      });
      setLeadSubmitted(true);
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProgram = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  if (matches.length === 0) {
    return (
      <div className="space-y-6">
        <Card padding="lg" className="text-center border border-gray-200">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-4">
            No Exact Matches Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Based on your answers, we didn&apos;t find programs that match your current 
            situation. But don&apos;t give up! Your situation may change or we may have 
            missed something.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={reset}>
              <RefreshCw className="w-5 h-5 mr-2" />
              Retake Quiz
            </Button>
            <Link href="/programs">
              <Button variant="secondary">Browse All Programs</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <Card padding="lg" className="text-center bg-white border border-gray-200 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0 opacity-50" />
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#10B981] flex items-center justify-center mb-6 shadow-md ring-4 ring-green-50">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Great News! You May Qualify
          </h2>
          <p className="text-gray-600 mb-8">
            We found{" "}
            <strong className="text-[#10B981]">{matches.length} programs</strong>{" "}
            you may be eligible for
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981]">
                {formatCurrency(topAmount)}
              </div>
              <div className="text-sm text-gray-500 font-medium">Top Program Amount</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981]">
                {likelyMatches.length}
              </div>
              <div className="text-sm text-gray-500 font-medium">Likely Eligible</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Program matches */}
      <div className="space-y-4">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
          Your Matched Programs
        </h3>

        {matches.map((match, index) => {
          const isExpanded = expandedProgram === match.program.id;
          return (
            <Card
              key={match.program.id}
              padding="lg"
              className="border border-gray-200 animate-slide-up hover:border-green-200 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <ConfidenceBadge level={match.confidence} />
                    <FundingBadge status={match.program.fundingStatus} />
                  </div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-gray-900">
                    {match.program.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {match.program.agency}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#10B981]">
                    {formatCurrency(match.estimatedAmount)}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {match.program.assistanceType === "grant"
                      ? "Grant"
                      : match.program.assistanceType === "forgivable_loan"
                      ? "Forgivable Loan"
                      : "Deferred Loan"}
                  </div>
                </div>
              </div>

              {/* Match reasons */}
              {match.matchReasons.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {match.matchReasons.map((reason, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-xs font-medium text-green-700 border border-green-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {reason}
                    </span>
                  ))}
                </div>
              )}

              {/* Expand/collapse */}
              <button
                onClick={() => toggleProgram(match.program.id)}
                className="mt-4 flex items-center gap-2 text-sm text-[#10B981] font-medium hover:text-[#059669] transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show details
                  </>
                )}
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fade-in">
                  <p className="text-gray-600">{match.program.termsSummary}</p>

                  {match.program.forgivenessYears && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>
                        Forgiven after <span className="font-medium text-gray-900">{match.program.forgivenessYears} years</span>
                      </span>
                    </div>
                  )}

                  {match.program.requiresEducationCourse && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-sm text-amber-800">
                      Requires homebuyer education course
                    </div>
                  )}

                  {match.warnings.length > 0 && (
                    <div className="space-y-2">
                      {match.warnings.map((warning, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-sm text-amber-800"
                        >
                          ⚠️ {warning}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href={`/programs/${match.program.slug}`}>
                      <Button variant="secondary" size="sm">
                        Full Details
                      </Button>
                    </Link>
                    {match.program.websiteUrl && (
                      <a
                        href={match.program.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Official Site
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      {!showLeadForm && !leadSubmitted && (
        <Card padding="lg" className="border border-gray-200 bg-gradient-to-br from-white to-green-50">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Team Photo Placeholder */}
            <div className="w-20 h-20 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
              TH
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
                Want Help Applying?
              </h3>
              <p className="text-gray-600 mb-2">
                Tim Hawkes &amp; Jake Peterson specialize in maximizing DPA benefits for Idaho homebuyers.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">5.0 · 190+ Reviews</span>
                </div>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-gray-500">
                  <a href="tel:8018207620" className="hover:text-[#10B981] transition-colors">(801) 820-7620</a>
                  {" · "}
                  <a href="sms:8016986071" className="hover:text-[#10B981] transition-colors">Text</a>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button
                variant="primary"
                onClick={() => {
                  AnalyticsEvents.quizLeadFormOpen();
                  setShowLeadForm(true);
                }}
              >
                Yes, Help Me Apply
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/programs">
                <Button variant="ghost" className="w-full">
                  I&apos;ll Explore on My Own
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Lead capture form */}
      {showLeadForm && !leadSubmitted && (
        <Card padding="lg" className="border border-gray-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👨‍💼</span>
              </div>
              <div>
                <CardTitle>Connect with The Tim Hawkes Team</CardTitle>
                <p className="text-sm text-gray-500">Cornerstone Home Lending | NMLS #2258</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <Input
                label="Your Name"
                required
                value={leadForm.name}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, name: e.target.value })
                }
                placeholder="John Smith"
              />
              <Input
                label="Email"
                type="email"
                required
                value={leadForm.email}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, email: e.target.value })
                }
                placeholder="john@example.com"
              />
              <Input
                label="Phone"
                type="tel"
                required
                value={leadForm.phone}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, phone: e.target.value })
                }
                placeholder="(801) 555-0123"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Preferred Contact
                  </label>
                  <div className="flex gap-2">
                    {(["email", "call", "text"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setLeadForm({ ...leadForm, contactPreference: method })
                        }
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          leadForm.contactPreference === method
                            ? "bg-green-50 border-green-200 text-green-700 ring-1 ring-green-200"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {method === "email" ? (
                          <Mail className="w-4 h-4 mx-auto" />
                        ) : method === "call" ? (
                          <Phone className="w-4 h-4 mx-auto" />
                        ) : (
                          "💬"
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Best Time
                  </label>
                  <div className="flex gap-2">
                    {(["morning", "afternoon", "evening"] as const).map(
                      (time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() =>
                            setLeadForm({ ...leadForm, bestTime: time })
                          }
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all duration-200 border ${
                            leadForm.bestTime === time
                              ? "bg-green-50 border-green-200 text-green-700 ring-1 ring-green-200"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {time}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <Textarea
                label="Anything else we should know? (optional)"
                value={leadForm.notes}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, notes: e.target.value })
                }
                placeholder="Questions, timeline, specific concerns..."
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={leadForm.marketingConsent}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      marketingConsent: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <span className="text-sm text-gray-500">
                  I agree to receive communications about my home buying journey. 
                  I can unsubscribe at any time.
                </span>
              </label>

              {leadError && (
                <p className="text-sm text-red-600 font-medium">{leadError}</p>
              )}

              <CardFooter className="px-0 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                  {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Success message */}
      {leadSubmitted && (
        <Card padding="lg" className="text-center border border-gray-200 shadow-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
            You&apos;re All Set!
          </h3>
          <p className="text-gray-600 mb-2">
            The Tim Hawkes Team has received your request.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Expect a call or email within 1 business day to discuss your options 
            and next steps toward homeownership.
          </p>
          <Link href="/programs">
            <Button variant="secondary">
              Browse All Programs
            </Button>
          </Link>
        </Card>
      )}

      {/* Restart option */}
      <div className="text-center">
        <button
          onClick={reset}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Start Over
        </button>
      </div>
    </div>
  );
}
