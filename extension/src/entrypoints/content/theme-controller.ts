import type {
  ExtensionMessage,
  FilterSettings,
  ThemeMode,
  UpdateFiltersMessage,
} from "@/types/index";
import { DARKO_MODE_ID, DEFAULT_FILTERS } from "@/constants";
import { resolveThemeMode, isPageNativelyDark } from "@/utils/theme";
import { shadowDOMStyleManager } from "@/utils/shadow-dom";

/**
 * Cached native dark mode detection result
 * Detected once before any filters are applied to avoid false readings
 */
let cachedNativeDarkMode: boolean | null = null;
let hasDetectedNativeDarkMode = false;

/**
 * Single shared mover to place the style element into <head> once available.
 * Prevents multiple concurrent timers and duplicate style nodes.
 */
let headMoveInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Current settings cache to avoid hot-path storage reads
 */
let currentSettingsCache: { themeMode: ThemeMode; filters: FilterSettings } = {
  themeMode: "auto",
  filters: DEFAULT_FILTERS,
};

export function setSettings(settings: {
  themeMode: ThemeMode;
  filters: FilterSettings;
}): void {
  currentSettingsCache = { ...settings };
}

export function getSettings(): {
  themeMode: ThemeMode;
  filters: FilterSettings;
} {
  return currentSettingsCache;
}

/**
 * Resets the cached detection result
 * Call this when switching themes to ensure fresh detection
 */
function resetNativeDarkModeCache(): void {
  cachedNativeDarkMode = null;
  hasDetectedNativeDarkMode = false;
}

/**
 * Builds CSS filter strings from filter settings
 */
function buildFilterStrings(
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

/**
 * Applies CSS filter-based theme with custom filters
 */
function applyThemeStyles(
  filters: FilterSettings = DEFAULT_FILTERS,
  isDark: boolean
): void {
  const { pageFilter, mediaFilter } = buildFilterStrings(filters, isDark);

  // If no filters to apply, remove existing styles and return
  if (!pageFilter && !mediaFilter) {
    const existingStyle = document.getElementById(DARKO_MODE_ID);
    if (existingStyle) {
      existingStyle.remove();
    }
    shadowDOMStyleManager.removeStyles();
    return;
  }

  // Try to reuse existing style element to avoid flashing
  let style = document.getElementById(DARKO_MODE_ID) as HTMLStyleElement;
  const isNewStyle = !style;

  if (isNewStyle) {
    style = document.createElement("style");
    style.id = DARKO_MODE_ID;
  }

  const cssRules = [];

  // Page-level filters
  if (pageFilter) {
    cssRules.push(`
      html {
        filter: ${pageFilter} !important;
        ${isDark ? "background-color: #fff !important;" : ""}
      }
    `);
  }

  // Media filters (undo inversion in dark mode)
  if (mediaFilter) {
    cssRules.push(`
      html img,
      html video,
      html iframe,
      html canvas,
      html svg,
      html [style*="background-image"] {
        filter: ${mediaFilter} !important;
        ${isDark ? "background-color: transparent !important;" : ""} 
      }
    `);
  }

  // Update style content (this is fast and doesn't cause flashing)
  style.textContent = cssRules.join("\n");

  // Only append if it's a new style element
  if (isNewStyle) {
    // Ensure a single style node exists in the DOM immediately
    // Prefer <head>, but fall back to <html> early to register the ID for reuse
    if (document.head) {
      document.head.appendChild(style);
    } else {
      const root = document.documentElement || document;
      if (root.firstChild) {
        root.insertBefore(style, root.firstChild);
      } else {
        root.appendChild(style);
      }
      // Move to <head> once available using a single shared interval
      if (!headMoveInterval) {
        headMoveInterval = setInterval(() => {
          if (document.head) {
            const existing = document.getElementById(DARKO_MODE_ID);
            if (existing && existing.parentElement !== document.head) {
              document.head.appendChild(existing);
            }
            clearInterval(headMoveInterval as ReturnType<typeof setInterval>);
            headMoveInterval = null;
          }
        }, 25);
      }
    }
  }

  // Apply styles to Shadow DOM elements
  shadowDOMStyleManager.applyStyles(pageFilter, mediaFilter, isDark);
}

/**
 * Removes theme styles from the page
 */
function removeThemeStyles(): void {
  const style = document.getElementById(DARKO_MODE_ID);
  if (style) {
    style.remove();
  }
  shadowDOMStyleManager.removeStyles();
}

/**
 * Detects and caches the native dark mode state
 * Must be called BEFORE any filters are applied to get accurate results
 */
function detectAndCacheNativeDarkMode(): boolean {
  if (hasDetectedNativeDarkMode && cachedNativeDarkMode !== null) {
    return cachedNativeDarkMode;
  }

  if (!document.body && !document.documentElement) {
    return false;
  }

  try {
    cachedNativeDarkMode = isPageNativelyDark();
    hasDetectedNativeDarkMode = true;
    return cachedNativeDarkMode;
  } catch (error) {
    console.debug("[Darko Mode] Failed to detect native dark mode:", error);
    cachedNativeDarkMode = false;
    hasDetectedNativeDarkMode = true;
    return false;
  }
}

/**
 * Applies theme based on mode with optional filters
 * Automatically detects if page is natively dark and adjusts filter logic accordingly
 */
export function applyTheme(mode: ThemeMode, filters?: FilterSettings): void {
  if (mode === "off") {
    removeThemeStyles();
    resetNativeDarkModeCache();
    return;
  }

  const effectiveMode = resolveThemeMode(mode);
  if (effectiveMode === null) {
    removeThemeStyles();
    resetNativeDarkModeCache();
    return;
  }

  let isDark = effectiveMode === "dark";

  // IMPORTANT: Detect native dark mode BEFORE applying filters
  const hasExistingFilters = document.getElementById(DARKO_MODE_ID) !== null;

  if (hasExistingFilters) {
    removeThemeStyles();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            resetNativeDarkModeCache();
            const pageIsNativelyDark = detectAndCacheNativeDarkMode();

            let adjustedIsDark = effectiveMode === "dark";
            if (pageIsNativelyDark) {
              adjustedIsDark = !adjustedIsDark;
            }

            const filtersToApply = filters ?? DEFAULT_FILTERS;
            applyThemeStyles(filtersToApply, adjustedIsDark);
          });
        }, 50);
      });
    });
    return;
  }

  resetNativeDarkModeCache();
  const pageIsNativelyDark = detectAndCacheNativeDarkMode();
  if (pageIsNativelyDark) {
    isDark = !isDark;
  }

  const filtersToApply = filters ?? DEFAULT_FILTERS;
  applyThemeStyles(filtersToApply, isDark);
}

