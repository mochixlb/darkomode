import Link from "next/link";
import { Github } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-slate-700 dark:text-slate-300">
          <Link
            href="/privacy"
            className="py-2.5 px-4 sm:py-0 sm:px-0 -mx-4 sm:mx-0 w-full sm:w-auto text-center sm:text-left hover:text-slate-900 dark:hover:text-slate-100 active:text-slate-900 dark:active:text-slate-100 transition-colors duration-200 rounded-lg sm:rounded-none hover:bg-slate-100/70 dark:hover:bg-slate-900/60 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
          >
            Privacy Policy
          </Link>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <Link
            href="/terms"
            className="py-2.5 px-4 sm:py-0 sm:px-0 -mx-4 sm:mx-0 w-full sm:w-auto text-center sm:text-left hover:text-slate-900 dark:hover:text-slate-100 active:text-slate-900 dark:active:text-slate-100 transition-colors duration-200 rounded-lg sm:rounded-none hover:bg-slate-100/70 dark:hover:bg-slate-900/60 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
          >
            Terms of Use
          </Link>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <Link
            href="#"
            className="flex items-center justify-center sm:justify-start gap-2 py-2.5 px-4 sm:py-0 sm:px-0 -mx-4 sm:mx-0 w-full sm:w-auto hover:text-slate-900 dark:hover:text-slate-100 active:text-slate-900 dark:active:text-slate-100 transition-colors duration-200 rounded-lg sm:rounded-none hover:bg-slate-100/70 dark:hover:bg-slate-900/60 sm:hover:bg-transparent sm:dark:hover:bg-transparent"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}


