import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://darkomode.com"
  ),
  title: "darko mode - Dark mode browser extension",
  description:
    "Toggle dark mode and light mode on any website. Customize brightness, contrast, and more with darko mode.",
  keywords: [
    "dark mode",
    "browser extension",
    "dark theme",
    "accessibility",
    "eye strain",
    "chrome extension",
    "firefox extension",
  ],
  authors: [{ name: "darko mode" }],
  creator: "darko mode",
  publisher: "darko mode",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "darko mode",
    title: "darko mode - Dark mode for every website",
    description:
      "Browser extension that toggles dark mode on any site. Adjust brightness, contrast, and filters to suit your eyes. Simple, fast, and free.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "darko mode - Dark mode for every website",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "darko mode - Dark mode for every website",
    description:
      "Browser extension that toggles dark mode on any site. Adjust brightness, contrast, and filters to suit your eyes. Simple, fast, and free.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "darko mode - Dark mode for every website",
      },
    ],
    creator: "@darkomode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-50`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Always start in dark mode - ignore localStorage
                document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
