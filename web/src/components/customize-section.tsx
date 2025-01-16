"use client";

import Image from "next/image";
import { DemoPopup } from "./demo/demo-popup";

export function CustomizeSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-[#0a0a0a]"
      aria-label="Customize theme"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Text Section - Centered above */}
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-5 text-slate-900 dark:text-white">
              Fine-tune your experience.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Adjust brightness, contrast, saturation, and apply color effects
              to match your preferences.
            </p>
          </div>

          {/* Demo Extension and Laptop Image - Side by side */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32 w-full">
            {/* Demo Popup */}
            <div className="shrink-0 relative z-10">
              <div className="absolute -inset-8 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl -z-10" />
              <div className="mb-3 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Try adjusting the sliders ↓
                </p>
              </div>
              <DemoPopup
                initialTab="customize"
                ariaLabel="darko mode extension demo - customization"
              />
            </div>

            {/* Laptop Image */}
            <div className="relative w-full max-w-xs lg:max-w-[320px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 dark:from-blue-500/20 dark:to-purple-500/20 blur-2xl rounded-full -z-10 transform scale-110" />
              <Image
                src="/darko-laptop.webp"
                alt="darko mode customization interface"
                width={800}
                height={1200}
                className="w-full h-auto object-contain rounded-lg rotate-2 hover:rotate-0 transition-transform duration-500 drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 320px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
