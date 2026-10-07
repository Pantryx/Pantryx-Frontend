import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n/server";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await pageLocale(props);
  const { title, description } = getDictionary(locale).legal.terms;
  return pageMetadata({ locale, path: "/terms", title, description });
}

export default async function TermsPage(props: LocaleParams) {
  return <LegalLayout locale={await pageLocale(props)} kind="terms" />;
}
