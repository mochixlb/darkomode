import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import ComputerDesktopIcon from "@heroicons/react/24/outline/ComputerDesktopIcon";
import NoSymbolIcon from "@heroicons/react/24/outline/NoSymbolIcon";
import { cn } from "@/utils/utils";
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
}: Omit<ThemeOptionProps, "onSelect">) {
  return (
    <Label
      htmlFor={`theme-${value}`}
      className={cn(
        "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-base font-medium transition-all duration-200 cursor-pointer select-none",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
        {
          "border-primary bg-primary/10 text-primary": isSelected,
          "border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground":
            !isSelected,
        }
      )}
    >
      <RadioGroupItem value={value} id={`theme-${value}`} className="sr-only" />
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="flex-1">{label}</span>
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
          {
            "border-primary": isSelected,
            "border-muted-foreground/40": !isSelected,
          }
        )}
        aria-hidden="true"
      >
        {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
      </div>
    </Label>
  );
}

interface ThemeTabProps {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  currentPageTitle: string | null;
  currentPageUrl: string | null;
  currentPageFavicon: string | null;
  error: string | null;
}

/**
 * Extracts the domain from a URL
 */
function getDomainFromUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * Cleans the page title by removing site name if it's in the format "Title | Site Name"
 */
function cleanPageTitle(title: string | null): string | null {
  if (!title) return null;
  // Remove common separators and site names from the end
  const cleaned = title
    .replace(/\s*\|\s*[^|]+$/, "") // Remove " | Site Name" format
    .replace(/\s*-\s*[^-]+$/, "") // Remove " - Site Name" format
    .trim();
  return cleaned || title; // Return original if cleaning removes everything
}

export function ThemeTab({
  themeMode,
  onThemeChange,
  currentPageTitle,
  currentPageUrl,
  currentPageFavicon,
  error,
}: ThemeTabProps) {
  const handleValueChange = (value: string) => {
    onThemeChange(value as ThemeMode);
  };

  return (
    <div className="space-y-6">
      {currentPageTitle && (
        <div className="pb-4 border-b border-border">
          <p
            className="text-base font-medium text-foreground line-clamp-2 leading-relaxed mb-2"
            title={currentPageTitle}
          >
            {cleanPageTitle(currentPageTitle)}
          </p>
          {getDomainFromUrl(currentPageUrl) && (
            <div className="flex items-center gap-2">
              {currentPageFavicon && (
                <img
                  src={currentPageFavicon}
                  alt=""
                  className="w-4 h-4 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <p className="text-sm text-muted-foreground">
                {getDomainFromUrl(currentPageUrl)}
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Choose Theme
        </h2>
        <RadioGroup
          value={themeMode}
          onValueChange={handleValueChange}
          className="space-y-2"
        >
          <ThemeOption
            value="dark"
            icon={MoonIcon}
            label="Dark Mode"
            isSelected={themeMode === "dark"}
          />
          <ThemeOption
            value="light"
            icon={SunIcon}
            label="Light Mode"
            isSelected={themeMode === "light"}
          />
          <ThemeOption
            value="auto"
            icon={ComputerDesktopIcon}
            label="System"
            isSelected={themeMode === "auto"}
          />
          <ThemeOption
            value="off"
            icon={NoSymbolIcon}
            label="Off"
            isSelected={themeMode === "off"}
          />
        </RadioGroup>
      </div>
    </div>
  );
}

