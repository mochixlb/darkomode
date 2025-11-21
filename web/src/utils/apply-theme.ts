import type { ThemeMode, FilterSettings } from "@/types/index";
import { DARKO_MODE_ID, DEFAULT_FILTERS } from "@/constants";
// Import shared utilities from extension
import {
  resolveThemeMode,
  buildFilterStrings,
} from "../../../extension/src/utils/theme";

/**
 * Applies CSS filter-based theme with custom filters to the website
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
    if (document.head) {
      document.head.appendChild(style);
    } else {
      const root = document.documentElement || document;
      if (root.firstChild) {
        root.insertBefore(style, root.firstChild);
      } else {
        root.appendChild(style);
      }
    }
  }
}

/**
 * Removes theme styles from the page
 */
function removeThemeStyles(): void {
  const style = document.getElementById(DARKO_MODE_ID);
  if (style) {
    style.remove();
  }
}

/**
 * Detects if the website is currently in dark mode
 * Checks for the 'dark' class on documentElement
 * Since we're syncing with the website's theme, we can check directly
 */
function detectWebsiteDarkMode(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

/**
 * Checks if filters are at default values
 */
function areFiltersAtDefaults(filters: FilterSettings): boolean {
  return (
    filters.brightness === 100 &&
    filters.contrast === 100 &&
    filters.saturation === 100 &&
    filters.sepia === 0 &&
    filters.grayscale === 0
  );
}

/**
 * Applies theme based on mode with optional filters to the website
 */
export function applyTheme(mode: ThemeMode, filters?: FilterSettings): void {
  currentThemeMode = mode;
  const filtersToApply = filters ?? currentFilters ?? DEFAULT_FILTERS;
  currentFilters = filtersToApply;
  
  if (mode === "off") {
    removeThemeStyles();
    setupSystemThemeListener(mode);
    return;
  }

  const effectiveMode = resolveThemeMode(mode);
  if (effectiveMode === null) {
    removeThemeStyles();
    setupSystemThemeListener(mode);
    return;
  }

  let isDark = effectiveMode === "dark";
  
  // IMPORTANT: Detect if website is natively dark and adjust logic
  // This matches the real extension's behavior:
  // - If website is dark and user wants dark: don't invert (isDark = false)
  // - If website is light and user wants dark: invert (isDark = true)
  // - If website is dark and user wants light: invert (isDark = true) 
  // - If website is light and user wants light: don't invert (isDark = false)
  const websiteIsDark = detectWebsiteDarkMode();
  cachedWebsiteDarkMode = websiteIsDark;
  
  if (websiteIsDark) {
    // Website is dark: flip the isDark flag
    // If user wants dark (isDark=true), we set isDark=false (no inversion needed)
    // If user wants light (isDark=false), we set isDark=true (invert to light)
    isDark = !isDark;
  }
  
  // If website state matches desired state and filters are at defaults, remove filters
  // This prevents weird appearance when matching the page's native state
  // Note: isDark has been flipped if websiteIsDark, so we need to check the original desired mode
  const desiredMode = effectiveMode;
  const websiteMatchesDesired = (desiredMode === "dark" && websiteIsDark) || (desiredMode === "light" && !websiteIsDark);
  
  if (websiteMatchesDesired && areFiltersAtDefaults(filtersToApply)) {
    // Website already matches desired state and filters are at defaults: no filters needed
    removeThemeStyles();
    setupSystemThemeListener(mode);
    return;
  }
  
  applyThemeStyles(filtersToApply, isDark);
  setupSystemThemeListener(mode);
}

/**
 * Fast path for updating filters without re-detection
 * Used when user is adjusting sliders to avoid flashing
 */
let currentThemeMode: ThemeMode = "off";
let currentFilters: FilterSettings = DEFAULT_FILTERS;
let cachedWebsiteDarkMode: boolean | null = null;
let systemThemeListener: MediaQueryList | null = null;

function handleSystemThemeChange(): void {
  if (currentThemeMode === "auto") {
    // Reapply with current filters
    let isDark = resolveThemeMode(currentThemeMode) === "dark";
    if (cachedWebsiteDarkMode !== null && cachedWebsiteDarkMode) {
      isDark = !isDark;
    }
    applyThemeStyles(currentFilters, isDark);
  }
}

/**
 * Sets up system theme listener for auto mode
 */
function setupSystemThemeListener(mode: ThemeMode): void {
  if (systemThemeListener) {
    systemThemeListener.removeEventListener("change", handleSystemThemeChange);
    systemThemeListener = null;
  }

  if (mode === "auto" && typeof window !== "undefined" && window.matchMedia) {
    systemThemeListener = window.matchMedia("(prefers-color-scheme: dark)");
    systemThemeListener.addEventListener("change", handleSystemThemeChange);
  }
}

export function updateFiltersOnly(filters: FilterSettings): void {
  if (currentThemeMode === "off") {
    return;
  }

  currentFilters = filters;
  const effectiveMode = resolveThemeMode(currentThemeMode);
  if (effectiveMode === null) {
    return;
  }

  let isDark = effectiveMode === "dark";
  // Use cached detection if available
  if (cachedWebsiteDarkMode !== null && cachedWebsiteDarkMode) {
    isDark = !isDark;
  }
  applyThemeStyles(filters, isDark);
}

/**
 * Sets the current theme mode (for use with updateFiltersOnly)
 */
export function setThemeMode(mode: ThemeMode): void {
  currentThemeMode = mode;
  setupSystemThemeListener(mode);
}

