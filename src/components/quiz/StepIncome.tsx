"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card, Slider, RadioGroup } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, DollarSign, HelpCircle, ExternalLink } from "lucide-react";

export function StepIncome() {
  const { answers, updateAnswers, nextStep } = useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState(false);

  const selfEmployedOptions = [
    { value: "no", label: "No", description: "W-2 employee" },
    { value: "yes", label: "Yes", description: "Self-employed or 1099" },
    { value: "partial", label: "Partially", description: "Some self-employment income" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!answers.annualIncome || answers.annualIncome < 1000) {
      newErrors.income = "Please enter your estimated income";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  // Default income if not set
  const currentIncome = answers.annualIncome || 75000;

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
              Household Income
            </h2>
            <p className="text-gray-600">
              Most programs have income limits based on Area Median Income (AMI). 
              An estimate is fine — we just need a ballpark.
            </p>
          </div>
        </div>
      </Card>

      {/* Income slider */}
      <Card padding="lg" className="border border-gray-200">
        <Slider
          label="Estimated Annual Household Income"
          min={20000}
          max={200000}
          step={5000}
          value={currentIncome}
          onChange={(value) => updateAnswers({ annualIncome: value })}
          formatValue={formatCurrency}
          error={errors.income}
        />

        <button
          onClick={() => setShowHelp(!showHelp)}
          className="mt-4 flex items-center gap-2 text-sm text-[#10B981] hover:underline"
        >
          <HelpCircle className="w-4 h-4" />
          What should I include?
        </button>

        {showHelp && (
          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-2">Include income from:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Wages and salaries (before taxes)</li>
              <li>Self-employment income</li>
              <li>Social Security and retirement</li>
              <li>Child support and alimony</li>
              <li>Any other regular income</li>
            </ul>
            <p className="mt-3">
              Include income from all adults (18+) who will live in the home.
            </p>
            <Link 
              href="/income-limits" 
              target="_blank"
              className="mt-3 inline-flex items-center gap-1 text-[#10B981] hover:underline font-medium"
            >
              Check 2025 income limits by county
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        )}
      </Card>

      {/* AMI Info Box */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
        <p className="text-sm text-emerald-800">
          <strong>💡 Tip:</strong> Most programs require income at or below 80% AMI. 
          For a family of 4 in Salt Lake County, that&apos;s about <strong>$98,150/year</strong>.{" "}
          <Link 
            href="/income-limits" 
            target="_blank"
            className="inline-flex items-center gap-1 text-emerald-700 hover:underline font-semibold"
          >
            View all county limits
            <ExternalLink className="w-3 h-3" />
          </Link>
        </p>
      </div>

      {/* Income varies checkbox */}
      <Card padding="md" className="border border-gray-200">
        <label className="flex items-center gap-4 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={answers.incomeVaries || false}
              onChange={(e) => updateAnswers({ incomeVaries: e.target.checked })}
              className="sr-only"
            />
            <div
              className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                answers.incomeVaries
                  ? "bg-[#10B981] border-[#10B981]"
                  : "bg-white border-gray-300 group-hover:border-gray-400"
              }`}
            >
              {answers.incomeVaries && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-900">My income varies</span>
            <p className="text-sm text-gray-600">
              Check if your income changes month-to-month (commission, seasonal, etc.)
            </p>
          </div>
        </label>
      </Card>

      {/* Self-employment */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="selfEmployed"
          label="Is any of your income from self-employment?"
          options={selfEmployedOptions}
          value={
            answers.isSelfEmployed === true
              ? "yes"
              : answers.isSelfEmployed === false
              ? "no"
              : ""
          }
          onChange={(value) =>
            updateAnswers({
              isSelfEmployed: value === "yes" || value === "partial",
            })
          }
          layout="horizontal"
        />
      </Card>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleNext}>
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
