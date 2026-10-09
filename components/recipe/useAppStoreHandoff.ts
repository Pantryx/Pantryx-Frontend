"use client";

import { useState } from "react";
import { appStoreUrlForCampaign, campaignFromSearch } from "@/lib/analytics/campaign";
import { trackSiteEvent } from "@/lib/analytics/trackSiteEvent";

/** Long enough to read the toast before Safari leaves for the App Store. */
const linkCopiedToastMilliseconds = 1600;

export type AppStoreHandoffTrigger = "app_store_link" | "open_in_app_fallback";

export function useAppStoreHandoff(recipeId: number) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  async function openAppStore(trigger: AppStoreHandoffTrigger, linkCopy: Promise<boolean>) {
    trackSiteEvent("recipe_link_app_store_tapped", { recipe_id: recipeId, trigger });
    if (await linkCopy) {
      trackSiteEvent("recipe_link_copied_for_install", { recipe_id: recipeId, trigger });
      setIsLinkCopied(true);
      await new Promise((resolve) => window.setTimeout(resolve, linkCopiedToastMilliseconds));
    }
    window.location.href = appStoreUrlForCampaign(campaignFromSearch(window.location.search));
  }

  return { isLinkCopied, openAppStore };
}
