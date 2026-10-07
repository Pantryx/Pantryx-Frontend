import type { RecipePreview } from "@/lib/recipe/recipePreview";
import type { Locale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/i18n/paths";
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
  locale: Locale,
  recipePagePath: string
) {
  const base = site.url.replace(/\/$/, "");
  const image = recipe.image.startsWith("http") ? recipe.image : `${base}${recipe.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.recipe_name.trim(),
    description: recipe.description ?? undefined,
    image: [image],
    url: absoluteUrl(locale, recipePagePath),
    inLanguage: locale,
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
