"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type { FilterSettings } from "@/types/index";
import { DEFAULT_FILTERS, DARKO_MODE_ID } from "@/constants";
// Import shared utility from extension
import { buildFilterStrings } from "../../../../extension/src/utils/theme";

interface DemoState {
  filters: FilterSettings;
  isWebsiteDark: boolean;
}

interface DemoStateContextValue {
  state: DemoState;
  handleFiltersChange: (filters: FilterSettings) => void;
  handleReset: () => void;
}

const DemoStateContext = createContext<DemoStateContextValue | null>(null);

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  // Initialize isWebsiteDark synchronously (for styling demo extension)
  // Default to true since site always starts in dark mode
  const [isWebsiteDark, setIsWebsiteDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true; // Default to dark mode
  });

  const [filters, setFilters] = useState<FilterSettings>(DEFAULT_FILTERS);
  const filtersTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure initial state is correct on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsWebsiteDark(isDark);
  }, []);

  // Watch for website theme changes (for demo extension styling)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsWebsiteDark(isDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Apply filters when they change (with debouncing)
  useEffect(() => {
    if (filtersTimeoutRef.current) {
      clearTimeout(filtersTimeoutRef.current);
    }

    filtersTimeoutRef.current = setTimeout(() => {
      // Check if filters are at defaults
      const filtersAtDefaults =
        filters.brightness === 100 &&
        filters.contrast === 100 &&
        filters.saturation === 100 &&
        filters.sepia === 0 &&
        filters.grayscale === 0;

      // If filters are at defaults, remove any existing filters
      if (filtersAtDefaults) {
        const style = document.getElementById(DARKO_MODE_ID);
        if (style) {
          style.remove();
        }
        return;
      }

      // Build filter string using shared utility (no dark mode inversion for demo)
      const { pageFilter } = buildFilterStrings(filters, false);

      // Apply filters directly (no inversion, just custom filters)
      let style = document.getElementById(DARKO_MODE_ID) as HTMLStyleElement;
      if (!style) {
        style = document.createElement("style");
        style.id = DARKO_MODE_ID;
        document.head.appendChild(style);
      }

      if (!pageFilter) {
        style.remove();
        return;
      }

      style.textContent = `html { filter: ${pageFilter} !important; }`;
    }, 16);

    return () => {
      if (filtersTimeoutRef.current) {
        clearTimeout(filtersTimeoutRef.current);
      }
    };
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: FilterSettings) => {
    setFilters(newFilters);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    // Removing filters will be handled by the filters useEffect when filters change to DEFAULT_FILTERS
  }, []);

  const value: DemoStateContextValue = {
    state: {
      filters,
      isWebsiteDark,
    },
    handleFiltersChange,
    handleReset,
  };

  return (
    <DemoStateContext.Provider value={value}>
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error("useDemoState must be used within DemoStateProvider");
  }
  return context;
}
