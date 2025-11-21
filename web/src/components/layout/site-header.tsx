'use client';

import Image from "next/image";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read initial theme from DOM (set by blocking script in layout)
    const isDark = document.documentElement.classList.contains("dark");
    const initialTheme = isDark ? "dark" : "light";
    setTheme(initialTheme);
    setMounted(true);

    // Listen for system preference changes (only if no saved preference)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, []);

  const toggleTheme = () => {
    console.log("toggleTheme called, mounted:", mounted, "current theme:", theme);
    
    if (!mounted) {
      console.warn("Theme toggle blocked: component not mounted yet");
      return; // Prevent toggling before hydration
    }
    
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Switching theme from", theme, "to", newTheme);
    
    setTheme(newTheme);
    
    try {
      localStorage.setItem("theme", newTheme);
      const hasDark = document.documentElement.classList.contains("dark");
      if (newTheme === "dark" && !hasDark) {
        document.documentElement.classList.add("dark");
      } else if (newTheme === "light" && hasDark) {
        document.documentElement.classList.remove("dark");
      }
      console.log("Theme updated successfully. Dark class present:", document.documentElement.classList.contains("dark"));
    } catch (error) {
      // Handle localStorage errors (e.g., private browsing mode)
      console.error("Failed to save theme preference:", error);
      const hasDark = document.documentElement.classList.contains("dark");
      if (newTheme === "dark" && !hasDark) {
        document.documentElement.classList.add("dark");
      } else if (newTheme === "light" && hasDark) {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-black/70 supports-[backdrop-filter]:backdrop-blur">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 rounded-md"
          aria-label="Go to home"
        >
          <Image
            src="/icon.png"
            alt="Darko Mode Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg"
          />
          <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-slate-100">
            Darko Mode
          </span>
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-900/70 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 cursor-pointer flex items-center justify-center"
          aria-label={mounted ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : "Toggle theme"}
          type="button"
        >
          {theme === "light" ? (
            <MoonIcon 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" 
              aria-hidden="true"
            />
          ) : (
            <SunIcon 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" 
              aria-hidden="true"
            />
          )}
        </button>
      </nav>
    </header>
  );
}


