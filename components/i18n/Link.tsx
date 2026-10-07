"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/lib/i18n/client";
import { localizedPath } from "@/lib/i18n/paths";

/**
 * `next/link` for internal pages: write the unprefixed href (`/help`,
 * `/#pricing`) and it is prefixed for the current locale (`/uk/help`).
 */
export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localizedPath(locale, href) : href} {...props} />;
}
