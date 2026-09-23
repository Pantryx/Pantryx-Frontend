# Pantryx — Marketing Site

Minimal, black-and-white, fully responsive marketing site for **Pantryx** — an AI fridge scanner that turns what you already have into dishes you can cook tonight.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v3** (black/white tokens, custom display scale with `clamp()`)
- **Framer Motion** (scroll reveals, page transitions, mobile menu, FAQ accordion)
- **Lucide React** (icons)
- **Inter** (body) + **Instrument Serif** (display) via `next/font`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Browser and server requests to **`/api/*`** are rewritten to the Vapor backend (see **`BACKEND_URL`** in `.env.example`). Override **`BACKEND_URL`** to point at a different Heroku app or a local server.

## Deployment

Production hosting, **`pantryx.org` → Vercel**, API proxy, and Heroku env (including **`ALLOWED_ORIGINS`**) are documented in [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx         # Fonts, nav, footer, page transitions, sticky mobile CTA
  page.tsx           # Home
  help/page.tsx
  privacy/page.tsx
  terms/page.tsx
  sitemap.ts
  robots.ts
  globals.css
components/
  nav/               # Navbar (with legal dropdown) + MobileMenu
  footer/            # Footer
  home/              # Hero, WhyExists, HowItWorks, Features, Comparison,
                     # MidCTA, ValueCards, SocialProof, Pricing, FAQ,
                     # FinalCTA, StickyMobileCTA
  legal/             # Shared legal page layout (anchor nav on desktop)
  ui/                # AppleMark, AppStoreButton, Reveal
                     # (scroll reveal), AnimatedHeading, PageTransition
lib/site.ts          # Site metadata, nav items, copy data, FAQ, comparison
public/              # Static assets (favicon, etc.)
```

## Conversion-psychology layer

The page is engineered around a single desired action: **download Pantryx from the App Store**.

Applied principles (see `/Users/volodymyrmendyk/.windsurf/plans/pantryx-marketing-site-a15e2f.md`):

- **Jobs-to-be-Done** — outcome-first copy (*"Decide dinner in 60 seconds"*)
- **Zero-Price Effect** — "Free · No card" at every CTA
- **Present Bias** — "cook tonight" language throughout
- **Loss Aversion** — "Why this exists" strip + value cards
- **Anchoring / Contrast** — comparison table vs Whisk, Mealime, SuperCook, Yummly
- **Hick's Law** — one CTA, limited nav, single pricing tier
- **Activation Energy** — "one photo", "no credit card", "delete anytime" under every CTA
- **Goal-Gradient** — visible progress rail in How-it-works
- **Mere Exposure** — CTA repeated 4× down the page, plus sticky mobile bar
- **Peak-End Rule** — polished hero + quiet final CTA
- **Regret Aversion** — privacy + "delete anytime" messaging
- **Unity + Pratfall** — honest "built in the open" positioning (no fake numbers)

## Open items (placeholders to replace)

- `lib/site.ts` → `contactEmail`: replace `hello@pantryx.app`.
- `lib/site.ts` → `url`: production domain is **`https://pantryx.org`** (change here if the canonical URL moves).
- Privacy & Terms pages contain `[TBD]` markers for legal review.
- `SocialProof` contains a placeholder quote until real early-tester quotes are available.

## Motion

Two animation libraries, split by job. They never touch the same DOM node.

- **framer-motion** — everything declarative: the `Reveal` scroll primitive,
  `PageTransition`, and all five `AnimatePresence` enter/exit pairs (sticky CTA,
  mobile menu, FAQ accordion, testimonial carousel).
- **anime.js v4** — everything imperative: word-by-word heading reveals, the hero
  stat counters, the HowItWorks rail, and the Comparison checkmark draw-on.

Shared vocabulary lives in `lib/motion/`:

| File | Purpose |
|---|---|
| `tokens.ts` | Durations, stagger steps, the hero cadence, `EASE_OUT_EXPO`. No imports, so server components can read it |
| `anime.ts` | `ANIME_EASE` — the same curve in anime's function form |
| `env.ts` | `prefersReducedMotion()` / `isDesktopViewport()` for use inside effects |
| `inView.ts` | `observeOnce`, sharing `Reveal`'s `-80px` margin so both libraries trigger on the same scroll line |
| `splitWords.ts` | Wraps each word in a span, descending into nested inline elements |

Three things worth knowing before editing:

- **Reduced motion is a hard gate.** The `prefers-reduced-motion` block in
  `globals.css` only zeroes *CSS* durations — it does nothing to JS animation.
  Every anime.js effect checks `prefersReducedMotion()` itself and returns early,
  and in that path nothing is split, so the DOM stays exactly as React rendered it.
- **anime.js v4.5 removed the string easing syntax.** `ease: "cubicBezier(...)"`
  logs a warning and silently falls back to linear. Always pass `ANIME_EASE`.
- **We don't use anime's `splitText`.** It treats a child element as one atomic
  word, so a heading like `Most recipe apps ask: <em>…</em>` would leave the
  clause unanimated — and splitting the child first then the host wraps the
  already-split child again, animating it twice. `splitWords` splits at the text
  node instead, which also keeps ordinary spaces (`includeSpaces` swaps them for
  U+00A0 and quietly changes `textContent`). This also keeps `animejs/text`
  (9 kB gz) out of the bundle.

A heading that adopts `AnimatedHeading` should have `y={0}` on its wrapping
`Reveal`, so the block fades while the words supply the vertical motion — rather
than both sliding at once.

Cost: **+18 kB gzip** on the home page's First Load JS (148 → 166 kB), almost all
of it anime's core engine, which is shared by all four effects.

## Testing

End-to-end tests run in Playwright against a production build, in two projects:
`mobile` (iPhone 13 / WebKit — the engine the sticky CTA bugs actually showed up in)
and `desktop` (1280×900 Chromium).

```bash
npm test
```

One-time browser install: `npx playwright install chromium webkit`.

Other entry points: `npm run test:mobile` (mobile project only), `npm run test:ui`
(watch mode), `npm run test:report` (open the last HTML report).

The webserver builds into `.next-e2e` via `NEXT_DIST_DIR`, so `npm run dev` can
keep running in another terminal without the two clobbering each other's chunks.

`e2e/sticky-cta.spec.ts` is the regression suite for the sticky mobile download
bar — hysteresis (no flicker on scroll jitter), hiding behind inline App Store
badges, footer clearance, safe-area gap, and mobile-menu interaction. If you
change `SHOW_AT_Y` / `HIDE_AT_Y` in `lib/hooks/useStickyCtaVisibility.ts`, update
the mirrored constants at the top of that spec.

## Deployment

This repo contains **no deployment configuration**. Hosting is intentionally out of scope — push to GitHub and point any host (Vercel, Netlify, Cloudflare Pages, self-hosted, etc.) at it.

## Accessibility & responsiveness

- Mobile-first, fluid type via `clamp()`, breakpoints at 640 / 768 / 1024px.
- 44×44px minimum tap targets, focus-visible rings, skip-to-content link.
- `prefers-reduced-motion` honored globally.
- Comparison table collapses into per-app cards on mobile.
- iOS safe-area-inset respected for the sticky mobile CTA.
