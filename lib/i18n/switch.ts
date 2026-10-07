import type { MouseEvent } from "react";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale } from "@/lib/i18n/config";

/** Remembers an explicit language choice; the middleware honours it over Accept-Language. */
export function writeLocaleCookie(locale: Locale) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * Click handler for a language link. The link itself is a real `<a>` to the
 * other language's URL (crawlable, works without JavaScript, and a full load
 * so `<html lang>`, metadata and fonts are all fresh); this saves the choice
 * and carries the current query and #section over before the browser follows it.
 *
 * Returns `true` when the link points at the current language, in which case
 * nothing navigates and the caller can simply close its menu.
 */
export function followLocaleLink(event: MouseEvent<HTMLAnchorElement>, target: Locale, current: Locale): boolean {
  writeLocaleCookie(target);
  if (target === current) {
    event.preventDefault();
    return true;
  }
  const anchor = event.currentTarget;
  const [base] = anchor.href.split(/[?#]/);
  anchor.href = `${base}${window.location.search}${window.location.hash}`;
  return false;
}
