"use client";

import React, { useState, useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import ComputerDesktopIcon from "@heroicons/react/24/outline/ComputerDesktopIcon";
import NoSymbolIcon from "@heroicons/react/24/outline/NoSymbolIcon";
import { cn, setTheme } from "@/utils/utils";
import type { ThemeMode } from "@/types/index";

interface ThemeOptionProps {
  value: ThemeMode;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isSelected: boolean;
}

function ThemeOption({
  value,
  icon: Icon,
  label,
  isSelected,
  isWebsiteDark,
}: ThemeOptionProps & { isWebsiteDark: boolean }) {
  const iconRef = React.useRef<HTMLDivElement>(null);

  const primaryColor = isWebsiteDark
    ? "hsl(217.2 91.2% 59.8%)"
    : "hsl(221.2 83.2% 53.3%)";
  const selectedTextColor = isWebsiteDark
    ? "hsl(217.2 91.2% 59.8%)"
    : "hsl(0 0% 0%)";
  const borderColor = isWebsiteDark
    ? "hsl(217.2 32.6% 17.5%)"
    : "hsl(214.3 31.8% 91.4%)";
  const backgroundColor = isWebsiteDark
    ? "hsl(222.2 84% 4.9%)"
    : "hsl(0 0% 100%)";
  const foregroundColor = isWebsiteDark
    ? "hsl(210 40% 98%)"
    : "hsl(222.2 84% 4.9%)";
  const inputBorderColor = isWebsiteDark
    ? "hsl(217.2 32.6% 17.5%)"
    : "hsl(214.3 31.8% 91.4%)";
  const accentBg = isWebsiteDark
    ? "hsl(217.2 32.6% 17.5%)"
    : "hsl(210 40% 96.1%)";
  const accentFg = isWebsiteDark
    ? "hsl(210 40% 98%)"
    : "hsl(222.2 47.4% 11.2%)";
  const ringColor = isWebsiteDark
    ? "hsl(217.2 70% 45%)"
    : "hsl(221.2 83.2% 53.3%)";

  const iconColor = isSelected ? selectedTextColor : foregroundColor;

  // Update icon color when theme or selection changes
  useEffect(() => {
    if (iconRef.current) {
      const icon = iconRef.current.querySelector("svg");
      if (icon) {
        icon.style.color = iconColor;
        icon.style.stroke = iconColor;
      }
    }
  }, [iconColor, isWebsiteDark, isSelected]);

  return (
    <Label
      htmlFor={`theme-${value}`}
      className={cn(
        "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-base font-medium transition-all duration-200 cursor-pointer select-none",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1"
      )}
      style={
        {
          borderColor: isSelected ? primaryColor : inputBorderColor,
          backgroundColor: isSelected
            ? isWebsiteDark
              ? "hsl(217.2 91.2% 59.8% / 0.1)"
              : "hsl(221.2 83.2% 53.3% / 0.1)"
            : backgroundColor,
          color: isSelected ? selectedTextColor : foregroundColor,
          "--tw-ring-color": ringColor,
          "--tw-ring-offset-color": backgroundColor,
        } as React.CSSProperties & { color: string }
      }
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = accentBg;
          e.currentTarget.style.color = accentFg;
          // Update icon color on hover
          if (iconRef.current) {
            iconRef.current.style.color = accentFg;
            const icon = iconRef.current.querySelector("svg");
            if (icon) {
              icon.style.color = accentFg;
              icon.style.stroke = accentFg;
            }
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = backgroundColor;
          e.currentTarget.style.color = foregroundColor;
          // Reset icon color on leave
          if (iconRef.current) {
            iconRef.current.style.color = iconColor;
            const icon = iconRef.current.querySelector("svg");
            if (icon) {
              icon.style.color = iconColor;
              icon.style.stroke = iconColor;
            }
          }
        }
      }}
    >
      <RadioGroupItem value={value} id={`theme-${value}`} className="sr-only" />
      <div
        ref={iconRef}
        className="h-5 w-5 shrink-0 flex items-center justify-center"
        aria-hidden="true"
        style={{
          color: iconColor,
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="flex-1" style={{ color: "inherit" }}>
        {label}
      </span>
      <div
        className="h-4 w-4 shrink-0 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
        style={{
          borderColor: isSelected
            ? primaryColor
            : isWebsiteDark
            ? "hsl(215 20.2% 65.1% / 0.4)"
            : "hsl(215.4 16.3% 35% / 0.4)",
        }}
        aria-hidden="true"
      >
        {isSelected && (
          <div
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: primaryColor,
            }}
          />
        )}
      </div>
    </Label>
  );
}

