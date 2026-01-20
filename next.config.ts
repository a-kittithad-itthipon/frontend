import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // enable this for build container image only
  allowedDevOrigins: ["192.168.100.20"],
};

export default nextConfig;
