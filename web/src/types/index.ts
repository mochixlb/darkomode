export type ThemeMode = "dark" | "light" | "auto" | "off";

/**
 * Filter customization settings for dark mode
 */
export interface FilterSettings {
  brightness: number; // 0-200 (100 = default)
  contrast: number; // 0-200 (100 = default)
  saturation: number; // 0-200 (100 = default)
  sepia: number; // 0-100 (0 = default)
  grayscale: number; // 0-100 (0 = default)
}
