import type { ExtensionSettings, ThemeMode } from "@/types/index";
import { DEFAULT_FILTERS } from "../constants";
import { browser } from "wxt/browser";

const DEFAULT_SETTINGS: ExtensionSettings = {
  themeMode: "auto",
  filters: DEFAULT_FILTERS,
};

function getPreferredStorageArea():
  | typeof browser.storage.sync
  | typeof browser.storage.local {
  const storageAny = browser.storage as unknown as {
    sync?: { get: Function; set: Function };
    local: { get: Function; set: Function };
  };
  if (storageAny.sync && typeof storageAny.sync.get === "function") {
    return storageAny.sync as unknown as typeof browser.storage.sync;
  }
  return browser.storage.local;
}

/**
 * Cross-browser storage error class
 */
class ExtensionStorageError extends Error {
  constructor(message: string, public readonly originalError?: string) {
    super(message);
    this.name = "ExtensionStorageError";
  }
}

/**
 * Gets settings from browser storage with proper error handling
 */
export async function getSettings(): Promise<ExtensionSettings> {
  const keys = ["themeMode", "filters"] as const;
  const area = getPreferredStorageArea();
  try {
    const result = await (area.get as any)(keys);
    const settings: ExtensionSettings = {
      themeMode: (result.themeMode as ThemeMode) ?? DEFAULT_SETTINGS.themeMode,
      filters: {
        brightness: result.filters?.brightness ?? DEFAULT_FILTERS.brightness,
        contrast: result.filters?.contrast ?? DEFAULT_FILTERS.contrast,
        saturation: result.filters?.saturation ?? DEFAULT_FILTERS.saturation,
        sepia: result.filters?.sepia ?? DEFAULT_FILTERS.sepia,
        grayscale: result.filters?.grayscale ?? DEFAULT_FILTERS.grayscale,
      },
    };
    return settings;
  } catch (_err) {
    // Fallback to local in case sync is unavailable (e.g., Safari without iCloud)
    try {
      const result = await browser.storage.local.get(keys);
      const settings: ExtensionSettings = {
        themeMode:
          (result.themeMode as ThemeMode) ?? DEFAULT_SETTINGS.themeMode,
        filters: {
          brightness: result.filters?.brightness ?? DEFAULT_FILTERS.brightness,
          contrast: result.filters?.contrast ?? DEFAULT_FILTERS.contrast,
          saturation:
            result.filters?.saturation ?? DEFAULT_FILTERS.saturation,
          sepia: result.filters?.sepia ?? DEFAULT_FILTERS.sepia,
          grayscale: result.filters?.grayscale ?? DEFAULT_FILTERS.grayscale,
        },
      };
      return settings;
    } catch (err: unknown) {
      const originalMessage =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      throw new ExtensionStorageError(
        `Failed to get settings: ${originalMessage}`,
        originalMessage
      );
    }
  }
}

/**
 * Saves settings to browser storage with proper error handling
 */
export async function saveSettings(
  settings: Partial<ExtensionSettings>
): Promise<void> {
  const area = getPreferredStorageArea();
  try {
    await (area.set as any)(settings);
  } catch (_err) {
    // Fallback to local in case sync is unavailable (e.g., Safari without iCloud)
    try {
      await browser.storage.local.set(settings);
    } catch (err: unknown) {
      const originalMessage =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      throw new ExtensionStorageError(
        `Failed to save settings: ${originalMessage}`,
        originalMessage
      );
    }
  }
}