interface DemoThemeTabProps {
  isWebsiteDark: boolean;
}

export function DemoThemeTab({ isWebsiteDark }: DemoThemeTabProps) {
  // Track selected theme mode option (independent of actual theme state)
  const [selectedMode, setSelectedMode] = useState<ThemeMode>(() => {
    return isWebsiteDark ? "dark" : "light";
  });

  // Track if we're making an internal change to prevent useEffect from overriding user selection
  const isInternalChangeRef = useRef(false);
  // Track previous isWebsiteDark to detect external changes
  const prevIsWebsiteDarkRef = useRef(isWebsiteDark);

  // Sync selectedMode when theme changes externally (e.g., from navbar)
  // But don't sync if the change came from within this component
  useEffect(() => {
    // Skip if this change came from within this component
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      prevIsWebsiteDarkRef.current = isWebsiteDark;
      return;
    }

    // Only sync if isWebsiteDark actually changed
    if (prevIsWebsiteDarkRef.current !== isWebsiteDark) {
      prevIsWebsiteDarkRef.current = isWebsiteDark;
      // Only sync for "dark" and "light" modes, not "auto" or "off"
      // This ensures that when user selects "system" or "off", the dial stays on that option
      setSelectedMode((currentMode) => {
        if (currentMode === "dark" || currentMode === "light") {
          return isWebsiteDark ? "dark" : "light";
        }
        return currentMode;
      });
    }
  }, [isWebsiteDark]);

  const handleValueChange = (value: string) => {
    const mode = value as ThemeMode;
    setSelectedMode(mode);

    // Mark that we're making an internal change
    isInternalChangeRef.current = true;

    // Store current scroll position to prevent unwanted scrolling
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Dark mode, System, and Off all set dark mode
    // Light mode sets light mode
    if (mode === "light") {
      setTheme("light");
    } else {
      // dark, auto, or off all set dark mode
      setTheme("dark");
    }

    // Restore scroll position multiple times to prevent scrolling to first demo
    // This handles React re-renders and any delayed scroll behavior
    const restoreScroll = () => {
      window.scrollTo(scrollX, scrollY);
    };

    // Restore immediately and after React re-renders
    requestAnimationFrame(restoreScroll);
    requestAnimationFrame(() => {
      requestAnimationFrame(restoreScroll);
    });

    // Also restore after a short delay to catch any delayed scroll behavior
    setTimeout(restoreScroll, 0);
    setTimeout(restoreScroll, 10);
  };

  return (
    <div className="space-y-6">
      <div
        className="pb-4 border-b"
        style={{
          borderColor: isWebsiteDark
            ? "hsl(217.2 32.6% 17.5%)"
            : "hsl(214.3 31.8% 91.4%)",
        }}
      >
        <p
          className="text-base font-medium line-clamp-2 leading-relaxed mb-2"
          style={{
            color: isWebsiteDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
          }}
        >
          darko mode
        </p>
        <div className="flex items-center gap-2">
          <img
            src="/icon.png"
            alt="darko mode"
            className="w-4 h-4 shrink-0 rounded"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <p
            className="text-sm"
            style={{
              color: isWebsiteDark
                ? "hsl(215 20.2% 65.1%)"
                : "hsl(215.4 16.3% 35%)",
            }}
          >
            darkomode.com
          </p>
        </div>
      </div>

      <div>
        <h2
          className="text-sm font-semibold mb-3"
          style={{
            color: isWebsiteDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
          }}
        >
          Choose Theme
        </h2>
        <RadioGroup
          value={selectedMode}
          onValueChange={handleValueChange}
          className="space-y-2"
        >
          <ThemeOption
            value="dark"
            icon={MoonIcon}
            label="Dark Mode"
            isSelected={selectedMode === "dark"}
            isWebsiteDark={isWebsiteDark}
          />
          <ThemeOption
            value="light"
            icon={SunIcon}
            label="Light Mode"
            isSelected={selectedMode === "light"}
            isWebsiteDark={isWebsiteDark}
          />
          <ThemeOption
            value="auto"
            icon={ComputerDesktopIcon}
            label="System"
            isSelected={selectedMode === "auto"}
            isWebsiteDark={isWebsiteDark}
          />
          <ThemeOption
            value="off"
            icon={NoSymbolIcon}
            label="Off"
            isSelected={selectedMode === "off"}
            isWebsiteDark={isWebsiteDark}
          />
        </RadioGroup>
      </div>
    </div>
  );
}
