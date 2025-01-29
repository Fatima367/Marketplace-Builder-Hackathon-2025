import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
 
};

export default nextConfig;