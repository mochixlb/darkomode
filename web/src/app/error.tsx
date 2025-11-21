'use client';

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Optional: minimal console logging for diagnostics. Avoid leaking details to UI.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("[Web] Unhandled error:", error);
  }

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white">
      <SiteHeader />

      <main className="grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
            Something went wrong
          </h1>
          <p className="text-slate-800 dark:text-slate-200 mb-6">
            An unexpected error occurred while rendering this page.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.assign("/")}
              className="inline-flex items-center justify-center h-11 px-5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              Go home
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}


