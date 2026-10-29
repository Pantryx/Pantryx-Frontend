import Link from "next/link";
import { site, social } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/types";
import { SocialIcon } from "./SocialIcon";

export function Footer({ copy }: { copy: Dictionary["footer"] }) {
  const [emailUser, emailDomain] = site.contactEmail.split("@");

  const productLinks = [
    { href: "/", label: copy.links.home },
    { href: "/product", label: copy.links.product },
    { href: "/#features", label: copy.links.features },
    { href: "/#pricing", label: copy.links.pricing },
    { href: "/help", label: copy.links.help },
  ];
  const legalLinks = [
    { href: "/privacy", label: copy.legalLinks.privacy },
    { href: "/terms", label: copy.legalLinks.terms },
  ];

  return (
    <footer className="cta-clearance border-t border-line">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="font-display text-2xl">{site.name}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.tagline}</p>
        </div>

        {/* min-w-0 lets this shrink inside the flex row; without it the contact
            address below pushes the whole page into a horizontal scroll on any
            viewport narrower than the address is long — landscape phones most
            of all, where the md: row layout kicks in at only 852px. */}
        <div className="grid min-w-0 grid-cols-2 gap-10 sm:grid-cols-3">
          <FooterCol title={copy.columns.product} links={productLinks} />
          <FooterCol title={copy.columns.legal} links={legalLinks} />
          <div className="col-span-2 sm:col-span-1">
            <div className="eyebrow">{copy.columns.contact}</div>
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
            <span>© {new Date().getFullYear()} {site.name}. {copy.rights}</span>
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
