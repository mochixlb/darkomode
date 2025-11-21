"use client";

import React, { useState } from "react";
import { DemoThemeTab } from "./demo-theme-tab";
import { DemoCustomizeTab } from "./demo-customize-tab";
import {
  DemoBottomNavigation,
  type TabId,
  tabs,
} from "./demo-bottom-navigation";
import { useDemoState } from "./demo-state-context";

interface DemoPopupProps {
  initialTab?: TabId;
}

export function DemoPopup({ initialTab = "theme" }: DemoPopupProps) {
  const { state, handleFiltersChange, handleReset } = useDemoState();
  const { filters, isWebsiteDark } = state;
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  return (
    <div
      className="w-80 h-[600px] flex flex-col border overflow-hidden"
      role="region"
      aria-label="darko mode extension demo"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        backgroundColor: isWebsiteDark
          ? "hsl(222.2 84% 4.9%)" // dark mode background
          : "hsl(0 0% 100%)", // light mode background (white)
        borderColor: isWebsiteDark
          ? "hsl(217.2 32.6% 17.5%)" // dark mode border
          : "hsl(214.3 31.8% 88%)", // light mode border - slightly darker for better contrast
        borderWidth: "1px",
        color: isWebsiteDark
          ? "hsl(210 40% 98%)" // dark mode foreground
          : "hsl(222.2 84% 4.9%)", // light mode foreground
        borderRadius: 0,
        boxShadow: isWebsiteDark
          ? "0 2px 8px rgba(0, 0, 0, 0.4)"
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <header
        className="flex-shrink-0 px-5 pt-4 pb-3 border-b flex items-center justify-between"
        style={{
          borderColor: isWebsiteDark
            ? "hsl(217.2 32.6% 17.5%)"
            : "hsl(214.3 31.8% 91.4%)",
        }}
      >
        <h1
          className="text-lg font-semibold"
          style={{
            color: isWebsiteDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
          }}
        >
          {tabs.find((tab) => tab.id === activeTab)?.label || activeTab}
        </h1>
      </header>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "theme" ? (
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3">
            <DemoThemeTab isWebsiteDark={isWebsiteDark} />
          </div>
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-2">
              <DemoCustomizeTab
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isWebsiteDark={isWebsiteDark}
              />
            </div>
            <div
              className="flex-shrink-0 px-5 py-3 border-t flex items-center"
              style={{
                borderColor: isWebsiteDark
                  ? "hsl(217.2 32.6% 17.5%)"
                  : "hsl(214.3 31.8% 91.4%)",
                backgroundColor: isWebsiteDark
                  ? "hsl(222.2 84% 4.9%)"
                  : "hsl(0 0% 100%)",
              }}
            >
              <button
                onClick={handleReset}
                className="w-full h-11 px-5 py-2.5 text-base font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer hover:opacity-70 active:opacity-60"
                style={{
                  color: isWebsiteDark
                    ? "hsl(210 40% 98%)"
                    : "hsl(222.2 84% 4.9%)",
                  backgroundColor: isWebsiteDark
                    ? "hsl(217.2 32.6% 17.5%)"
                    : "hsl(210 40% 96.1%)",
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0">
        <DemoBottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isWebsiteDark={isWebsiteDark}
        />
      </div>
    </div>
  );
}
