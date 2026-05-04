import type { NextConfig } from "next";

const defaultBackendUrl = "https://pantryx-9007814d1092.herokuapp.com";
const backendUrl =
  (process.env.BACKEND_URL ?? defaultBackendUrl).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${backendUrl}/api/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
