"use client";

import { useState } from "react";
import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card, RadioGroup } from "@/components/ui";
import { ArrowRight, Users } from "lucide-react";

export function StepHousehold() {
  const { answers, updateAnswers, nextStep } = useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const householdSizeOptions = [
    { value: "1", label: "1 person", description: "Just me" },
    { value: "2", label: "2 people" },
    { value: "3", label: "3 people" },
    { value: "4", label: "4 people" },
    { value: "5", label: "5 people" },
    { value: "6", label: "6+ people" },
  ];

  const borrowerOptions = [
    { value: "1", label: "1 borrower", description: "Applying alone" },
    { value: "2", label: "2 borrowers", description: "With spouse or co-borrower" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!answers.householdSize) {
      newErrors.householdSize = "Please select household size";
    }
    if (!answers.numberOfBorrowers) {
      newErrors.borrowers = "Please select number of borrowers";
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
            <Users className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
              Tell us about your household
            </h2>
            <p className="text-gray-600">
              Income limits are based on household size. This includes everyone who will 
              live in the home.
            </p>
          </div>
        </div>
      </Card>

      {/* Household size */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="householdSize"
          label="How many people will live in the home?"
          options={householdSizeOptions}
          value={answers.householdSize?.toString() || ""}
          onChange={(value) => updateAnswers({ householdSize: parseInt(value) })}
          layout="grid"
          error={errors.householdSize}
        />
        <p className="mt-3 text-sm text-gray-500">
          Include yourself, spouse/partner, children, and any other dependents who will 
          live in the home.
        </p>
      </Card>

      {/* Number of borrowers */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="borrowers"
          label="How many people will be on the mortgage?"
          options={borrowerOptions}
          value={answers.numberOfBorrowers?.toString() || ""}
          onChange={(value) =>
            updateAnswers({ numberOfBorrowers: parseInt(value) as 1 | 2 })
          }
          layout="horizontal"
          error={errors.borrowers}
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
