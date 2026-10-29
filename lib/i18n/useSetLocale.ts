"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/locale";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Persists the chosen language and re-renders the server components in it.
 *
 * Writing the cookie and calling `router.refresh()` lets the Home page resolve
 * the new locale on the next server pass — the copy swaps in place with no full
 * reload and no flash. `<html lang>` is updated eagerly so assistive tech and
 * the browser pick up the change immediately rather than on the next paint.
 */
export function useSetLocale() {
  const router = useRouter();

  return useCallback(
    (locale: Locale) => {
      try {
        document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
      } catch {
        // Ignore storage errors (private mode, etc.) — the refresh below still
        // reflects the choice for this session via the cookie we just tried.
      }
      document.documentElement.lang = locale;
      router.refresh();
    },
    [router]
  );
}
