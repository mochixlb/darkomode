import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import "./assets/popup.css";
import { getSettings, saveSettings } from "@/utils/storage";
import { getActiveTab } from "@/utils/messaging";
import { getErrorMessage } from "@/utils/utils";
import { useTheme } from "@/utils/use-theme";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import type { ThemeMode, FilterSettings } from "@/types/index";
import {
  BottomNavigation,
  type TabId,
  tabs,
} from "@/components/popup/bottom-navigation";
import { ThemeTab } from "@/components/popup/theme-tab";
import { CustomizeTab } from "@/components/popup/customize-tab";

function Popup() {
  const [activeTab, setActiveTab] = useState<TabId>("theme");
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    grayscale: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPageTitle, setCurrentPageTitle] = useState<string | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);
  const [currentPageFavicon, setCurrentPageFavicon] = useState<string | null>(
    null
  );
  const [customizeResetState, setCustomizeResetState] = useState<{
    handleReset: () => void;
    isResetting: boolean;
  } | null>(null);

  // Apply theme to document root
  useTheme(themeMode);

  const loadSettings = useCallback(async () => {
    try {
      const settings = await getSettings();
      setThemeMode(settings.themeMode);
      setFilters(settings.filters);
      setError(null);
    } catch (err) {
      const errorMessage = getErrorMessage(err, "Failed to load settings");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCurrentPageInfo = useCallback(async () => {
    try {
      const tab = await getActiveTab();
      if (tab.title) {
        setCurrentPageTitle(tab.title);
      }
      if (tab.url) {
        setCurrentPageUrl(tab.url);
      }
      if (tab.favIconUrl) {
        setCurrentPageFavicon(tab.favIconUrl);
      } else {
        // Fallback: construct favicon URL from domain
        if (tab.url) {
          try {
            const urlObj = new URL(tab.url);
            const faviconUrl = `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
            setCurrentPageFavicon(faviconUrl);
          } catch {
            setCurrentPageFavicon(null);
          }
        } else {
          setCurrentPageFavicon(null);
        }
      }
    } catch {
      // Silently fail - tab might not be accessible
    }
  }, []);

  const applyTheme = useCallback(
    async (mode: ThemeMode) => {
      try {
        // Save settings directly - content script will pick up changes via storage listener
        await saveSettings({ themeMode: mode });

        // Update local state optimistically
        setThemeMode(mode);
        setError(null);
      } catch (err) {
        const errorMessage = getErrorMessage(err, "Failed to apply theme");
        setError(errorMessage);
        // Reload settings on error to sync state
        loadSettings();
      }
    },
    [loadSettings]
  );

  const handleFiltersChange = useCallback(
    async (newFilters: FilterSettings) => {
      setFilters(newFilters);
    },
    []
  );

  useEffect(() => {
    loadSettings();
    loadCurrentPageInfo();
  }, [loadSettings, loadCurrentPageInfo]);

  if (isLoading) {
    return (
      <div className="w-80 h-[600px] flex flex-col bg-background items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-[600px] flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">
          {tabs.find((tab) => tab.id === activeTab)?.label || activeTab}
        </h1>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "theme" ? (
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3">
            <ThemeTab
              themeMode={themeMode}
              onThemeChange={applyTheme}
              currentPageTitle={currentPageTitle}
              currentPageUrl={currentPageUrl}
              currentPageFavicon={currentPageFavicon}
              error={error}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3">
              <CustomizeTab
                filters={filters}
                onFiltersChange={handleFiltersChange}
                error={error}
                onResetStateChange={setCustomizeResetState}
              />
            </div>
            <div className="flex-shrink-0 px-5 py-4 border-t border-border bg-background flex items-center">
              <button
                onClick={customizeResetState?.handleReset}
                disabled={
                  customizeResetState?.isResetting || !customizeResetState
                }
                className="w-full h-11 px-5 py-2.5 text-base font-medium text-foreground bg-secondary hover:bg-secondary/70 active:bg-secondary/60 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {customizeResetState?.isResetting
                  ? "Resetting..."
                  : "Reset to Defaults"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          themeMode={themeMode}
        />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Popup />
    </ErrorBoundary>
  </React.StrictMode>
);
