import { site } from "@/lib/site";

export type Campaign = {
  source?: string;
  medium?: string;
  name?: string;
};

const maximumParameterLength = 40;

function cleanParameter(value: string | null): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, maximumParameterLength);
  return cleaned.length > 0 ? cleaned : undefined;
}

/** Reads the `utm_*` parameters the app adds to shared links. */
export function campaignFromSearch(search: string): Campaign {
  const parameters = new URLSearchParams(search);
  return {
    source: cleanParameter(parameters.get("utm_source")),
    medium: cleanParameter(parameters.get("utm_medium")),
    name: cleanParameter(parameters.get("utm_campaign")),
  };
}

export function campaignEventProperties(campaign: Campaign): Record<string, string> {
  const properties: Record<string, string> = {};
  if (campaign.source) properties.utm_source = campaign.source;
  if (campaign.medium) properties.utm_medium = campaign.medium;
  if (campaign.name) properties.utm_campaign = campaign.name;
  return properties;
}

/**
 * App Store Connect only credits a campaign token (`ct`) when the provider
 * token (`pt`) is present, so without `NEXT_PUBLIC_APP_STORE_PROVIDER_TOKEN`
 * the plain listing URL is returned.
 */
export function appStoreUrlForCampaign(campaign: Campaign): string {
  const providerToken = process.env.NEXT_PUBLIC_APP_STORE_PROVIDER_TOKEN;
  if (!providerToken) return site.appStoreUrl;
  const campaignToken = campaign.name ?? (campaign.source ? `${campaign.source}_link` : "recipe_web");
  const url = new URL(site.appStoreUrl);
  url.searchParams.set("pt", providerToken);
  url.searchParams.set("ct", campaignToken.slice(0, maximumParameterLength));
  url.searchParams.set("mt", "8");
  return url.toString();
}
