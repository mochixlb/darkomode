import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://darkomode.com'),
  title: "Darko Mode - The Ultimate Dark Mode Extension",
  description: "Toggle dark mode and light mode on any website. Customize brightness, contrast, and more with Darko Mode.",
  keywords: ["dark mode", "browser extension", "dark theme", "accessibility", "eye strain", "chrome extension", "firefox extension", "safari extension"],
  authors: [{ name: "Darko Mode" }],
  creator: "Darko Mode",
  publisher: "Darko Mode",
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
    siteName: "Darko Mode",
    title: "Darko Mode - Dark mode for every website",
    description: "Instantly toggle dark mode on any site. Adjust brightness, contrast, and filters to suit your eyes. Simple, fast, and free.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Darko Mode - Dark mode for every website",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darko Mode - Dark mode for every website",
    description: "Instantly toggle dark mode on any site. Adjust brightness, contrast, and filters to suit your eyes. Simple, fast, and free.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Darko Mode - Dark mode for every website",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
