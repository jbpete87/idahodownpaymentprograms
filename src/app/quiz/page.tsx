import { QuizContainer } from "@/components/quiz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Idaho DPA Eligibility Quiz",
  description:
    "Find out which Idaho down payment assistance programs you may qualify for. Takes only 5 minutes. No SSN required.",
  alternates: {
    canonical: "/quiz",
  },
};

export default function QuizPage() {
  return <QuizContainer />;
}

