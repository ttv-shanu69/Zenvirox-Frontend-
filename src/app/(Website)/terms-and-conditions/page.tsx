// app/privacy-policy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy – BreakLife News",
  description: "Read BreakLife News's Privacy Policy to understand how we collect, use, and protect your personal information.",
};

// TypeScript interfaces
interface ContentBlock {
  type: string;
  text?: string;
  items?: string[];
}

interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

// Sections data with proper typing
const SECTIONS: Section[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      {
        type: "p",
        text: "We collect information in two ways: directly from you, and automatically through your use of the site.",
      },
      {
        type: "subheading",
        text: "Information you provide:",
      },
      {
        type: "ul",
        items: [
          "Newsletter subscriptions — your email address when you sign up.",
          "Contact form submissions — your name, email, and message content.",
          "Feedback or comments you voluntarily share.",
        ],
      },
      {
        type: "subheading",
        text: "Automatically collected:",
      },
      {
        type: "ul",
        items: [
          "Usage data — pages visited, time spent, article views.",
          "Device info — browser type, OS, screen resolution.",
          "IP address — used for geographic analytics and security.",
          "Referral sources — how you arrived at our site.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      {
        type: "p",
        text: "We use collected information solely to operate and improve Zenvirox:",
      },
      {
        type: "ul",
        items: [
          "Delivering newsletters and content updates to opt-in subscribers.",
          "Responding to your messages and feedback.",
          "Analyzing readership trends to improve content quality.",
          "Improving website performance and user experience.",
          "Preventing spam, abuse, and unauthorized access.",
          "Complying with applicable legal obligations.",
        ],
      },
      {
        type: "callout",
        text: "We do not sell, rent, or trade your personal information. Your data is used exclusively to run and improve BreakLife News.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: [
      {
        type: "p",
        text: "Zenvirox uses cookies and similar technologies to improve your experience and analyze traffic. Cookies are small files stored on your device.",
      },
      {
        type: "ul",
        items: [
          "Essential cookies — required for the site to function. Cannot be disabled.",
          "Analytics cookies — help us understand how visitors use the site.",
          "Preference cookies — remember settings like your newsletter status.",
        ],
      },
      {
        type: "p",
        text: "You can manage cookies through your browser settings. Disabling some cookies may affect site functionality.",
      },
    ],
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    content: [
      {
        type: "p",
        text: "We use trusted third-party services to operate Zenvirox. These services may process data per their own privacy policies:",
      },
      {
        type: "ul",
        items: [
          "Cloudinary — hosts and serves article images.",
          "Analytics platforms — anonymous traffic analysis.",
          "Newsletter platforms — subscription and email delivery management.",
          "Cloud hosting providers — website infrastructure.",
        ],
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Disclosure",
    content: [
      {
        type: "p",
        text: "We do not share your personal data except in these circumstances:",
      },
      {
        type: "ul",
        items: [
          "Service providers — vendors who help operate the website, bound by confidentiality agreements.",
          "Legal requirements — when required by law, court order, or government authority.",
          "Protection of rights — to protect the safety or property of BreakLife News or its users.",
          "Business transfer — in the event of a merger or acquisition.",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      {
        type: "ul",
        items: [
          "Newsletter subscribers — retained until you unsubscribe.",
          "Contact form data — retained for up to 12 months, then deleted.",
          "Analytics data — retained in anonymized form for up to 24 months.",
        ],
      },
      {
        type: "p",
        text: "Upon request, we will delete your personal data where we have no lawful basis to retain it.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      {
        type: "p",
        text: "Depending on your location, you may have the following rights regarding your personal data:",
      },
      {
        type: "ul",
        items: [
          "Access — request a copy of data we hold about you.",
          "Correction — request correction of inaccurate data.",
          "Deletion — request deletion of your personal data.",
          "Opt-out — unsubscribe from marketing at any time.",
          "Portability — receive your data in a machine-readable format.",
          "Objection — object to certain types of data processing.",
        ],
      },
      {
        type: "callout",
        text: "To exercise any of these rights, contact us. We respond to all verified requests within 30 days.",
      },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    content: [
      {
        type: "p",
        text: "We implement reasonable security measures to protect your information:",
      },
      {
        type: "ul",
        items: [
          "HTTPS encryption for all data transmitted to and from our servers.",
          "Access controls limiting who can view personal data.",
          "Regular reviews of our systems and third-party integrations.",
        ],
      },
      {
        type: "p",
        text: "No method of storage or transmission is 100% secure. If you have security concerns, please contact us immediately.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: [
      {
        type: "p",
        text: "Zenvirox is not directed at children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with information, contact us and we will delete it promptly.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      {
        type: "p",
        text: "We may update this policy from time to time. When we make material changes, we will update the 'Last Updated' date at the top of this page. Continued use of Zenvirox after changes are posted constitutes acceptance of the updated policy.",
      },
    ],
  },
];

// RenderContent component with proper typing
function RenderContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === "p")
          return (
            <p key={i} className="text-gray-500 text-sm leading-relaxed">
              {block.text}
            </p>
          );
        if (block.type === "subheading")
          return (
            <p key={i} className="text-gray-700 text-sm font-semibold mt-4">
              {block.text}
            </p>
          );
        if (block.type === "ul" && block.items)
          return (
            <ul key={i} className="space-y-2 mt-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-sm text-gray-500">
                  <span className="text-[#35928d] mt-px shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        if (block.type === "callout")
          return (
            <div
              key={i}
              className="border-l-2 border-[#35928d] bg-gray-50 px-4 py-3 mt-3 rounded-r-lg"
            >
              <p className="text-gray-600 text-sm leading-relaxed">{block.text}</p>
            </div>
          );
        return null;
      })}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="border-b border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-start mb-6">
            <div className="w-12 h-0.5 bg-[#35928d]"></div>
          </div>
          <p className="text-xs font-semibold tracking-[3px] uppercase text-[#35928d] mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <span>
              Last Updated:{" "}
              <span className="text-gray-500">April 30, 2026</span>
            </span>
            <span>
              Effective:{" "}
              <span className="text-gray-500">April 30, 2026</span>
            </span>
            <span className="text-gray-500">~5 min read</span>
          </div>
        </div>
      </section>

      {/* ── LAYOUT ─────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-16 grid md:grid-cols-[200px_1fr] gap-12 items-start">

        {/* TOC */}
        <aside className="hidden md:block sticky top-20">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">
            Contents
          </p>
          <nav className="space-y-0.5">
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 py-1.5 text-xs text-gray-500 hover:text-[#35928d] transition-colors"
              >
                <span className="text-gray-300 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            ))}
            <a
              href="#contact-privacy"
              className="flex items-center gap-2 py-1.5 text-xs text-gray-500 hover:text-[#35928d] transition-colors"
            >
              <span className="text-gray-300 font-mono">—</span>
              Contact Us
            </a>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {/* Intro callout */}
          <div className="border border-gray-100 border-l-2 border-l-[#35928d] bg-gray-50 px-5 py-4 mb-12 rounded-r-lg">
            <p className="text-gray-500 text-sm leading-relaxed">
              This Privacy Policy explains how{" "}
              <span className="text-black font-medium">BreakLife News</span> ("we", "our", or
              "us") collects, uses, and protects your personal information when
              you visit our website. By using our website, you agree to the practices described below.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section, i) => (
              <div key={section.id} id={section.id}>
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <span className="text-[10px] font-mono text-[#35928d] bg-[#35928d]/10 border border-[#35928d]/20 px-2 py-1 rounded">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-black font-semibold text-lg">
                    {section.title}
                  </h2>
                </div>
                <RenderContent blocks={section.content} />
              </div>
            ))}

            {/* Contact section */}
            <div id="contact-privacy">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <span className="text-[10px] font-mono text-[#35928d] bg-[#35928d]/10 border border-[#35928d]/20 px-2 py-1 rounded">
                  —
                </span>
                <h2 className="text-black font-semibold text-lg">
                  Contact Us
                </h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                If you have questions, concerns, or data requests relating to
                this Privacy Policy, please reach out:
              </p>
              <div className="border border-gray-100 bg-gray-50 p-6 rounded-xl space-y-3">
                <p className="text-black font-semibold text-sm">
                  BreakLife News Privacy
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500">
                    Email:{" "}
                    <a
                      href="mailto:zenvirox@gmail.com"
                      className="text-[#35928d] hover:underline"
                    >
                      zenviox@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-500">
                    Website:{" "}
                    <a
                      href="https://zenvirox.com"
                      className="text-[#35928d] hover:underline"
                    >
                      zenvirox.net
                    </a>
                  </p>
                  <p className="text-gray-500">
                    Contact Form:{" "}
                    <Link
                      href="/contact"
                      className="text-[#35928d] hover:underline"
                    >
                      Contact Page
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}