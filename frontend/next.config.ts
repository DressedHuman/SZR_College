import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.1.104:3000", "localhost:3000"]
    }
  },
  outputFileTracingRoot: path.join(__dirname, "../"),
};

export default nextConfig;
