import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description: "Answers to common questions about Pantryx.",
};

const groups = [
  {
    title: "Getting started",
    items: [
      {
        q: "What do I need to use Pantryx?",
        a: "An iPhone running iOS 26.2 or later. You can start straight away as a guest — no account required — or create a free Pantryx account to save your pantry and sync across devices. No credit card required.",
      },
      {
        q: "Can I use Pantryx without an account?",
        a: "Yes. You can enter as a guest and start scanning and cooking right away. Create a free account whenever you want to save your pantry, preferences, and cooking history so they stay with you.",
      },
      {
        q: "If I start as a guest, do I keep my data when I create an account?",
        a: "Yes. When you create a free account, the pantry and preferences from your guest session carry over so you don't have to start from scratch.",
      },
      {
        q: "Where can I download Pantryx?",
        a: "Pantryx is free on the App Store for iPhone. Search for \"Pantryx\" or use any Download button on this site.",
      },
      {
        q: "Is there an Android version?",
        a: "Not yet — Pantryx is iOS-only for now.",
      },
      {
        q: "How long does a scan take?",
        a: "Around 10 seconds from opening the camera to seeing your detected pantry.",
      },
    ],
  },
  {
    title: "Scanning",
    items: [
      {
        q: "What if the scanner misses something?",
        a: "After the scan you'll see a confirm screen. Tap to add, remove, or rename anything before you get dish ideas.",
      },
      {
        q: "Does it work with a messy fridge?",
        a: "Yes — that's explicitly what it's built for. You don't need to arrange anything.",
      },
    ],
  },
  {
    title: "Cooking mode",
    items: [
      {
        q: "Is there a guided cooking mode?",
        a: "Yes. Guided cook mode walks you through the recipe one step at a time with large, easy-to-read type, so it's simple to follow along while you cook.",
      },
    ],
  },
  {
    title: "Import from video",
    items: [
      {
        q: "Can I turn a recipe video into a recipe?",
        a: "Yes. Paste a link to a cooking video and Pantryx pulls out the ingredients and steps so you can cook it in the app.",
      },
      {
        q: "Which platforms are supported?",
        a: "TikTok, Instagram Reels, and YouTube videos.",
      },
      {
        q: "Is there a limit on how many videos I can import?",
        a: "Yes — you can import up to 10 videos per day and 30 per week. The counters reset automatically, so you're back to a full allowance the next day and the next week.",
      },
    ],
  },
  {
    title: "Recipes & preferences",
    items: [
      {
        q: "Can I set dietary preferences or allergies?",
        a: "Yes. Set preferences like vegetarian, gluten-free, or specific allergies, and Pantryx filters dish suggestions to match.",
      },
      {
        q: "Can I save or share recipes?",
        a: "Yes. Rate a recipe, save it to your favorites, or share it with a link so others can open it too.",
      },
    ],
  },
  {
    title: "Pantry & shopping list",
    items: [
      {
        q: "What is the pantry?",
        a: "Your pantry is the running list of ingredients you have at home. Pantryx builds it automatically from your scans, and it's what your dish suggestions are matched against — so the recipes you see are ones you can actually make right now.",
      },
      {
        q: "Can I edit my pantry manually?",
        a: "Yes. Add, rename, or remove items in your pantry any time — you don't have to scan. It stays fully under your control.",
      },
      {
        q: "What is the shopping list?",
        a: "The shopping list keeps track of the ingredients you still need to buy. When a recipe calls for something that isn't in your pantry, you can add the missing items to your shopping list before you cook.",
      },
      {
        q: "How do items get onto my shopping list?",
        a: "Add the missing ingredients from a recipe in one tap, or add anything manually. As you restock, move items into your pantry so they're ready for your next set of suggestions.",
      },
    ],
  },
  {
    title: "Account & data",
    items: [
      {
        q: "Does my pantry sync across devices?",
        a: "Yes — with a free account, your pantry, preferences, and cooking history sync so they're available wherever you sign in.",
      },
      {
        q: "How do I delete my data?",
        a: "Settings → Account → Delete account. Your pantry, history, and photos are removed.",
      },
      {
        q: "Do you train AI models on my photos?",
        a: "No. Photos are used to identify ingredients for your pantry. See the Privacy Policy for specifics.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        q: "The scanner isn't recognizing my items.",
        a: "Try better lighting and open the fridge fully. If it still struggles, add items manually — and please email us so we can improve detection.",
      },
      {
        q: "Something else?",
        a: "Reach out — we actually read every message.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <div className="eyebrow">Help center</div>
            <h1 className="mt-3 text-display-2 text-balance">How can we help?</h1>
            <p className="mt-5 text-lead text-muted">
              Quick answers for the questions we get most. Still stuck? Email us — we read every message.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-12">
            {groups.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.05}>
                <h2 className="font-display text-2xl text-ink">{g.title}</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {g.items.map((it) => (
                    <li key={it.q} className="py-5">
                      <div className="font-medium text-ink">{it.q}</div>
                      <p className="mt-2 text-muted">{it.a}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal className="rounded-2xl border border-line bg-subtle p-8 text-center">
              <h2 className="font-display text-2xl text-ink">Still stuck?</h2>
              <p className="mt-3 text-muted">We reply within a day or two.</p>
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft"
              >
                {site.contactEmail}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
