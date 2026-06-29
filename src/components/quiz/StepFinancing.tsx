"use client";

import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card, RadioGroup } from "@/components/ui";
import { ArrowRight, CreditCard, PiggyBank, Home, Calculator } from "lucide-react";
import { matchPrograms } from "@/lib/matching-engine";
import { PROGRAMS, AMI_LIMITS } from "@/lib/programs-data";
import { AnalyticsEvents } from "@/lib/analytics";

export function StepFinancing() {
  const { answers, updateAnswers, nextStep, setMatches, setIsSubmitting } =
    useQuizStore();

  const creditScoreOptions = [
    { value: "<600", label: "Below 600" },
    { value: "600-619", label: "600-619" },
    { value: "620-639", label: "620-639" },
    { value: "640-679", label: "640-679" },
    { value: "680+", label: "680 or higher" },
  ];

  const fundsOptions = [
    { value: "$0-2k", label: "$0 - $2,000", description: "Little to no savings" },
    { value: "$2-5k", label: "$2,000 - $5,000" },
    { value: "$5-10k", label: "$5,000 - $10,000" },
    { value: "$10k+", label: "$10,000+", description: "Solid savings" },
  ];

  const priceRangeOptions = [
    { value: "<300k", label: "Under $300,000" },
    { value: "300-450k", label: "$300,000 - $450,000" },
    { value: "450-600k", label: "$450,000 - $600,000" },
    { value: "600k+", label: "Over $600,000" },
  ];

  const loanTypeOptions = [
    { value: "not_sure", label: "Not sure yet", description: "Most common" },
    { value: "FHA", label: "FHA", description: "3.5% down, flexible credit" },
    { value: "Conventional", label: "Conventional", description: "3-20% down" },
    { value: "VA", label: "VA", description: "0% down for veterans" },
    { value: "USDA", label: "USDA", description: "0% down, rural areas" },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Run matching engine
    const matches = matchPrograms(PROGRAMS, answers, AMI_LIMITS);

    // Generate a submission ID (in real app, this would come from Supabase)
    const submissionId = `quiz_${Date.now()}`;

    setMatches(matches, submissionId);
    AnalyticsEvents.quizComplete(matches.length, matches[0]?.estimatedAmount ?? 0);
    setIsSubmitting(false);
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Calculator className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
              Financing Details (Optional)
            </h2>
            <p className="text-gray-600">
              These questions help us give more accurate matches, but you can skip any 
              you&apos;re not sure about.
            </p>
          </div>
        </div>
      </Card>

      {/* Credit score */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-[#10B981]" />
          <span className="font-medium text-gray-900">Credit Score Range</span>
          <span className="text-sm text-gray-500">(optional)</span>
        </div>
        <RadioGroup
          name="creditScore"
          options={creditScoreOptions}
          value={answers.creditScoreRange || ""}
          onChange={(value) =>
            updateAnswers({
              creditScoreRange: value as
                | "<600"
                | "600-619"
                | "620-639"
                | "640-679"
                | "680+",
            })
          }
          layout="horizontal"
        />
        <p className="mt-3 text-sm text-gray-500">
          An estimate is fine. Most programs require 620-650 minimum.
        </p>
      </Card>

      {/* Available funds */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <PiggyBank className="w-5 h-5 text-[#10B981]" />
          <span className="font-medium text-gray-900">
            Available Funds for Closing
          </span>
          <span className="text-sm text-gray-500">(optional)</span>
        </div>
        <RadioGroup
          name="availableFunds"
          options={fundsOptions}
          value={answers.availableFunds || ""}
          onChange={(value) =>
            updateAnswers({
              availableFunds: value as "$0-2k" | "$2-5k" | "$5-10k" | "$10k+",
            })
          }
          layout="grid"
        />
      </Card>

      {/* Target price */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Home className="w-5 h-5 text-[#10B981]" />
          <span className="font-medium text-gray-900">Target Purchase Price</span>
          <span className="text-sm text-gray-500">(optional)</span>
        </div>
        <RadioGroup
          name="priceRange"
          options={priceRangeOptions}
          value={answers.targetPriceRange || ""}
          onChange={(value) =>
            updateAnswers({
              targetPriceRange: value as
                | "<300k"
                | "300-450k"
                | "450-600k"
                | "600k+",
            })
          }
          layout="grid"
        />
      </Card>

      {/* Loan type interest */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-5 h-5 text-[#10B981]" />
          <span className="font-medium text-gray-900">Loan Type Preference</span>
          <span className="text-sm text-gray-500">(optional)</span>
        </div>
        <RadioGroup
          name="loanType"
          options={loanTypeOptions}
          value={answers.loanTypeInterest || ""}
          onChange={(value) =>
            updateAnswers({
              loanTypeInterest: value as
                | "FHA"
                | "VA"
                | "Conventional"
                | "USDA"
                | "not_sure",
            })
          }
        />
      </Card>

      {/* Submit button */}
      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSubmit}>
          See My Results
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
