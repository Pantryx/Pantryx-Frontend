import { backendUrl } from "@/lib/backend";
import { recipePath } from "@/lib/recipe/recipePreview";

type RecipeSitemapEntry = {
  id: number;
  slug: string;
};

/**
 * Every public recipe page, from the backend's `GET /api/recipes/sitemap`.
 * Returns an empty list on any failure: a backend outage must never take the
 * static pages out of the sitemap with it.
 */
export async function fetchRecipeSitemapPaths(): Promise<string[]> {
  try {
    const response = await fetch(`${backendUrl}/api/recipes/sitemap`, { next: { revalidate: 86_400 } });
    if (!response.ok) return [];
    const entries: RecipeSitemapEntry[] = await response.json();
    return entries.map(recipePath);
  } catch {
    return [];
  }
}
