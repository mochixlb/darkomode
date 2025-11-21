import { useEffect, useMemo } from "react";
import type { ThemeMode } from "@/types/index";
import { resolveThemeMode } from "@/utils/theme";

/**
 * Hook to manage theme application to the document
 * Applies the 'dark' class to the document root based on theme mode
 */
export function useTheme(themeMode: ThemeMode): void {
  const resolvedTheme = useMemo(() => resolveThemeMode(themeMode), [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    
    // If theme is off, remove dark class and return early
    if (themeMode === "off" || resolvedTheme === null) {
      root.classList.remove("dark");
      return;
    }

    const isDark = resolvedTheme === "dark";

    // Apply or remove dark class
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Listen for system preference changes when in auto mode
    if (themeMode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };

      // Modern browsers support addEventListener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [themeMode, resolvedTheme]);
}
