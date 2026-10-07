import { expect, test } from "@playwright/test";
import { en } from "@/lib/i18n/dictionaries/en";
import { uk } from "@/lib/i18n/dictionaries/uk";

/*
 * Mechanical checks of the Ukrainian copy against docs/i18n-uk-style.md: the
 * dictionary directly, and the legal documents as rendered (their JSX can't be
 * imported here — Playwright compiles test-side JSX for component testing).
 * Runs once, under the desktop project.
 */

type Leaf = { path: string; value: string };

/** Every string in a dictionary, with functions called on sample arguments. */
function leaves(node: unknown, path = ""): Leaf[] {
  if (typeof node === "string") return [{ path, value: node }];
  if (typeof node === "function") {
    return [1, 2, 5, 21].map((count) => ({ path: `${path}(${count})`, value: String(node(count, count)) }));
  }
  if (Array.isArray(node)) return node.flatMap((item, i) => leaves(item, `${path}[${i}]`));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, value]) => leaves(value, path ? `${path}.${key}` : key));
  }
  return [];
}

/** Values that are the same in both languages on purpose. */
const SAME_IN_BOTH = new Set(["Pantryx", "404", "0"]);

const ukStrings = leaves(uk);
const enByPath = new Map(leaves(en).map(({ path, value }) => [path, value]));

const RULES: [string, RegExp][] = [
  ["ASCII double quote (use «»)", /"/],
  ["ASCII apostrophe (use ’)", /'/],
  ["Latin letter inside a Cyrillic word", /[а-щьюяєіїґ][a-z]|[a-z][а-щьюяєіїґ]/i],
  ["letter that isn't Ukrainian (ы, э, ъ, ё)", /[ыэъё]/i],
  ["double space", / {2}/],
  ["breakable space before a dash (use \\u00A0—)", / —/],
  ["three dots (use …)", /\.\.\./],
];

/** Each offending string, trimmed to the neighbourhood of the match. */
function offenders(strings: Leaf[], pattern: RegExp): string[] {
  const around = new RegExp(`.{0,40}(?:${pattern.source}).{0,40}`, pattern.flags);
  return strings.filter(({ value }) => pattern.test(value)).map(({ path, value }) => `${path}: ${value.match(around)?.[0] ?? value}`);
}

test.describe("Ukrainian dictionary", () => {
  test.skip(({ isMobile }) => !!isMobile, "runs once, under the desktop project");

  for (const [name, pattern] of RULES) {
    test(`has no ${name}`, () => {
      expect(offenders(ukStrings, pattern)).toEqual([]);
    });
  }

  test("has nothing left in English", () => {
    const untranslated = ukStrings
      .filter(({ path, value }) => enByPath.get(path) === value && !SAME_IN_BOTH.has(value))
      .map(({ path, value }) => `${path}: ${value}`);
    expect(untranslated).toEqual([]);
  });

  test("declines servings with all three plural forms", () => {
    const servings = [1, 2, 5, 11, 21, 22, 25].map((count) => uk.recipe.servings(count).replace(/ /g, " "));
    expect(servings).toEqual([
      "1 порція",
      "2 порції",
      "5 порцій",
      "11 порцій",
      "21 порція",
      "22 порції",
      "25 порцій",
    ]);
  });

  test("keeps hero stat values starting with their number, for the counter", () => {
    for (const { value } of Object.values(uk.home.hero.stats)) expect(value).toMatch(/^\d+/);
  });
});

test.describe("Ukrainian legal documents", () => {
  test.skip(({ isMobile }) => !!isMobile, "runs once, under the desktop project");

  for (const path of ["/uk/privacy", "/uk/terms"]) {
    test(`${path} follows the typography rules`, async ({ page }) => {
      await page.goto(path);
      const sections = await page.locator("article > [id]").evaluateAll((elements) =>
        elements.map((element) => ({ path: `#${element.id}`, value: (element as HTMLElement).innerText.replace(/\n+/g, " ") }))
      );
      expect(sections.length).toBeGreaterThan(10);
      for (const [name, pattern] of RULES) {
        if (pattern.source === " {2}") continue; // innerText collapses layout whitespace on its own terms
        expect(offenders(sections, pattern), name).toEqual([]);
      }
    });
  }
});
