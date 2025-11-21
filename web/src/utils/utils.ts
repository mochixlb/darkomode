import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

