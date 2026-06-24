import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix 404s when multiple lockfiles exist in parent dirs (Next.js infers wrong root)
  turbopack: {
    root: path.join(__dirname),
  },
  // Resend SDK needs to run unbundled for its HTTP client to reach api.resend.com
  serverExternalPackages: ["resend"],
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon",
      },
    ];
  },
  // Redirect non-www to www for canonical URL consistency
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "idahodownpaymentprograms.com",
          },
        ],
        destination: "https://www.idahodownpaymentprograms.com/:path*",
        permanent: true,
      },
      {
        source: "/programs/ihfa-good-credit",
        destination: "/programs/idaho-heroes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
