import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizAnswers, QuizStep, ProgramMatch } from "@/types";

interface QuizState {
  // Current step
  currentStep: QuizStep;
  
  // User answers
  answers: Partial<QuizAnswers>;
  
  // Results
  matches: ProgramMatch[];
  submissionId: string | null;
  
  // UI state
  isSubmitting: boolean;
  hasConsented: boolean;
  
  // Actions
  setStep: (step: QuizStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateAnswers: (updates: Partial<QuizAnswers>) => void;
  setMatches: (matches: ProgramMatch[], submissionId: string) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setConsent: (hasConsented: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0 as QuizStep,
  answers: {},
  matches: [],
  submissionId: null,
  isSubmitting: false,
  hasConsented: false,
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const current = get().currentStep;
        if (current < 7) {
          set({ currentStep: (current + 1) as QuizStep });
        }
      },

      prevStep: () => {
        const current = get().currentStep;
        if (current > 0) {
          set({ currentStep: (current - 1) as QuizStep });
        }
      },

      updateAnswers: (updates) =>
        set((state) => ({
          answers: { ...state.answers, ...updates },
        })),

      setMatches: (matches, submissionId) =>
        set({ matches, submissionId }),

      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

      setConsent: (hasConsented) => set({ hasConsented }),

      reset: () => set(initialState),
    }),
    {
      name: "idaho-dpa-quiz",
      partialize: (state) => ({
        answers: state.answers,
        hasConsented: state.hasConsented,
      }),
    }
  )
);

// Step information
export const QUIZ_STEPS = [
  { step: 0, title: "Welcome", description: "Let's find your down payment assistance" },
  { step: 1, title: "Property Location", description: "Where are you looking to buy?" },
  { step: 2, title: "Household", description: "Tell us about your household" },
  { step: 3, title: "Income", description: "Your household income" },
  { step: 4, title: "Buyer Type", description: "Your homebuying situation" },
  { step: 5, title: "Special Programs", description: "Veteran status & occupation" },
  { step: 6, title: "Financing", description: "Your financing preferences" },
  { step: 7, title: "Results", description: "Programs you may qualify for" },
] as const;

