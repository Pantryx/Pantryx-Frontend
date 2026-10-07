"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import type { ChromeMessages } from "@/lib/i18n/dictionaries/en";

type LocaleContextValue = { locale: Locale; messages: ChromeMessages };

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Gives client components the current locale and the site-wide `chrome` strings. */
export function LocaleProvider({
  locale,
  messages,
  children,
}: LocaleContextValue & { children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, messages }}>{children}</LocaleContext.Provider>;
}

function useLocaleContext(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("LocaleProvider is missing above this component");
  return value;
}

export function useLocale(): Locale {
  return useContext(LocaleContext)?.locale ?? defaultLocale;
}

export function useMessages(): ChromeMessages {
  return useLocaleContext().messages;
}
