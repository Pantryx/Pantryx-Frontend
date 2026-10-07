import { expect, test, type Page } from "@playwright/test";
import { STICKY_BAR, scrollTo } from "./helpers";

const HTML = { Accept: "text/html,application/xhtml+xml" };
const COOKIE = "pantryx-locale";

/** Collect page errors and console errors for the lifetime of a test. */
function watchForErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  return errors;
}

async function localeCookie(page: Page) {
  return (await page.context().cookies()).find((cookie) => cookie.name === COOKIE)?.value;
}

/** Opens the language menu on desktop, or the mobile menu on phones, and picks a language. */
async function chooseLanguage(page: Page, isMobile: boolean, language: "English" | "Українська") {
  if (isMobile) {
    await page.locator("header button[aria-expanded]").last().click();
    await page.getByRole("dialog").getByRole("link", { name: language }).click();
  } else {
    await page.getByRole("button", { name: /^(Language|Мова):/ }).hover();
    await page.getByRole("menuitemradio", { name: language }).click();
  }
}

test.describe("Ukrainian pages", () => {
  const PAGES = [
    { path: "/uk", heading: /Годі стояти біля холодильника/, title: /Pantryx/ },
    { path: "/uk/product", heading: /Як проходить сканування|Ваша кухня/, title: /Застосунок · Pantryx/ },
    { path: "/uk/help", heading: /Чим можемо допомогти/, title: /Допомога/ },
    { path: "/uk/meal-planner", heading: /Що на вечерю/, title: /План харчування/ },
    { path: "/uk/privacy", heading: /Політика конфіденційності/, title: /Політика конфіденційності/ },
    { path: "/uk/terms", heading: /Умови використання/, title: /Умови використання/ },
  ];

  for (const { path, heading, title } of PAGES) {
    test(`${path} loads cleanly in Ukrainian`, async ({ page }) => {
      const errors = watchForErrors(page);

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "uk");
      await expect(page).toHaveTitle(title);
      // The product page opens with an h2 (as in English), so take the first heading.
      await expect(page.getByRole("heading").first()).toHaveText(heading);

      expect(errors, `console/page errors on ${path}`).toEqual([]);
    });
  }

  test("English pages keep lang=en and never download the Cyrillic display face", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    // The switcher's «Українська» pulls in Inter's small Cyrillic file; the
    // display serif is the one that must stay off English pages.
    const displayCyrillic = await page.evaluate(() =>
      [...document.fonts].filter((face) => face.family === "displayCyrillic").map((face) => face.status)
    );
    expect(displayCyrillic).toEqual(["unloaded"]);
  });

  test("the Cyrillic display face loads on Ukrainian pages", async ({ page }) => {
    await page.goto("/uk");
    await page.waitForLoadState("networkidle");
    const displayCyrillic = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].filter((face) => face.family === "displayCyrillic").map((face) => face.status);
    });
    expect(displayCyrillic).toEqual(["loaded"]);
  });

  test("hides the placeholder testimonials", async ({ page }) => {
    await page.goto("/uk");
    await expect(page.locator('[aria-roledescription="carousel"]')).toHaveCount(0);
  });

  test("an unknown Ukrainian URL gets the Ukrainian 404", async ({ page }) => {
    const response = await page.goto("/uk/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Такої сторінки немає" })).toBeVisible();
  });

  test("a broken shared recipe link gets the Ukrainian recipe 404", async ({ page }) => {
    const response = await page.goto("/uk/recipes/not-a-number");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Цей рецепт недоступний" })).toBeVisible();
  });

  test("legal pages say the English text prevails and link to it", async ({ page }) => {
    await page.goto("/uk/privacy");
    const original = page.getByRole("link", { name: "Читати англійською" });
    await expect(original).toHaveAttribute("href", "/privacy");
    await expect(original).toHaveAttribute("hreflang", "en");
  });

  test("internal links stay in Ukrainian", async ({ page }) => {
    await page.goto("/uk");
    const footer = page.locator("footer").last();
    await footer.getByRole("link", { name: "Допомога", exact: true }).click();
    await expect(page).toHaveURL(/\/uk\/help$/);
  });
});

