import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Serve images as-is (no server-side optimization) so the deploy doesn't
    // depend on the native `sharp` binary — avoids OS-mismatch on cPanel/Linux.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
