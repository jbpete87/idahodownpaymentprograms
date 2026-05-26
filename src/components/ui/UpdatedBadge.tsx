import { Clock } from "lucide-react";

interface UpdatedBadgeProps {
  date?: string;
  className?: string;
}

export function UpdatedBadge({ date = "May 2026", className = "" }: UpdatedBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-800 shadow-sm ${className}`}>
      <Clock className="w-4 h-4" />
      <span>Updated {date}</span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
    </div>
  );
}

