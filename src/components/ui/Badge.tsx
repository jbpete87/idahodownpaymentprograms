"use client";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
}

const variants = {
  default: "bg-gray-100 text-gray-800 border border-gray-200",
  success: "bg-green-100 text-green-800 border border-green-200",
  warning: "bg-amber-100 text-amber-800 border border-amber-200",
  error: "bg-red-100 text-red-800 border border-red-200",
  info: "bg-blue-100 text-blue-800 border border-blue-200",
};

const sizes = {
  sm: "px-2.5 py-0.5 text-xs font-medium",
  md: "px-3 py-1 text-sm font-medium",
};

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Funding status badge
export interface FundingBadgeProps {
  status: "open" | "limited" | "waitlist" | "paused" | "closed";
  className?: string;
}

export function FundingBadge({ status, className }: FundingBadgeProps) {
  const statusConfig = {
    open: { variant: "success" as const, label: "Funds Available" },
    limited: { variant: "warning" as const, label: "Limited Funds" },
    waitlist: { variant: "warning" as const, label: "Waitlist" },
    paused: { variant: "info" as const, label: "Temporarily Paused" },
    closed: { variant: "error" as const, label: "Funding Closed" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

// Confidence badge
export interface ConfidenceBadgeProps {
  level: "likely" | "possible" | "needs_review";
  className?: string;
}

export function ConfidenceBadge({ level, className }: ConfidenceBadgeProps) {
  const levelConfig = {
    likely: { variant: "success" as const, label: "Likely Eligible" },
    possible: { variant: "warning" as const, label: "Possible Match" },
    needs_review: { variant: "info" as const, label: "Needs Review" },
  };

  const config = levelConfig[level];

  return (
    <Badge variant={config.variant} size="md" className={className}>
      {config.label}
    </Badge>
  );
}
