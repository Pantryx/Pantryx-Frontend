"use client";

import { AppleMark } from "@/components/ui/AppleMark";
import { trackSiteEvent } from "@/lib/analytics/trackSiteEvent";
import { site } from "@/lib/site";

type Props = {
  recipeId: number;
  label: string;
  /** Element to scroll to when the app can't be opened and there is no App Store listing. */
  fallbackTargetId: string;
};

/** How long the page waits for iOS to hand off to the app before assuming it isn't installed. */
const appOpenTimeoutMilliseconds = 1500;

function isAppleTouchDevice() {
  const { userAgent, maxTouchPoints } = navigator;
  return /iPhone|iPad|iPod/.test(userAgent) || (userAgent.includes("Macintosh") && maxTouchPoints > 1);
}

/**
 * Reaching this page means the universal link already didn't open the app — it
 * isn't installed, an in-app browser swallowed the link, or the visitor once
 * chose Safari. A link back to this same URL can't open the app either, so the
 * button tries the custom scheme, and falls back if the page is still in front
 * once iOS has had time to switch apps.
 */
export function OpenInAppButton({ recipeId, label, fallbackTargetId }: Props) {
  function openFallback() {
    if (site.appStoreUrl) {
      trackSiteEvent("recipe_link_app_store_tapped", { recipe_id: recipeId, trigger: "open_in_app_fallback" });
      window.location.href = site.appStoreUrl;
      return;
    }
    document.getElementById(fallbackTargetId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function openInApp() {
    const appleTouchDevice = isAppleTouchDevice();
    trackSiteEvent("recipe_link_open_in_app_tapped", { recipe_id: recipeId, apple_touch_device: appleTouchDevice });

    if (!appleTouchDevice) {
      openFallback();
      return;
    }

    let pageWasHidden = false;
    const markHidden = () => {
      if (document.visibilityState === "hidden") pageWasHidden = true;
    };
    document.addEventListener("visibilitychange", markHidden);
    window.addEventListener("pagehide", markHidden);

    window.location.href = `pantryx://recipe/${recipeId}`;

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", markHidden);
      window.removeEventListener("pagehide", markHidden);
      if (!pageWasHidden && document.visibilityState === "visible") openFallback();
    }, appOpenTimeoutMilliseconds);
  }

  return (
    <button
      type="button"
      onClick={openInApp}
      className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-ink px-6 text-paper shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)] transition-[transform,background-color] duration-300 ease-out-expo hover:bg-ink-soft active:scale-[0.97]"
    >
      <AppleMark className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
