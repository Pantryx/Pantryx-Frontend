import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
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

const themeInitScript = `(function(){try{var t=localStorage.getItem('pantryx-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;if(d)r.classList.add('dark');else r.classList.remove('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrument.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <StickyMobileCTA />
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
