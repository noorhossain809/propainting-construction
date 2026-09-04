import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Produce a self-contained server build for self-hosting (cPanel/Node).
  // Harmless on Vercel, which handles it automatically.
  output: "standalone",
  images: {
    // When self-hosting (SELF_HOST=true at build), skip Next's image
    // optimizer so the deploy doesn't need the native `sharp` binary.
    // On Vercel (flag unset) optimization stays on for best performance.
    unoptimized: process.env.SELF_HOST === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*', 
        has: [
          {
            type: 'host',
            value: 'www.propaintconstruction.com',
          },
        ],
        destination: 'https://propaintconstruction.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
