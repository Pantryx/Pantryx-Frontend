# Ukrainian style guide for pantryx.org

How the Ukrainian version of the site is written, so translations stay consistent and keep the tone we chose: **modern standard Ukrainian**, natural and conversational, with no archaic, purist or dialect words, no russianisms or surzhyk, and no word-for-word calques of the English.

The strings live in [`lib/i18n/dictionaries/uk.ts`](../lib/i18n/dictionaries/uk.ts) (site copy) and `lib/legal/*-sections.uk.tsx` (legal documents).

## 1. Source of truth

The iOS app is already translated (`Pantryx/Resources/uk.lproj/Localizable.strings` in the app repo). **Product terms on the site follow the app's wording**, so people see the same words in both places:

| Concept | App / site term |
|---|---|
| Hero line | «Годі стояти біля холодильника.» / «Оберіть вечерю за 60 секунд.» |
| Pantry | «ваші продукти», «список продуктів» (not «комора») |
| Shopping list | «список покупок» |
| Guided cook mode | «покроковий режим», «готуйте в покроковому режимі» |
| Meal Planner | «план харчування» |
| Dietary preferences | «харчові вподобання» |
| Account | «акаунт» |
| Delete account path | Налаштування → Акаунт → Видалити акаунт |
| App | «застосунок» |

Where the app is inconsistent, use the modern form. The app has two stray «додаток» (lines 1275–1276 of `Localizable.strings`); the site always says «застосунок», and the app should be fixed to match.

## 2. Register and tone

- Address the reader as **«ви»**, lowercase (capital «Ви» belongs in personal letters).
- Marketing copy uses plural imperatives: «Скануйте», «Готуйте», «Оберіть».
- Buttons use the infinitive, like the app and Apple: «Завантажити», «Відкрити», «Поділитися».
- Sentence case only. Never Title Case Like In English.
- Rewrite headlines, don't translate them word for word. «Tonight's dinner is one photo away.» became «До вечері — одне фото.»
- Ukrainian runs **20–40% longer** than English. Prefer the shorter phrasing for headings and buttons, then check the layout (see §8).

## 3. Orthography (2019 «Український правопис»)

- Follow the mandatory norms: «проєкт», «пів години» (written separately), «фойє».
- **Where the 2019 rules allow two forms, use the familiar one**: міф (not міт), ефір (not етер), аудиторія (not авдиторія), кафедра (not катедра), Афіни (not Атени).
- Genitive endings as in the dictionary: «рецепта», «інгредієнта», «акаунта».
- «Вже» at the start of a phrase, as in the app («Вже маєте акаунт?», «Вже в App Store»). Inside a sentence, follow the у/в euphony rule: «у вас уже є», «холодильник уже повний», but «що вже є».

## 4. Russianisms and calques (avoid, then use)

| Avoid | Use |
|---|---|
| на протязі | протягом |
| являтися | бути, є |
| приймати участь | брати участь |
| приймати рішення | ухвалювати рішення |
| задати питання | поставити запитання |
| питання (a question someone asks) | запитання |
| співпадати | збігатися |
| слідуючий | наступний |
| любий (any) | будь-який |
| получати | отримувати |
| відміняти | скасовувати |
| в залежності від | залежно від |
| у відповідності з | відповідно до |
| в якості | як |
| по замовчуванню | за замовчуванням |
| при умові | за умови |
| вірний (correct) | правильний |
| самий кращий | найкращий |
| вирішувати проблему | розв’язувати проблему |
| кушати | їсти |
| рослинне масло | олія |
| творог | кисломолочний сир |
| ласкаво просимо | вітаємо |

## 5. Archaic, purist and dialect words (avoid, then use)

The aim is the Ukrainian people actually speak today, not a revival of forgotten words. That matters doubly on a food site:

| Avoid | Use |
|---|---|
| світлина | фото, знімок |
| пательня | сковорідка, сковорода |
| баняк | каструля |
| бараболя, бульба | картопля |
| цитрина | лимон |
| горнятко, філіжанка | чашка |
| часопис | журнал |
| летовище | аеропорт |
| мешти | взуття |

## 6. Glossary

| English | Ukrainian |
|---|---|
| app | застосунок |
| AI | ШІ (as a prefix: «ШІ-сканер») |
| scan / scanner | сканування, сканувати / сканер |
| fridge | холодильник |
| ingredients | інгредієнти |
| groceries | продукти |
| recipe | рецепт |
| dish / meal | страва |
| dinner | вечеря |
| step by step | крок за кроком, покроковий |
| favorites | улюблені |
| rate | оцінити |
| share | поділитися |
| allergies / intolerances | алергії / непереносимість |
| guest | гість, гостьовий режим |
| sign in | увійти |
| free | безкоштовно |
| subscription | підписка |
| credit card | банківська картка |
| Privacy Policy | Політика конфіденційності |
| Terms of Use | Умови використання |
| Help | Допомога |
| FAQ | Часті запитання |
| Legal (menu) | Документи |
| Features | Можливості |
| Pricing | Вартість |
| Download on the App Store | Завантажити в App Store |