/**
 * Fast path for updating filters without re-detection
 * Used when user is adjusting sliders to avoid flashing
 */
export function updateFiltersOnly(filters: FilterSettings): void {
  const mode = currentSettingsCache.themeMode || "auto";
  if (mode === "off") {
    return;
  }

  const effectiveMode = resolveThemeMode(mode);
  if (effectiveMode === null) {
    return;
  }

  let isDark = effectiveMode === "dark";
  if (hasDetectedNativeDarkMode && cachedNativeDarkMode !== null) {
    if (cachedNativeDarkMode) {
      isDark = !isDark;
    }
  }

  applyThemeStyles(filters, isDark);
}

// Listen for system theme changes when in auto mode
let systemThemeListener: MediaQueryList | null = null;

export function setupSystemThemeListener(mode: ThemeMode): void {
  if (systemThemeListener) {
    systemThemeListener.removeEventListener("change", handleSystemThemeChange);
    systemThemeListener = null;
  }

  if (mode === "auto" && window.matchMedia) {
    systemThemeListener = window.matchMedia("(prefers-color-scheme: dark)");
    systemThemeListener.addEventListener("change", handleSystemThemeChange);
  }
}

function handleSystemThemeChange(): void {
  const mode = currentSettingsCache.themeMode || "auto";
  const filters = currentSettingsCache.filters || DEFAULT_FILTERS;
  if (mode === "auto") {
    applyTheme(mode, filters);
  }
}

/**
 * Handles messages from background/popup
 */
export function handleMessage(
  message: ExtensionMessage,
  _sender: unknown,
  sendResponse: (response?: unknown) => void
): boolean {
  if (message.type === "UPDATE_FILTERS") {
    const { filters } = message as UpdateFiltersMessage;
    updateFiltersOnly(filters);
    currentSettingsCache = { ...currentSettingsCache, filters };
    sendResponse({ success: true });
    // Synchronous response; returning false avoids keeping the channel open
    return false;
  }
  return false;
}

export function cleanup(): void {
  if (systemThemeListener) {
    systemThemeListener.removeEventListener("change", handleSystemThemeChange);
    systemThemeListener = null;
  }
  shadowDOMStyleManager.cleanup();
}
