"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef, useState, useEffect } from "react";

export interface SliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  error?: string;
  className?: string;
}

export function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (v) => v.toString(),
  error,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      onChange(clampedValue);
    },
    [min, max, step, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-700">{label}</span>
          <span className="text-xl font-bold text-[#10B981] font-[family-name:var(--font-display)]">
            {formatValue(value)}
          </span>
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative h-2 rounded-full cursor-pointer bg-gray-200"
      >
        {/* Filled track */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#10B981]"
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-6 h-6 -ml-3 rounded-full bg-white border-2 border-[#10B981] shadow-md transition-transform duration-100",
            isDragging ? "scale-110 ring-4 ring-[#10B981]/20" : "hover:scale-105"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
