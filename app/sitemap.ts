import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/i18n/paths";
import { fetchRecipeSitemapPaths } from "@/lib/recipe/recipeSitemap";

export const revalidate = 86_400;

type Entry = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority"> & { path: string };

const staticPages: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/product", changeFrequency: "monthly", priority: 0.8 },
  { path: "/meal-planner", changeFrequency: "monthly", priority: 0.7 },
  { path: "/help", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

/**
 * Every page once per language, each listing all of its language versions —
 * Google wants the hreflang set repeated on every member of the set.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const recipePages: Entry[] = (await fetchRecipeSitemapPaths()).map((path) => ({
    path,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...recipePages].flatMap(({ path, changeFrequency, priority }) => {
    const languages = languageAlternates(path, { absolute: true });
    return locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
