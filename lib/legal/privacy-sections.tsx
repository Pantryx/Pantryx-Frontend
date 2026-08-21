import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const email = site.contactEmail;
const privacyUrl = `${site.url}/privacy`;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
}

function Subheading({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-xl text-ink">{children}</h3>;
}

export type LegalSection = { id: string; title: string; body: ReactNode };

export const privacySections: LegalSection[] = [
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
          Pantryx is operated by Volodymyr Mendyk. This Privacy Policy explains how we collect, use, store, share, and
          protect personal data when you use the Pantryx mobile application and related services (the &quot;App&quot; or
          &quot;Services&quot;). It also explains your privacy rights and choices under the General Data Protection
          Regulation (&quot;GDPR&quot;) and other applicable data protection laws.
        </p>
        <p>
          Pantryx is a pantry-scanning and recipe recommendation app. The MVP version of the App uses artificial
          intelligence to recognise items from photos, allows you to confirm or edit your pantry inventory, and recommends
          recipes from Pantryx&apos;s curated recipe database based on confirmed ingredients and selected preferences.
        </p>
        <p>
          Pantryx does not currently provide an AI cooking chat assistant in the MVP version of the App. Recipes are not
          generated from scratch by an AI cooking assistant. Pantryx is not a medical, nutritional, dietary, or
          allergen-management tool.
        </p>
        <p>
          <strong className="text-ink">Privacy Policy URL:</strong>{" "}
          <Link href="/privacy" className="underline">
            {privacyUrl}
          </Link>
        </p>
      </>
    ),
  },
  {
    id: "key-features",
    title: "Key Features of the App",
    body: (
      <>
        <p>The MVP version of Pantryx may include the following features:</p>
        <Bullets
          items={[
            "AI Pantry Scanning via Camera: Capture or upload photos of your pantry, fridge, shopping bag, or individual items so Pantryx can suggest recognised items for your confirmation.",
            "Pantry Confirmation: Review, confirm, edit, or delete recognised items before they are added to your pantry inventory.",
            "Manual Inventory Management: Add, edit, categorise, and track pantry items manually.",
            "Recipe Recommendations: Receive recipe suggestions from Pantryx's curated recipe database based on your confirmed pantry inventory and selected preferences.",
            "Recipe Selection and Cooking Steps: Select a recommended recipe and follow structured cooking steps.",
            "Dietary Preferences: Optionally enter allergies, intolerances, dietary preferences, or health-related dietary information to help personalise recipe recommendations.",
            "Cross-Device Access: Access your inventory and saved recipes across your devices when signed in.",
            "Account Deletion: Delete your account through the in-app account deletion feature or by contacting us.",
          ]}
        />
      </>
    ),
  },
  {
    id: "personal-data-we-collect",
    title: "Personal Data We Collect",
    body: (
      <div className="space-y-6">
        <p>We collect only the data that is necessary to provide, secure, maintain, and improve the App.</p>
        <div>
          <Subheading>A. Information You Provide</Subheading>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-medium text-ink">Account Information</p>
              <p>
                Email address, username, password, authentication identifiers, and authentication-related information used
                to create, secure, and manage your account.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Profile Information</p>
              <p>Optional information such as display name, language preference, and app settings.</p>
            </div>
            <div>
              <p className="font-medium text-ink">Pantry Inventory Data</p>
              <p>
                Items you add manually or through confirmed scans, including item names, quantities, categories, notes,
                expiration dates, and edits you make during pantry confirmation.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Scan and Recognition Data</p>
              <p>
                Photos submitted for pantry, fridge, shopping bag, or item scanning; recognised item suggestions; confidence
                or recognition metadata where applicable; and your confirmations, edits, or rejections of recognised
                items.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Photo Data</p>
              <p>
                Photos captured through the App&apos;s camera or selected from your photo library for item recognition.
                Original uploaded photos are stored temporarily on Pantryx&apos;s backend for up to 24 hours for recognition,
                debugging, security, abuse prevention, and service reliability purposes, and are then automatically deleted.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Dietary, Allergy, and Health-Related Preferences</p>
              <p>
                You may choose to provide allergies, intolerances, dietary preferences, or health-related dietary
                information, such as nut allergy, lactose intolerance, vegan diet, keto diet, diabetes-related dietary
                preferences, celiac-related restrictions, or similar information. This information is optional and is used only
                to personalise, filter, or adjust recipe recommendations where possible.
              </p>
              <p>
                Because some of this information may reveal health-related data, we process it only with your explicit
                consent. You may edit or delete this information and withdraw your consent at any time through the App
                settings or by contacting us.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Recipe Interaction Data</p>
              <p>
                Recipes recommended to you, recipes you view, save, select, or cook, and cooking-step progress where this
                feature is available.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Support Requests</p>
              <p>Information you share when you contact us for support, feedback, questions, complaints, or privacy requests.</p>
            </div>
          </div>
        </div>
        <div>
          <Subheading>B. Information Collected Automatically</Subheading>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-medium text-ink">Device Information</p>
              <p>Device type, operating system, app version, language settings, device identifiers, and technical configuration.</p>
            </div>
            <div>
              <p className="font-medium text-ink">Usage Data</p>
              <p>
                Features used, screens viewed, scan frequency, recipe interaction events, settings changes, performance
                data, error logs, and crash-related information.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Log Data</p>
              <p>
                IP address, timestamps, server logs, authentication events, and security-related logs used for troubleshooting,
                fraud prevention, and service protection.
              </p>
            </div>
          </div>
        </div>
        <div>
          <Subheading>C. Payment Data</Subheading>
          <p>
            Pantryx does not currently offer paid subscriptions, in-app purchases, or premium paid features. We do not
            currently collect payment card information, subscription status, transaction IDs, or billing history.
          </p>
          <p>If paid features are introduced in the future, this Privacy Policy will be updated before such processing begins.</p>
        </div>
      </div>
    ),
  },
  {
    id: "purposes-legal-bases",
    title: "Purposes and Legal Bases for Processing",
    body: (
      <>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-subtle">
                <th className="border-b border-line px-4 py-3 font-medium text-ink" scope="col">
                  Purpose
                </th>
                <th className="border-b border-line px-4 py-3 font-medium text-ink" scope="col">
                  Data Used
                </th>
                <th className="border-b border-line px-4 py-3 font-medium text-ink" scope="col">
                  Legal Basis
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Provide the App and core features",
                  "Account data, pantry inventory, scan data, recipe interaction data",
                  "Contractual necessity",
                ],
                ["AI item recognition", "Submitted photos, scan metadata", "Contractual necessity"],
                [
                  "Pantry confirmation and inventory management",
                  "Pantry inventory, confirmations, edits",
                  "Contractual necessity",
                ],
                [
                  "Recipe recommendations",
                  "Confirmed pantry inventory, selected preferences, recipe interaction data",
                  "Contractual necessity",
                ],
                [
                  "Dietary and allergy personalisation",
                  "Allergy, intolerance, and health-related dietary information",
                  "Explicit consent under GDPR Article 9(2)(a), where applicable",
                ],
                [
                  "Account security and authentication",
                  "Account data, device data, log data",
                  "Contractual necessity / legitimate interest",
                ],
                [
                  "Customer support",
                  "Support request data, account data",
                  "Contractual necessity / legitimate interest",
                ],
                ["Product analytics and improvement", "Usage data, app events, device data", "Legitimate interest, with opt-out where required"],
                ["Crash reporting and debugging", "Error logs, crash data, device data", "Legitimate interest"],
                ["Legal compliance", "Relevant account, log, and request data", "Legal obligation"],
                [
                  "Marketing communications",
                  "Email address and marketing preferences",
                  "Consent, where required",
                ],
              ].map(([purpose, data, basis]) => (
                <tr key={purpose} className="border-t border-line">
                  <td className="px-4 py-3 align-top text-muted">{purpose}</td>
                  <td className="px-4 py-3 align-top text-muted">{data}</td>
                  <td className="px-4 py-3 align-top text-muted">{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Where we rely on legitimate interest, we balance our interests against your rights and freedoms.</p>
      </>
    ),
  },
  {
    id: "explicit-consent-health",
    title: "Explicit Consent for Allergy, Dietary, and Health-Related Data",
    body: (
      <>
        <p>
          Allergy, intolerance, medical diet, and health-related dietary information may qualify as special-category
          personal data under applicable data protection laws.
        </p>
        <p>
          Pantryx processes this information only if you choose to provide it and give explicit consent for Pantryx to use
          it for the specific purpose of personalising, filtering, or adjusting recipe recommendations.
        </p>
        <p>Before you enter allergy, intolerance, or health-related dietary information, the App will request explicit consent using wording substantially similar to:</p>
        <blockquote className="border-l-2 border-line pl-4 italic text-muted">
          I consent to Pantryx processing my allergy, intolerance, and health-related dietary information to personalise
          recipe recommendations. I understand that Pantryx is not a medical, nutritional, or allergen-management tool and
          that I must always verify product labels, ingredients, and suitability myself.
        </blockquote>
        <p>
          This consent must be given actively and will not be pre-selected. You may withdraw this consent at any time by
          deleting the relevant information, disabling dietary personalisation where available, or contacting us at{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          . Withdrawing consent does not affect processing that occurred before withdrawal.
        </p>
        <p>
          Pantryx is not a medical, nutritional, or allergen-management tool. Dietary personalisation is not a guarantee that
          recipes are allergen-free, medically appropriate, or safe for your individual circumstances. You must always verify
          product labels, ingredients, allergens, warnings, and recipe suitability yourself.
        </p>
      </>
    ),
  },
  {
    id: "camera-photo-ai",
    title: "Camera, Photo Data, and AI Item Recognition",
    body: (
      <>
        <p>
          Because Pantryx relies on visual recognition of items, we want to be clear about how photos and device
          permissions are handled.
        </p>
        <Subheading>When the camera is used</Subheading>
        <p>The camera is used only when you actively initiate a scan or upload a photo for item recognition.</p>
        <Subheading>iOS camera permission notice</Subheading>
        <p>
          The App may display a camera permission notice such as: &quot;Pantryx uses your camera to scan pantry, fridge, or
          grocery items so you can confirm your inventory and get recipe recommendations.&quot;
        </p>
        <Subheading>iOS photo library permission notice</Subheading>
        <p>
          The App may display a photo library permission notice such as: &quot;Pantryx lets you choose photos of pantry or
          grocery items for item recognition.&quot;
        </p>
        <Subheading>Where photos go</Subheading>
        <p>Photos are uploaded to Pantryx&apos;s backend for item recognition and temporary processing.</p>
        <Subheading>How long photos are stored</Subheading>
        <p>
          Original uploaded photos are retained on Pantryx&apos;s backend for up to 24 hours for recognition, debugging,
          security, abuse prevention, and service reliability purposes. After that period, original photos are automatically
          deleted.
        </p>
        <Subheading>AI item recognition model</Subheading>
        <p>
          Pantryx uses its own proprietary item recognition model and curated recognition data to analyse submitted photos
          and suggest recognised items for user confirmation. In the MVP version of the App, AI is used for item recognition
          only.
        </p>
        <Subheading>What is processed by the recognition model</Subheading>
        <p>Submitted photos and limited technical or contextual data needed to return recognition results.</p>
        <Subheading>What is not processed by the recognition model</Subheading>
        <p>
          Pantryx does not send your password, full account profile, unrelated personal data, or payment information to the
          recognition model.
        </p>
        <Subheading>Human access to photos</Subheading>
        <p>
          During the temporary retention period, photos may be processed by automated systems and, in rare cases,
          accessed by authorised personnel only where necessary for debugging, security, abuse prevention, or support.
        </p>
        <Subheading>Limitations</Subheading>
        <p>Item recognition may be inaccurate, incomplete, or misleading. You must review and confirm recognised items before relying on them.</p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "Data Sharing and Third-Party Processing",
    body: (
      <div className="space-y-6">
        <p>
          We do not sell, rent, or trade your personal information. We share personal data only where necessary to provide,
          secure, maintain, analyse, or improve the App, or where required by law.
        </p>
        <div>
          <Subheading>A. Service Providers and Tools</Subheading>
          <div className="mt-4 space-y-4 pb-8">
            <div>
              <p className="font-medium text-ink">Backend Application Framework — Vapor</p>
              <p>
                Vapor is the backend application framework used to power Pantryx&apos;s server-side application logic, API
                endpoints, authentication flows, and communication between the App, database, and Pantryx systems. Vapor is
                a software framework, not a third-party data processor by itself.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Database — Neon DB</p>
              <p>
                <strong className="text-ink">Purpose:</strong> Stores user accounts, confirmed pantry inventory, dietary
                and allergy preferences, saved recipes, recipe interaction data, app settings, and related structured app
                data.
              </p>
              <p>
                <strong className="text-ink">Data Processed:</strong> Account data, inventory data, dietary profile data,
                recipe interaction data, and related app records.
              </p>
              <p>
                <strong className="text-ink">Security:</strong> Access controls, encrypted transport, provider-level
                security controls, and application-level access restrictions.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Temporary Photo Processing — Pantryx Backend</p>
              <p>
                <strong className="text-ink">Purpose:</strong> Temporarily stores uploaded pantry, fridge, shopping bag, or
                item photos for AI item recognition and operational reliability.
              </p>
              <p>
                <strong className="text-ink">Retention:</strong> Original uploaded photos are retained for up to 24 hours and
                then automatically deleted.
              </p>
              <p>
                <strong className="text-ink">Access:</strong> Restricted to automated systems and authorised personnel only
                where necessary.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">AI Item Recognition — Pantryx Proprietary Model</p>
              <p>
                <strong className="text-ink">Purpose:</strong> Analyses submitted photos to suggest recognised items for user
                confirmation.
              </p>
              <p>
                <strong className="text-ink">Data Processed:</strong> Submitted photos and recognition metadata.
              </p>
              <p>
                <strong className="text-ink">External AI Provider:</strong> Pantryx does not currently use an external
                third-party AI model provider for recipe generation or cooking chat in the MVP version of the App.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Email Service — Resend</p>
              <p>
                <strong className="text-ink">Purpose:</strong> Sends transactional email such as account verification,
                password reset, support communication, and service-related notices. If marketing emails are introduced, they
                will be sent only where legally permitted and, where required, with consent.
              </p>
              <p>
                <strong className="text-ink">Data Processed:</strong> Email address, message delivery metadata, and email
                content required for delivery.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Analytics — PostHog</p>
              <p>
                <strong className="text-ink">Purpose:</strong> Helps us understand how users interact with Pantryx and improve
                product performance, usability, and feature quality.
              </p>
              <p>
                <strong className="text-ink">Data Processed:</strong> Usage events, feature interactions, app version, device
                type, operating system, and pseudonymised or anonymised user identifiers.
              </p>
              <p>
                <strong className="text-ink">Data Not Sent:</strong> Pantry photos, allergy profile, health-related dietary
                data, full pantry inventory, full recipe-step content, passwords, or payment information are not sent to
                PostHog.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Crash Reporting and Error Logs</p>
              <p>
                Pantryx does not currently use a named third-party crash reporting provider. The App and backend may process
                basic error logs, device model, operating system version, app version, and anonymised session identifiers for
                debugging, security, and service reliability.
              </p>
            </div>
          </div>
        </div>
        <div>
          <Subheading>B. Legal Requests and Safety</Subheading>
          <p>We may disclose personal data where necessary to:</p>
          <Bullets
            items={[
              "Comply with legal obligations, court orders, or valid regulatory requests.",
              "Enforce our Terms of Use.",
              "Investigate fraud, abuse, security incidents, or technical issues.",
              "Protect the rights, safety, and security of Pantryx, users, or others.",
            ]}
          />
        </div>
        <div>
          <Subheading>C. Aggregated and Anonymised Data</Subheading>
          <p>
            We may use aggregated or anonymised data for analytics, reporting, product improvement, and business planning.
            This data does not identify individual users.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    body: (
      <>
        <p>
          Some service providers may process personal data outside the European Economic Area (EEA), the United Kingdom, or
          your country of residence.
        </p>
        <p>
          Where required, we use appropriate safeguards such as Standard Contractual Clauses, adequacy decisions, contractual
          data protection obligations, and provider security commitments to protect transferred data.
        </p>
        <p>
          You may request more information about these safeguards by contacting{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "cookies-tracking",
    title: "Cookies and Tracking Technologies",
    body: (
      <>
        <p>
          The App itself may use local storage, device identifiers, or similar technologies to keep you signed in, remember
          preferences, maintain security, and support analytics.
        </p>
        <p>Our website, if available, may use cookies or similar technologies for:</p>
        <Bullets
          items={[
            "Essential functionality.",
            "Authentication and session security.",
            "Preference storage.",
            "Analytics, where permitted.",
            "Marketing, only with consent where required.",
          ]}
        />
        <p>
          You can manage browser cookies through your browser settings. You can manage App permissions through your device
          settings.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <>
        <p>
          We retain personal data only for as long as necessary for the purposes described in this Privacy Policy, unless a
          longer retention period is required or permitted by law.
        </p>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-subtle">
                <th className="border-b border-line px-4 py-3 font-medium text-ink" scope="col">
                  Data Category
                </th>
                <th className="border-b border-line px-4 py-3 font-medium text-ink" scope="col">
                  Retention Period
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Account information", "Until account deletion or as required for legal/security purposes"],
                ["Pantry inventory", "Until you delete items or delete your account"],
                [
                  "Dietary, allergy, and health-related preferences",
                  "Until you edit/delete them, withdraw consent, or delete your account",
                ],
                [
                  "Recipe interaction data",
                  "Until you delete your account or the data is no longer needed for the App",
                ],
                ["Original uploaded pantry/item photos", "Up to 24 hours, then automatically deleted"],
                [
                  "Recognition metadata",
                  "Retained as part of scan/inventory records where needed for the App; recognition metadata does not include original uploaded photos after the 24-hour deletion period",
                ],
                ["Support communications", "Up to 12 months unless needed longer for legal, security, or dispute purposes"],
                [
                  "Security logs",
                  "Retained for a limited period necessary for security, debugging, and abuse prevention",
                ],
                ["Backups", "Stored securely and deleted or overwritten according to backup cycles, generally within 90 days unless required by law"],
                ["Payment data", "Not currently collected"],
              ].map(([cat, period]) => (
                <tr key={cat} className="border-t border-line">
                  <td className="px-4 py-3 align-top text-muted">{cat}</td>
                  <td className="px-4 py-3 align-top text-muted">{period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          When you request account deletion, we delete or anonymise personal data unless retention is required for legal
          compliance, security, fraud prevention, dispute resolution, or legitimate business records.
        </p>
      </>
    ),
  },
  {
    id: "privacy-rights",
    title: "Your Privacy Rights",
    body: (
      <>
        <p>Depending on your location, you may have the following rights:</p>
        <Bullets
          items={[
            "Access: Request a copy of personal data we hold about you.",
            "Rectification: Request correction of inaccurate or incomplete data.",
            "Erasure: Request deletion of your personal data.",
            "Restriction: Request that we limit processing of your data in certain circumstances.",
            "Portability: Request a copy of your data in a structured, commonly used, machine-readable format.",
            "Objection: Object to processing based on legitimate interests or direct marketing.",
            "Withdraw Consent: Withdraw consent where processing is based on consent, including explicit consent for dietary or health-related data.",
            "Complaint: Lodge a complaint with your local data protection authority.",
          ]}
        />
        <p>
          To exercise your rights, contact us at{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          . We may need to verify your identity before processing your request.
        </p>
        <p>
          We aim to respond to privacy requests within 30 days. For complex requests, this period may be extended where
          permitted by law, and we will notify you if this happens.
        </p>
      </>
    ),
  },
  {
    id: "user-controls",
    title: "User Controls",
    body: (
      <>
        <p>You can control your data in the following ways:</p>
        <Bullets
          items={[
            "Edit or delete pantry inventory items inside the App.",
            "Edit or delete dietary and allergy preferences inside the App where available.",
            "Withdraw consent for dietary personalisation by deleting relevant profile information or contacting us.",
            "Delete your account through the in-app account deletion feature or by contacting us.",
            "Manage camera and photo library permissions through your device settings.",
            "Unsubscribe from marketing emails through the link in the email, where applicable.",
          ]}
        />
        <Subheading>In-App Account Deletion</Subheading>
        <p>
          If you create an account, Pantryx provides an in-app account deletion option. The account deletion flow allows you
          to request deletion of your account and associated personal data from inside the App.
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
    id: "security",
    title: "Security Measures",
    body: (
      <>
        <p>We use reasonable technical and organisational measures to protect personal data, including:</p>
        <Bullets
          items={[
            "TLS encryption for data in transit.",
            "Password hashing using industry-standard methods such as bcrypt or argon2.",
            "Access controls for backend and database systems.",
            "Restricted administrative access.",
            "Logging and monitoring for security and operational issues.",
            "Separation of user data from analytics where possible.",
            "Temporary photo retention limited to up to 24 hours.",
          ]}
        />
        <p>
          No system can guarantee 100% security. You should use a strong, unique password and keep your device and App
          updated.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: (
      <>
        <p>Pantryx is not directed to children under 16. We do not knowingly collect personal data from children under 16.</p>
        <p>
          If we become aware that we have collected personal data from a child under 16 without appropriate consent, we will
          take reasonable steps to delete it. If you believe this has happened, contact{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "california",
    title: "California Privacy Rights",
    body: (
      <>
        <p>
          If you are a California resident, you may have rights under the California Consumer Privacy Act (CCPA) and
          California Privacy Rights Act (CPRA), including the right to know, access, delete, correct, and opt out of certain
          uses of personal information.
        </p>
        <p>
          Pantryx does not sell personal information and does not share personal information for cross-context behavioural
          advertising.
        </p>
        <p>
          To exercise California privacy rights, contact{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          . We may need to verify your identity before processing your request.
        </p>
      </>
    ),
  },
  {
    id: "dpo",
    title: "Data Protection Officer and Supervisory Authority",
    body: (
      <>
        <p>
          Pantryx is a small independent app and does not currently have a formally appointed Data Protection Officer (DPO).
          Privacy-related enquiries and data subject requests are handled directly by Pantryx at{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
        <p>
          If you are located in the EEA or UK and believe we have not handled your data in accordance with applicable law,
          you have the right to lodge a complaint with your local data protection authority. We would appreciate the
          opportunity to address your concerns directly before you contact a supervisory authority.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in the App, data practices, providers, legal
          requirements, or business operations.
        </p>
        <p>
          Material changes may be communicated through in-app notifications, email, or policy update banners. The updated
          Privacy Policy will become effective on the date stated in the updated version.
        </p>
        <p>If you do not agree with the updated Privacy Policy, you should stop using the App and may request account deletion.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>For privacy questions, data requests, or complaints, contact:</p>
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
