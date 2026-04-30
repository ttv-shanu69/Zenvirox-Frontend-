"use client";
// app/contact/page.tsx
import { useState } from "react";
import Link from "next/link";

// TypeScript interfaces
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  label: string;
  value: string;
  href?: string;
}

interface SocialLink {
  label: string;
  href: string;
}

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.subject || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const contactInfo: ContactInfo[] = [
    { label: "Email", value: "zenvirox@gmail.com", href: "mailto:zenvirox@gmail.com" },
    { label: "Response Time", value: "Within 24–48 hrs" },
    { label: "Based", value: "Remote — worldwide" },
  ];

  const socialLinks: SocialLink[] = [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ];

  const faqItems: FaqItemProps[] = [
    {
      question: "How do I unsubscribe from the newsletter?",
      answer: "Every email includes a one-click unsubscribe link at the bottom. You can also email us and we'll remove you manually.",
    },
    {
      question: "I found a factual error in an article. What should I do?",
      answer: "We take accuracy seriously. Contact us with the article URL and the details — we review all reports and issue corrections promptly.",
    },
  ];

  const subjectOptions = [
    "General Inquiry",
    "Content Feedback",
    "Story Tip / Suggestion",
    "Partnership / Collaboration",
    "Advertising",
    "Technical Issue",
    "Other",
  ];

  const INPUT_STYLES =
    "w-full bg-white border border-gray-200 rounded-lg text-gray-900 text-sm px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-[#35928d] focus:ring-2 focus:ring-[#35928d]/20 transition-all";

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="border-b border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-start mb-6">
            <div className="w-12 h-0.5 bg-[#35928d]"></div>
          </div>
          <p className="text-xs font-semibold tracking-[3px] uppercase text-[#35928d] mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
            Get in <span className="text-[#35928d]">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
            Questions, feedback, story tips, or partnership inquiries — we read
            every message and reply within 48 hours.
          </p>
        </div>
      </section>

      {/* ── BODY ───────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto grid md:grid-cols-[1fr_2fr] gap-12">

          {/* Left — contact info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Contact Info
              </p>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="border-b border-gray-100 pb-5">
                    <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#35928d] text-sm hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#35928d] hover:text-[#35928d] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="border border-gray-100 rounded-xl p-10 text-center bg-gray-50">
                <div className="text-3xl mb-4">✓</div>
                <h3 className="text-black font-semibold text-lg mb-2">
                  Message Sent
                </h3>
                <p className="text-gray-500 text-sm">
                  Thanks for reaching out. We'll get back to you within 24–48
                  business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">
                      First Name <span className="text-[#35928d]">*</span>
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={INPUT_STYLES}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={INPUT_STYLES}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    Email <span className="text-[#35928d]">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={INPUT_STYLES}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    Subject <span className="text-[#35928d]">*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={INPUT_STYLES}
                  >
                    <option value="" disabled>
                      Select a topic…
                    </option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    Message <span className="text-[#35928d]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what's on your mind…"
                    className={`${INPUT_STYLES} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#35928d] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#2a7a76] transition-colors"
                >
                  Send Message
                </button>

                <p className="text-center text-gray-400 text-xs">
                  Your information is kept private and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-12 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-black mb-8">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-100">
            {faqItems.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

// FAQ Item Component with TypeScript
function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left gap-4"
      >
        <span className="text-gray-700 text-sm font-medium">{question}</span>
        <span className="text-gray-400 text-xs shrink-0">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">{answer}</p>
      )}
    </div>
  );
}