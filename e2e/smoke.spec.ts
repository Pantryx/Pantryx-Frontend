import { expect, test, type Page } from "@playwright/test";

const PAGES = [
  { path: "/", heading: /Stop staring at the fridge/i, title: /Pantryx/ },
  { path: "/help", heading: /.+/, title: /Pantryx/ },
  { path: "/privacy", heading: /privacy/i, title: /Privacy Policy/ },
  { path: "/terms", heading: /terms/i, title: /Terms of Use/ },
];

/** Collect page errors and console errors for the lifetime of a test. */
function watchForErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  return errors;
}

test.describe("pages render", () => {
  for (const { path, heading, title } of PAGES) {
    test(`${path} loads cleanly`, async ({ page }) => {
      const errors = watchForErrors(page);

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      await expect(page.getByRole("heading").first()).toHaveText(heading);
      await expect(page.locator("footer").last()).toBeVisible();

      expect(errors, `console/page errors on ${path}`).toEqual([]);
    });
  }
});

test.describe("navigation", () => {
  test("footer links reach every route", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer").last();

    for (const [name, url] of [
      ["Help", /\/help$/],
      ["Privacy Policy", /\/privacy$/],
      ["Terms of Use", /\/terms$/],
    ] as const) {
      await page.goto("/");
      await footer.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(url);
    }
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the hamburger only exists below md");

    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();

    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(page.locator("body")).toHaveAttribute("data-menu-open", "true");

    await menu.getByRole("link", { name: "Help", exact: true }).click();
    await expect(page).toHaveURL(/\/help$/);
    await expect(menu).toBeHidden();
    await expect(page.locator("body")).not.toHaveAttribute("data-menu-open", "true");
  });

  test("Escape closes the mobile menu", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the hamburger only exists below md");

    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  });

  test("desktop nav exposes the legal dropdown", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop-only nav");

    await page.goto("/");
    // The dropdown opens on hover; clicking the trigger would toggle it shut
    // again, because the pointer has already fired onMouseEnter.
    await page.getByRole("button", { name: "Legal" }).hover();
    await page.getByRole("menuitem", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL(/\/privacy$/);
  });

  test("skip link is reachable by keyboard and targets main", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "keyboard affordance is a desktop concern");

    await page.goto("/");
    await page.keyboard.press("Tab");

    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main");
    await expect(page.locator("#main")).toBeVisible();
  });
});

test.describe("theme", () => {
  test("toggle cycles and the choice survives a reload", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /^Theme:/ });
    await expect(toggle).toBeVisible();

    // system -> light -> dark
    await toggle.click();
    await expect(toggle).toHaveAccessibleName(/Light mode/);
    await toggle.click();
    await expect(toggle).toHaveAccessibleName(/Dark mode/);
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByRole("button", { name: /^Theme:/ })).toHaveAccessibleName(/Dark mode/);
  });

  test("the pre-hydration script applies the stored theme without a flash", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("pantryx-theme", "dark"));

    await page.goto("/privacy");
    // Asserted before any interaction: the inline script in layout.tsx must have
    // set this during document parse, not after React hydrates.
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

test.describe("SEO surfaces", () => {
  test("robots.txt and sitemap.xml are served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<urlset");
  });
});
