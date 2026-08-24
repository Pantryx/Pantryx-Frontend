import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { JoinBetaButton } from "@/components/ui/JoinBetaButton";
import { PhoneFrame } from "@/components/product/PhoneFrame";

export const metadata: Metadata = {
  title: "Product",
  description:
    "See how Pantryx works — from a photo of your fridge to dinner, in six steps.",
};

type Step = {
  n: string;
  kicker: string;
  title: string;
  copy: string;
  src: string;
  alt: string;
};

const steps: Step[] = [
  {
    n: "01",
    kicker: "Scan",
    title: "Start with a photo",
    copy: "Open the scanner and capture what you have.",
    src: "/product/01-camera.webp",
    alt: "Pantryx camera framing a fridge shelf",
  },
  {
    n: "02",
    kicker: "Processing",
    title: "Pantryx reads it",
    copy: "And identifies what's in the photo to build your pantry in a few seconds.",
    src: "/product/02-processing.webp",
    alt: "Pantryx identifying ingredients from the photo",
  },
  {
    n: "03",
    kicker: "Results",
    title: "Recipes you can cook",
    copy: "Get recipes based on your ingredients and preferences, then choose the one you want to make.",
    src: "/product/03-results.webp",
    alt: "A list of recipes matched to your scan",
  },
  {
    n: "04",
    kicker: "Choose",
    title: "Take a closer look",
    copy: "Open a recipe to see the full details, adjust the servings, review the ingredients and steps, and add any missing ingredients to your shopping list before you cook.",
    src: "/product/04-recipe.webp",
    alt: "The Avocado Salad recipe detail screen",
  },
  {
    n: "05",
    kicker: "Cook",
    title: "Cook it step by step",
    copy: "Guided steps walk you through the whole recipe, at your own pace, until it's ready.",
    src: "/product/05-cooking.webp",
    alt: "Guided cooking, one step at a time",
  },
  {
    n: "06",
    kicker: "Done",
    title: "Dinner is ready",
    copy: "Rate it, save it to favorites, or share it — then cook it again in one tap.",
    src: "/product/06-done.webp",
    alt: "The finished dish with rate, save and share",
  },
];

export default function ProductPage() {
  return (
    <div className="overflow-x-clip pt-28 md:pt-32">
      {/* Hero — asymmetric: copy left, a fanned cluster of screens right. */}
      <section className="section pb-0">
        <div className="container-page">
          <div className="grid items-center gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-6 lg:col-span-5">
              <div className="eyebrow">The scan flow</div>
              {/* Sized so the longest line ("Your ingredients.") fits the hero
                  column on its own — the explicit breaks then keep one sentence
                  per line from mobile up. */}
              <AnimatedHeading className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-display leading-[1.05] tracking-tight">
                Your kitchen.
                <br />
                Your ingredients.
                <br />
                Your next meal.
              </AnimatedHeading>
              <p className="mt-6 max-w-md text-[1.3125rem] leading-[1.65] text-muted">
                Pantryx helps you figure out what to cook from the food you
                already have. It matches your ingredients and preferences with
                recipes you&apos;ll actually want to make, then guides you from
                your first ingredient to the finished meal.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <JoinBetaButton />
                <span className="text-sm text-muted">Six steps · under a minute</span>
              </div>
            </Reveal>

            {/* Hidden on phones — the six-screen walkthrough below already shows
                every screen, so a decorative hero shot only costs scroll there.
                Tablet: one clean device. Desktop: the full cascade. */}
            <Reveal delay={0.1} className="hidden md:col-span-6 md:block lg:col-span-7">
              <PhoneFrame
                src="/product/04-recipe.webp"
                alt="The recipe detail screen"
                priority
                className="mx-auto w-[62%] max-w-[280px] lg:hidden"
              />
              <div className="relative mx-auto hidden h-[420px] max-w-[560px] lg:ml-auto lg:block">
                <PhoneFrame
                  src="/product/04-recipe.webp"
                  alt="The recipe detail screen"
                  priority
                  className="absolute left-0 top-1/2 z-10 w-[42%] max-w-[180px] -translate-y-1/2 -rotate-2"
                />
                <PhoneFrame
                  src="/product/05-cooking.webp"
                  alt="The guided cooking screen"
                  priority
                  className="absolute left-[29%] top-1/2 z-20 w-[42%] max-w-[180px] -translate-y-1/2"
                />
                <PhoneFrame
                  src="/product/06-done.webp"
                  alt="The finished-dish screen"
                  priority
                  className="absolute left-[58%] top-1/2 z-30 w-[42%] max-w-[180px] -translate-y-1/2 rotate-2"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Steps — editorial zig-zag, one screen per step. */}
      <section className="section">
        <div className="container-page">
          <ol className="flex flex-col gap-24 md:gap-32">
            {steps.map((step, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal as="li" key={step.n} y={24}>
                  <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                    <div
                      className={`md:col-span-6 lg:col-span-7 ${
                        reverse ? "md:order-2 md:col-start-7 lg:col-start-6" : ""
                      }`}
                    >
                      <PhoneFrame
                        src={step.src}
                        alt={step.alt}
                        className="mx-auto w-[62%] max-w-[300px] md:mx-0"
                      />
                    </div>

                    <div
                      className={`md:col-span-5 ${
                        reverse
                          ? "md:order-1 md:col-start-1"
                          : "md:col-start-8 lg:col-start-8"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-5xl leading-none text-line md:text-6xl">
                          {step.n}
                        </span>
                        <span className="eyebrow">{step.kicker}</span>
                      </div>
                      <h2 className="mt-5 text-display-3 text-balance">{step.title}</h2>
                      <p className="mt-4 max-w-sm text-lead text-muted">{step.copy}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
