import Link from "next/link";
import clsx from "clsx";
import { AppleMark } from "@/components/ui/AppleMark";
import { site } from "@/lib/site";

type Props = {
  className?: string;
  variant?: "solid" | "outline";
  /** `compact` drops the two-line label — used in the navbar, where 52px is too tall. */
  size?: "default" | "compact";
  /**
   * Whether this instance counts as page content for the sticky mobile bar.
   * The navbar copy is chrome: it is off-screen below `md` and would otherwise
   * be the first thing the bar's observer finds.
   */
  inline?: boolean;
};

/**
 * The site's only primary action: get into the TestFlight beta.
 *
 * Keeps the App Store badge's two-line rhythm because that shape is what people
 * have been trained to look for at the bottom of an app page — the words change,
 * the affordance doesn't.
 *
 * With no `testFlightUrl` configured this renders as a disabled span rather than
 * a link. An anchor to "#" looks identical and scrolls the page to the top when
 * tapped, which is how every CTA on this site used to behave.
 */
export function JoinBetaButton({
  className,
  variant = "solid",
  size = "default",
  inline = true,
}: Props) {
  const isSolid = variant === "solid";
  const isCompact = size === "compact";
  const open = site.testFlightUrl.length > 0;

  const shell = clsx(
    "group inline-flex items-center transition-[transform,background-color,border-color,opacity] duration-300 ease-out-expo",
    isCompact ? "h-10 gap-2 rounded-full px-4" : "h-[52px] gap-2.5 rounded-[10px] px-4",
    isSolid
      ? "bg-ink text-paper hover:bg-ink-soft"
      : "border border-current/40 text-ink hover:border-current",
    open
      ? "hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.97]"
      : "cursor-not-allowed opacity-55",
    className
  );

  const label = isCompact ? (
    <span className="text-sm font-medium leading-none">
      {open ? "Join beta" : "Beta soon"}
    </span>
  ) : (
    <span className="flex flex-col items-start leading-none">
      <span className="text-[10px] uppercase tracking-[0.06em] opacity-90">
        {open ? "Join the" : "Coming soon"}
      </span>
      <span className="mt-[3px] font-sans text-[20px] font-semibold leading-none tracking-[-0.01em]">
        {open ? "Beta" : "TestFlight"}
      </span>
    </span>
  );

  const mark = <AppleMark className={isCompact ? "h-4 w-4 shrink-0" : "h-[26px] w-[26px] shrink-0"} />;

  // `data-beta-cta` marks this as an inline CTA either way. StickyMobileCTA
  // observes these and stays hidden while one is on screen — that has to hold
  // for the disabled state too, or the bar would cover it.
  const marker = inline ? { "data-beta-cta": true } : {};

  if (!open) {
    return (
      <span
        {...marker}
        className={shell}
        role="link"
        aria-disabled="true"
        aria-label="Join the Pantryx beta on TestFlight — invite coming soon"
        title="The TestFlight invite goes live shortly."
      >
        {mark}
        {label}
      </span>
    );
  }

  return (
    <Link
      href={site.testFlightUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Join the Pantryx beta on TestFlight"
      {...marker}
      className={shell}
    >
      {mark}
      {label}
    </Link>
  );
}
