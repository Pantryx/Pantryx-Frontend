import { backendUrl } from "@/lib/backend";
import type { RecipeLanguage } from "@/lib/recipe/recipeLanguage";

export type RecipePreviewIngredient = {
  name: string;
  metric: string;
  imperial: string;
};

/** The public subset served by the backend's `GET /api/recipes/:id/preview` — deliberately no steps. */
export type RecipePreview = {
  id: number;
  recipe_name: string;
  description?: string | null;
  image: string;
  prep_time: number;
  cook_time: number;
  total_time: number;
  servings: number;
  ingredients: RecipePreviewIngredient[];
  contains_allergens?: string[] | null;
};

/** Ids at or above this belong to a user's private imports, which are never shareable. */
const importedRecipeIdOffset = 1_000_000;

/** Returns the numeric id for a shareable catalog recipe, or `null` for anything else. */
export function parseShareableRecipeId(raw: string): number | null {
  if (!/^\d{1,7}$/.test(raw)) return null;
  const id = Number(raw);
  return id < importedRecipeIdOffset ? id : null;
}

/**
 * `null` means the backend has no such recipe. Any other failure throws, so an
 * outage renders the error page instead of a misleading "not found".
 *
 * Fetched from the backend directly rather than through the pantryx.org proxy,
 * and cached: every server-side fetch leaves from the same Vercel address, so
 * uncached traffic would quickly trip the backend's per-IP limit for everyone.
 */
export async function fetchRecipePreview(
  id: number,
  language: RecipeLanguage
): Promise<RecipePreview | null> {
  const response = await fetch(`${backendUrl}/api/recipes/${id}/preview?lang=${language}`, {
    next: { revalidate: 3600 },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Recipe preview ${id} failed with ${response.status}`);
  }
  return response.json();
}
