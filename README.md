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
  ui/                # AppStoreBadge, Reveal (scroll reveal), PhoneMockup,
                     # PageTransition
lib/site.ts          # Site metadata, nav items, copy data, FAQ, comparison
public/              # Static assets (favicon, etc.)
```

## Conversion-psychology layer

The page is engineered around a single desired action: **tap the App Store badge**.

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

- `lib/site.ts` → `appStoreUrl`: replace `#` with the real App Store link.
- `lib/site.ts` → `contactEmail`: replace `hello@pantryx.app`.
- `lib/site.ts` → `url`: replace with real production domain.
- Privacy & Terms pages contain `[TBD]` markers for legal review.
- `SocialProof` contains a placeholder quote until real early-tester quotes are available.

## Deployment

This repo contains **no deployment configuration**. Hosting is intentionally out of scope — push to GitHub and point any host (Vercel, Netlify, Cloudflare Pages, self-hosted, etc.) at it.

## Accessibility & responsiveness

- Mobile-first, fluid type via `clamp()`, breakpoints at 640 / 768 / 1024px.
- 44×44px minimum tap targets, focus-visible rings, skip-to-content link.
- `prefers-reduced-motion` honored globally.
- Comparison table collapses into per-app cards on mobile.
- iOS safe-area-inset respected for the sticky mobile CTA.
