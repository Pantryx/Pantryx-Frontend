import type { Metadata } from "next";
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
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n/server";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await pageLocale(props);
  return pageMetadata({ locale, path: "/", description: getDictionary(locale).meta.description });
}

export default async function HomePage(props: LocaleParams) {
  const { home } = getDictionary(await pageLocale(props));

  return (
    <>
      <Hero copy={home.hero} />
      <WhyExists copy={home.whyExists} />
      <HowItWorks copy={home.howItWorks} />
      <Features copy={home.features} />
      <Comparison copy={home.comparison} />
      <MidCTA copy={home.midCta} />
      <ValueCards copy={home.valueCards} />
      {home.socialProof ? <SocialProof copy={home.socialProof} /> : null}
      <Pricing copy={home.pricing} />
      <FAQ copy={home.faq} />
      <FinalCTA copy={home.finalCta} />
    </>
  );
}
