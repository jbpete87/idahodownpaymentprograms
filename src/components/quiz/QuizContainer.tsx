"use client";

import { useQuizStore, QUIZ_STEPS } from "@/stores/quiz-store";
import { ProgressBar } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

// Import all step components
import { StepConsent } from "./StepConsent";
import { StepLocation } from "./StepLocation";
import { StepHousehold } from "./StepHousehold";
import { StepIncome } from "./StepIncome";
import { StepBuyerType } from "./StepBuyerType";
import { StepVeteranOccupation } from "./StepVeteranOccupation";
import { StepFinancing } from "./StepFinancing";
import { StepResults } from "./StepResults";

const stepComponents = [
  StepConsent,
  StepLocation,
  StepHousehold,
  StepIncome,
  StepBuyerType,
  StepVeteranOccupation,
  StepFinancing,
  StepResults,
];

export function QuizContainer() {
  const { currentStep, prevStep } = useQuizStore();

  const CurrentStepComponent = stepComponents[currentStep];
  const stepInfo = QUIZ_STEPS[currentStep];

  // Don't show progress or back button on results step
  const showProgress = currentStep > 0 && currentStep < 7;
  const showBack = currentStep > 0 && currentStep < 7;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button and progress */}
        {showProgress && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {showBack && (
                <button
                  onClick={prevStep}
                  className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="flex-1">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-gray-900">
                  {stepInfo.title}
                </h2>
                <p className="text-sm text-gray-500">{stepInfo.description}</p>
              </div>
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={7} />
          </div>
        )}

        {/* Step content */}
        <div className="animate-fade-in">
          <CurrentStepComponent />
        </div>
      </div>
    </div>
  );
}
