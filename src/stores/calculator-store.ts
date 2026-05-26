import { create } from "zustand";
import type { LoanType, HomeType } from "@/lib/calculator-config";

export type DownPaymentOverrides = Record<LoanType, number | null>;
export type PurchasePriceOverrides = Record<LoanType, number | null>;

export interface CalculatorState {
  // Inputs
  grossAnnualIncome: number;
  monthlyDebts: number;
  creditScore: number;
  householdSize: number;
  homeType: HomeType;
  selectedProgramId: string | null;
  /** Per-loan-type down payment % overrides (null = use minimum) */
  downPaymentOverrides: DownPaymentOverrides;
  /** Per-loan-type purchase price overrides (null = use max affordable) */
  purchasePriceOverrides: PurchasePriceOverrides;

  // Actions
  setGrossAnnualIncome: (value: number) => void;
  setMonthlyDebts: (value: number) => void;
  setCreditScore: (value: number) => void;
  setHouseholdSize: (value: number) => void;
  setHomeType: (value: HomeType) => void;
  setSelectedProgramId: (id: string | null) => void;
  setDownPaymentPercent: (loanType: LoanType, percent: number | null) => void;
  setPurchasePrice: (loanType: LoanType, price: number | null) => void;
  reset: () => void;
}

const initialState = {
  grossAnnualIncome: 75000,
  monthlyDebts: 500,
  creditScore: 700,
  householdSize: 3,
  homeType: "single_family" as HomeType,
  selectedProgramId: null as string | null,
  downPaymentOverrides: {
    conventional: null,
    fha: null,
    va: null,
  } as DownPaymentOverrides,
  purchasePriceOverrides: {
    conventional: null,
    fha: null,
    va: null,
  } as PurchasePriceOverrides,
};

export const useCalculatorStore = create<CalculatorState>()((set) => ({
  ...initialState,

  setGrossAnnualIncome: (value) => set({ grossAnnualIncome: value }),
  setMonthlyDebts: (value) => set({ monthlyDebts: value }),
  setCreditScore: (value) => set({ creditScore: value }),
  setHouseholdSize: (value) => set({ householdSize: value }),
  setHomeType: (value) => set({ homeType: value }),
  setSelectedProgramId: (id) => set({ selectedProgramId: id }),
  setDownPaymentPercent: (loanType, percent) =>
    set((state) => ({
      downPaymentOverrides: {
        ...state.downPaymentOverrides,
        [loanType]: percent,
      },
    })),
  setPurchasePrice: (loanType, price) =>
    set((state) => ({
      purchasePriceOverrides: {
        ...state.purchasePriceOverrides,
        [loanType]: price,
      },
    })),
  reset: () => set(initialState),
}));

