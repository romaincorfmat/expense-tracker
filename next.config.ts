import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Helps with mobile rendering
    scrollRestoration: true,
  },
};

export default nextConfig;
