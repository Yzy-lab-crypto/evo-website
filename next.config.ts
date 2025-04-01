import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "canvas"];
    return config;
  },
  experimental: {
    
    turbo: {
    
      resolveAlias:{
        canvas: './empty-module.ts',
      }
    }
  },
}

export default nextConfig;
