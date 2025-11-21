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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Content */}
          <div className="flex-1 max-w-xl lg:max-w-lg order-1 lg:order-1">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-5 text-slate-900 dark:text-white">
                  Fine-tune your experience.
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Adjust brightness, contrast, saturation, and apply color
                  effects to match your preferences.
                </p>
              </div>

              {/* Laptop Image - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block relative w-full max-w-xs">
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

          {/* Demo Popup */}
          <div className="flex-shrink-0 order-2 lg:order-2">
            <DemoPopup initialTab="customize" />
          </div>

          {/* Laptop Image - Shown on mobile, below demo extension */}
          <div className="lg:hidden relative w-full max-w-xs mx-auto order-3">
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
    </section>
  );
}
