import type { Metadata } from "next";
import { Fragment } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { productSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n/server";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await pageLocale(props);
  const { title, description } = getDictionary(locale).product.meta;
  return pageMetadata({ locale, path: "/product", title, description });
}

export default async function ProductPage(props: LocaleParams) {
  const { product: copy } = getDictionary(await pageLocale(props));

  return (
    <div className="overflow-x-clip pt-28 md:pt-32">
      {/* Hero — asymmetric: copy left, a fanned cluster of screens right. */}
      <section className="section pb-0">
        <div className="container-page">
          <div className="grid items-center gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-6 lg:col-span-5">
              <div className="eyebrow">{copy.eyebrow}</div>
              {/* Sized so the longest line ("Your ingredients.") fits the hero
                  column on its own — the explicit breaks then keep one sentence
                  per line from mobile up. */}
              <AnimatedHeading className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-display leading-[1.05] tracking-tight">
                {copy.heroLines.map((line, i) => (
                  <Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </AnimatedHeading>
              <p className="mt-6 max-w-md text-[1.3125rem] leading-[1.65] text-muted">{copy.lead}</p>
              <div className="mt-8" data-inline-cta>
                <AppStoreButton />
                <p className="mt-3 text-xs text-muted">{copy.smallPrint}</p>
              </div>
            </Reveal>

            {/* Hidden on phones — the six-screen walkthrough below already shows
                every screen, so a decorative hero shot only costs scroll there.
                Tablet: one clean device. Desktop: the full cascade. */}
            <Reveal delay={0.1} className="hidden md:col-span-6 md:block lg:col-span-7">
              <PhoneFrame
                src="/product/04-recipe.webp"
                alt={copy.heroAlts.recipe}
                priority
                className="mx-auto w-[62%] max-w-[280px] lg:hidden"
              />
              <div className="relative mx-auto hidden h-[420px] max-w-[560px] lg:ml-auto lg:block">
                <PhoneFrame
                  src="/product/04-recipe.webp"
                  alt={copy.heroAlts.recipe}
                  priority
                  className="absolute left-0 top-1/2 z-10 w-[42%] max-w-[180px] -translate-y-1/2 -rotate-2"
                />
                <PhoneFrame
                  src="/product/05-cooking.webp"
                  alt={copy.heroAlts.cooking}
                  priority
                  className="absolute left-[29%] top-1/2 z-20 w-[42%] max-w-[180px] -translate-y-1/2"
                />
                <PhoneFrame
                  src="/product/06-done.webp"
                  alt={copy.heroAlts.done}
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
            {productSteps.map((step, i) => {
              const reverse = i % 2 === 1;
              const stepCopy = copy.steps[step.id];
              return (
                <Reveal as="li" key={step.id} y={24}>
                  <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                    <div
                      className={`md:col-span-6 lg:col-span-7 ${
                        reverse ? "md:order-2 md:col-start-7 lg:col-start-6" : ""
                      }`}
                    >
                      <PhoneFrame
                        src={step.src}
                        alt={stepCopy.alt}
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
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="eyebrow">{stepCopy.kicker}</span>
                      </div>
                      <h2 className="mt-5 text-display-3 text-balance">{stepCopy.title}</h2>
                      <p className="mt-4 max-w-sm text-lead text-muted">{stepCopy.copy}</p>
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
