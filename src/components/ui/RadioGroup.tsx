"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  layout?: "vertical" | "horizontal" | "grid";
  className?: string;
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  layout = "vertical",
  className,
}: RadioGroupProps) {
  const layoutClasses = {
    vertical: "flex flex-col gap-3",
    horizontal: "flex flex-wrap gap-3",
    grid: "grid grid-cols-2 gap-3",
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <p className="block mb-3 text-sm font-semibold text-gray-700">{label}</p>
      )}
      <div className={layoutClasses[layout]} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = value === option.value;
          
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border",
                isSelected
                  ? "bg-[#10B981]/5 border-[#10B981] ring-1 ring-[#10B981]"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                option.disabled && "opacity-50 cursor-not-allowed bg-gray-50"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                disabled={option.disabled}
                className="sr-only"
              />
              
              {/* Custom radio indicator */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "bg-[#10B981] border-[#10B981]"
                    : "bg-white border-gray-300"
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              
              <div className="flex-1">
                <span className={cn(
                  "font-medium",
                  isSelected ? "text-[#059669]" : "text-gray-900"
                )}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="block text-sm text-gray-500 mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
