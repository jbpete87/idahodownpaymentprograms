"use client";

import { useState } from "react";
import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card, RadioGroup } from "@/components/ui";
import { ArrowRight, Home, HelpCircle } from "lucide-react";

export function StepBuyerType() {
  const { answers, updateAnswers, nextStep } = useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFirstTimeHelp, setShowFirstTimeHelp] = useState(false);

  const ownedHomeOptions = [
    { value: "no", label: "No", description: "First-time buyer or 3+ years since owning" },
    { value: "yes", label: "Yes", description: "I've owned in the last 3 years" },
    { value: "not_sure", label: "Not sure", description: "I need to check" },
  ];

  const primaryResidenceOptions = [
    { value: "yes", label: "Yes", description: "I'll live there as my main home" },
    { value: "no", label: "No", description: "Investment or second home" },
  ];

  const propertyTypeOptions = [
    { value: "single_family", label: "Single-Family Home" },
    { value: "condo", label: "Condo" },
    { value: "townhome", label: "Townhome" },
    { value: "2-4_unit", label: "2-4 Unit Property" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (answers.ownedHomeInLast3Years === undefined) {
      newErrors.owned = "Please select an option";
    }
    if (answers.isPrimaryResidence === undefined) {
      newErrors.primary = "Please select an option";
    }
    if (!answers.propertyType) {
      newErrors.propertyType = "Please select property type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Home className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
              Your Homebuying Situation
            </h2>
            <p className="text-gray-600">
              Many programs are designed for first-time buyers, but some are open to 
              everyone. Let&apos;s see what fits you.
            </p>
          </div>
        </div>
      </Card>

      {/* First-time buyer */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="ownedHome"
          label="Have you owned a home in the last 3 years?"
          options={ownedHomeOptions}
          value={
            answers.ownedHomeInLast3Years === true
              ? "yes"
              : answers.ownedHomeInLast3Years === false
              ? "no"
              : answers.ownedHomeInLast3Years === null
              ? "not_sure"
              : ""
          }
          onChange={(value) =>
            updateAnswers({
              ownedHomeInLast3Years:
                value === "yes" ? true : value === "no" ? false : null,
            })
          }
          error={errors.owned}
        />

        <button
          onClick={() => setShowFirstTimeHelp(!showFirstTimeHelp)}
          className="mt-4 flex items-center gap-2 text-sm text-[#10B981] hover:underline"
        >
          <HelpCircle className="w-4 h-4" />
          What counts as a first-time buyer?
        </button>

        {showFirstTimeHelp && (
          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-2">
              You&apos;re considered a first-time buyer if:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>You&apos;ve never owned a home, OR</li>
              <li>You haven&apos;t owned a home in the past 3 years, OR</li>
              <li>You only owned with a former spouse (in some programs)</li>
            </ul>
          </div>
        )}
      </Card>

      {/* Primary residence */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="primaryResidence"
          label="Will this be your primary residence?"
          options={primaryResidenceOptions}
          value={
            answers.isPrimaryResidence === true
              ? "yes"
              : answers.isPrimaryResidence === false
              ? "no"
              : ""
          }
          onChange={(value) =>
            updateAnswers({ isPrimaryResidence: value === "yes" })
          }
          layout="horizontal"
          error={errors.primary}
        />

        {answers.isPrimaryResidence === false && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Most down payment assistance programs require the 
              home to be your primary residence. Investment properties typically don&apos;t 
              qualify, but we&apos;ll still show you any options that might be available.
            </p>
          </div>
        )}
      </Card>

      {/* Property type */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="propertyType"
          label="What type of property are you looking for?"
          options={propertyTypeOptions}
          value={answers.propertyType || ""}
          onChange={(value) =>
            updateAnswers({
              propertyType: value as
                | "single_family"
                | "condo"
                | "townhome"
                | "2-4_unit",
            })
          }
          layout="grid"
          error={errors.propertyType}
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
