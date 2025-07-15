import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    }
  },
  images: {
    remotePatterns: [new URL("http://localhost:3000/**"), new URL("https://ywrqxzytqjkrgnzikkwr.supabase.co/storage/**")],
  }
};

export default nextConfig;
