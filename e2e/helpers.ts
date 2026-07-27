import type { Page } from "@playwright/test";

export const STICKY_BAR = ".sticky-cta";
export const STICKY_PILL = `${STICKY_BAR} a`;
export const INLINE_BADGE = "[data-appstore-cta]";

/** Scroll to an absolute offset and let the rAF-throttled listener settle. */
export async function scrollTo(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await settle(page);
}

export async function scrollToBottom(page: Page) {
  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })
  );
  await settle(page);
}

/**
 * Wait out the show/hide transition. The bar animates for 280ms; the extra
 * margin covers the rAF hop the scroll listener adds on top of it.
 */
export async function settle(page: Page) {
  await page.waitForTimeout(500);
}

/**
 * Current opacity of the sticky bar, or `null` when it is not in the DOM.
 * Reading opacity rather than presence lets tests catch a bar that is
 * flickering mid-animation, which a plain visible/hidden check would miss.
 */
export async function barOpacity(page: Page): Promise<number | null> {
  return page.evaluate((selector) => {
    const bar = document.querySelector(selector);
    if (!bar) return null;
    return Number(getComputedStyle(bar).opacity);
  }, STICKY_BAR);
}

/**
 * Drive a jittery scroll across `center` and sample the bar's opacity after
 * each step, all inside one evaluate so the timing matches a real finger
 * wobbling on the threshold rather than Playwright's round-trip latency.
 */
export async function sampleAcross(
  page: Page,
  center: number,
  { amplitude = 8, steps = 6, stepMs = 80 } = {}
): Promise<Array<number | null>> {
  return page.evaluate(
    async ({ selector, center, amplitude, steps, stepMs }) => {
      const read = () => {
        const bar = document.querySelector(selector);
        return bar ? Number(getComputedStyle(bar).opacity) : null;
      };

      const samples: Array<number | null> = [];
      for (let i = 0; i < steps; i++) {
        const offset = i % 2 === 0 ? amplitude : -amplitude;
        window.scrollTo({ top: center + offset, behavior: "instant" });
        await new Promise((resolve) => setTimeout(resolve, stepMs));
        samples.push(read());
      }
      return samples;
    },
    { selector: STICKY_BAR, center, amplitude, steps, stepMs }
  );
}

/** Bounding box of the lowest piece of real content in the site footer. */
export async function lastFooterLineBottom(page: Page): Promise<number> {
  return page.evaluate(() => {
    const footer = document.querySelectorAll("footer");
    const site = footer[footer.length - 1];
    const spans = Array.from(site.querySelectorAll("span"));
    return Math.max(...spans.map((span) => span.getBoundingClientRect().bottom));
  });
}
