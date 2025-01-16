import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Section from "@/components/legal/section";

export const metadata: Metadata = {
  title: "Terms of Use — darko mode",
  description:
    "Terms of use for darko mode - A free, open-source browser extension provided as-is.",
};

export default function TermsPage() {
  const lastUpdated = "November 20, 2025";

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
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
            Terms of Use
          </h1>
          <p className="mt-4 text-slate-800 dark:text-slate-200 leading-7 sm:leading-8">
            Last updated: {lastUpdated}
          </p>
        </header>

        <main className="max-w-3xl mx-auto">
          <Section title="Acceptance of terms">
            <p className="text-slate-800 dark:text-slate-200">
              By installing or using darko mode, you agree to be bound by these
              Terms of Use. If you don't agree to these terms, please don't use
              the extension.
            </p>
          </Section>

          <Section title="Description of service">
            <p className="text-slate-800 dark:text-slate-200">
              darko mode is a free, open-source personal project that helps you
              toggle dark mode and light mode on websites you visit. The
              extension applies visual filters (brightness, contrast,
              saturation, sepia, grayscale) to modify the appearance of web
              pages. Your theme preferences and filter settings are stored
              locally in your browser's extension storage and may sync across
              your own devices if your browser's sync is enabled. The service is
              provided "as is" and "as available" at no cost. We reserve the
              right to modify, suspend, or discontinue the extension at any time
              without notice.
            </p>
          </Section>

          <Section title="No warranties">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              TO THE FULLEST EXTENT PERMITTED BY LAW, darko mode IS PROVIDED "AS
              IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>
                Warranties of merchantability, fitness for a particular purpose,
                or non-infringement
              </li>
              <li>
                Warranties regarding the accuracy, reliability, or availability
                of the extension
              </li>
              <li>
                Warranties that the extension will work correctly on all
                websites or in all browsers
              </li>
              <li>
                Warranties that visual modifications won't interfere with website
                functionality or accessibility
              </li>
              <li>
                Warranties that the extension will be uninterrupted, secure, or
                error-free
              </li>
            </ul>
            <p className="text-slate-800 dark:text-slate-200 mt-3">
              Visual modifications applied by the extension may affect how
              websites look and function. Some websites may not display correctly
              with certain filter settings, and the extension may interfere with
              websites that have their own dark mode implementations or complex
              styling. We make no guarantees about compatibility with any
              particular website or browser.
            </p>
          </Section>

          <Section title="Use at your own risk">
            <p className="text-slate-800 dark:text-slate-200">
              darko mode modifies the visual appearance of websites you visit by
              applying CSS filters and color adjustments. You're solely
              responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200 mt-3">
              <li>
                Verifying that websites display correctly after applying visual
                modifications
              </li>
              <li>
                Ensuring that visual modifications don't interfere with your
                ability to read content, interact with forms, or use website
                features
              </li>
              <li>
                Adjusting or disabling the extension if it causes issues with
                specific websites
              </li>
              <li>
                Understanding that some websites may not work correctly with
                certain filter settings
              </li>
            </ul>
            <p className="text-slate-800 dark:text-slate-200 mt-3">
              The extension requires broad permissions to modify websites you
              visit. While we've designed darko mode to only apply visual
              styling and not collect or transmit data, you should review the
              extension's permissions and source code before installing. You can
              limit where the extension runs using your browser's site access
              controls.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR
              OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>Your use or inability to use darko mode</li>
              <li>
                Visual modifications that make websites unreadable, unusable, or
                inaccessible
              </li>
              <li>
                Interference with website functionality, forms, or interactive
                elements
              </li>
              <li>
                Issues with specific websites that don't work correctly with the
                extension
              </li>
              <li>
                Any errors, bugs, or malfunctions in the extension
              </li>
              <li>
                Any unauthorized access to or use of our servers (though we don't
                operate servers that receive your data)
              </li>
              <li>
                Any interruption or cessation of the extension's functionality
              </li>
            </ul>
            <p className="text-slate-800 dark:text-slate-200 mt-3">
              Our total liability for any claims arising from your use of Darko
              Mode shall not exceed zero dollars ($0.00), as the extension is
              provided free of charge.
            </p>
          </Section>

          <Section title="Indemnification">
            <p className="text-slate-800 dark:text-slate-200">
              You agree to indemnify, defend, and hold harmless darko mode and
              its operators from any claims, damages, losses, liabilities, and
              expenses (including legal fees) arising from your use of the
              extension or your violation of these Terms of Use.
            </p>
          </Section>

          <Section title="Extension availability">
            <p className="text-slate-800 dark:text-slate-200">
              We don't guarantee that darko mode will always be available,
              uninterrupted, or error-free. The extension may be unavailable due
              to browser updates, extension store policies, maintenance,
              technical issues, or other reasons beyond our control. We're not
              responsible for any losses or damages resulting from extension
              unavailability or removal from extension stores.
            </p>
          </Section>

          <Section title="Open source license">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              darko mode is open-source software. The source code is publicly
              available and licensed under the MIT License, which means:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>
                You're free to use, copy, modify, and distribute the code
              </li>
              <li>You can use it for personal or commercial purposes</li>
              <li>
                You can review the source code to understand how it works
              </li>
              <li>The code is provided "as is" without any warranties</li>
            </ul>
            <p className="text-slate-800 dark:text-slate-200 mt-3">
              The complete license terms are available in the{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 dark:text-slate-100 underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                source code repository
              </a>
              .
            </p>
          </Section>

          <Section title="Intellectual property">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              The darko mode extension, its design, code, and content are
              available under the MIT License. This means you have broad rights
              to use, modify, and distribute the code, subject to the license
              terms.
            </p>
            <p className="text-slate-800 dark:text-slate-200">
              When using darko mode, you may not remove copyright notices or
              license information from the code. If you create derivative works
              based on darko mode, you should include appropriate attribution
              and license information.
            </p>
          </Section>

          <Section title="Prohibited uses">
            <p className="text-slate-800 dark:text-slate-200 mb-3">
              You agree not to use darko mode:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 dark:text-slate-200">
              <li>
                In any way that violates any applicable law, regulation, or
                third-party right
              </li>
              <li>
                To engage in any illegal, fraudulent, or harmful activity
              </li>
              <li>
                To modify websites in ways that violate website terms of service
                or interfere with website security
              </li>
              <li>
                To attempt to gain unauthorized access to websites or systems
              </li>
              <li>
                To reverse engineer, decompile, or disassemble the extension for
                malicious purposes
              </li>
              <li>To infringe on intellectual property rights of others</li>
            </ul>
          </Section>

          <Section title="Termination">
            <p className="text-slate-800 dark:text-slate-200">
              We reserve the right to suspend or terminate your access to Darko
              Mode at any time, with or without cause or notice, for any reason,
              including if you violate these Terms of Use. We may also modify or
              discontinue the extension at any time without notice. You can
              uninstall the extension at any time through your browser's
              extension management settings.
            </p>
          </Section>

          <Section title="Changes to terms">
            <p className="text-slate-800 dark:text-slate-200">
              We may update these Terms of Use at any time. When we do, we'll
              update the "Last updated" date at the top of this page. Since we
              don't collect contact information, we can't notify you directly of
              changes, but you can check this page anytime to see the current
              terms. Your continued use of darko mode after any changes means
              you accept the updated terms. If you don't agree to the changes,
              you should stop using the extension and uninstall it.
            </p>
          </Section>

          <Section title="Governing law">
            <p className="text-slate-800 dark:text-slate-200">
              These Terms of Use shall be governed by and construed in
              accordance with applicable law, without regard to conflict of law
              provisions.
            </p>
          </Section>

          <Section title="Severability">
            <p className="text-slate-800 dark:text-slate-200">
              If any provision of these Terms of Use is found to be invalid,
              illegal, or unenforceable, the remaining provisions shall continue
              in full force and effect.
            </p>
          </Section>

          <Section title="Entire agreement">
            <p className="text-slate-800 dark:text-slate-200">
              These Terms of Use, together with our{" "}
              <Link
                href="/privacy"
                className="text-slate-900 dark:text-slate-100 underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and darko mode
              regarding your use of the extension.
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
              to understand how it works. For privacy information, see our{" "}
              <Link
                href="/privacy"
                className="text-slate-900 dark:text-slate-100 underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Privacy Policy
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

