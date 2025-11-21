"use client";

import Image from "next/image";

export function FinalCTASection() {
  return (
    <section
      className="relative w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-black"
      aria-label="Get started"
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 sm:space-y-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              Try it now.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Add darko mode to your browser and start browsing in comfort.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 justify-center w-full sm:w-auto">
            <a
              href="#" // Replace with actual chrome web store link
              className="flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold text-lg sm:text-xl hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
            >
              <Image
                src="/chrome-logo.svg"
                alt="Chrome Logo"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span>Add to Chrome</span>
            </a>
            <a
              href="#" // Replace with actual firefox addons link
              className="flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold text-lg sm:text-xl hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
            >
              <Image
                src="/firefox-logo.svg"
                alt="Firefox Logo"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <span>Add to Firefox</span>
            </a>
          </div>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-4">
            Free • No data collected • Works instantly
          </p>
        </div>
      </div>
    </section>
  );
}

