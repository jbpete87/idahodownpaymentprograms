"use client";

import { useState } from "react";
import { Button, Card, Input } from "@/components/ui";
import { ArrowRight, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";
import type { ProgramMatch, QuizAnswers } from "@/types";

/**
 * "Text me my plan": the matched programs stay free on the page. The personal
 * part (what combines, a rough total, what still has funding, what order to
 * apply in) goes out as a text or email from the team. The request emails the
 * team with the quiz answers so they can write and send the plan.
 */

const TEXT_FROM = "(801) 698-6071";

interface PlanRequestCardProps {
  stateName: string;
  accent: string;
  bookUrl: string;
  matches: ProgramMatch[];
  answers: Partial<QuizAnswers>;
  submissionId: string | null;
}

type Method = "text" | "email";

function phoneDigits(value: string): string {
  const d = value.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

export function PlanRequestCard({
  stateName,
  accent,
  bookUrl,
  matches,
  answers,
  submissionId,
}: PlanRequestCardProps) {
  const [method, setMethod] = useState<Method>("text");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const count = matches.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("Please add your first name.");
      return;
    }
    if (method === "text" && phoneDigits(phone).length !== 10) {
      setError("Please enter a 10-digit mobile number.");
      return;
    }
    if (method === "email" && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/plan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          firstName: firstName.trim(),
          phone: method === "text" ? phone.trim() : "",
          email: method === "email" ? email.trim() : "",
          company,
          consentText: method === "text" ? consentCopy : null,
          submissionId,
          answers,
          matches: matches.map((m) => ({
            programName: m.program.name,
            agency: m.program.agency,
            estimatedAmount: m.estimatedAmount,
            confidence: m.confidence,
            fundingStatus: m.program.fundingStatus,
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      setStatus("sent");
      AnalyticsEvents.quizPlanRequest(method, count);
      AnalyticsEvents.generateLead({
        leadSource: "quiz-plan",
        matchCount: count,
        county: answers.propertyCounty,
        isFirstTimeBuyer: answers.ownedHomeInLast3Years === false,
      });
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <Card padding="lg" className="border border-gray-200 shadow-md text-center" id="plan">
        <div
          className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 text-white"
          style={{ backgroundColor: accent }}
        >
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-2">
          Got it, {firstName.trim()}. Your plan is on the way.
        </h3>
        <p className="text-gray-600 mb-5 max-w-md mx-auto">
          {method === "text"
            ? `Look for a text from ${TEXT_FROM}, usually within one business day.`
            : "Look for an email from The Tim Hawkes Team, usually within one business day."}
        </p>
        <p className="text-sm text-gray-500">
          Want it sooner?{" "}
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: accent }}
            onClick={() => AnalyticsEvents.quizBookClick("plan-sent")}
          >
            Book a free call
          </a>{" "}
          or call <a href="tel:8018207620" className="font-semibold underline" style={{ color: accent }}>(801) 820-7620</a>.
        </p>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="border-2 shadow-lg" style={{ borderColor: accent }} id="plan">
      <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: accent }}>
        Free, from a local loan officer
      </p>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-gray-900 mb-2">
        Get your plan for {count === 1 ? "this program" : `these ${count} programs`}
      </h3>
      <p className="text-gray-600 mb-4">
        Tim Hawkes or Jake Peterson will look at your answers and send you a short plan for buying with {stateName} down payment help.
      </p>

      <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
        {[
          count > 1 ? "Which of your programs can be combined" : "Whether it combines with other help",
          "About how much you could get in total",
          "Which ones still have funding right now",
          "The order to apply in, and what to have ready",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accent }} />
            {item}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="flex gap-2" role="radiogroup" aria-label="How should we send your plan?">
          {(["text", "email"] as const).map((m) => {
            const active = method === m;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setMethod(m);
                  setError(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
                style={
                  active
                    ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                    : { backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#4b5563" }
                }
              >
                {m === "text" ? <MessageSquare className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                {m === "text" ? "Text me" : "Email me"}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="plan-first-name"
            label="First name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Alex"
          />
          {method === "text" ? (
            <Input
              id="plan-phone"
              label="Mobile number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(801) 555-0123"
            />
          ) : (
            <Input
              id="plan-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
            />
          )}
        </div>

        {/* Honeypot: hidden from people, bots fill it in */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : method === "text" ? "Text me my plan" : "Email me my plan"}
          {status !== "sending" && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>

        <p className="text-xs text-gray-500 leading-relaxed">
          {method === "text"
            ? consentCopy
            : "We'll email your plan from The Tim Hawkes Team. No credit pull. Unsubscribe anytime."}
        </p>
      </form>

      <div className="mt-5 pt-4 border-t border-gray-100 text-sm text-gray-600 text-center">
        Rather talk now?{" "}
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
          style={{ color: accent }}
          onClick={() => AnalyticsEvents.quizBookClick("plan-card")}
        >
          Book a free call
        </a>{" "}
        or call{" "}
        <a href="tel:8018207620" className="font-semibold underline" style={{ color: accent }}>
          (801) 820-7620
        </a>
      </div>
    </Card>
  );
}

const consentCopy =
  "By tapping the button, you agree The Tim Hawkes Team may text you at this number about your plan. Message and data rates may apply. Reply STOP to opt out. Not a condition of any loan. No credit pull.";
