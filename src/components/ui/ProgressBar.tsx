"use client";

import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  className,
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Track */}
      <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
        {/* Filled portion */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#10B981] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500 font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-[#10B981]">
          {Math.round(percentage)}% Complete
        </span>
      </div>
    </div>
  );
}

// Stepped version with dots
export interface SteppedProgressProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export function SteppedProgress({
  currentStep,
  steps,
  className,
}: SteppedProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2",
                    isComplete
                      ? "bg-[#10B981] border-[#10B981] text-white"
                      : isCurrent
                      ? "bg-white border-[#10B981] text-[#10B981]"
                      : "bg-white border-gray-200 text-gray-300"
                  )}
                >
                  {isComplete ? "✓" : stepNumber}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium hidden md:block",
                    isCurrent ? "text-[#10B981]" : "text-gray-400"
                  )}
                >
                  {step}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-300",
                    isComplete ? "bg-[#10B981]" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
