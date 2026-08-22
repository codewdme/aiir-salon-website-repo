import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        port: "",
        pathname: "/images/**",
      },
      // Added for SocialMediaCard's stock placeholder image (you approved
      // using a stock photo since no real Instagram photo exists in
      // Framer's data yet) — swap/remove once real photos are in place.
      // NOTE: no `search` field here — Unsplash URLs carry a query string
      // (`?w=600&q=80`), and Next's remotePatterns treats an explicit
      // `search: ""` as "must have NO query string," which was silently
      // rejecting this exact image. Omitting `search` allows any query.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
