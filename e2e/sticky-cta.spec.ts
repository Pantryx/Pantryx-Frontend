import { expect, test } from "@playwright/test";
import {
  INLINE_CTA,
  STICKY_BAR,
  STICKY_PILL,
  barOpacity,
  lastFooterLineBottom,
  sampleAcross,
  scrollTo,
  scrollToBottom,
  settle,
} from "./helpers";

// The gate lives in lib/hooks/useStickyCtaVisibility.ts. Kept in sync by hand:
// if those constants move, these tests should fail loudly.
const SHOW_AT_Y = 560;
const HIDE_AT_Y = 360;

test.describe("sticky mobile CTA", () => {
  test.skip(({ isMobile }) => !isMobile, "the bar only renders below the md breakpoint");

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("is hidden at the top of the page", async ({ page }) => {
    await settle(page);
    await expect(page.locator(STICKY_BAR)).toBeHidden();
  });

  test("stays hidden while the hero badge is still on screen", async ({ page }) => {
    const hero = page.locator(INLINE_CTA).first();
    await expect(hero).toBeInViewport();

    await scrollTo(page, SHOW_AT_Y - 100);
    await expect(page.locator(STICKY_BAR)).toBeHidden();
  });

  test("appears once past the gate with no inline badge in view", async ({ page }) => {
    await scrollTo(page, SHOW_AT_Y + 200);
    await expect(page.locator(STICKY_BAR)).toBeVisible();
    // The label depends on whether site.testFlightUrl is configured — join the
    // beta when it is, get notified when it isn't. Both are the same CTA.
    await expect(page.locator(STICKY_PILL)).toHaveAccessibleName(/Pantryx beta/);
  });

  // Regression: the bar used to key off a single `scrollY > 500` threshold, so
  // a few pixels of finger jitter or iOS momentum bounce made it slide in and
  // out repeatedly. The hysteresis band must absorb that entirely.
  test("does not flicker when scroll jitters across the old threshold", async ({ page }) => {
    await scrollTo(page, 900);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    const samples = await sampleAcross(page, 500, { amplitude: 8, steps: 6 });

    expect(samples).toHaveLength(6);
    for (const opacity of samples) {
      expect(opacity, `bar dropped out mid-wobble: ${JSON.stringify(samples)}`).not.toBeNull();
      expect(opacity!, `bar faded mid-wobble: ${JSON.stringify(samples)}`).toBeGreaterThan(0.95);
    }
  });

  test("does not flicker when scroll jitters across the hide gate", async ({ page }) => {
    await scrollTo(page, 900);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    // Dipping below HIDE_AT_Y and back must not produce a second entry
    // animation — once it starts leaving, it leaves.
    const samples = await sampleAcross(page, HIDE_AT_Y, { amplitude: 8, steps: 6 });
    const defined = samples.filter((value): value is number => value !== null);

    for (let i = 1; i < defined.length; i++) {
      expect(
        defined[i],
        `bar re-entered while dismissing: ${JSON.stringify(samples)}`
      ).toBeLessThanOrEqual(defined[i - 1] + 0.01);
    }
  });

  test("hides again when an inline beta CTA scrolls into view", async ({ page }) => {
    await scrollTo(page, 1400);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    await page.locator(INLINE_CTA).last().scrollIntoViewIfNeeded();
    await settle(page);

    await expect(page.locator(STICKY_BAR)).toBeHidden();
  });

  test("is gone while the final CTA is on screen", async ({ page }) => {
    await scrollTo(page, 1400);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    await page.locator(INLINE_CTA).last().scrollIntoViewIfNeeded();
    await settle(page);

    await expect(page.locator(INLINE_CTA).last()).toBeInViewport();
    await expect(page.locator(STICKY_BAR)).toBeHidden();
  });

  // Whether the bar is up at the very bottom depends on viewport height — on a
  // short screen the footer alone fills it and the final CTA is already past.
  // What must hold everywhere is that the bar never sits on footer content.
  for (const path of ["/", "/privacy", "/terms", "/help"]) {
    test(`never covers footer content at the bottom of ${path}`, async ({ page }) => {
      await page.goto(path);
      await scrollToBottom(page);

      const pill = await page.locator(STICKY_PILL).boundingBox();
      test.skip(pill === null, "bar not shown on this route/viewport — nothing to overlap");

      const footerBottom = await lastFooterLineBottom(page);
      expect(
        footerBottom,
        `sticky pill overlaps the last footer line on ${path} — .cta-clearance is too small`
      ).toBeLessThanOrEqual(pill!.y);
    });
  }

  test("keeps a comfortable gap above the viewport edge", async ({ page }) => {
    await scrollTo(page, 2600);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    const gap = await page.evaluate((selector) => {
      const pill = document.querySelector(selector)!.getBoundingClientRect();
      return window.innerHeight - pill.bottom;
    }, STICKY_PILL);

    // iOS Safari reports a 0 safe-area inset while its bottom toolbar is up;
    // the max() floor in .safe-bottom has to hold the pill off the edge anyway.
    expect(gap).toBeGreaterThanOrEqual(24);
  });

  test("leaves while the mobile menu is open and comes back after", async ({ page }) => {
    await scrollTo(page, 2600);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator(STICKY_BAR)).toBeHidden();
    // display:none also drops it out of the tab order, which z-index alone would not.
    await expect(page.locator(STICKY_PILL)).toBeHidden();

    await page.getByRole("button", { name: "Close menu" }).click();
    await settle(page);
    await expect(page.locator(STICKY_BAR)).toBeVisible();
  });

  test("re-evaluates after client-side navigation", async ({ page }) => {
    await scrollTo(page, 2600);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("dialog", { name: "Menu" })
      .getByRole("link", { name: "Terms of Use" })
      .click();
    await expect(page).toHaveURL(/\/terms$/);

    // New route, no inline badges: the bar must re-arm rather than go stale.
    await scrollTo(page, 1200);
    await expect(page.locator(STICKY_BAR)).toBeVisible();
  });

  test("does not eat taps aimed at the page behind the scrim", async ({ page }) => {
    await scrollTo(page, 2600);
    await expect(page.locator(STICKY_BAR)).toBeVisible();

    const hitsBar = await page.evaluate((selector) => {
      const bar = document.querySelector(selector)!.getBoundingClientRect();
      // A point in the transparent upper third of the scrim, well above the pill.
      const target = document.elementFromPoint(bar.x + bar.width / 2, bar.y + 6);
      return target?.closest(selector) !== null;
    }, STICKY_BAR);

    expect(hitsBar, "the transparent scrim is intercepting pointer events").toBe(false);
  });
});

test.describe("sticky mobile CTA on desktop", () => {
  test.skip(({ isMobile }) => !!isMobile, "desktop-only assertion");

  test("never renders above the md breakpoint", async ({ page }) => {
    await page.goto("/");
    await scrollTo(page, SHOW_AT_Y + 400);
    await expect(page.locator(STICKY_BAR)).toBeHidden();
  });
});
