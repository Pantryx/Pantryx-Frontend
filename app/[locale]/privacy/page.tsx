import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n/server";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await pageLocale(props);
  const { title, description } = getDictionary(locale).legal.privacy;
  return pageMetadata({ locale, path: "/privacy", title, description });
}

export default async function PrivacyPage(props: LocaleParams) {
  return <LegalLayout locale={await pageLocale(props)} kind="privacy" />;
}