**Not translated and not declined:** Pantryx, App Store, iPhone, iOS, Android, OpenAI, TikTok, Instagram, YouTube, Whisk, Mealime, SuperCook, Yummly. Write «у Pantryx», «з App Store».

## 7. Typography

- **Quotes:** «» for primary, „“ for nested. Never ASCII `"`.
- **Apostrophe:** ’ (U+2019): «з’їсти», «пам’ять». Never ASCII `'`.
- **Dash:** em dash with spaces, and a **no-break space before it** (` — `) so a line never starts with a dash. En dash without spaces for ranges: «10–30».
- **Ellipsis:** «…» (one character).
- **No-break spaces** (` ` in code, so they show up in diffs):
  - between a number and its unit: «60 секунд», «10 хв», «24 години»;
  - after one-letter words when the line could otherwise break there: «в застосунку», «з нього», «у плані»;
  - after short prepositions in UI strings where a break looks wrong: «без акаунта»;
  - in «№ 5» and before «р.».
- **Numbers:** decimal comma («1,5»), thousands separated by a no-break space, percent without a space («30%»).
- **Currency in prose:** «100 євро».
- **Dates:** via `formatDate()` (Intl), which gives «24 вересня 2026 р.».
- **Units:** хв, год, с, г, кг, мл, л, ст. л., ч. л.

## 8. Writing strings in code

- Add every new key to `en.ts` first. TypeScript then reports it missing in `uk.ts` (`satisfies Dictionary`).
- Placeholders are `{name}`, filled with `fmt()`. Keep them in Ukrainian word order: «Ми в {network}».
- Plurals go through `plural()` with all four Ukrainian forms: `one` (1, 21), `few` (2–4, 22–24), `many` (5–20, 25–30), `other` (fractions). Example: `servings` in `uk.ts`.
- No HTML in strings. A heading with an italic clause is `{ lead, accent }`; the component adds the markup.
- Long-text layout hot spots to check after editing: the product hero (one sentence per line), the hero stat labels, the navbar at 768px, the comparison table, the Pricing price, the OG image headline (`og.headlineSize`).
- `e2e/i18n-dictionary.spec.ts` checks every Ukrainian string for:
  - ASCII quotes and apostrophes;
  - Latin letters mixed into Cyrillic words;
  - the letters ы, э, ъ, ё;
  - double spaces, and a dash at the start of a line;
  - strings left identical to English (brand names allowed).

## 9. Legal documents

- `lib/legal/privacy-sections.uk.tsx` and `terms-sections.uk.tsx` are translations. **The English documents prevail**, and every Ukrainian legal page says so (`legal.translationNotice`).
- Sections, ids and order must match the English (`satisfies SectionsFor<…>`), so anchors work in both languages.
- Terms to confirm with a lawyer before relying on the translation:

  | English | Ukrainian (draft) |
  |---|---|
  | controller | контролер (даних) |
  | processor | обробник (даних) |
  | legal basis | правова підстава |
  | legitimate interest | законний інтерес |
  | explicit consent | явна згода |
  | data subject | суб’єкт даних |
  | supervisory authority | наглядовий орган |
  | Data Protection Officer | відповідальна особа з питань захисту даних |
  | limitation of liability | обмеження відповідальності |
  | governing law | право, що застосовується |

- **Sign-off before relying on the translation:** a native-speaker review of all copy, plus a legal review of the two documents.

## 10. Fonts

Instrument Serif (the display face) has no Cyrillic. Ukrainian headings use **Noto Serif Display ExtraCondensed** (SIL OFL 1.1, licence in `lib/fonts/OFL.txt`), subset to Cyrillic only. That way it sits first in the font stack without touching Latin text. The file was built like this:

```bash
curl -s "https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wdth,wght@62.5,400"   # gives the static TTF URL
curl -s -o noto.ttf "<the fonts.gstatic.com URL from the CSS>"
pyftsubset noto.ttf --unicodes="U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116" \
  --flavor=woff --layout-features='*' --output-file=lib/fonts/display-cyrillic.woff
```

`size-adjust: 95%` in `lib/fonts.ts` matches its x-height to Instrument's. The OG image fonts in `lib/og-assets/` are built the same way (see the comment in `lib/ogImage.tsx`).
