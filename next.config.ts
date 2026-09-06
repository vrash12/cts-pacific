import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const documentCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, s-maxage=0, must-revalidate",
  },
];

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    qualities: [75, 88],
    deviceSizes: [640, 768, 960, 1280, 1600, 1920],
    imageSizes: [256, 384],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Only content-hashed image URLs are immutable. Replacing a source
        // generates a new URL at build time, so revised photos appear immediately.
        source: "/images/delivery/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Hashed Next.js assets stay immutable, while documents must be
        // revalidated so a CDN cannot serve HTML that references deleted
        // chunks from an earlier deployment.
        source:
          "/:path((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)",
        headers: documentCacheHeaders,
      },
    ];
  },
};

export default nextConfig;
