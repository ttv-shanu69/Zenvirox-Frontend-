// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us – BreakLife News",
  description:
    "Learn about BreakLife News — your trusted source for insights on wellness, stress relief, home maintenance, and mindful living.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-700">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="border-b border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-start mb-6">
            <div className="w-12 h-0.5 bg-[#35928d]"></div>
          </div>
          <p className="text-xs font-semibold tracking-[3px] uppercase text-[#35928d] mb-4">
            About BreakLife News
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
            Insight. Clarity. <span className="text-[#35928d]">Wellness.</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
            BreakLife News is an independent digital publication dedicated to sharp,
            well-researched storytelling across wellness, stress relief, home maintenance,
            and mindful living.
          </p>
        </div>
      </section>

      {/* ── MISSION ────────────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-6">Our Mission</h2>
          <div className="space-y-4 text-gray-500 leading-relaxed text-[15px]">
            <p>
              Most online content is either too shallow to trust or too dense to
              enjoy. BreakLife News bridges that gap — delivering thoughtful, accessible
              writing that respects your intelligence and your time.
            </p>
            <p>
              Our philosophy is simple: every story must earn your attention. We
              research deeply, write clearly, and cover topics that matter to
              curious, health-conscious people.
            </p>
            <p>
              Whether you're someone managing daily stress, a homeowner looking for 
              maintenance tips, or simply seeking a more mindful life — BreakLife News 
              is your thinking companion.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-10">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {[
              { value: "50+", label: "Articles" },
              { value: "6", label: "Categories" },
              { value: "2024", label: "Founded" },
              { value: "10K+", label: "Readers" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-8 text-center">
                <p className="text-3xl font-bold text-[#35928d] mb-1">{s.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-10">What We Stand For</h2>
          <div className="space-y-0 divide-y divide-gray-100">
            {[
              {
                title: "Accuracy First",
                desc: "Every claim is fact-checked and backed by credible sources. We never publish speculation as truth.",
              },
              {
                title: "Quality Writing",
                desc: "Good ideas deserve great execution. Our writers craft each piece with clarity, structure, and flow.",
              },
              {
                title: "Holistic Wellness",
                desc: "From stress management to home care — true wellness covers every aspect of life.",
              },
              {
                title: "Reader Privacy",
                desc: "No spam, no aggressive tracking, no selling your data. You're a reader, not a product.",
              },
              {
                title: "Consistent Delivery",
                desc: "Fresh, regularly published content so there's always something worth reading.",
              },
            ].map((v, i) => (
              <div key={i} className="py-6 flex gap-6 items-start">
                <span className="text-[#35928d] font-mono text-sm mt-0.5 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-black font-semibold text-[15px] mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────── */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-10">The Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "✍️",
                name: "Editorial",
                role: "Editor in Chief",
                desc: "Sets the vision and ensures every article meets BreakLife News's quality bar.",
              },
              {
                emoji: "🔍",
                name: "Research",
                role: "Research & Fact-Check",
                desc: "Digs deep, verifies facts, and builds the factual foundation writers rely on.",
              },
              {
                emoji: "🎨",
                name: "Design",
                role: "Creative & UX",
                desc: "Crafts the clean, readable experience you enjoy across every device.",
              },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <div className="text-3xl mb-4">{t.emoji}</div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[#35928d] mb-1">
                  {t.role}
                </p>
                <h3 className="text-black font-semibold text-base mb-2">{t.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#35928d]/5 to-transparent rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-black mb-1">
                Ready to explore?
              </h2>
              <p className="text-gray-500 text-sm">
                Browse our latest articles or get in touch with us.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/"
                className="bg-[#35928d] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2a7a76] transition-colors"
              >
                Read Articles
              </Link>
              <Link
                href="/contact"
                className="border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-lg hover:border-[#35928d] hover:text-[#35928d] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}