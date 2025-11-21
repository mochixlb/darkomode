'use client';

import Image from "next/image";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const initialTheme = systemPrefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
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
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-900/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 cursor-pointer"
          aria-label="Toggle theme"
        >
          {mounted && (
            <>
              {theme === "light" ? (
                <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <SunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </>
          )}
        </button>
      </nav>
    </header>
  );
}


