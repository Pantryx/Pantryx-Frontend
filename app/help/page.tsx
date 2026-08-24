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
        a: "An iPhone running iOS 26.2 or later, and a free Pantryx account. Creating one takes a few seconds when you first open the app — no credit card required.",
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
        a: "After the scan you'll see a confirm screen. Tap to add, remove, or rename anything. Pantryx learns from your corrections.",
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
        q: "Can I cook hands-free?",
        a: "Yes. Guided cook mode uses large type and voice-friendly prompts so you don't need to touch your phone with greasy hands.",
      },
      {
        q: "Can I ask questions mid-recipe?",
        a: "Yes — the cooking chat answers in context of the recipe you're on (substitutions, timers, rescue techniques).",
      },
    ],
  },
  {
    title: "Account & data",
    items: [
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
