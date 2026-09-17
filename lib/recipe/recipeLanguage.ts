export type RecipeLanguage = "en" | "uk";

export function recipeLanguageFromQuery(value: string | null): RecipeLanguage {
  return value === "uk" ? "uk" : "en";
}
export type MeasurementSystem = "metric" | "imperial";

export type RecipeLocale = {
  language: RecipeLanguage;
  measurementSystem: MeasurementSystem;
};

const imperialRegions = new Set(["US", "LR", "MM"]);

/**
 * Picks the recipe language from the visitor's `Accept-Language`, not from the
 * link: a Ukrainian sharer's link should still read in English for an English
 * recipient. Only languages the catalog is translated into are considered.
 */
export function recipeLocaleFromAcceptLanguage(header: string | null): RecipeLocale {
  const tags = (header ?? "")
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
      return { tag, quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter(({ tag, quality }) => tag.length > 0 && quality > 0)
    .sort((first, second) => second.quality - first.quality);

  for (const { tag } of tags) {
    const [primary, region] = tag.split("-");
    const language = primary.toLowerCase();
    if (language === "uk") {
      return { language: "uk", measurementSystem: "metric" };
    }
    if (language === "en") {
      const measurementSystem = region && imperialRegions.has(region.toUpperCase()) ? "imperial" : "metric";
      return { language: "en", measurementSystem };
    }
  }

  return { language: "en", measurementSystem: "metric" };
}
