import React from "react";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import ComputerDesktopIcon from "@heroicons/react/24/outline/ComputerDesktopIcon";
import AdjustmentsHorizontalIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import { cn } from "@/utils/utils";
import type { ThemeMode } from "@/types/index";

export type TabId = "theme" | "customize";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface BottomNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  themeMode: ThemeMode;
}

export const tabs: Tab[] = [
  { id: "theme", label: "Theme", icon: MoonIcon },
  { id: "customize", label: "Customize", icon: AdjustmentsHorizontalIcon },
];

export function BottomNavigation({
  activeTab,
  onTabChange,
  themeMode,
}: BottomNavigationProps) {
  // Get the theme icon based on current theme mode
  const getThemeIcon = () => {
    switch (themeMode) {
      case "dark":
        return MoonIcon;
      case "light":
        return SunIcon;
      case "auto":
        return ComputerDesktopIcon;
      default:
        return MoonIcon;
    }
  };

  return (
    <nav className="border-t border-border bg-background">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          // Use dynamic icon for theme tab, otherwise use the tab's icon
          const Icon = tab.id === "theme" ? getThemeIcon() : tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 px-4 py-4 flex-1 relative min-h-[64px]",
                "hover:bg-muted/50 active:bg-muted/70",
                "focus-visible:outline-none",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{ pointerEvents: "auto" }}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              <span
                className={cn(
                  "text-xs font-medium leading-tight",
                  isActive && "font-semibold"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
