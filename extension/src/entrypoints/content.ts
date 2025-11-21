import type { ThemeMode, FilterSettings } from "@/types/index";
import { DEFAULT_FILTERS } from "@/constants";
import { getSettings as getStoredSettings } from "@/utils/storage";
import {
  applyTheme,
  updateFiltersOnly,
  setupSystemThemeListener,
  handleMessage,
  setSettings,
  getSettings as getLocalSettings,
  cleanup,
} from "./content/theme-controller";
import {
  injectBlockingStyle,
  markReadyAndRemoveBlockingStyle,
} from "./content/page-visibility";
import { browser } from "wxt/browser";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  main() {
    // Prevent FOUC immediately
    injectBlockingStyle();

    // Initialize theme - read storage immediately and apply styles
    (async () => {
      try {
        const settings = await getStoredSettings();
        setSettings(settings);
        applyTheme(settings.themeMode, settings.filters);
        setupSystemThemeListener(settings.themeMode);
      } catch {
        const fallback = {
          themeMode: "auto" as ThemeMode,
          filters: DEFAULT_FILTERS,
        };
        setSettings(fallback);
        applyTheme(fallback.themeMode, fallback.filters);
        setupSystemThemeListener(fallback.themeMode);
      } finally {
        // Reveal page after styles are applied
        markReadyAndRemoveBlockingStyle();
      }
    })();

    // Listen for storage changes
    const onStorageChange = (changes: Record<string, any>) => {
      if (changes.themeMode || changes.filters) {
        const current = getLocalSettings();

        const newMode =
          ((changes as any).themeMode?.newValue as ThemeMode | undefined) ??
          current.themeMode ??
          "auto";
        const newFilters =
          ((changes as any).filters?.newValue as FilterSettings | undefined) ??
          current.filters ??
          DEFAULT_FILTERS;

        setSettings({ themeMode: newMode, filters: newFilters });

        if ((changes as any).filters && !(changes as any).themeMode) {
          updateFiltersOnly(newFilters as FilterSettings);
        } else {
          applyTheme(newMode, newFilters);
          if ((changes as any).themeMode) {
            setupSystemThemeListener(newMode);
          }
        }
      }
    };
    browser.storage.onChanged.addListener(onStorageChange);

    // Listen for messages
    const onRuntimeMessage = (
      message: unknown,
      sender: unknown,
      sendResponse: (response?: unknown) => void
    ) => handleMessage(message as any, sender, sendResponse);
    browser.runtime.onMessage.addListener(onRuntimeMessage);

    // Cleanup on page unload
    const onBeforeUnload = () => {
      cleanup();
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    // Return cleanup function for WXT
    return () => {
      // Remove listeners we added above
      browser.storage.onChanged.removeListener(onStorageChange);
      browser.runtime.onMessage.removeListener(onRuntimeMessage);
      window.removeEventListener("beforeunload", onBeforeUnload);
      cleanup();
    };
  },
});
