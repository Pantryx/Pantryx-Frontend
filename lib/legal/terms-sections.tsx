import type { ReactNode } from "react";
import { site } from "@/lib/site";

const email = site.contactEmail;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
}

export type LegalSection = { id: string; title: string; body: ReactNode };

export const termsSections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          Welcome to Pantryx (&quot;Pantryx&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
          &quot;us&quot;).
        </p>
        <p>
          These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Pantryx mobile application and
          related services (the &quot;App&quot; or &quot;Services&quot;). By downloading, accessing, or using Pantryx,
          you agree to these Terms. If you do not agree, do not use the App.
        </p>
        <p>
          Pantryx is a pantry-scanning and recipe recommendation app. It uses artificial intelligence to recognise items
          from photos, lets users confirm or edit their pantry inventory, and recommends recipes from Pantryx&apos;s
          curated recipe database based on confirmed ingredients and selected preferences.
        </p>
      </>
    ),
  },
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: (
      <>
        <p>By using the App, you confirm that you have read, understood, and agree to be bound by these Terms.</p>
        <p>
          These Terms are concluded between you and Pantryx only, and not with Apple Inc. Apple is not a party to these
          Terms and is not responsible for the App or its content. Pantryx, not Apple, is solely responsible for the App
          and the Services.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <>
        <p>By using Pantryx, you confirm that:</p>
        <Bullets
          items={[
            "You are at least 16 years old or the minimum age required in your jurisdiction to use the App.",
            "You have the legal authority to enter into these Terms.",
            "If you use the App on behalf of a company or organisation, you are authorised to bind that company or organisation to these Terms.",
            "You will use the App for personal, non-commercial purposes unless we agree otherwise in writing.",
            "You are responsible for reviewing and verifying all item recognition results, recipe recommendations, cooking steps, allergens, product labels, and food safety information before relying on them.",
          ]}
        />
      </>
    ),
  },
  {
    id: "description-of-the-services",
    title: "Description of the Services",
    body: (
      <>
        <p>The MVP version of Pantryx may include the following features:</p>
        <Bullets
          items={[
            "AI Pantry Scanning: You can take or upload photos of your pantry, fridge, shopping bag, or individual items so the App can suggest recognised items.",
            "Pantry Confirmation: You can review, confirm, edit, or delete recognised items before they are added to your inventory.",
            "Manual Inventory Management: You can manually add, edit, categorise, and manage pantry items.",
            "Recipe Recommendations: Pantryx may recommend recipes from its curated recipe database based on your confirmed inventory and selected preferences.",
            "Recipe Selection: You can select a recommended recipe.",
            "Cooking Steps: You can view structured cooking steps for selected recipes.",
            "Optional Dietary Preferences: You may choose to provide allergies, intolerances, dietary preferences, or health-related dietary information to help personalise recipe recommendations.",
          ]}
        />
        <p>
          Pantryx does not currently provide an AI cooking chat assistant in the MVP version of the App. Recipes are not
          generated from scratch by an AI cooking assistant. Recipe recommendations and cooking steps are based on
          Pantryx&apos;s curated recipe database and related app logic.
        </p>
      </>
    ),
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    body: (
      <>
        <p>You may need to create an account to use some or all App features.</p>
        <Bullets
          items={[
            "Registration: You must provide accurate and complete account information.",
            "Account Security: You are responsible for maintaining the confidentiality of your login credentials.",
            `Unauthorised Access: Notify us immediately at ${email} if you suspect unauthorised access to your account.`,
            "Account Activity: You are responsible for activity that occurs under your account, except where caused by our failure to use reasonable security measures.",
            "Suspension or Termination: We may suspend or terminate accounts that violate these Terms or create risk for the App, other users, or Pantryx.",
            "Account Deletion: You may request deletion of your account through the in-app account deletion feature or by contacting us.",
          ]}
        />
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <Bullets
          items={[
            "Use the App for unlawful, harmful, fraudulent, or abusive purposes.",
            "Attempt to reverse-engineer, copy, modify, hack, disrupt, overload, or interfere with the App or its systems.",
            "Circumvent security, access controls, rate limits, or technical restrictions.",
            "Upload photos containing other people's faces, private information, or identifying details without their consent.",
            "Upload content that is illegal, harmful, hateful, sexually explicit, defamatory, invasive of privacy, or infringes the rights of others.",
            "Transmit malware, viruses, harmful code, or other destructive material.",
            "Scrape, crawl, harvest, or extract data from the App through automated means without our written consent.",
            "Use the App as a backend, data source, recognition engine, or service layer for another product or commercial service without our written consent.",
            "Misrepresent your identity or affiliation with any person or organisation.",
          ]}
        />
        <p>Violation of these rules may result in suspension or termination of your account.</p>
      </>
    ),
  },
  {
    id: "ai-item-recognition",
    title: "AI Item Recognition and Pantry Confirmation",
    body: (
      <>
        <p>
          Pantryx uses a third-party artificial intelligence model provided by OpenAI (currently OpenAI&apos;s GPT-4o-mini
          vision model), accessed through Pantryx&apos;s own backend, to analyse photos submitted by users and suggest
          recognised pantry, fridge, grocery, or food-related items. To provide this feature, a downscaled copy of your
          photo is transmitted to OpenAI in the United States. OpenAI processes the photo only to return recognition results
          and, under its applicable API terms, does not use it to train its models. Your use of item recognition is also
          governed by our Privacy Policy.
        </p>
        <p>You acknowledge and agree that:</p>
        <Bullets
          items={[
            "AI item recognition is automated and may be inaccurate, incomplete, delayed, or misleading.",
            "The App may misidentify items, fail to detect items, assign incorrect categories, misread packaging, or miss ingredients hidden in packaging.",
            "Item recognition results are suggestions only and must be reviewed by you before use.",
            "You are responsible for confirming, editing, or deleting recognised items before relying on them.",
            "Pantryx does not guarantee that item recognition will be accurate, complete, safe, or suitable for your needs.",
          ]}
        />
      </>
    ),
  },
  {
    id: "recipe-recommendations",
    title: "Recipe Recommendations and Cooking Steps",
    body: (
      <>
        <p>
          After you confirm or edit your pantry inventory, Pantryx may recommend recipes from its curated recipe database
          based on your confirmed ingredients, selected preferences, dietary profile, and available recipe data.
        </p>
        <p>You acknowledge and agree that:</p>
        <Bullets
          items={[
            "Recipe recommendations are for informational and inspirational purposes only.",
            "Cooking steps may contain errors, omissions, unsuitable ingredient combinations, or unsafe assumptions.",
            "Pantryx does not guarantee that any recipe is allergen-free, nutritionally complete, medically appropriate, culturally or religiously suitable, or safe for your individual circumstances.",
            "You are solely responsible for checking ingredients, labels, allergens, quantities, freshness, cooking times, temperatures, hygiene, and food safety before preparing or consuming any meal.",
            "You should use your own judgement and, where relevant, consult a qualified professional before relying on any recipe for health-critical dietary needs.",
          ]}
        />
      </>
    ),
  },
  {
    id: "allergy-dietary-health",
    title: "Allergy, Dietary, and Health Disclaimer",
    body: (
      <>
        <p>This section is important. Please read it carefully.</p>
        <p>
          Pantryx is not a medical, nutritional, dietary, or allergen-management tool. The App does not replace
          professional advice from a doctor, registered dietitian, nutritionist, allergist, or other qualified
          professional.
        </p>
        <p>
          If you choose to enter allergies, intolerances, dietary restrictions, or health-related dietary information,
          Pantryx may use that information to personalise or filter recipe recommendations where possible. However,
          Pantryx does not guarantee that recommendations or cooking steps will be safe, allergen-free, medically
          appropriate, or suitable for your circumstances.
        </p>
        <p>You acknowledge and agree that:</p>
        <Bullets
          items={[
            "You must always read product labels yourself to confirm ingredients, allergens, and warnings.",
            "You must not rely on Pantryx for decisions involving severe allergies, anaphylaxis risk, celiac disease, diabetes, pregnancy-related dietary restrictions, religious dietary laws, or any other health-critical dietary need.",
            "If you have a serious food allergy, medical condition, or health-critical dietary requirement, you should consult a qualified medical professional or registered dietitian before changing your diet or relying on any recipe.",
            "Item recognition may fail to detect allergens, cross-contamination risks, hidden ingredients, traces, substitutions, or manufacturer-specific warnings.",
            "Use of the App for dietary planning is at your own risk, to the fullest extent permitted by applicable law.",
          ]}
        />
      </>
    ),
  },
  {
    id: "consent-health-data",
    title: "Consent for Allergy, Dietary, and Health-Related Data",
    body: (
      <>
        <p>
          If you choose to provide allergy, intolerance, medical diet, or health-related dietary information, the App will
          request your explicit consent before processing that information for dietary personalisation.
        </p>
        <p>
          This consent must be provided actively and will not be pre-selected. You may withdraw consent at any time by
          deleting the relevant information, disabling dietary personalisation where available, or contacting us.
        </p>
        <p>
          Withdrawing consent may limit Pantryx&apos;s ability to personalise or filter recipe recommendations based on
          your dietary profile. Withdrawing consent does not affect processing that occurred before withdrawal.
        </p>
      </>
    ),
  },
  {
    id: "fees-payments",
    title: "Fees, Payments, and Future Paid Features",
    body: (
      <>
        <p>
          Pantryx is currently offered free of charge and does not currently include paid subscriptions, in-app purchases,
          or paid premium features.
        </p>
        <p>
          We may introduce paid features, subscription tiers, or other monetisation options in the future. If we do so,
          we will clearly disclose the price, billing terms, renewal terms, cancellation process, and refund rules before
          you make any purchase.
        </p>
        <p>
          Introducing paid features in the future will not retroactively charge you for previous free usage. Any future
          paid feature will require your clear action or confirmation before payment is taken.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <Bullets
        items={[
          "Our Property: The App, software, design, branding, trademarks, logos, interface, curated recipe database, text, images, and other content made available by Pantryx are owned by Pantryx or its licensors and are protected by applicable intellectual property laws.",
          "Your Content: You retain ownership of photos, pantry inventory entries, dietary preferences, and other content you submit to the App.",
          "Licence to Process Your Content: By using the App, you grant Pantryx a worldwide, non-exclusive, royalty-free licence to process your submitted content solely for the purpose of providing, securing, maintaining, and improving the Services. This includes transmitting and processing photos through Pantryx's backend infrastructure and its third-party AI recognition provider (OpenAI) for the sole purpose of item recognition.",
          "Recipe Content: Recipes, recommendations, and cooking steps made available in the App may be used for personal, non-commercial purposes only, unless we give written permission otherwise.",
          "Restrictions: You may not copy, modify, reproduce, redistribute, sell, lease, publicly display, reverse-engineer, or commercially exploit the App, its database, or its content without our prior written consent.",
          "Third-Party IP Claims: In the event of any third-party claim that the App or your possession and use of it infringes that third party's intellectual property rights, Pantryx, not Apple, will be solely responsible for the investigation, defence, settlement, and discharge of such claim.",
        ]}
      />
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Your use of the App is also governed by our Privacy Policy, which explains how we collect, use, store, share, and
        protect personal data. You should review the Privacy Policy before using the App.
      </p>
    ),
  },
  {
    id: "maintenance-support",
    title: "Maintenance, Support, and Availability",
    body: (
      <>
        <p>
          Pantryx is solely responsible for providing any maintenance and support services for the App, as specified in
          these Terms or as required under applicable law. Apple has no obligation whatsoever to furnish maintenance or
          support services with respect to the App.
        </p>
        <p>
          We aim to keep the App available and functional, but we do not guarantee uninterrupted or error-free
          operation. The App may be unavailable from time to time due to maintenance, updates, technical issues, network
          failures, security incidents, or events outside our control.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    body: (
      <>
        <p>
          The App may rely on third-party services for infrastructure, database hosting, AI-based image recognition
          (OpenAI), email delivery, analytics, notifications, app store distribution, and related functionality. Your use of
          the App may also be subject to applicable third-party terms, including Apple App Store terms and OpenAI&apos;s
          terms.
        </p>
        <p>
          We are not responsible for third-party services, websites, or content that we do not control, except where
          required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "warranty-disclaimer",
    title: "Warranty Disclaimer",
    body: (
      <>
        <p>
          The App is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind,
          whether express, implied, statutory, or otherwise, to the fullest extent permitted by law.
        </p>
        <p>Pantryx does not warrant that:</p>
        <Bullets
          items={[
            "The App will function uninterrupted, securely, or without errors.",
            "Defects or errors will always be corrected.",
            "The App will be free from viruses, harmful components, or security vulnerabilities.",
            "Item recognition results will be accurate, complete, or suitable for your needs.",
            "Recipe recommendations or cooking steps will be safe, complete, allergen-free, nutritionally appropriate, medically appropriate, or suitable for your circumstances.",
            "The App will meet your expectations or requirements.",
          ]}
        />
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, Pantryx will not be liable for any indirect, incidental, special,
          consequential, exemplary, or punitive damages, including damages for loss of profits, data, goodwill, business
          opportunity, or other intangible losses arising from or related to your use of the App.
        </p>
        <p>
          To the fullest extent permitted by law, Pantryx is not liable for harm, illness, injury, allergic reaction, food
          poisoning, adverse health outcome, or other loss resulting from reliance on item recognition results, pantry
          inventory data, recipe recommendations, cooking steps, dietary filters, or user-provided dietary information.
        </p>
        <p>To the maximum extent permitted by law, Pantryx&apos;s total cumulative liability arising out of or related to these Terms or your use of the App will not exceed the greater of:</p>
        <Bullets
          items={[
            "the amount you paid directly to Pantryx in the twelve (12) months before the event giving rise to the claim; or",
            "one hundred euros (€100).",
          ]}
        />
        <p>
          Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law,
          including liability for death or personal injury caused by negligence, fraud, fraudulent misrepresentation,
          wilful misconduct, or mandatory consumer rights.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination and Account Deletion",
    body: (
      <>
        <p>We may suspend or terminate your access to the App if:</p>
        <Bullets
          items={[
            "You violate these Terms.",
            "Your use creates legal, security, operational, or reputational risk.",
            "We are required to do so by law.",
            "We discontinue the App or a material part of the Services.",
          ]}
        />
        <p>You may stop using the App at any time.</p>
        <p>
          If you create an account, Pantryx provides an in-app account deletion option. You may request deletion of your
          account through the in-app account deletion feature or by contacting {email}.
        </p>
        <p>
          Deleting your account will remove or anonymise your pantry inventory, dietary preferences, recipe interaction
          data, account information, and associated personal data, except where retention is required for legal compliance,
          security, fraud prevention, dispute resolution, or legitimate business records. Original uploaded photos are
          retained only for up to 24 hours and then automatically deleted.
        </p>
      </>
    ),
  },
  {
    id: "updates-changes",
    title: "Updates and Changes",
    body: (
      <>
        <p>
          We may update these Terms from time to time. Material changes may be communicated through in-app
          notifications, email, or policy update banners.
        </p>
        <p>
          The updated Terms will become effective on the date stated in the updated version. Continued use of the App
          after the updated Terms become effective means you accept the revised Terms. If you do not agree, you should stop
          using the App and may request account deletion.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    body: (
      <>
        <p>
          These Terms are governed by the laws of Poland and, where applicable, the laws of the European Union, without
          regard to conflict of law principles.
        </p>
        <p>
          Any dispute, controversy, or claim arising out of or relating to these Terms or the App should first be attempted
          to be resolved through good-faith negotiation by contacting us at {email}.
        </p>
        <p>
          If a resolution cannot be reached, disputes shall be subject to the competent courts of Poland, except where
          mandatory consumer protection laws give you the right to bring proceedings in your country of residence.
        </p>
        <p>
          If you are a consumer residing in the European Union, you retain any mandatory rights available under the laws of
          your country of residence.
        </p>
      </>
    ),
  },
  {
    id: "legal-compliance",
    title: "Legal Compliance",
    body: (
      <>
        <p>You represent and warrant that:</p>
        <Bullets
          items={[
            "You are not located in a country or region subject to a government embargo that prohibits use of the App.",
            "You are not listed on any applicable government list of prohibited or restricted parties.",
            "You will comply with all applicable laws, rules, and regulations when using the App.",
            "You will comply with applicable third-party terms when using the App, including Apple App Store terms and your mobile network provider's terms.",
          ]}
        />
      </>
    ),
  },
  {
    id: "apple-specific",
    title: "Apple-Specific Terms",
    body: (
      <>
        <p>If you access or download the App through the Apple App Store:</p>
        <Bullets
          items={[
            "These Terms are between you and Pantryx only, not Apple.",
            "Apple is not responsible for the App, its content, maintenance, support, warranties, claims, or legal compliance, except where required by applicable law.",
            "In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple may refund the purchase price for the App, if any, in accordance with Apple's policies. To the maximum extent permitted by law, Apple has no other warranty obligation with respect to the App.",
            "Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce these Terms against you as a third-party beneficiary.",
          ]}
        />
      </>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    body: (
      <>
        <p>For questions, complaints, or claims regarding these Terms or the App, contact:</p>
        <p className="text-ink">
          Volodymyr Mendyk
          <br />
          Email:{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
        </p>
      </>
    ),
  },
];
