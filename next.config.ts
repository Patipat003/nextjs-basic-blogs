import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gamespot.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gizmodo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kotaku.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ign.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hypebeast.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "slashfilm.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "animenewsnetwork.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
