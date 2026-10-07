import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import { AppStoreLink } from "@/components/recipe/AppStoreLink";
import { OpenInAppButton } from "@/components/recipe/OpenInAppButton";
import { RecipePageViewTracker } from "@/components/recipe/RecipePageViewTracker";
import { isLocale, localeMeta, type Locale } from "@/lib/i18n/config";
import { languageAlternates, localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/server";
import { measurementSystemFor } from "@/lib/recipe/recipeLanguage";
import { fetchRecipePreview, parseRecipeIdFromPathSegment, recipePath } from "@/lib/recipe/recipePreview";
import { recipeStructuredData, serializedStructuredData } from "@/lib/recipe/recipeStructuredData";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const getAppSectionId = "get-pantryx";

/**
 * The language comes from the URL: the middleware sends someone arriving from
 * a shared link to their own language's version. Units still follow the
 * visitor's browser, which is why this page reads headers and stays dynamic.
 */
const loadRecipePage = cache(async (locale: Locale, pathSegment: string) => {
  const recipeId = parseRecipeIdFromPathSegment(pathSegment);
  if (recipeId === null) notFound();

  const recipe = await fetchRecipePreview(recipeId, locale);
  if (!recipe) notFound();

  const canonicalPath = recipePath(recipe);
  if (canonicalPath !== `/recipes/${pathSegment}`) permanentRedirect(localizedPath(locale, canonicalPath));

  const measurementSystem = measurementSystemFor(locale, (await headers()).get("accept-language"));
  return { recipe, canonicalPath, measurementSystem, copy: getDictionary(locale).recipe };
});

async function resolveParams(params: Props["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, slug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await resolveParams(params);
  const { recipe, canonicalPath, copy } = await loadRecipePage(locale, slug);
  const title = recipe.recipe_name.trim();
  const description = copy.metaDescription(Math.round(recipe.total_time), recipe.servings);
  const url = localizedPath(locale, canonicalPath);
  const previewImagePath = `/api/site/recipe-preview/${recipe.id}?lang=${locale}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(canonicalPath) },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "article",
      locale: localeMeta[locale].og,
      images: [{ url: previewImagePath, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [previewImagePath],
    },
    // Unprefixed in every language: the app's link router expects `/recipes/…`.
    itunes: { appId: site.appStoreId, appArgument: `${site.url}${canonicalPath}` },
  };
}

export default async function RecipePage({ params }: Props) {
  const { locale, slug } = await resolveParams(params);
  const { recipe, canonicalPath, measurementSystem, copy } = await loadRecipePage(locale, slug);
  const title = recipe.recipe_name.trim();
  const ingredients = recipe.ingredients.map((ingredient) => ({
    name: ingredient.name,
    amount: (measurementSystem === "imperial" ? ingredient.imperial : ingredient.metric).trim(),
  }));

  const structuredData = recipeStructuredData(recipe, ingredients, locale, canonicalPath);

  return (
    <article className="pt-28 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData(structuredData) }}
      />
      <RecipePageViewTracker recipeId={recipe.id} language={locale} />

      <section className="section pb-0">
        <div className="container-page">
          <div className="grid items-start gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- served by the backend through the /api proxy */}
              <img
                src={recipe.image}
                alt={title}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
              />
            </div>

            <div className="md:col-span-6">
              <div className="eyebrow">{copy.eyebrow}</div>
              <h1 className="mt-3 font-display text-display-2">{title}</h1>

              <p className="mt-4 flex flex-wrap gap-x-3 text-sm text-muted">
                <span>{copy.minutes(Math.round(recipe.total_time))}</span>
                <span aria-hidden>·</span>
                <span>{copy.servings(recipe.servings)}</span>
              </p>

              {recipe.description ? (
                <p className="mt-5 max-w-md text-lead text-muted">{recipe.description}</p>
              ) : null}

              <div className="mt-8" data-inline-cta>
                <OpenInAppButton recipeId={recipe.id} label={copy.openInApp} fallbackTargetId={getAppSectionId} />
                <p className="mt-3 text-xs text-muted">{copy.stepsInApp}</p>
              </div>

              <h2 className="mt-12 text-sm font-medium uppercase tracking-wide text-muted">{copy.ingredients}</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {ingredients.map((ingredient, index) => (
                  <li key={`${index}-${ingredient.name}`} className="flex gap-4 py-3 text-sm">
                    <span className="w-24 shrink-0 text-muted">{ingredient.amount}</span>
                    <span className="text-ink">{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id={getAppSectionId} className="section scroll-mt-24">
        <div className="container-page">
          <div className="mx-auto max-w-md text-center" data-inline-cta>
            <h2 className="font-display text-display-3">{copy.getTheApp}</h2>
            <div className="mt-6">
              <AppStoreLink recipeId={recipe.id} href={site.appStoreUrl} label={copy.downloadOnAppStore} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
