"use client";

import { useQuizStore } from "@/stores/quiz-store";
import { Button, Card, RadioGroup } from "@/components/ui";
import { ArrowRight, Award, Briefcase } from "lucide-react";

export function StepVeteranOccupation() {
  const { answers, updateAnswers, nextStep } = useQuizStore();

  const veteranOptions = [
    { value: "none", label: "Not a veteran", description: "No military service" },
    { value: "veteran", label: "Veteran", description: "Honorably discharged" },
    { value: "active_duty", label: "Active Duty", description: "Currently serving" },
    { value: "reservist", label: "Reservist/Guard", description: "Reserve or National Guard" },
    { value: "surviving_spouse", label: "Surviving Spouse", description: "Spouse of deceased veteran" },
  ];

  const occupationOptions = [
    { value: "other", label: "Other occupation" },
    { value: "teacher", label: "Teacher (K-12)", description: "Extra benefits in some programs" },
    { value: "first_responder", label: "First Responder", description: "Police, Fire, EMS" },
    { value: "healthcare", label: "Healthcare Worker" },
    { value: "government", label: "Government Employee", description: "City, state, or federal" },
  ];

  const handleNext = () => {
    // Set defaults if not selected
    if (!answers.veteranStatus) {
      updateAnswers({ veteranStatus: "none" });
    }
    if (!answers.occupation) {
      updateAnswers({ occupation: "other" });
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900 mb-1">
              Special Programs
            </h2>
            <p className="text-gray-600">
              Some programs offer extra benefits for veterans, teachers, first responders, 
              and other public servants.
            </p>
          </div>
        </div>
      </Card>

      {/* Veteran status */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-5 h-5 text-[#10B981]" />
          <span className="font-medium text-gray-900">Military Service</span>
        </div>
        <RadioGroup
          name="veteranStatus"
          options={veteranOptions}
          value={answers.veteranStatus || ""}
          onChange={(value) =>
            updateAnswers({
              veteranStatus: value as
                | "veteran"
                | "active_duty"
                | "reservist"
                | "surviving_spouse"
                | "none",
            })
          }
        />

        {answers.veteranStatus && answers.veteranStatus !== "none" && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-100">
            <p className="text-sm text-green-800">
              <strong>Thank you for your service!</strong> Veterans and military members 
              may qualify for VA loans (0% down) plus additional state and local programs.
            </p>
          </div>
        )}
      </Card>

      {/* Occupation */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-5 h-5 text-[#10B981]" />
          <span className="font-medium text-gray-900">Occupation</span>
        </div>
        <RadioGroup
          name="occupation"
          label="Do any of these describe your job?"
          options={occupationOptions}
          value={answers.occupation || ""}
          onChange={(value) =>
            updateAnswers({
              occupation: value as
                | "teacher"
                | "first_responder"
                | "healthcare"
                | "government"
                | "other",
            })
          }
        />

        {answers.occupation &&
          ["teacher", "first_responder", "government"].includes(
            answers.occupation
          ) && (
            <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="text-sm text-green-800">
                Great news! Some Utah cities offer{" "}
                <strong>bonus assistance</strong> for{" "}
                {answers.occupation === "teacher"
                  ? "teachers"
                  : answers.occupation === "first_responder"
                  ? "first responders"
                  : "government employees"}
                . For example, Ogden offers up to $20,000 for police and firefighters.
              </p>
            </div>
          )}
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
