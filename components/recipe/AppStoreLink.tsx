"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { LinkCopiedToast } from "@/components/recipe/LinkCopiedToast";
import { useAppStoreHandoff } from "@/components/recipe/useAppStoreHandoff";
import { AppleMark } from "@/components/ui/AppleMark";
import { appStoreUrlForCampaign, campaignFromSearch } from "@/lib/analytics/campaign";
import { copyRecipeLinkForInstall } from "@/lib/recipe/recipeLinkClipboard";

type Props = {
  recipeId: number;
  href: string;
  label: string;
  linkCopiedMessage: string;
};

export function AppStoreLink({ recipeId, href, label, linkCopiedMessage }: Props) {
  const [campaignHref, setCampaignHref] = useState(href);
  const { isLinkCopied, openAppStore } = useAppStoreHandoff(recipeId);

  useEffect(() => {
    setCampaignHref(appStoreUrlForCampaign(campaignFromSearch(window.location.search)));
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    void openAppStore("app_store_link", copyRecipeLinkForInstall());
  }

  return (
    <>
      <a
        href={campaignHref}
        onClick={handleClick}
        className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-line px-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-muted"
      >
        <AppleMark className="h-4 w-4" />
        {label}
      </a>
      <LinkCopiedToast isVisible={isLinkCopied} message={linkCopiedMessage} />
    </>
  );
}
