"use client";

import { useState } from "react";
import { studio, packages } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";

export default function Services() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedPkg = packages.find((p) => p.id === selected);

  async function handleCheckout() {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selected }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please email us at hello@studiorocinante.com");
      }
    } catch {
      alert("Something went wrong. Please email us at hello@studiorocinante.com");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="paper-grain min-h-screen bg-paper text-ink">

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pb-24">

        {/* Hero */}
        <section className="py-14 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Services</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Your online presence,<br />handled.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            We set everything up and keep it running.
            <br className="hidden min-[420px]:inline" /> You focus on the business.
          </p>
        </section>

        {/* Packages */}
        <section className="border-t border-ink/10 pt-12">
          <div className="grid gap-6 sm:grid-cols-3 sm:[grid-template-rows:repeat(9,auto)] items-stretch">
            {packages.map((pkg) => {
              const isSelected = selected === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className="grid justify-items-center h-full sm:row-span-9 sm:[grid-template-rows:subgrid]"
                >
                  <div className="mb-2 h-5 flex items-center justify-center gap-2">
                    {pkg.save && (
                      <>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-coral">· Recommended ·</span>
                      </>
                    )}
                  </div>
                <button
                  onClick={() => setSelected(isSelected ? null : pkg.id)}
                  className={`grid justify-items-center gap-y-5 px-6 py-8 text-center transition-all duration-150 rounded-2xl w-full sm:row-span-8 sm:[grid-template-rows:subgrid] ${
                    isSelected
                      ? "border-2 border-ink bg-paper-warm"
                      : pkg.save
                      ? "border border-ink/15 bg-paper-warm/60 hover:border-ink/30"
                      : "border border-transparent hover:border-ink/20"
                  }`}
                >
                  {/* Name */}
                  <h2 className="font-serif text-xl font-semibold flex items-start justify-center text-center">{pkg.name}</h2>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-ink-soft/50 flex items-start justify-center">{pkg.description}</p>

                  {/* Divider */}
                  <div className="w-full border-t border-ink/10 self-center" />

                  {/* Price */}
                  <div className="flex flex-col justify-center items-center">
                    {pkg.save && (
                      <span className="font-mono text-xs text-ink-soft/50 line-through">
                        ${pkg.monthly + Math.round(pkg.save / 12)}/mo
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-semibold">${pkg.monthly}</span>
                      <span className="text-sm text-ink-soft">/mo</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-ink/10 self-center" />

                  {/* Includes */}
                  <ul className="flex flex-col gap-3 text-left w-full">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className={`flex gap-2.5 text-sm text-ink-soft ${
                          item === "Custom cards to spark genuine reviews" ? "font-semibold text-ink" : ""
                        }`}
                      >
                        <span className="shrink-0 text-accent-coral mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Save badge */}
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-coral">
                    {pkg.save ? `Save $${pkg.save}/year` : ""}
                  </p>

                  {/* Selection dot */}
                  <div className="flex flex-col items-center gap-2 justify-end pt-6">
                    <div className={`h-3 w-3 rounded-full border transition-all ${
                      isSelected ? "border-ink bg-ink" : "border-ink/30"
                    }`} />
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                      {isSelected ? "Selected" : "Select"}
                    </p>
                  </div>
                </button>
                </div>
              );
            })}
          </div>

        </section>

        {/* FAQ */}
        <section className="border-t border-ink/10 mt-16 pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft mb-8">Common questions</p>
          <dl className="flex flex-col gap-8">
            {[
              {
                q: "What if I want to stop?",
                a: "Cancel anytime. No lock-in.",
              },
              {
                q: "Do I own the website?",
                a: "It's leased. Yours after 12 months, or buy out anytime.",
              },
              {
                q: "How long until I see results?",
                a: "Setup takes 1–2 weeks. Google ranking improves over the first 3–6 months.",
              },
              {
                q: "What do you need from me?",
                a: "Your business details and access to your Google account.",
              },
              {
                q: "I already have a Google listing / website — can you just take over from here?",
                a: "Yes. We take over what's there, clean it up, and keep it running from wherever it currently stands.",
              },
              {
                q: "What if I don't like the design?",
                a: "You see a draft before anything goes live. Tell us what you like and what you don't, and we customize it to your liking.",
              },
              {
                q: "Do you handle bad reviews too?",
                a: "Yes. We respond to every review, good or bad, and step in fast if fake reviews show up.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-serif text-base font-semibold">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact */}
        <section className="border-t border-ink/10 mt-16 pt-12 text-center">
          <p className="text-sm text-ink-soft">
            Still have questions?{" "}
            <a href={`mailto:${studio.email}`} className="text-ink underline underline-offset-4 hover:text-ink-soft">
              {studio.email}
            </a>
          </p>
        </section>

      </main>

      {/* Floating checkout bar */}
      <div className={`fixed bottom-0 left-0 right-0 border-t border-ink/10 bg-paper transition-all duration-300 ${
        selectedPkg ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="mx-auto max-w-3xl flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-serif text-base font-semibold">{selectedPkg?.name}</p>
            <p className="font-mono text-xs text-ink-soft mt-0.5">
              ${selectedPkg?.monthly}/mo
            </p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-ink text-paper px-6 py-2.5 text-sm font-medium tracking-wide rounded-full transition-colors hover:bg-ink-soft disabled:opacity-50"
          >
            {loading ? "Loading..." : "Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
}
