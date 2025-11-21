"use client";

import Image from "next/image";
import { DemoPopup } from "./demo/demo-popup";

export function ThemeModesSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-black"
      aria-label="Theme modes"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Demo Popup */}
          <div className="flex-shrink-0 order-2 lg:order-1 z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 dark:bg-blue-500/20 rounded-full blur-2xl -z-10" />
              <div className="mb-3 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Try switching themes ↓
                </p>
              </div>
              <DemoPopup ariaLabel="darko mode extension demo - theme selection" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-xl lg:max-w-lg order-1 lg:order-2">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-5 text-slate-900 dark:text-white">
                  Pick your perfect theme.
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Choose Dark Mode, Light Mode, System preference, or turn it
                  off completely.
                </p>
              </div>

              {/* Theme Mode Images */}
              <div className="relative w-full">
                {/* Light Mode Image (Sunbathing) */}
                <div className="dark:hidden w-full">
                  <Image
                    src="/darko-sunbathing.webp"
                    alt="Darko sunbathing in light mode"
                    width={1536}
                    height={1024}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>

                {/* Dark Mode Image (Stargazing) */}
                <div className="hidden dark:block w-full">
                  <Image
                    src="/darko-stargazing.webp"
                    alt="Darko stargazing in dark mode"
                    width={1536}
                    height={1024}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
