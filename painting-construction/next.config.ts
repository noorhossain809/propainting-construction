import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
