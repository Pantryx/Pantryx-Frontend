import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA";
import { displayCyrillic, instrument, inter } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/i18n/client";
import { isLocale, localeMeta, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { site } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/*
 * Site-wide defaults. Pages add their own title, canonical URL, hreflang
 * alternates and social cards through `pageMetadata()` — never here, or every
 * page would inherit the home page's canonical.
 */
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  const siteTitle = `${site.name} — ${meta.tagline}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: siteTitle,
      template: `%s · ${site.name}`,
    },
    description: meta.description,
    applicationName: site.name,
    itunes: { appId: site.appStoreId },
    openGraph: {
      title: siteTitle,
      description: meta.description,
      siteName: site.name,
      type: "website",
      locale: localeMeta[locale].og,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: meta.description,
    },
    /*
     * Google picks the search-result icon from these, and it wants a square PNG
     * of at least 48px served from the same origin — the previous 32px SVG was
     * below that floor, which is why results showed the generic globe. favicon.ico
     * carries 16/32/48 for older crawlers and browsers that still ask for it by
     * convention.
     */
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
  };
}

const themeInitScript = `(function(){try{var t=localStorage.getItem('pantryx-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;if(d)r.classList.add('dark');else r.classList.remove('dark');}catch(e){}})();`;

/*
 * No `dynamicParams = false` here: Next 15 applies it to every segment below,
 * which would 404 every recipe that wasn't prerendered. The middleware only
 * ever routes known locales here; the check below is the backstop.
 */
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${instrument.variable} ${displayCyrillic.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LocaleProvider locale={locale} messages={dictionary.chrome}>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer copy={dictionary.footer} nav={dictionary.chrome.nav} />
          <StickyMobileCTA />
        </LocaleProvider>
        {/*
          Only mounted on Vercel. Anywhere else — `next start`, the Playwright
          build, a self-hosted preview — there is no /_vercel/insights endpoint,
          so the beacon 404s and logs a console error on every page load.
        */}
        {process.env.VERCEL_ENV ? <Analytics /> : null}
      </body>
    </html>
  );
}
