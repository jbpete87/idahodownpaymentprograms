"use client";

import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card } from "@/components/ui";
import { Shield, ArrowRight, CheckCircle2, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { AnalyticsEvents } from "@/lib/analytics";

export function StepConsent() {
  const { hasConsented, setConsent, nextStep } = useQuizStore();

  const handleStart = () => {
    if (hasConsented) {
      AnalyticsEvents.quizStart();
      nextStep();
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6 text-4xl">
          🏠
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Find Your Down Payment Assistance
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Answer a few questions to discover which Idaho programs you may qualify for.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Clock, text: "Takes only 5 minutes" },
          { icon: Lock, text: "No SSN required" },
          { icon: Shield, text: "100% free & private" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.text} padding="sm" className="text-center border border-gray-200">
              <Icon className="w-6 h-6 mx-auto text-[#10B981] mb-2" />
              <span className="text-sm font-medium text-gray-900">{item.text}</span>
            </Card>
          );
        })}
      </div>

      {/* Disclaimer */}
      <Card padding="md" className="bg-blue-50 border border-blue-100 shadow-none">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-blue-500 shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Important Notice</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              This tool provides <strong>estimates only</strong>. Programs change frequently and 
              final approval is determined by the administering agency and participating lender. 
              We do not collect sensitive information like Social Security numbers.
            </p>
          </div>
        </div>
      </Card>

      {/* Consent checkbox */}
      <Card padding="md" className="border border-gray-200">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => setConsent(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                hasConsented
                  ? "bg-[#10B981] border-[#10B981]"
                  : "bg-white border-gray-300 group-hover:border-gray-400"
              }`}
            >
              {hasConsented && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-900">
              I understand and agree
            </span>
            <p className="text-sm text-gray-500 mt-1">
              I agree to the{" "}
              <Link href="/terms" className="text-[#10B981] hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#10B981] hover:underline">
                Privacy Policy
              </Link>
              . I understand this is an estimate and final eligibility will be
              verified by the program administrator.
            </p>
          </div>
        </label>
      </Card>

      {/* Start button */}
      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          onClick={handleStart}
          disabled={!hasConsented}
          className="w-full"
        >
          Start Eligibility Quiz
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <p className="text-center text-sm text-gray-500">
          Already know what you&apos;re looking for?{" "}
          <Link href="/programs" className="text-[#10B981] hover:underline font-medium">
            Browse all programs
          </Link>
        </p>
      </div>
    </div>
  );
}
