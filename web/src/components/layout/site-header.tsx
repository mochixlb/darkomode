'use client';

import Image from "next/image";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";

const NAV_HIDE_OFFSET = 80;
const NAV_TOP_OFFSET = 8;
const NAV_SCROLL_DELTA = 6;

export default function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  const [mounted, setMounted] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Read initial theme from DOM (set by blocking script in layout)
    const isDark = document.documentElement.classList.contains("dark");
    const initialTheme = isDark ? "dark" : "light";
    setTheme(initialTheme);
    setMounted(true);

    // Watch for theme changes on the document (from demo extension or other sources)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setNavHidden(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let lastKnownScrollY = window.scrollY;
    let rafId: number | null = null;

    const updateScrollState = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastKnownScrollY;

      setIsAtTop(currentY <= NAV_TOP_OFFSET);

      if (currentY <= NAV_HIDE_OFFSET) {
        setNavHidden(false);
      }

      if (Math.abs(delta) > NAV_SCROLL_DELTA) {
        const shouldHide =
          !prefersReducedMotion && currentY > NAV_HIDE_OFFSET && delta > 0;
        setNavHidden(shouldHide);
        lastKnownScrollY = currentY;
      }

      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prefersReducedMotion]);

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
    <header
      className={clsx(
        "sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 will-change-transform",
        prefersReducedMotion
          ? "transition-none"
          : "transition-transform duration-300 ease-out",
        navHidden && !prefersReducedMotion ? "-translate-y-full" : "translate-y-0",
        isAtTop
          ? "bg-white dark:bg-black"
          : "bg-white/90 dark:bg-slate-950/90 shadow-sm shadow-slate-900/5 dark:shadow-black/40 supports-[backdrop-filter]:backdrop-blur-md"
      )}
    >
      <nav aria-label="Main navigation" className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 rounded-md"
          aria-label="Go to home"
        >
          <Image
            src="/icon.png"
            alt="darko mode logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg"
          />
          <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-slate-100">
            darko mode
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


