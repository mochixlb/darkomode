import type { ThemeMode, FilterSettings } from "@/types/index";

/**
 * Detects if the system prefers dark mode
 */
function getSystemThemePreference(): "dark" | "light" {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Resolves the actual theme based on theme mode and system preference
 * Returns null when theme is off
 */
export function resolveThemeMode(mode: ThemeMode): "dark" | "light" | null {
  if (mode === "off") {
    return null;
  }
  if (mode === "auto") {
    return getSystemThemePreference();
  }
  return mode;
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

/**
 * Calculates the relative luminance of an RGB color
 * Uses the WCAG formula: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parses a CSS color string (rgb, rgba, hex) and returns RGB values
 */
function parseColor(color: string): { r: number; g: number; b: number } | null {
  // Handle rgb/rgba format: "rgb(255, 0, 0)" or "rgba(255, 0, 0, 0.5)"
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // Handle hex format: "#ffffff" or "#fff"
  const hexMatch = color.match(/#([0-9a-f]{3}|[0-9a-f]{6})/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  }

  return null;
}

/**
 * Detects if the webpage is natively dark by analyzing background colors
 * Checks html, body, and document background colors
 * Returns true if the page appears to be in dark mode
 */
export function isPageNativelyDark(): boolean {
  if (typeof document === "undefined") return false;

  try {
    // Check for color-scheme meta tag or CSS property
    const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
    if (colorSchemeMeta) {
      const content = colorSchemeMeta.getAttribute("content");
      if (content?.includes("dark")) {
        return true;
      }
      if (content === "light" || content === "only light") {
        return false;
      }
    }

    // Check computed styles for html and body
    const htmlStyle = window.getComputedStyle(document.documentElement);
    const bodyStyle = window.getComputedStyle(document.body);

    // Get background colors (prioritize background over text color)
    const htmlBg = htmlStyle.backgroundColor;
    const bodyBg = bodyStyle.backgroundColor;
    const htmlColor = htmlStyle.color;

    // Prioritize background colors over text color for detection
    // Only use text color as fallback if no valid backgrounds found
    const backgroundColors: string[] = [];
    const isTransparent = (color: string) =>
      color === "transparent" ||
      color === "rgba(0, 0, 0, 0)" ||
      color.startsWith("rgba(0, 0, 0,") ||
      color === "initial" ||
      color === "inherit";

    if (htmlBg && !isTransparent(htmlBg)) {
      backgroundColors.push(htmlBg);
    }
    if (bodyBg && !isTransparent(bodyBg)) {
      backgroundColors.push(bodyBg);
    }

    // If we have no valid background colors, default to light (conservative)
    if (backgroundColors.length === 0) {
      // Only use text color as a last resort, and be very conservative
      if (htmlColor) {
        const textRgb = parseColor(htmlColor);
        if (textRgb) {
          const textLuminance = getLuminance(textRgb.r, textRgb.g, textRgb.b);
          // Only consider it dark if text is VERY light (high confidence)
          // This is less reliable than background, so use stricter threshold
          return textLuminance > 0.8; // Raised from 0.6 to 0.8 for more confidence
        }
      }
      // Default to light if we can't determine
      return false;
    }

    // Analyze background colors with multiple checks for accuracy
    const luminances: number[] = [];
    const rgbValues: Array<{ r: number; g: number; b: number }> = [];

    for (const color of backgroundColors) {
      const rgb = parseColor(color);
      if (rgb) {
        const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
        luminances.push(luminance);
        rgbValues.push(rgb);

        // Quick check: if any background is clearly white/very light, it's definitely light mode
        // White: rgb(255, 255, 255) or close to it (within 20 points)
        const isWhite = rgb.r > 235 && rgb.g > 235 && rgb.b > 235;
        if (isWhite) {
          return false; // Definitely light mode
        }
      }
    }

    if (luminances.length === 0) {
      return false;
    }

    // Use the MINIMUM luminance (darkest background) for more conservative detection
    // This avoids false positives from mixed backgrounds
    const minLuminance = Math.min(...luminances);
    const avgLuminance =
      luminances.reduce((a, b) => a + b, 0) / luminances.length;

    // Also check if RGB values are clearly dark (all channels < 128)
    const allDark = rgbValues.every(
      (rgb) => rgb.r < 128 && rgb.g < 128 && rgb.b < 128
    );

    // Check if any background is clearly light (any channel > 200)
    const hasLightBackground = rgbValues.some(
      (rgb) => rgb.r > 200 || rgb.g > 200 || rgb.b > 200
    );

    // If there's a clearly light background, it's definitely light mode
    if (hasLightBackground && avgLuminance > 0.5) {
      return false;
    }

    // More conservative threshold: require BOTH low luminance AND dark RGB values
    // Threshold lowered from 0.35 to 0.3 to only catch clearly dark backgrounds
    // This prevents light sites with slightly darker elements from being misidentified
    const isDarkByLuminance = minLuminance < 0.3 && avgLuminance < 0.35;

    // Require strong evidence: very low luminance AND clearly dark RGB values
    // Be very conservative - only mark as dark if we're very confident
    return isDarkByLuminance && allDark;
  } catch (error) {
    // If detection fails, assume light mode to avoid breaking existing behavior
    console.debug("[Darko Mode] Failed to detect native dark mode:", error);
    return false;
  }
}
