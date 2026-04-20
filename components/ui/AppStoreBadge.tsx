import Link from "next/link";
import { site } from "@/lib/site";
import clsx from "clsx";

type Props = {
  className?: string;
  variant?: "solid" | "outline";
};

export function AppStoreBadge({ className, variant = "solid" }: Props) {
  const isSolid = variant === "solid";
  return (
    <Link
      href={site.appStoreUrl}
      aria-label="Download Pantryx on the App Store"
      className={clsx(
        "group inline-flex h-[52px] items-center gap-2.5 rounded-[10px] px-4 transition-all duration-300 ease-out-expo",
        isSolid
          ? "bg-ink text-paper hover:bg-ink-soft hover:-translate-y-[1px]"
          : "border border-current/40 hover:border-current",
        className
      )}
    >
      <AppleMark className="h-[26px] w-[26px] shrink-0" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-[0.06em] opacity-90">
          Download on the
        </span>
        <span className="mt-[3px] font-sans text-[20px] font-semibold leading-none tracking-[-0.01em]">
          App&nbsp;Store
        </span>
      </span>
    </Link>
  );
}

function AppleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("fill-current", className)}
    >
      <path d="M17.56 12.77c-.03-3.07 2.5-4.54 2.62-4.62-1.43-2.09-3.66-2.38-4.44-2.41-1.89-.19-3.69 1.11-4.64 1.11-.97 0-2.44-1.08-4.01-1.05-2.06.03-3.96 1.2-5.02 3.04-2.14 3.71-.55 9.21 1.54 12.22 1.02 1.47 2.23 3.13 3.83 3.07 1.54-.06 2.12-1 3.98-1 1.86 0 2.38 1 4.01.97 1.66-.03 2.71-1.5 3.72-2.98 1.17-1.71 1.66-3.37 1.69-3.46-.04-.02-3.24-1.25-3.28-4.89z M14.49 3.9c.84-1.03 1.41-2.45 1.25-3.87-1.21.05-2.69.82-3.57 1.85-.79.91-1.48 2.37-1.29 3.76 1.35.11 2.74-.7 3.61-1.74z" />
    </svg>
  );
}
