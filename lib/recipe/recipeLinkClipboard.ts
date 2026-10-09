import { isAppleTouchDevice } from "@/lib/device/isAppleTouchDevice";

/**
 * Puts this recipe's link on the clipboard so the app's first-launch Paste card
 * can open it after install. Safari only allows the write while the tap is
 * still being handled, so callers start it inside the click handler and await
 * the returned promise later if they need to.
 */
export function copyRecipeLinkForInstall(): Promise<boolean> {
  if (!isAppleTouchDevice() || !navigator.clipboard) return Promise.resolve(false);
  const link = `${window.location.origin}${window.location.pathname}`;
  return navigator.clipboard.writeText(link).then(
    () => true,
    () => false
  );
}
