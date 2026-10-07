import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL,
    // Pinned so the browser's Accept-Language never depends on the machine
    // running the suite: a Ukrainian-locale host would otherwise be redirected
    // to /uk on every unprefixed page.
    locale: "en-US",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "mobile",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
  ],

  // Tests run against a production build: the dev server injects HMR and
  // recompiles on first hit, which makes scroll-timing assertions flaky.
  // NEXT_DIST_DIR keeps that build off `.next`, so `npm run dev` can stay up.
  webServer: {
    command: `npm run build && npx next start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    stdout: "pipe",
    env: { NEXT_DIST_DIR: ".next-e2e" },
  },
});
