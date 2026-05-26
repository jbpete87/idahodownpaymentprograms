"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getCountyAMILimits, getAMIValue } from "@/lib/ami-utils";

type AMIPercent = 80 | 100 | 120;

interface IncomeLimitsTableProps {
  /** The county name (e.g., "Salt Lake", "Davis") */
  county: string;
  /** Which AMI percentage to highlight (80, 100, or 120) */
  amiPercent: AMIPercent;
  /** Optional: Show compact version (fewer columns) */
  compact?: boolean;
}

/**
 * Format currency without cents
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function IncomeLimitsTable({
  county,
  amiPercent,
  compact = false,
}: IncomeLimitsTableProps) {
  const limits = getCountyAMILimits(county);

  if (limits.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Income limits for {county} County not available.{" "}
        <Link href="/income-limits" className="text-[#10B981] hover:underline">
          View all county limits →
        </Link>
      </p>
    );
  }

  // For compact view, show only sizes 1-4
  const displayLimits = compact ? limits.slice(0, 4) : limits;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-medium text-gray-600">
                Household
              </th>
              <th className="text-right py-2 px-2 font-medium text-gray-600">
                {amiPercent}% AMI Limit
              </th>
              {!compact && (
                <>
                  {amiPercent !== 80 && (
                    <th className="text-right py-2 px-2 font-medium text-gray-400">
                      80%
                    </th>
                  )}
                  {amiPercent !== 100 && (
                    <th className="text-right py-2 px-2 font-medium text-gray-400">
                      100%
                    </th>
                  )}
                  {amiPercent !== 120 && (
                    <th className="text-right py-2 px-2 font-medium text-gray-400">
                      120%
                    </th>
                  )}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {displayLimits.map((limit) => (
              <tr
                key={limit.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-2 pr-4 text-gray-700">
                  {limit.householdSize === 1
                    ? "1 person"
                    : `${limit.householdSize} people`}
                </td>
                <td className="py-2 px-2 text-right font-semibold text-[#10B981]">
                  {formatCurrency(getAMIValue(limit, amiPercent))}
                </td>
                {!compact && (
                  <>
                    {amiPercent !== 80 && (
                      <td className="py-2 px-2 text-right text-gray-400">
                        {formatCurrency(limit.ami80)}
                      </td>
                    )}
                    {amiPercent !== 100 && (
                      <td className="py-2 px-2 text-right text-gray-400">
                        {formatCurrency(limit.ami100)}
                      </td>
                    )}
                    {amiPercent !== 120 && (
                      <td className="py-2 px-2 text-right text-gray-400">
                        {formatCurrency(limit.ami120)}
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compact && limits.length > 4 && (
        <p className="text-xs text-gray-500">
          Showing sizes 1-4.{" "}
          <Link
            href="/income-limits"
            className="text-[#10B981] hover:underline inline-flex items-center gap-1"
          >
            See all household sizes
            <ExternalLink className="w-3 h-3" />
          </Link>
        </p>
      )}

      <p className="text-xs text-gray-400">
        {county} County • FY 2025 HUD Income Limits
      </p>
    </div>
  );
}

/**
 * Quick reference showing just the family of 4 limit
 */
export function IncomeLimitQuickRef({
  county,
  amiPercent,
}: {
  county: string;
  amiPercent: AMIPercent;
}) {
  const limits = getCountyAMILimits(county);
  const familyOf4 = limits.find((l) => l.householdSize === 4);

  if (!familyOf4) {
    return null;
  }

  const amount = getAMIValue(familyOf4, amiPercent);

  return (
    <span className="text-[#10B981] font-semibold">
      {formatCurrency(amount)}
    </span>
  );
}

