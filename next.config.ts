import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gamespot.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gizmodo.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kotaku.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ign.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hypebeast.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "slashfilm.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "animenewsnetwork.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
