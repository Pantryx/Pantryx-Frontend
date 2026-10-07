import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/server";
import { site } from "@/lib/site";

/**
 * Shared 1200×630 social-share card, used by both `app/opengraph-image.tsx`
 * and `app/twitter-image.tsx`. This is the image X, iMessage, Slack, etc. pull
 * from `og:image` / `twitter:image` to render the large preview card.
 *
 * Editorial split on the brand cream: the app icon + store name and a bold
 * Instrument Serif hook on the left, the real recipe screen bleeding off the
 * right so people see the payoff before they tap. Key text stays out of the
 * bottom-left corner, where X overlays the domain label.
 *
 * Assets are read from `lib/og-assets/` when the card is rendered, never at
 * import: Next imports this module to build every page's metadata, and pages
 * other than the image routes don't ship those files.
 *
 * Neither bundled Inter nor Instrument Serif has Cyrillic, so each family gets
 * a Cyrillic-only companion listed after it: Inter's own Cyrillic glyphs
 * (`Inter-Cyrillic-*.woff`, subset from Google Fonts' static Inter with the
 * pyftsubset command in docs/i18n-uk-style.md) and the site's Cyrillic display
 * face. Latin text is unaffected; the renderer falls through per glyph.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const ASSETS = join(process.cwd(), "lib", "og-assets");
const font = (file: string) => readFileSync(join(ASSETS, file));
const SANS = '"Inter", "Inter Cyrillic"';
const SERIF = '"Instrument Serif", "Display Cyrillic"';
const dataUri = (file: string, mime: string) =>
  `data:${mime};base64,${readFileSync(join(ASSETS, file)).toString("base64")}`;

const CREAM = "#F4F0E9";
const INK = "#171310";
const INK_SOFT = "#5b5247";
const MUTED = "#948976";

export function renderOgImage(locale: Locale) {
  const copy = getDictionary(locale).og;
  const interRegular = font("Inter-Regular.woff");
  const interMedium = font("Inter-Medium.woff");
  const interSemiBold = font("Inter-SemiBold.woff");
  const instrumentSerif = font("InstrumentSerif-Regular.ttf");
  const interCyrillicRegular = font("Inter-Cyrillic-Regular.woff");
  const interCyrillicMedium = font("Inter-Cyrillic-Medium.woff");
  const interCyrillicSemiBold = font("Inter-Cyrillic-SemiBold.woff");
  const displayCyrillic = readFileSync(join(process.cwd(), "lib", "fonts", "display-cyrillic.woff"));
  const iconBadge = dataUri("icon-badge.png", "image/png");
  const recipeShot = dataUri("recipe.jpg", "image/jpeg");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          background: CREAM,
          overflow: "hidden",
          fontFamily: SANS,
          color: INK,
        }}
      >
        {/* warm depth behind the phone */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: "radial-gradient(circle at center, rgba(214,196,168,0.55), rgba(244,240,233,0) 70%)",
          }}
        />

        {/* left: copy — single centered column with deliberate vertical rhythm */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 720,
            height: "100%",
            padding: "0 60px 0 74px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                display: "flex",
                width: 72,
                height: 72,
                borderRadius: 19,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(23,19,16,0.22)",
              }}
            >
              <img src={iconBadge} width={72} height={72} alt="" />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 29,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.12,
                maxWidth: 420,
              }}
            >
              {site.appStoreName}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: "0.24em",
              color: MUTED,
              marginTop: 56,
            }}
          >
            {copy.kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: SERIF,
              fontSize: copy.headlineSize,
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
              color: INK,
              marginTop: 16,
              maxWidth: 470,
            }}
          >
            {copy.headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.4,
              color: INK_SOFT,
              marginTop: 28,
              maxWidth: 545,
            }}
          >
            {copy.subline}
          </div>

          <div style={{ display: "flex", marginTop: 44 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: INK,
                color: CREAM,
                fontSize: 24,
                fontWeight: 600,
                padding: "15px 30px",
                borderRadius: 999,
              }}
            >
              {copy.cta}
            </div>
          </div>
        </div>

        {/* right: the recipe screen, bleeding off the edge */}
        <div
          style={{
            position: "absolute",
            top: 84,
            right: -46,
            display: "flex",
            width: 452,
            height: 900,
            borderRadius: 54,
            overflow: "hidden",
            border: "10px solid #14110c",
            boxShadow: "0 44px 90px rgba(23,19,16,0.34)",
            transform: "rotate(5deg)",
          }}
        >
          <img src={recipeShot} width={432} height={940} alt="" style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
        { name: "Instrument Serif", data: instrumentSerif, weight: 400, style: "normal" },
        { name: "Inter Cyrillic", data: interCyrillicRegular, weight: 400, style: "normal" },
        { name: "Inter Cyrillic", data: interCyrillicMedium, weight: 500, style: "normal" },
        { name: "Inter Cyrillic", data: interCyrillicSemiBold, weight: 600, style: "normal" },
        { name: "Display Cyrillic", data: displayCyrillic, weight: 400, style: "normal" },
      ],
    },
  );
}
