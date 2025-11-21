import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white">
      <SiteHeader />

      <div className="grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center max-w-2xl w-full">
          <div className="mb-8">
            <Image
              src="/lost_owl.webp"
              alt="Lost owl"
              width={240}
              height={240}
              className="w-48 sm:w-60 h-auto mx-auto"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            404
          </h1>

          <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-200 mb-8 leading-7">
            Looks like this page flew away.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 rounded-md px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to home</span>
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

