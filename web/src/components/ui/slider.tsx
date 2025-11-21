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
  isWebsiteDark?: boolean;
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
  isWebsiteDark = false,
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  // Calculate percentage for visual fill
  const percentage = ((value - min) / (max - min)) * 100;

  const sliderId = React.useId();
  const primaryColor = isWebsiteDark ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)';
  const backgroundColor = isWebsiteDark ? 'hsl(222.2 84% 4.9%)' : 'hsl(0 0% 100%)';
  const ringColor = isWebsiteDark ? 'hsl(217.2 70% 45%)' : 'hsl(221.2 83.2% 53.3%)';

  return (
    <div className={cn("space-y-1.5", className)}>
        <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <label 
            className="text-sm font-medium block"
            style={{
              color: isWebsiteDark
                ? 'hsl(210 40% 98%)'
                : 'hsl(0 0% 0%)',
            }}
          >
            {label}
          </label>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span 
            className="text-sm font-medium tabular-nums min-w-[3rem] text-right inline-block"
            style={{
              color: isWebsiteDark
                ? 'hsl(210 40% 98%)'
                : 'hsl(0 0% 0%)',
            }}
          >
            {value}
            {unit}
          </span>
        </div>
      </div>

      <div className="relative">
        <style dangerouslySetInnerHTML={{
          __html: `
            #slider-${sliderId}::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: ${primaryColor};
              cursor: pointer;
              border: 2px solid ${backgroundColor};
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
              transition: all 0.2s ease;
            }
            #slider-${sliderId}::-webkit-slider-thumb:hover {
              transform: scale(1.1);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            #slider-${sliderId}::-webkit-slider-thumb:active {
              transform: scale(1.05);
            }
            #slider-${sliderId}::-moz-range-thumb {
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: ${primaryColor};
              cursor: pointer;
              border: 2px solid ${backgroundColor};
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
              transition: all 0.2s ease;
            }
            #slider-${sliderId}::-moz-range-thumb:hover {
              transform: scale(1.1);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            #slider-${sliderId}::-moz-range-thumb:active {
              transform: scale(1.05);
            }
            #slider-${sliderId}:focus {
              outline: none;
            }
            #slider-${sliderId}:focus-visible::-webkit-slider-thumb {
              outline: 2px solid ${ringColor};
              outline-offset: 2px;
            }
            #slider-${sliderId}:focus-visible::-moz-range-thumb {
              outline: 2px solid ${ringColor};
              outline-offset: 2px;
            }
          `
        }} />
        <input
          id={`slider-${sliderId}`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${
              isWebsiteDark ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)'
            } 0%, ${
              isWebsiteDark ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)'
            } ${percentage}%, ${
              isWebsiteDark ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96.1%)'
            } ${percentage}%, ${
              isWebsiteDark ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96.1%)'
            } 100%)`,
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

