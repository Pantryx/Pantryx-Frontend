"use client";

import { useEffect } from "react";
import { trackSiteEvent } from "@/lib/analytics/trackSiteEvent";

export function RecipePageViewTracker({ recipeId, language }: { recipeId: number; language: string }) {
  useEffect(() => {
    trackSiteEvent("recipe_link_page_viewed", { recipe_id: recipeId, language });
  }, [recipeId, language]);

  return null;
}
