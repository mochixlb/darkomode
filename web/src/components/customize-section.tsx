"use client";

import Image from "next/image";
import { DemoPopup } from "./demo/demo-popup";

export function CustomizeSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-black"
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
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full">
            {/* Demo Popup */}
            <div className="shrink-0">
              <DemoPopup initialTab="customize" />
            </div>

            {/* Laptop Image */}
            <div className="relative w-full max-w-xs lg:max-w-[320px]">
              <Image
                src="/darko-laptop.webp"
                alt="darko mode customization interface"
                width={800}
                height={1200}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