test.describe("language switcher", () => {
  test("switches to Ukrainian and back, remembering the choice", async ({ page, isMobile }) => {
    await page.goto("/help");
    await chooseLanguage(page, isMobile, "Українська");
    await expect(page).toHaveURL(/\/uk\/help$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "uk");
    expect(await localeCookie(page)).toBe("uk");

    // The cookie now outranks an English browser on the next visit.
    await page.goto("/");
    await expect(page).toHaveURL(/\/uk$/);

    await chooseLanguage(page, isMobile, "English");
    await expect(page).toHaveURL(/127\.0\.0\.1:\d+\/$/);
    expect(await localeCookie(page)).toBe("en");
  });

  test("keeps the query string and the section anchor", async ({ page, isMobile }) => {
    await page.goto("/privacy?ref=test#data-retention");
    await chooseLanguage(page, isMobile, "Українська");
    await expect(page).toHaveURL(/\/uk\/privacy\?ref=test#data-retention$/);
  });

  test("is a set of real links search engines can follow", async ({ page }) => {
    await page.goto("/product");
    await expect(page.locator('a[hreflang="uk"][href="/uk/product"]').first()).toBeAttached();
    await page.goto("/uk/product");
    await expect(page.locator('a[hreflang="en"][href="/product"]').first()).toBeAttached();
  });
});

test.describe("first visit from a Ukrainian browser", () => {
  test.use({ locale: "uk-UA" });

  test("lands on the Ukrainian site", async ({ page }) => {
    await page.goto("/help");
    await expect(page).toHaveURL(/\/uk\/help$/);
  });

  test("stays on English once English was chosen", async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: COOKIE, value: "en", url: baseURL! }]);
    await page.goto("/help");
    await expect(page).toHaveURL(/127\.0\.0\.1:\d+\/help$/);
  });
});

test.describe("locale routing", () => {
  test.skip(({ isMobile }) => !!isMobile, "request-level checks run once");

  test("/en URLs redirect permanently to the unprefixed address", async ({ request }) => {
    for (const [from, to] of [
      ["/en", "/"],
      ["/en/product", "/product"],
      ["/en/help?ref=x", "/help?ref=x"],
    ]) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status(), from).toBe(308);
      const location = new URL(response.headers()["location"]!, "http://localhost");
      expect(location.pathname + location.search, from).toBe(to);
    }
  });

  test("detection redirects a Ukrainian browser's first request, uncached", async ({ request }) => {
    const response = await request.get("/", { headers: { ...HTML, "Accept-Language": "uk-UA,uk;q=0.9,en;q=0.8" }, maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toMatch(/\/uk$/);
    expect(response.headers()["cache-control"]).toContain("no-store");
  });

  test("detection never touches navigation inside the site", async ({ request }) => {
    const sameOrigin = await request.get("/help", {
      headers: { ...HTML, "Accept-Language": "uk", "Sec-Fetch-Site": "same-origin" },
      maxRedirects: 0,
    });
    expect(sameOrigin.status()).toBe(200);

    const routerFetch = await request.get("/help", { headers: { Accept: "*/*", "Accept-Language": "uk" }, maxRedirects: 0 });
    expect(routerFetch.status()).toBe(200);
  });

  test("an unknown English URL gets the branded 404", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "This page doesn't exist" })).toBeVisible();
  });
});

test.describe("SEO", () => {
  test.skip(({ isMobile }) => !!isMobile, "request-level checks run once");

  test("pages declare their canonical URL and hreflang alternates", async ({ page }) => {
    await page.goto("/product");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pantryx.org/product");
    await expect(page.locator('link[rel="alternate"][hreflang="uk"]')).toHaveAttribute("href", "https://pantryx.org/uk/product");
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", "https://pantryx.org/product");
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");

    await page.goto("/uk/product");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://pantryx.org/uk/product");
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://pantryx.org/product");
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "uk_UA");
  });

  test("every page's social card image is served", async ({ page, request }) => {
    for (const path of ["/", "/product", "/help", "/meal-planner", "/privacy", "/terms", "/uk", "/uk/product", "/uk/meal-planner"]) {
      await page.goto(path);
      const image = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      expect(image, `${path} has an og:image`).toBeTruthy();
      const response = await request.get(new URL(image!).pathname);
      expect(response.status(), image!).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
    }
  });

  test("the sitemap lists both languages with alternates", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toContain("<loc>https://pantryx.org/uk/product</loc>");
    expect(body).toContain('hreflang="uk" href="https://pantryx.org/uk/product"');
    expect(body).toContain('hreflang="x-default" href="https://pantryx.org/product"');
  });
});

test.describe("sticky CTA on Ukrainian recipe pages", () => {
  test.skip(({ isMobile }) => !isMobile, "the bar only renders below the md breakpoint");

  test("stays off a shared recipe page, as in English", async ({ page }) => {
    for (const [path, expected] of [
      ["/uk/help", 1],
      ["/uk/recipes/not-a-number", 0],
    ] as const) {
      await page.goto(path);
      await page.evaluate(() => {
        document.body.style.minHeight = "4000px";
        document.querySelectorAll("[data-inline-cta]").forEach((element) => element.remove());
      });
      await scrollTo(page, 2600);
      await expect(page.locator(STICKY_BAR), path).toHaveCount(expected);
    }
  });
});
