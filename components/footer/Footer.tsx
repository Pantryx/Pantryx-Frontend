import Link from "next/link";
import { nav, site, social } from "@/lib/site";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const [emailUser, emailDomain] = site.contactEmail.split("@");

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
              { href: "/product", label: "Product" },
              { href: "/#features", label: "Features" },
              { href: "/#pricing", label: "Pricing" },
              { href: "/help", label: "Help" },
            ]}
          />
          <FooterCol title="Legal" links={nav.legal.map((l) => ({ href: l.href, label: l.label }))} />
          <div className="col-span-2 sm:col-span-1">
            <div className="eyebrow">Contact</div>
            <a
              href={`mailto:${site.contactEmail}`}
              // Spanning the full width on mobile gives the address room to sit on
              // one line. In the narrow three-column layout the <wbr> lets it wrap
              // after the @ instead of mid-word; overflow-wrap:anywhere stays as a
              // safety net on very narrow viewports.
              className="mt-3 block text-sm text-ink [overflow-wrap:anywhere] hover:underline"
            >
              {emailUser}@<wbr />
              {emailDomain}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
            <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>Built in the open · iOS</span>
          </div>
          {/* Icons sit above the copyright on phones, as a row of their own, so
              the last footer line stays text — the sticky CTA tests measure it. */}
          <ul className="-mx-2 order-first flex items-center gap-1 sm:order-none">
            {social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
                >
                  <SocialIcon id={s.id} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
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
