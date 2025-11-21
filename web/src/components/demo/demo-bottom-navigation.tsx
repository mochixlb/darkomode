"use client";

import React from "react";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import ComputerDesktopIcon from "@heroicons/react/24/outline/ComputerDesktopIcon";
import AdjustmentsHorizontalIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import { cn } from "@/utils/utils";

export type TabId = "theme" | "customize";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DemoBottomNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isWebsiteDark: boolean;
  ariaLabel?: string;
}

export const tabs: Tab[] = [
  { id: "theme", label: "Theme", icon: MoonIcon },
  { id: "customize", label: "Customize", icon: AdjustmentsHorizontalIcon },
];

export function DemoBottomNavigation({
  activeTab,
  onTabChange,
  isWebsiteDark,
  ariaLabel = "Extension navigation",
}: DemoBottomNavigationProps) {
  // Static icon for theme tab - always show moon icon (dark mode)
  const getThemeIcon = () => MoonIcon;

  // Calculate colors based on current isWebsiteDark state
  // Using lighter blue for dark mode to meet WCAG AA contrast ratio (4.5:1)
  const primaryColor = isWebsiteDark
    ? "hsl(217.2 91.2% 72%)"
    : "hsl(221.2 83.2% 53.3%)";
  const mutedForegroundColor = isWebsiteDark
    ? "hsl(215 20.2% 65.1%)"
    : "hsl(215.4 16.3% 35%)";
  const borderColor = isWebsiteDark
    ? "hsl(217.2 32.6% 17.5%)"
    : "hsl(214.3 31.8% 91.4%)";
  const backgroundColor = isWebsiteDark
    ? "hsl(222.2 84% 4.9%)"
    : "hsl(0 0% 100%)";

  return (
    <nav
      aria-label={ariaLabel}
      className="border-t"
      style={{
        borderColor,
        backgroundColor,
      }}
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.id === "theme" ? getThemeIcon() : tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 px-4 py-4 flex-1 relative min-h-[64px]",
                "focus-visible:outline-none cursor-pointer"
              )}
              style={{
                pointerEvents: "auto",
                color: isActive ? primaryColor : mutedForegroundColor,
                backgroundColor: "transparent",
              }}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" style={{ color: "inherit" }} />
              <span
                className={cn(
                  "text-xs font-medium leading-tight",
                  isActive && "font-semibold"
                )}
                style={{ color: "inherit" }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
