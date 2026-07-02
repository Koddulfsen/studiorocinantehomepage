"use client";

import Link from "next/link";
import { useState } from "react";
import { studio } from "@/lib/content";

const packages = [
  {
    id: "gbp",
    name: "Google Maps Visibility",
    setup: 129,
    monthly: 49,
    description: "Show up when people search nearby.",
    includes: [
      "Google Maps profile set up & optimised",
      "Listed on Google, Yelp, TripAdvisor, Facebook & more",
      "Custom review incentive cards delivered to your business",
      "Listing monitored & protected",
      "Monthly report",
    ],
  },
  {
    id: "web",
    name: "Website & Hosting",
    setup: 299,
    monthly: 99,
    description: "Custom branded website. Hosted, maintained.",
    includes: [
      "Custom website designed & built",
      "Domain & hosting included",
      "Fast, mobile-friendly & always online",
      "Free content updates anytime",
      "Leased monthly — fully yours after 12 months",
    ],
  },
  {
    id: "full",
    name: "Full Online Presence",
    setup: 399,
    monthly: 129,
    save: 257,
    description: "Everything. One price.",
    includes: [
      "Google Maps profile set up & optimised",
      "Listed everywhere that matters",
      "Custom website designed & built",
      "Domain & hosting included",
      "Review cards + monthly report",
    ],
  },
];

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
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="paper-grain min-h-screen bg-paper text-ink">

      {/* Header */}
      <header>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
            Studio Rocinante
          </Link>
          <nav className="flex items-center gap-5 sm:gap-7">
            <a href="/#work" className="text-sm text-ink-soft transition-colors hover:text-ink">Work</a>
            <a href="/#contact" className="text-sm text-ink-soft transition-colors hover:text-ink">Contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24">

        {/* Hero */}
        <section className="py-14 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Services</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Your online presence,<br />handled.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            We set everything up and keep it running. You focus on the business.
          </p>
        </section>

        {/* Packages */}
        <section className="border-t border-ink/10 pt-12">
          <div className="grid gap-6 sm:grid-cols-3 items-stretch">
            {packages.map((pkg) => {
              const isSelected = selected === pkg.id;
              const perDay = (pkg.monthly / 30).toFixed(2);
              return (
                <div key={pkg.id} className="flex flex-col h-full">
                  <div className="mb-2 h-5 flex items-center justify-center gap-2">
                    {pkg.save && (
                      <>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-deep">· Recommended ·</span>
                      </>
                    )}
                  </div>
                <button
                  onClick={() => setSelected(isSelected ? null : pkg.id)}
                  className={`flex flex-col gap-0 p-8 text-center items-center transition-all duration-150 border flex-1 ${
                    isSelected
                      ? "border-ink bg-paper-warm"
                      : pkg.save
                      ? "border-ink/15 bg-paper-warm/60 hover:border-ink/30"
                      : "border-transparent hover:border-ink/20"
                  }`}
                >
                  {/* Name */}
                  <h2 className="font-serif text-xl font-semibold h-14 flex items-start justify-center text-center">{pkg.name}</h2>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-ink-soft/50 h-10 flex items-start justify-center">{pkg.description}</p>

                  {/* Divider */}
                  <div className="w-full border-t border-ink/10 my-5" />

                  {/* Price */}
                  <div className="h-20 flex flex-col justify-center items-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft mb-1">${pkg.setup} setup</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-semibold">${pkg.monthly}</span>
                      <span className="text-sm text-ink-soft">/mo</span>
                    </div>
                    <p className="font-mono text-[10px] text-ink-soft/60 mt-1">${perDay}/day</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-ink/10 my-5" />

                  {/* Includes */}
                  <ul className="flex flex-col gap-3 text-left w-full">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                        <span className="shrink-0 text-gold-deep mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Save badge */}
                  {pkg.save && (
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-deep">
                      Save ${pkg.save}/year
                    </p>
                  )}

                  {/* Selection dot */}
                  <div className="mt-auto flex justify-center pt-6">
                    <div className={`h-3 w-3 rounded-full border transition-all ${
                      isSelected ? "border-ink bg-ink" : "border-ink/30"
                    }`} />
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
                a: "Setup takes 1–2 weeks. Google ranking improves over the first 1–3 months.",
              },
              {
                q: "What do you need from me?",
                a: "Your business details and access to your Google account. Takes 10 minutes.",
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
              ${selectedPkg?.setup} setup · ${selectedPkg?.monthly}/mo
            </p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-ink text-paper px-6 py-2.5 text-sm font-medium tracking-wide transition-colors hover:bg-ink-soft disabled:opacity-50"
          >
            {loading ? "Loading..." : "Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
}
