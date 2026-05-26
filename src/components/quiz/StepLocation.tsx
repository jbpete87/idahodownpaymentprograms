"use client";

import { useState } from "react";
import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card, Input, Select, RadioGroup } from "@/components/ui";
import { IDAHO_COUNTIES, PROGRAM_CITIES } from "@/lib/programs-data";
import { ArrowRight, MapPin } from "lucide-react";

export function StepLocation() {
  const { answers, updateAnswers, nextStep } = useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countyOptions = IDAHO_COUNTIES.map((county) => ({
    value: county,
    label: `${county} County`,
  }));

  const cityOptions = [
    { value: "", label: "Select a city (optional)" },
    ...PROGRAM_CITIES.map((city) => ({ value: city, label: city })),
    { value: "other", label: "Other city" },
  ];

  const timelineOptions = [
    { value: "0-3", label: "0-3 months", description: "I'm actively looking" },
    { value: "3-6", label: "3-6 months", description: "Getting ready soon" },
    { value: "6-12", label: "6-12 months", description: "Planning ahead" },
    { value: "12+", label: "12+ months", description: "Just exploring" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!answers.propertyCounty) {
      newErrors.county = "Please select a county";
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
            <MapPin className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
              Where are you looking to buy?
            </h2>
            <p className="text-gray-600">
              Many programs are specific to certain cities or counties. This helps us find 
              the most relevant programs for you.
            </p>
          </div>
        </div>
      </Card>

      {/* County selection */}
      <Card padding="lg" className="border border-gray-200">
        <Select
          label="Which Idaho county?"
          options={[{ value: "", label: "Select a county" }, ...countyOptions]}
          value={answers.propertyCounty || ""}
          onChange={(e) => {
            updateAnswers({ propertyCounty: e.target.value });
            setErrors({});
          }}
          error={errors.county}
        />

        <div className="mt-6">
          <Select
            label="City (if known)"
            options={cityOptions}
            value={answers.propertyCity || ""}
            onChange={(e) => updateAnswers({ propertyCity: e.target.value })}
            hint="Some cities have their own programs with extra assistance"
          />
        </div>

        <div className="mt-6">
          <Input
            label="ZIP Code (optional)"
            placeholder="e.g., 84101"
            value={answers.propertyZip || ""}
            onChange={(e) => updateAnswers({ propertyZip: e.target.value })}
            maxLength={5}
          />
        </div>
      </Card>

      {/* Timeline */}
      <Card padding="lg" className="border border-gray-200">
        <RadioGroup
          name="timeline"
          label="When are you hoping to buy?"
          options={timelineOptions}
          value={answers.purchaseTimeline || ""}
          onChange={(value) =>
            updateAnswers({
              purchaseTimeline: value as "0-3" | "3-6" | "6-12" | "12+",
            })
          }
          layout="grid"
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
