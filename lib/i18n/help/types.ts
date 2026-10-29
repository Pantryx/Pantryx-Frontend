export type HelpQA = { q: string; a: string };

export type HelpGroup = { title: string; items: HelpQA[] };

export type HelpDictionary = {
  meta: { title: string; description: string };
  eyebrow: string;
  heading: string;
  lead: string;
  groups: HelpGroup[];
  stillStuck: { heading: string; body: string };
};
