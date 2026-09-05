import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: allow Cloudflare quick tunnels (and ngrok) to load client bundles.
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.app", "*.ngrok.app"],
};

export default nextConfig;
