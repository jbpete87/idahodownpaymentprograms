"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { useCalculatorStore } from "@/stores/calculator-store";
import { calculateAffordability, type LoanResult } from "@/lib/mortgage-calculator";
import { calculateCashToClose, type CashToCloseBreakdown } from "@/lib/dpa-calculator-helper";
import { HOME_TYPES, type LoanType } from "@/lib/calculator-config";
import { useRates } from "@/lib/use-rates";
import { Card, Slider } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import {
  Home,
  TrendingUp,
  Shield,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Info,
  HandCoins,
  Minus,
  Equal,
} from "lucide-react";

function PaymentRow({
  label,
  amount,
  color,
}: {
  label: string;
  amount: number;
  color?: string;
}) {
  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900" style={color ? { color } : undefined}>
        {formatCurrency(amount)}
      </span>
    </div>
  );
}

function CashToCloseRow({
  label,
  amount,
  icon,
  highlight,
  negative,
}: {
  label: string;
  amount: number;
  icon?: React.ReactNode;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-1.5 ${highlight ? "font-semibold" : ""}`}>
      <span className={`text-sm flex items-center gap-1.5 ${highlight ? "text-gray-900" : "text-gray-600"}`}>
        {icon}
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          highlight ? "text-gray-900 text-base" : negative ? "text-[#10B981]" : "text-gray-900"
        }`}
      >
        {negative ? "- " : ""}
        {formatCurrency(amount)}
      </span>
    </div>
  );
}

