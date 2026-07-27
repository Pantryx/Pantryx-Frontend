import { expect, test, type Page } from "@playwright/test";

const WORD = ".anime-word";
const STATS = "ul li .tabular-nums";
const RAIL = "[data-rail]";

/**
 * Wait for a condition rather than a fixed delay — these are entrance
 * animations, so anything time-based here would be a flake waiting to happen.
 * Every assertion below describes a settled state, never a frame mid-flight.
 */
async function settles(page: Page, fn: string, timeout = 6000) {
  await page.waitForFunction(fn, undefined, { timeout });
}

test.describe("hero entrance", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("the headline splits into words and every one settles visible", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    await settles(
      page,
      `(() => {
        const w = document.querySelectorAll('h1 ${WORD}');
        return w.length > 0 && [...w].every(x => getComputedStyle(x).opacity === '1');
      })()`
    );

    const state = await page.evaluate(() => {
      const el = document.querySelector("h1")!;
      const words = Array.from(el.querySelectorAll<HTMLElement>(".anime-word"));
      return {
        count: words.length,
        nested: el.querySelectorAll(".anime-word .anime-word").length,
        // Compare the resolved offset, not the matrix string: a finished tween
        // can land on a sub-pixel residue like translateY(0.0006px).
        offsets: words.map((w) => {
          const t = getComputedStyle(w).transform;
          return t === "none" ? 0 : new DOMMatrixReadOnly(t).f;
        }),
        opacity: getComputedStyle(el).opacity,
      };
    });

    expect(state.count).toBeGreaterThan(1);
    // A nested word span means the split ran twice over the same text and the
    // clause inside <span class="italic"> is animating on top of itself.
    expect(state.nested, "words were split more than once").toBe(0);
    expect(state.opacity).toBe("1");
    for (const offset of state.offsets) {
      expect(Math.abs(offset), "a word did not return to its resting place").toBeLessThan(0.5);
    }
  });

  test("splitting preserves the headline text exactly", async ({ page }) => {
    await settles(page, `document.querySelectorAll('h1 ${WORD}').length > 0`);

    // The split must not drop, duplicate or substitute characters — swapping
    // spaces for U+00A0 or injecting a screen-reader copy would both show up here.
    const text = await page.locator("h1").textContent();
    expect(text?.replace(/ /g, " ")).toBe(
      "Stop staring at the fridge.Decide dinner in 60 seconds."
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Stop staring at the fridge/
    );
  });

  test("stat counters reach their final values", async ({ page }) => {
    const stats = page.locator(STATS);
    await expect(stats).toHaveCount(3);
    // The third is the no-op guard: counting up to "0" is skipped entirely.
    await expect(stats).toHaveText(["30%", "60s", "0"], { timeout: 6000 });
  });
});

test.describe("section headings", () => {
  test("every h2 on the home page splits and settles, text intact", async ({ page }) => {
    await page.goto("/");

    const headings = page.locator("h2");
    const count = await headings.count();
    expect(count).toBeGreaterThan(5);

    for (let i = 0; i < count; i++) {
      const heading = headings.nth(i);
      const before = (await heading.textContent()) ?? "";

      await heading.scrollIntoViewIfNeeded();
      await settles(
        page,
        `(() => {
          const h = document.querySelectorAll('h2')[${i}];
          const w = h.querySelectorAll('${WORD}');
          return w.length > 0 && [...w].every(x => getComputedStyle(x).opacity === '1');
        })()`
      );

      expect(await heading.textContent(), `heading ${i} text changed`).toBe(before);
      expect(
        await heading.locator(`${WORD} ${WORD}`).count(),
        `heading ${i} was split twice`
      ).toBe(0);
    }
  });
});

test.describe("comparison checkmarks", () => {
  test("only the six Pantryx marks are wired to draw", async ({ page, isMobile }) => {
    await page.goto("/");
    const variant = isMobile ? "card" : "table";

    await expect(page.locator(`[data-draw-check="${variant}"]`)).toHaveCount(6);
    // Minus icons and the other four apps' checks never animate.
    await expect(page.locator("[data-draw-check]")).toHaveCount(12);
  });

  test("marks are retracted until the section arrives, then drawn", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    const variant = isMobile ? "card" : "table";

    const dashOf = () =>
      page.evaluate((v) => {
        const path = document.querySelector(`[data-draw-check="${v}"] path`);
        return path?.getAttribute("stroke-dasharray") ?? null;
      }, variant);

    // The dash attributes only exist once the client effect has run, so wait
    // for hydration rather than racing it. #compare is far below the fold here,
    // so the observer cannot have fired yet.
    await settles(
      page,
      `!!document.querySelector('[data-draw-check="${variant}"] path[stroke-dasharray]')`
    );

    // Retracted: the visible dash segment is ~0 long.
    const retracted = await dashOf();
    expect(retracted).not.toBeNull();
    expect(Number(retracted!.split(" ")[0])).toBeLessThan(1);

    await page.locator("#compare").scrollIntoViewIfNeeded();
    await settles(
      page,
      `(() => {
        const p = document.querySelector('[data-draw-check="${variant}"] path');
        return p && Number((p.getAttribute('stroke-dasharray')||'0').split(' ')[0]) > 1;
      })()`
    );
  });
});

test.describe("how-it-works rail", () => {
  test("draws to full width on desktop", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "the rail is hidden below md");

    await page.goto("/");
    await page.locator("#how-it-works").scrollIntoViewIfNeeded();

    await settles(
      page,
      `(() => {
        const el = document.querySelector('${RAIL}');
        if (!el) return false;
        return new DOMMatrixReadOnly(getComputedStyle(el).transform).a > 0.99;
      })()`
    );
  });

  test("is not shown on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only assertion");

    await page.goto("/");
    await expect(page.locator(RAIL)).toBeHidden();
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("nothing is split and everything is at its final state", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toHaveCSS("opacity", "1");

    // The DOM must be exactly what React rendered — no injected spans to
    // confuse a screen reader, and nothing to un-mangle on copy/paste.
    await expect(page.locator(`h1 ${WORD}`)).toHaveCount(0);

    await page.locator("#features").scrollIntoViewIfNeeded();
    await expect(page.locator(`h2 ${WORD}`)).toHaveCount(0);

    // Counters show their real values immediately rather than starting at zero.
    await expect(page.locator(STATS)).toHaveText(["30%", "60s", "0"]);

    // Checkmarks are left as rendered, never retracted.
    await page.locator("#compare").scrollIntoViewIfNeeded();
    const dash = await page.evaluate(() =>
      document.querySelector("[data-draw-check] path")?.getAttribute("stroke-dasharray")
    );
    expect(dash).toBeFalsy();
  });
});
