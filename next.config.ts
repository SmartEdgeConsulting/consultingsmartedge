import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
