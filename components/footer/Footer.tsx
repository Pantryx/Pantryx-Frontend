import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="cta-clearance border-t border-line">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="font-display text-2xl">{site.name}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            You don&apos;t need more recipes. You need the right one.
          </p>
        </div>

        {/* min-w-0 lets this shrink inside the flex row; without it the contact
            address below pushes the whole page into a horizontal scroll on any
            viewport narrower than the address is long — landscape phones most
            of all, where the md: row layout kicks in at only 852px. */}
        <div className="grid min-w-0 grid-cols-2 gap-10 sm:grid-cols-3">
          <FooterCol
            title="Product"
            links={[
              { href: "/", label: "Home" },
              { href: "/help", label: "Help" },
            ]}
          />
          <FooterCol title="Legal" links={nav.legal.map((l) => ({ href: l.href, label: l.label }))} />
          <div className="col-span-2 sm:col-span-1">
            <div className="eyebrow">Contact</div>
            <a
              href={`mailto:${site.contactEmail}`}
              // Spanning the full width on mobile gives the address room to sit on
              // one line; break-all stays as a safety net on very narrow viewports.
              className="mt-3 block break-all text-sm text-ink hover:underline"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Built in the open · iOS</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
