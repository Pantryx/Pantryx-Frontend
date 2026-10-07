import { expect, test } from "@playwright/test";

test.describe("shared recipe links", () => {
  test("apple-app-site-association claims only recipe and meal-planner paths, as JSON", async ({ request }) => {
    const response = await request.get("/.well-known/apple-app-site-association", { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");

    const association = await response.json();
    const [detail] = association.applinks.details;
    expect(detail.appIDs).toEqual([
      "826BUSUT25.com.pantryx.app",
      "826BUSUT25.com.pantryx.app.staging",
      "826BUSUT25.com.pantryx.app.dev",
    ]);
    expect(detail.components.map((component: { "/": string }) => component["/"])).toEqual(["/recipes/*", "/recipe/*", "/meal-planner"]);
  });

  test("links shared before readable URLs redirect permanently to the new path", async ({ request }) => {
    const response = await request.get("/recipe/39", { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()["location"]).toBe("/recipes/39");
  });

  for (const recipePath of ["/recipes/not-a-number", "/recipes/pasta-alla-carbonara-1000000", "/recipes/Pasta-39"]) {
    test(`${recipePath} is not found without asking the backend`, async ({ page }) => {
      const response = await page.goto(recipePath);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { name: "This recipe isn't available" })).toBeVisible();
    });
  }

  test("the link preview image is not generated for private or malformed ids", async ({ request }) => {
    for (const recipeId of ["1000000", "not-a-number"]) {
      const response = await request.get(`/api/site/recipe-preview/${recipeId}`);
      expect(response.status()).toBe(404);
    }
  });

  test("the sitemap lists the static pages even when recipes can't be fetched", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    for (const path of ["/", "/product", "/help"]) {
      expect(body).toContain(`<loc>https://pantryx.org${path}</loc>`);
    }
  });

  test("site events reject names outside the recipe funnel", async ({ request }) => {
    const response = await request.post("/api/site/events", {
      data: { event: "anything_else", distinctId: "test" },
    });
    expect(response.status()).toBe(400);
  });
});
