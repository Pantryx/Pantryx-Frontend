import type { RecipePreview } from "@/lib/recipe/recipePreview";
import type { RecipeLanguage } from "@/lib/recipe/recipeLanguage";
import { site } from "@/lib/site";

type StructuredIngredient = {
  name: string;
  amount: string;
};

function isoDurationFromMinutes(minutes: number): string | undefined {
  const rounded = Math.round(minutes);
  return rounded > 0 ? `PT${rounded}M` : undefined;
}

/**
 * The `schema.org/Recipe` block search engines and AI answer engines read.
 * Holds only what the page itself shows: the steps stay in the app.
 */
export function recipeStructuredData(
  recipe: RecipePreview,
  ingredients: StructuredIngredient[],
  language: RecipeLanguage,
  canonicalPath: string
) {
  const base = site.url.replace(/\/$/, "");
  const image = recipe.image.startsWith("http") ? recipe.image : `${base}${recipe.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.recipe_name.trim(),
    description: recipe.description ?? undefined,
    image: [image],
    url: `${base}${canonicalPath}`,
    inLanguage: language,
    author: { "@type": "Organization", name: site.name, url: base },
    prepTime: isoDurationFromMinutes(recipe.prep_time),
    cookTime: isoDurationFromMinutes(recipe.cook_time),
    totalTime: isoDurationFromMinutes(recipe.total_time),
    recipeYield: String(recipe.servings),
    recipeIngredient: ingredients.map(({ amount, name }) => (amount ? `${amount} ${name}` : name)),
  };
}

/** `<` is escaped so a recipe name can never close the surrounding script tag. */
export function serializedStructuredData(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