function LoanCard({
  loan,
  cashToClose,
  onDownPaymentChange,
  onPurchasePriceChange,
}: {
  loan: LoanResult;
  cashToClose: CashToCloseBreakdown | null;
  onDownPaymentChange: (loanType: LoanType, percent: number | null) => void;
  onPurchasePriceChange: (loanType: LoanType, price: number | null) => void;
}) {
  const { monthlyBreakdown } = loan;
  const isAboveMinimum = loan.downPaymentPercent > loan.minDownPaymentPercent;
  const noPMI = loan.loanType === "conventional" && loan.downPaymentPercent >= 20;
  const isBelowMax = loan.selectedPurchasePrice < loan.maxPurchasePrice;

  // Slider min: round down to nearest $25k, but at least $100k
  const priceSliderMin = Math.max(100000, Math.floor(loan.maxPurchasePrice * 0.3 / 25000) * 25000);

  return (
    <Card padding="none" className="border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ backgroundColor: loan.color + "10", borderBottom: `2px solid ${loan.color}` }}
      >
        <div className="flex items-center justify-between">
          <h3
            className="font-[family-name:var(--font-display)] text-lg font-bold"
            style={{ color: loan.color }}
          >
            {loan.label}
          </h3>
          {!loan.meetsMinCreditScore && (
            <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <AlertCircle className="w-3 h-3" />
              Score too low
            </span>
          )}
          {loan.meetsMinCreditScore && (
            <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Eligible
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {loan.downPaymentPercent}% down &middot; {loan.interestRate.toFixed(3)}% rate
        </p>
      </div>

      {/* Purchase Price Slider */}
      <div className="px-5 py-4 border-b border-gray-100">
        <Slider
          label="Purchase Price"
          min={priceSliderMin}
          max={loan.maxPurchasePrice}
          step={5000}
          value={loan.selectedPurchasePrice}
          onChange={(val) => {
            onPurchasePriceChange(
              loan.loanType,
              val >= loan.maxPurchasePrice ? null : val
            );
          }}
          formatValue={formatCurrency}
        />
        {isBelowMax ? (
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Max you can afford: <span className="font-semibold">{formatCurrency(loan.maxPurchasePrice)}</span>
            </p>
            <button
              onClick={() => onPurchasePriceChange(loan.loanType, null)}
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
            >
              Reset to max
            </button>
          </div>
        ) : (
          <p className="mt-2 text-xs text-gray-400">
            Slide left to see payments at a lower price
          </p>
        )}
      </div>

      {/* Down Payment Slider */}
      <div className="px-5 py-4 border-b border-gray-100">
        <Slider
          label="Down Payment"
          min={loan.minDownPaymentPercent}
          max={20}
          step={0.5}
          value={loan.downPaymentPercent}
          onChange={(val) => {
            onDownPaymentChange(
              loan.loanType,
              val === loan.minDownPaymentPercent ? null : val
            );
          }}
          formatValue={(v) => `${v}%`}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formatCurrency(loan.downPaymentAmount)} down on {formatCurrency(loan.selectedPurchasePrice)}
        </p>
        {isAboveMinimum && (
          <button
            onClick={() => onDownPaymentChange(loan.loanType, null)}
            className="mt-1 text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Reset to {loan.minDownPaymentPercent}% minimum
          </button>
        )}
        {noPMI && (
          <p className="mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
            🎉 No PMI at 20% down!
          </p>
        )}
      </div>

      {/* Monthly Breakdown */}
      <div className="px-5 py-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Monthly Payment Breakdown
        </p>
        <div className="divide-y divide-gray-100">
          <PaymentRow label="Principal & Interest" amount={monthlyBreakdown.principalAndInterest} />
          <PaymentRow label="Property Tax" amount={monthlyBreakdown.propertyTax} />
          <PaymentRow label="Home Insurance" amount={monthlyBreakdown.homeInsurance} />
          {monthlyBreakdown.mortgageInsurance > 0 && (
            <PaymentRow
              label={loan.loanType === "fha" ? "FHA MIP" : "PMI"}
              amount={monthlyBreakdown.mortgageInsurance}
            />
          )}
          {monthlyBreakdown.hoaFees > 0 && (
            <PaymentRow label="HOA Fees" amount={monthlyBreakdown.hoaFees} />
          )}
        </div>

        {/* Total */}
        <div
          className="flex justify-between items-center pt-3 mt-3 border-t-2"
          style={{ borderColor: loan.color }}
        >
          <span className="font-semibold text-gray-900">Total Monthly</span>
          <span
            className="text-xl font-bold font-[family-name:var(--font-display)]"
            style={{ color: loan.color }}
          >
            {formatCurrency(monthlyBreakdown.totalPayment)}
          </span>
        </div>
      </div>

      {/* Cash to Close with DPA */}
      {cashToClose && (
        <div className="px-5 py-4 border-t border-gray-100 bg-gradient-to-b from-emerald-50/40 to-white">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <HandCoins className="w-3.5 h-3.5" />
            Estimated Cash to Close
          </p>
          <div className="divide-y divide-gray-100">
            <CashToCloseRow label="Down Payment" amount={cashToClose.downPayment} />
            <CashToCloseRow label="Est. Closing Costs" amount={cashToClose.estimatedClosingCosts} />
            <CashToCloseRow
              label="Seller Concession*"
              amount={cashToClose.sellerConcession}
              negative
              icon={<Minus className="w-3.5 h-3.5 text-blue-500" />}
            />
            {cashToClose.dpaAmount > 0 && (
              <CashToCloseRow
                label={`DPA (${cashToClose.dpaProgram?.name ?? ""})`}
                amount={cashToClose.dpaAmount}
                negative
                icon={<Shield className="w-3.5 h-3.5 text-[#10B981]" />}
              />
            )}
          </div>
          <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-emerald-300">
            <span className="font-semibold text-gray-900 flex items-center gap-1.5">
              {cashToClose.dpaAmount > 0 ? (
                <>
                  <Equal className="w-3.5 h-3.5 text-emerald-600" />
                  Out of Pocket
                </>
              ) : (
                "Total Cash Needed"
              )}
            </span>
            <span className="text-lg font-bold font-[family-name:var(--font-display)] text-gray-900">
              {formatCurrency(cashToClose.netOutOfPocket)}
            </span>
          </div>
          {cashToClose.dpaAmount > 0 && (
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              💰 DPA saves you {formatCurrency(cashToClose.dpaAmount)} at closing!
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            *Sellers are commonly covering ~65% of buyer closing costs via concessions in the current market.
          </p>
        </div>
      )}

      {/* DTI Info */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Front-end DTI: {loan.frontEndDTI}%</span>
          <span>Back-end DTI: {loan.backEndDTI}%</span>
        </div>
        {loan.miRateAnnual > 0 && (
          <p className="text-xs text-gray-400 mt-1">
            MI rate: {loan.miRateAnnual}%/yr
            {loan.loanType === "fha" && " + 1.75% upfront (financed)"}
            {loan.loanType === "va" && " + 2.15% funding fee (financed)"}
          </p>
        )}
        {loan.loanType === "va" && (
          <p className="text-xs text-gray-400 mt-1">
            No monthly MI &middot; 2.15% funding fee financed into loan
          </p>
        )}
      </div>
    </Card>
  );
}

export function CalculatorResults() {
  const {
    grossAnnualIncome,
    monthlyDebts,
    creditScore,
    householdSize,
    homeType,
    selectedProgramId,
    downPaymentOverrides,
    purchasePriceOverrides,
    setDownPaymentPercent,
    setPurchasePrice,
  } = useCalculatorStore();

  // Fetch dynamic rates from API
  const { rates, isLoading: ratesLoading } = useRates();

  const results = useMemo(
    () =>
      calculateAffordability({
        grossAnnualIncome,
        monthlyDebts,
        creditScore,
        householdSize,
        homeType,
        downPaymentOverrides,
        purchasePriceOverrides,
        rateOverrides: {
          conventional: rates.conventional,
          fha: rates.fha,
          va: rates.va,
        },
      }),
    [grossAnnualIncome, monthlyDebts, creditScore, householdSize, homeType, downPaymentOverrides, purchasePriceOverrides, rates]
  );

  const handleDownPaymentChange = useCallback(
    (loanType: LoanType, percent: number | null) => {
      setDownPaymentPercent(loanType, percent);
    },
    [setDownPaymentPercent]
  );

  const handlePurchasePriceChange = useCallback(
    (loanType: LoanType, price: number | null) => {
      setPurchasePrice(loanType, price);
    },
    [setPurchasePrice]
  );

  // Compute cash-to-close for each loan type
  const cashToCloseByLoan = useMemo(() => {
    const map: Record<string, CashToCloseBreakdown> = {};
    for (const loan of results.loans) {
      map[loan.loanType] = calculateCashToClose(
        loan.downPaymentAmount,
        loan.baseLoanAmount,
        selectedProgramId,
        grossAnnualIncome,
        householdSize
      );
    }
    return map;
  }, [results.loans, selectedProgramId, grossAnnualIncome, householdSize]);

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <Card padding="lg" className="border border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
            <TrendingUp className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              Based on {formatCurrency(grossAnnualIncome)}/year income
              {monthlyDebts > 0 && ` and ${formatCurrency(monthlyDebts)}/mo in debts`}
            </p>
            <p className="text-lg font-bold text-gray-900 font-[family-name:var(--font-display)] mt-1">
              Max Housing Payment:{" "}
              <span className="text-[#10B981]">
                {formatCurrency(results.maxMonthlyHousingPayment)}/mo
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* Loan Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {results.loans.map((loan) => (
          <LoanCard
            key={loan.loanType}
            loan={loan}
            cashToClose={cashToCloseByLoan[loan.loanType] ?? null}
            onDownPaymentChange={handleDownPaymentChange}
            onPurchasePriceChange={handlePurchasePriceChange}
          />
        ))}
      </div>

      {/* DPA Eligibility Callout */}
      <Card padding="lg" className="border border-emerald-200 bg-emerald-50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Shield className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="flex-1">
            {selectedProgramId ? (
              <>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-1">
                  DPA Applied — See Your Savings Above ☝️
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  The &ldquo;Cash to Close&rdquo; section on each loan card shows how much you could save
                  with this down payment assistance program. Actual eligibility depends on
                  your location, income, buyer status, and more.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-gray-900 mb-1">
                  Down Payment Assistance May Be Available
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Based on your household size of {householdSize} and income of{" "}
                  {formatCurrency(grossAnnualIncome)}, you may qualify for Idaho down payment
                  assistance programs. Select a DPA program above to see how it reduces your cash to close!
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] text-white text-sm font-medium hover:bg-[#059669] transition-colors"
              >
                <Home className="w-4 h-4" />
                Check My Eligibility
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                View All Programs
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Rates Source */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-500 space-y-1">
          <p>
            Interest rates sourced from{" "}
            <a
              href="https://www2.optimalblue.com/obmmi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10B981] hover:underline font-medium"
            >
              Optimal Blue Mortgage Market Indices (OBMMI)
            </a>
            .{" "}
            {ratesLoading ? (
              <span className="text-gray-400">Loading latest rates...</span>
            ) : (
              <>
                Rates as of{" "}
                <span className="font-medium">
                  {new Date(rates.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                {rates.source === "obmmi" && (
                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-700">
                    Auto-updated
                  </span>
                )}
              </>
            )}
            {" "}Rates reflect average locked rates including approximately 1 discount point, which sellers are commonly covering via concessions in the current market. Conventional rates adjust by credit score using OBMMI FICO/LTV breakdowns.
          </p>
          <p>
            Property taxes use Utah&apos;s average effective rate of 0.58% for single family homes
            {homeType !== "single_family" && ` (adjusted ${Math.round((1 - HOME_TYPES[homeType].propertyTaxMultiplier) * 100)}% lower for ${HOME_TYPES[homeType].label.toLowerCase()}s)`}.
            Homeowners insurance estimated at 0.35% of home value annually (~$1,400/yr on a $400k home).
            {homeType !== "single_family" && ` HOA fees estimated at $${HOME_TYPES[homeType].defaultHOA}/mo based on Utah ${HOME_TYPES[homeType].label.toLowerCase()} averages.`}
          </p>
          <p>
            <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes
            only. It is not a pre-qualification or commitment to lend. Actual rates, payments, and
            qualification requirements may vary. Contact a licensed loan officer for a personalized
            assessment.
          </p>
        </div>
      </div>
    </div>
  );
}

