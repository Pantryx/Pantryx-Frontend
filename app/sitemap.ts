import type { MetadataRoute } from "next";
import { fetchRecipeSitemapPaths } from "@/lib/recipe/recipeSitemap";
import { site } from "@/lib/site";

export const revalidate = 86_400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const recipePaths = await fetchRecipeSitemapPaths();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/product`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/meal-planner`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...recipePaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
