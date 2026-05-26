"use client";

import { useMemo } from "react";
import { useCalculatorStore } from "@/stores/calculator-store";
import { Card, Slider, Select } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import {
  CREDIT_SCORE_OPTIONS,
  HOUSEHOLD_SIZE_OPTIONS,
  HOME_TYPE_OPTIONS,
  HOME_TYPES,
  type HomeType,
} from "@/lib/calculator-config";
import { getDPAPrograms } from "@/lib/dpa-calculator-helper";
import {
  DollarSign,
  CreditCard,
  Users,
  Wallet,
  HandCoins,
  Home,
} from "lucide-react";

export function CalculatorForm() {
  const {
    grossAnnualIncome,
    monthlyDebts,
    creditScore,
    householdSize,
    homeType,
    selectedProgramId,
    setGrossAnnualIncome,
    setMonthlyDebts,
    setCreditScore,
    setHouseholdSize,
    setHomeType,
    setSelectedProgramId,
  } = useCalculatorStore();

  const dpaPrograms = useMemo(
    () => getDPAPrograms(grossAnnualIncome, householdSize),
    [grossAnnualIncome, householdSize]
  );

  // Clear selected program if it's no longer in the filtered list
  const selectedStillValid = selectedProgramId
    ? dpaPrograms.some((p) => p.id === selectedProgramId)
    : true;
  if (!selectedStillValid && selectedProgramId) {
    // Use setTimeout to avoid state update during render
    setTimeout(() => setSelectedProgramId(null), 0);
  }

  return (
    <div className="space-y-5">
      {/* Gross Annual Income */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900">
              Gross Annual Income
            </h3>
            <p className="text-sm text-gray-500">Before taxes, all household members</p>
          </div>
        </div>
        <Slider
          label="Annual Income"
          min={20000}
          max={300000}
          step={5000}
          value={grossAnnualIncome}
          onChange={setGrossAnnualIncome}
          formatValue={formatCurrency}
        />
      </Card>

      {/* Home Type */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900">
              Home Type
            </h3>
            <p className="text-sm text-gray-500">Affects HOA fees and property taxes</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {HOME_TYPE_OPTIONS.map((option) => {
            const isSelected = homeType === option.value;
            const config = HOME_TYPES[option.value];
            return (
              <button
                key={option.value}
                onClick={() => setHomeType(option.value)}
                className={`
                  relative p-3 rounded-xl border-2 text-left transition-all
                  ${isSelected 
                    ? "border-cyan-500 bg-cyan-50 shadow-sm" 
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-xl block mb-1">{config.icon}</span>
                <span className={`text-sm font-medium block ${isSelected ? "text-cyan-700" : "text-gray-900"}`}>
                  {config.label}
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  {config.defaultHOA > 0 ? `~$${config.defaultHOA}/mo HOA` : "No HOA typical"}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500" />
                )}
              </button>
            );
          })}
        </div>
        {homeType !== "single_family" && (
          <div className="mt-3 p-3 rounded-lg bg-cyan-50 border border-cyan-100">
            <p className="text-xs text-cyan-700">
              <span className="font-semibold">{HOME_TYPES[homeType].label}:</span>{" "}
              Estimated ${HOME_TYPES[homeType].defaultHOA}/mo HOA fee included in monthly payment.
              Property taxes estimated ~{Math.round((1 - HOME_TYPES[homeType].propertyTaxMultiplier) * 100)}% lower than single family.
            </p>
          </div>
        )}
      </Card>

      {/* Monthly Debts */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900">
              Monthly Debt Payments
            </h3>
            <p className="text-sm text-gray-500">Car loans, credit cards, student loans, etc.</p>
          </div>
        </div>
        <Slider
          label="Monthly Debts"
          min={0}
          max={5000}
          step={50}
          value={monthlyDebts}
          onChange={setMonthlyDebts}
          formatValue={(v) => formatCurrency(v) + "/mo"}
        />
      </Card>

      {/* Credit Score */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900">
              Credit Score
            </h3>
            <p className="text-sm text-gray-500">Approximate middle score</p>
          </div>
        </div>
        <Select
          options={CREDIT_SCORE_OPTIONS.map((o) => ({
            value: String(o.value),
            label: o.label,
          }))}
          value={String(creditScore)}
          onChange={(e) => setCreditScore(Number(e.target.value))}
        />
        <p className="mt-3 text-xs text-gray-500">
          Credit score affects your mortgage insurance rate on conventional loans.
          FHA insurance is the same regardless of credit.
        </p>
      </Card>

      {/* Household Size */}
      <Card padding="lg" className="border border-gray-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900">
              Household Size
            </h3>
            <p className="text-sm text-gray-500">People living in the home (for DPA eligibility)</p>
          </div>
        </div>
        <Select
          options={HOUSEHOLD_SIZE_OPTIONS.map((o) => ({
            value: String(o.value),
            label: o.label,
          }))}
          value={String(householdSize)}
          onChange={(e) => setHouseholdSize(Number(e.target.value))}
        />
      </Card>

      {/* Down Payment Assistance Program */}
      <Card padding="lg" className="border border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <HandCoins className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900">
              Down Payment Assistance
            </h3>
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-emerald-600">{dpaPrograms.length} programs</span> you
              may qualify for — adjusts based on your income &amp; household size above
            </p>
          </div>
        </div>
        <Select
          options={[
            { value: "", label: "None — no DPA applied" },
            ...dpaPrograms.map((p) => ({
              value: p.id,
              label: p.dropdownLabel,
            })),
          ]}
          value={selectedProgramId ?? ""}
          onChange={(e) =>
            setSelectedProgramId(e.target.value || null)
          }
        />
        {selectedProgramId && (() => {
          const selected = dpaPrograms.find((p) => p.id === selectedProgramId);
          if (!selected) return null;
          return (
            <div className="mt-3 p-3 rounded-lg bg-white border border-emerald-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  {selected.shortDescription}
                </span>
                <span className="text-xs text-gray-500">{selected.geographyNote}</span>
              </div>
              <p className="text-sm text-gray-600">
                Up to <span className="font-bold text-gray-900">{formatCurrency(selected.maxAmount)}</span> toward
                down payment &amp; closing costs
              </p>
              {selected.fundingStatus !== "open" && (
                <p className="text-xs text-amber-600 mt-1 font-medium">
                  {selected.fundingStatus === "limited" && "⚡ Limited funding remaining"}
                  {selected.fundingStatus === "waitlist" && "⏳ Currently on waitlist"}
                  {selected.fundingStatus === "paused" && "⏸ Temporarily paused"}
                </p>
              )}
            </div>
          );
        })()}
        <p className="mt-3 text-xs text-gray-500">
          Available programs filter automatically as you change your income and household size.
          Location-specific programs may also be available.{" "}
          <a href="/quiz" className="text-[#10B981] hover:underline font-medium">
            Take the eligibility quiz
          </a>{" "}
          for a full personalized match.
        </p>
      </Card>
    </div>
  );
}

