"use client";

import { AppleMark } from "@/components/ui/AppleMark";
import { trackSiteEvent } from "@/lib/analytics/trackSiteEvent";

type Props = {
  recipeId: number;
  href: string;
  label: string;
};

export function AppStoreLink({ recipeId, href, label }: Props) {
  return (
    <a
      href={href}
      onClick={() => trackSiteEvent("recipe_link_app_store_tapped", { recipe_id: recipeId, trigger: "app_store_link" })}
      className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-line px-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-muted"
    >
      <AppleMark className="h-4 w-4" />
      {label}
    </a>
  );
}
