import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FilterSettings } from "@/types/index";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sets the theme by updating localStorage and the document's dark class
 * Matches the behavior of the navbar theme toggle
 */
export function setTheme(theme: "light" | "dark"): void {
  try {
    localStorage.setItem("theme", theme);
    const hasDark = document.documentElement.classList.contains("dark");
    if (theme === "dark" && !hasDark) {
      document.documentElement.classList.add("dark");
    } else if (theme === "light" && hasDark) {
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {
    // Handle localStorage errors (e.g., private browsing mode)
    const hasDark = document.documentElement.classList.contains("dark");
    if (theme === "dark" && !hasDark) {
      document.documentElement.classList.add("dark");
    } else if (theme === "light" && hasDark) {
      document.documentElement.classList.remove("dark");
    }
  }
}

/**
 * Builds CSS filter strings from filter settings
 * Shared utility used by both extension and web
 */
export function buildFilterStrings(
  filters: FilterSettings,
  isDark: boolean
): { pageFilter: string; mediaFilter: string } {
  const baseParts: string[] = [];
  const customParts: string[] = [];

  if (isDark) {
    baseParts.push("invert(1)");
    baseParts.push("hue-rotate(180deg)");
  }

  if (filters.brightness !== 100) {
    customParts.push(`brightness(${filters.brightness}%)`);
  }
  if (filters.contrast !== 100) {
    customParts.push(`contrast(${filters.contrast}%)`);
  }
  if (filters.saturation !== 100) {
    customParts.push(`saturate(${filters.saturation}%)`);
  }
  if (filters.sepia !== 0) {
    customParts.push(`sepia(${filters.sepia}%)`);
  }
  if (filters.grayscale !== 0) {
    customParts.push(`grayscale(${filters.grayscale}%)`);
  }

  const pageFilter = [...baseParts, ...customParts].join(" ");
  const mediaFilter = baseParts.join(" ");

  return { pageFilter, mediaFilter };
}

