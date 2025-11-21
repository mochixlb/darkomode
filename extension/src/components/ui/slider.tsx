import * as React from "react";
import { cn } from "@/utils/utils";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
  className?: string;
}

/**
 * A styled range slider component for filter adjustments
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit = "%",
  className,
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  // Calculate percentage for visual fill
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium text-foreground block">
            {label}
          </label>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span className="text-sm font-medium text-foreground tabular-nums min-w-[3rem] text-right inline-block">
            {value}
            {unit}
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--secondary)) ${percentage}%, hsl(var(--secondary)) 100%)`,
          }}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
    </div>
  );
}

