import { expect, test } from "@playwright/test";

test.describe("shared recipe links", () => {
  test("apple-app-site-association claims only recipe paths, as JSON", async ({ request }) => {
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
    expect(detail.components.map((component: { "/": string }) => component["/"])).toEqual(["/recipe/*"]);
  });

  for (const recipePath of ["/recipe/not-a-number", "/recipe/1000000"]) {
    test(`${recipePath} is not found without asking the backend`, async ({ page }) => {
      const response = await page.goto(recipePath);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { name: "This recipe isn't available" })).toBeVisible();
    });
  }

  test("site events reject names outside the recipe funnel", async ({ request }) => {
    const response = await request.post("/api/site/events", {
      data: { event: "anything_else", distinctId: "test" },
    });
    expect(response.status()).toBe(400);
  });
});
