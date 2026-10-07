import type { Metadata } from "next";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { Reveal } from "@/components/ui/Reveal";
import { mealPlannerHighlightIds } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n/server";
import { site } from "@/lib/site";

const path = "/meal-planner";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await pageLocale(props);
  const copy = getDictionary(locale).mealPlanner;
  return pageMetadata({
    locale,
    path,
    title: copy.meta.title,
    socialTitle: copy.title,
    description: copy.description,
    // In-app event links open the Meal Planner, so the Smart App Banner hands
    // the app this page's URL. Unprefixed: the app routes `/meal-planner`.
    extra: { itunes: { appId: site.appStoreId, appArgument: `${site.url}${path}` } },
  });
}

export default async function MealPlannerPage(props: LocaleParams) {
  const copy = getDictionary(await pageLocale(props)).mealPlanner;

  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="mt-3 text-display-2 text-balance">{copy.title}</h1>
            <p className="mt-5 text-lead text-muted">{copy.description}</p>
            <AppStoreButton className="mt-8" />
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-3">
            {mealPlannerHighlightIds.map((id, index) => (
              <Reveal
                key={id}
                as="li"
                delay={index * 0.05}
                className="h-full rounded-2xl border border-line bg-subtle p-6"
              >
                <h2 className="font-display text-xl text-ink">{copy.highlights[id].title}</h2>
                <p className="mt-2 text-muted">{copy.highlights[id].body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
