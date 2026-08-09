import type { NextConfig } from "next";

const defaultBackendUrl = "https://pantryx-9007814d1092.herokuapp.com";
const backendUrl =
  (process.env.BACKEND_URL ?? defaultBackendUrl).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Playwright sets this so its production build doesn't overwrite the `.next`
  // directory a running `npm run dev` is serving from — the two clobber each
  // other's chunks and the build fails.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  async rewrites() {
    return {
      beforeFiles: [
        {
          // Everything under /api goes to the backend except /api/site/*, which
          // is this site's own route handlers (the waitlist). `beforeFiles` runs
          // ahead of the filesystem, so without the carve-out the proxy would
          // swallow them.
          source: "/api/:path((?!site/).*)",
          destination: `${backendUrl}/api/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
