import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function calculateAMI(
  countyAMI: number,
  householdSize: number,
  percentage: number
): number {
  // HUD adjustment factors by household size (based on 4-person baseline)
  const adjustmentFactors: Record<number, number> = {
    1: 0.7,
    2: 0.8,
    3: 0.9,
    4: 1.0,
    5: 1.08,
    6: 1.16,
    7: 1.24,
    8: 1.32,
  };
  
  const factor = adjustmentFactors[Math.min(householdSize, 8)] || 1.0;
  return Math.round(countyAMI * factor * (percentage / 100));
}

