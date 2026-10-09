export function isAppleTouchDevice() {
  const { userAgent, maxTouchPoints } = navigator;
  return /iPhone|iPad|iPod/.test(userAgent) || (userAgent.includes("Macintosh") && maxTouchPoints > 1);
}
