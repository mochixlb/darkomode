import type { NextConfig } from "next";

// Build a secure, production-ready Content Security Policy.
// Keep it strict but compatible with Next.js App Router.
const isDev = process.env.NODE_ENV !== "production";

function createContentSecurityPolicy(): string {
  const scriptSrc = ["'self'"];
  // Allow eval only in development for Fast Refresh/HMR
  if (isDev) {
    scriptSrc.push("'unsafe-eval'");
  }

  // Note: We allow 'unsafe-inline' for styles due to Next/font and inline style tags.
  // If you later add nonces/hashes, you can remove it.
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "form-action 'self'",
  ];
  return directives.join("; ");
}

const securityHeaders: Array<{ key: string; value: string }> = [
  // Core protections
  { key: "Content-Security-Policy", value: createContentSecurityPolicy() },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HTTPS hardening (only has effect over HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Browser feature restrictions
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Cross-origin isolation/safety
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  // Networking hints
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Hide "x-powered-by: Next.js"
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
