import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production" && process.env.GITHUB_ACTIONS === "true";
const basePath = isProd ? "/925League" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
