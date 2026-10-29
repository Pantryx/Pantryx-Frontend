import { Fragment } from "react";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Hero } from "@/components/home/Hero";
import { WhyExists } from "@/components/home/WhyExists";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { Comparison } from "@/components/home/Comparison";
import { MidCTA } from "@/components/home/MidCTA";
import { ValueCards } from "@/components/home/ValueCards";
import { SocialProof } from "@/components/home/SocialProof";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Reading the cookie + `Accept-Language` makes only this route render per
 * request; every other page stays statically rendered and English.
 */
async function resolveHomeLocale() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  return resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value, headerList.get("accept-language"));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveHomeLocale();
  const { meta } = getDictionary(locale);
  return {
    // Absolute so the layout's "%s · Pantryx" template doesn't double the brand.
    title: { absolute: meta.title },
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description },
    twitter: { title: meta.title, description: meta.description },
  };
}

export default async function HomePage() {
  const locale = await resolveHomeLocale();
  const dict = getDictionary(locale);

  // Keyed by locale so a language switch (a client-side router.refresh) remounts
  // the whole subtree. The heading animations mutate the DOM via anime.js, which
  // React can't reconcile when only the text changes — a clean remount re-splits
  // every heading in the new language instead of patching half of it.
  return (
    <Fragment key={locale}>
      <Hero copy={dict.hero} cta={dict.cta} locale={locale} />
      <WhyExists copy={dict.whyExists} />
      <HowItWorks copy={dict.howItWorks} />
      <Features copy={dict.features} />
      <Comparison copy={dict.comparison} />
      <MidCTA copy={dict.midCTA} cta={dict.cta} />
      <ValueCards copy={dict.valueCards} />
      <SocialProof copy={dict.socialProof} />
      <Pricing copy={dict.pricing} cta={dict.cta} />
      <FAQ copy={dict.faq} />
    </Fragment>
  );
}
