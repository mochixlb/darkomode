import Image from "next/image";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white selection:bg-blue-100 dark:selection:bg-blue-900">
      <SiteHeader />

      <main className="grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center max-w-2xl lg:max-w-3xl w-full">
          <div className="mb-6 sm:mb-8">
            <Image
              src="/owl.webp"
              alt="Darko Mode Owl"
              width={200}
              height={200}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 mx-auto"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 sm:mb-6 px-2 sm:whitespace-nowrap text-slate-900 dark:text-slate-100">
            Dark mode for every website.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-800 dark:text-slate-200 mb-7 sm:mb-8 leading-7 sm:leading-8 px-4">
            Instantly toggle dark mode on any site. Adjust brightness, contrast,
            and filters to suit your eyes. Simple, fast, and free.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#" // Replace with actual chrome web store link
              className="flex items-center justify-center gap-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-black text-slate-900 dark:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-colors w-full sm:w-auto"
            >
              <Image
                src="/chrome-logo.svg"
                alt="Chrome Logo"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <span>Add to Chrome</span>
            </a>
            <a
              href="#" // Replace with actual firefox addons link
              className="flex items-center justify-center gap-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-black text-slate-900 dark:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-colors w-full sm:w-auto"
            >
              <Image
                src="/firefox-logo.svg"
                alt="Firefox Logo"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <span>Add to Firefox</span>
            </a>
            <a
              href="#" // Replace with actual safari app store link
              className="flex items-center justify-center gap-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-black text-slate-900 dark:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-colors w-full sm:w-auto"
            >
              <Image
                src="/safari-logo.svg"
                alt="Safari Logo"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <span>Add to Safari</span>
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
