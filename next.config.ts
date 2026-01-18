import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 100],
  },

  async headers() {
    return [
      {
        // Apply only to robots.txt
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'none'; connect-src 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
