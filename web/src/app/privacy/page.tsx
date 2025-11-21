import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Section from "@/components/legal/section";

export const metadata: Metadata = {
  title: "Privacy Policy — darko mode",
  description:
    "Plain-language privacy policy for darko mode. We don't collect or sell your personal data.",
};

export default function PrivacyPage() {
  const lastUpdated = "November 20, 2025";

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white">
      <SiteHeader />

      <div className="grow px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <header className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 rounded-md"
              aria-label="Back to home"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-800 dark:text-slate-200 leading-7 sm:leading-8">
            Last updated: {lastUpdated}
          </p>
        </header>

        <main className="max-w-3xl mx-auto">
          <Section title="We don't track you">
            <p className="text-slate-800 dark:text-slate-200">
              We built darko mode to make the web easier on your eyes by letting you toggle dark mode and adjust visual filters on websites—not to collect your data. We don't collect, store, or share your personal information. Everything runs in your browser, and your theme preferences stay with you.
            </p>
          </Section>

          <Section title="What we don't do">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              To be completely clear, here's what we don't do:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>We don't use cookies, tracking pixels, or any tracking technologies</li>
              <li>We don't collect analytics, usage data, or behavioral information</li>
              <li>We don't store your theme preferences or filter settings on our servers</li>
              <li>We don't require accounts, registration, or any personal information</li>
              <li>We don't share data with third parties because we don't collect any data</li>
              <li>We don't use third-party analytics, advertising, or tracking services</li>
            </ul>
          </Section>

          <Section title="How the extension works">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              darko mode runs entirely in your browser. The extension stores your theme mode (Dark Mode, Light Mode, System, or Off) and filter settings (brightness, contrast, saturation, sepia, grayscale) locally in your browser's extension storage. If your browser's sync is enabled, these preferences may sync across your own devices, but we don't receive this data. This means:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>Your preferences are stored only in your browser's extension storage</li>
              <li>Nothing is sent to our servers except standard web requests to load the extension from the extension store</li>
              <li>You can clear your data by removing or resetting the extension, or clearing extension storage</li>
              <li>The extension doesn't load external scripts that could track you</li>
              <li>The popup may read your current tab's title, URL, or favicon to display context, but this information is not stored or transmitted</li>
              <li>When System mode is selected, the extension reads your system's theme preference locally (via your browser's prefers-color-scheme setting) to match your system preference—this is done entirely on your device and never transmitted</li>
              <li>The extension may analyze page styles locally to detect if a website already has native dark mode, so it can adjust filters accordingly—this analysis happens entirely in your browser and is never sent anywhere</li>
            </ul>
          </Section>

          <Section title="Standard web requests">
            <p className="text-slate-800 dark:text-slate-200">
              Like any website, when you visit darkomode.app, your browser automatically sends some information as part of standard web protocol, such as your IP address and browser type. This information is not stored or used by us. Your hosting provider may log this information as part of standard server operations, but we don't access, use, or retain these logs.
            </p>
          </Section>

          <Section title="Your rights">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              Under privacy laws like GDPR and CCPA, you have rights regarding your personal data. Since we don't collect personal data, these rights don't apply in the traditional sense, but we want you to know:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>You have the right to know what data is collected (answer: none)</li>
              <li>You have the right to access your data (answer: we don't have any)</li>
              <li>You have the right to delete your data (answer: it's already in your control—remove the extension or clear extension storage)</li>
              <li>You have the right to opt out of data collection (answer: there's nothing to opt out of)</li>
            </ul>
            <p className="text-slate-800 dark:text-slate-200 mt-3">
              Your data never leaves your browser, so you're always in control.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p className="text-slate-800 dark:text-slate-200">
              darko mode is not directed to children under 13 (or under 16 in the EU). Since we don't collect personal information from anyone, we also don't knowingly collect personal information from children. If you're a parent or guardian and believe your child has provided us with personal information, please note that we don't collect such information, so there's nothing for us to delete.
            </p>
          </Section>

          <Section title="Data controller">
            <p className="text-slate-800 dark:text-slate-200">
              For the purposes of GDPR and other privacy laws, darko mode is the data controller. However, since we don't collect or process personal data, there's no data processing to control.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p className="text-slate-800 dark:text-slate-200">
              We may update this privacy policy from time to time. When we do, we'll update the "Last updated" date at the top of this page. Since we don't collect contact information, we can't notify you directly of changes, but you can check this page anytime to see the current policy. Your continued use of darko mode after any changes means you accept the updated policy.
            </p>
          </Section>

          <Section title="Open source transparency">
            <p className="text-slate-800 dark:text-slate-200">
              darko mode is a free, open-source personal project. The complete source code is publicly available on{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 dark:text-slate-100 underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                GitHub
              </a>
              , which means you can review exactly how the extension works and verify our privacy claims yourself. This transparency is one of the best ways to ensure your privacy is protected.
            </p>
          </Section>

          <Section title="Questions">
            <p className="text-slate-800 dark:text-slate-200">
              Since darko mode is open-source, you can review the{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 dark:text-slate-100 underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                source code
              </a>{" "}
              to verify our privacy claims firsthand. For questions about service usage, see our{" "}
              <Link href="/terms" className="text-slate-900 dark:text-slate-100 underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                Terms of Use
              </Link>
              .
            </p>
          </Section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}


