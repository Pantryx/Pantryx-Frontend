"use client";

import { useEffect } from "react";
import { campaignEventProperties, campaignFromSearch } from "@/lib/analytics/campaign";
import { trackSiteEvent } from "@/lib/analytics/trackSiteEvent";

export function RecipePageViewTracker({ recipeId, language }: { recipeId: number; language: string }) {
  useEffect(() => {
    trackSiteEvent("recipe_link_page_viewed", {
      recipe_id: recipeId,
      language,
      ...campaignEventProperties(campaignFromSearch(window.location.search)),
    });
  }, [recipeId, language]);

  return null;
}
