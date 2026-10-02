import type { Metadata } from "next";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const path = "/meal-planner";
const title = "What's for Dinner? Sorted.";
const description = "Plan the week around what's already in your fridge with the Pantryx Meal Planner.";

export const metadata: Metadata = {
  title: "Meal Planner",
  description,
  alternates: { canonical: path },
  itunes: { appId: site.appStoreId, appArgument: `${site.url}${path}` },
  openGraph: { title, description, url: path, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const highlights = [
  {
    title: "Your week at a glance",
    body: "Breakfast, lunch, and dinner for every day, up to two weeks ahead.",
  },
  {
    title: "Built on your pantry",
    body: "Plan around the ingredients you already have, so less goes to waste.",
  },
  {
    title: "Add from any recipe",
    body: "Drop a recipe into any meal slot straight from its page in one tap.",
  },
];

export default function MealPlannerPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">Meal Planner</div>
            <h1 className="mt-3 text-display-2 text-balance">{title}</h1>
            <p className="mt-5 text-lead text-muted">{description}</p>
            <AppStoreButton className="mt-8" />
          </Reveal>

          <ul className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <Reveal
                key={highlight.title}
                as="li"
                delay={index * 0.05}
                className="h-full rounded-2xl border border-line bg-subtle p-6"
              >
                <h2 className="font-display text-xl text-ink">{highlight.title}</h2>
                <p className="mt-2 text-muted">{highlight.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
