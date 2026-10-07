import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

/*
 * Inter's Cyrillic faces ship regardless of `subsets` (next/font emits every
 * @font-face Google returns, and the browser only fetches the ranges a page
 * uses); `subsets` decides only what is preloaded, so English pages don't pay
 * for Cyrillic up front.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

/**
 * Instrument Serif has no Cyrillic, so Ukrainian headings get Noto Serif
 * Display ExtraCondensed — the closest match in width and contrast. The file
 * holds Cyrillic glyphs only and declares that unicode-range, which is what
 * lets it sit *first* in `--font-display` (see globals.css): Latin text, digits
 * and punctuation fall through to Instrument exactly as before, and the file is
 * only downloaded once Cyrillic text is on screen. How it was built is in
 * docs/i18n-uk-style.md.
 */
export const displayCyrillic = localFont({
  src: "./fonts/display-cyrillic.woff",
  weight: "400",
  style: "normal",
  variable: "--font-display-cyrillic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "unicode-range", value: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116" },
    // Noto's x-height is 0.536em to Instrument's 0.51em; scaling it to match
    // keeps Cyrillic and Latin the same size within a heading.
    { prop: "size-adjust", value: "95%" },
  ],
});
