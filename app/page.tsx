import Link from "next/link";
import Image from "next/image";
import { WorkCardStack } from "@/components/WorkCardStack";
import { FreeAuditForm } from "@/components/free-audit";
import { SiteHeader } from "@/components/SiteHeader";
import {
  studio,
  services,
  work,
  process,
  promises,
  packages,
  keyStats,
  about,
  journey,
} from "@/lib/content";
import { SketchIcon } from "@/components/sketch";


// Stripped-back, single-surface layout: one cream + paper-grain background
// throughout, hairline dividers, plain type. Structure kept, styling removed.

export default function Main() {
  return (
    <div className="paper-grain min-h-screen overflow-x-hidden bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative sm:py-28 md:grid md:grid-cols-1 md:items-center md:min-h-[33rem]">
          {/* windmill — in normal flow on mobile, so its own natural height IS the section's
              height (no guessing min-heights); text overlays on top of it. Taken out of
              flow at md so it can bleed upward into the header without affecting scroll height. */}
          <div className="pointer-events-none md:absolute md:inset-y-0 md:right-0 md:flex md:min-w-0 md:items-center md:overflow-visible">
            <Image
              src="/windmill.png"
              alt="A hand-drawn windmill"
              width={600}
              height={600}
              priority
              className="-ml-38 -mt-25 h-auto w-[calc(150vw-80px)] max-w-none shrink-0 mix-blend-multiply opacity-[0.18] sm:ml-0 sm:mt-0 sm:w-[calc(100vw-160px)] sm:mx-auto md:ml-0 md:mt-0 md:block md:w-[85%] md:-translate-y-24 md:scale-[1.6] md:opacity-[0.18]"
            />
          </div>

          {/* text — overlaid on the windmill on mobile; sole column on desktop */}
          <div className="absolute inset-x-0 bottom-[80px] z-10 text-right md:static md:translate-y-[70px]">
            <div className="relative ml-auto w-fit">
              {/* halo glow behind the title, separates it from the windmill on small breakpoints only */}
              <div className="pointer-events-none absolute -inset-4 z-0 rounded-xl bg-paper opacity-100 blur-md" />
              <div className="relative z-10 flex translate-x-4 justify-center">
                <SketchIcon name="mappin" size={40} className="text-accent-coral opacity-60" />
              </div>
              <h1 className="relative z-10 mt-1 font-serif font-semibold leading-tight tracking-tight">
                <span className="block whitespace-nowrap text-2xl sm:text-3xl">Get found on</span>
                <span className="block whitespace-nowrap text-3xl sm:text-4xl">
                  <span className="relative inline-block">
                    <span className="absolute inset-x-0 bottom-1 h-3 bg-accent-teal/30" />
                    <span className="relative">Google Maps</span>
                  </span>
                </span>
              </h1>
            </div>

            <div className="relative z-20 mt-6 flex justify-end">
              <a
                href="#audit"
                className="inline-block rounded-full bg-accent-teal px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105"
              >
                Free Audit →
              </a>
            </div>

            <div className="relative mt-4 ml-auto w-fit">
              <div className="pointer-events-none absolute -inset-4 z-0 rounded-xl bg-paper opacity-100 blur-md" />
              <a
                href="/services"
                className="relative z-10 inline-block text-sm font-medium underline decoration-1 underline-offset-4 hover:text-accent-coral"
              >
                See packages →
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust strip · full width ───────────────────────────────────────── */}
        <section className="relative left-1/2 w-screen -translate-x-1/2 whitespace-nowrap bg-accent-teal py-4">
          <ul className="flex items-center justify-center gap-4">
            {promises.map((p, i) => (
              <li key={p} className="flex items-center gap-4">
                {i > 0 && <span className="text-white/40">·</span>}
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-white">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Stakes ─────────────────────────────────────────────────────── */}
        <section className="border-t border-ink/10 py-12 sm:py-24">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="text-right sm:order-last">
              <p
                className="font-serif text-9xl font-bold italic leading-none text-ink opacity-60 sm:text-[10rem]"
                style={{ textShadow: "4px 4px 0 rgba(181, 86, 106, 0.4)" }}
              >
                {keyStats[0].value}
              </p>
              <p className="ml-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
                of customers <strong className="font-semibold text-ink">read reviews</strong> before choosing a local business.
              </p>
              <p className="mt-2 font-mono text-[11px] text-ink-soft/70">
                Source: {keyStats[0].source}
              </p>
            </div>
            <div className="text-left sm:order-first">
              <p
                className="font-serif text-9xl font-bold italic leading-none text-ink opacity-60 underline decoration-wavy decoration-[10px] underline-offset-[-8px] sm:text-[10rem]"
                style={{ textDecorationColor: "rgba(43, 107, 104, 0.35)", textDecorationSkipInk: "none" }}
              >
                {keyStats[1].value}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">more clicks</strong> for businesses with a complete Google Business Profile.
              </p>
              <p className="mt-2 font-mono text-[11px] text-ink-soft/70">
                Source: {keyStats[1].source}
              </p>
            </div>
          </div>
        </section>

        {/* ── Services ───────────────────────────────────────────────────── */}
        <section id="services" className="border-t border-ink/10 py-12 sm:py-24">
          <h2 className="text-center font-mono text-sm font-medium uppercase tracking-widest text-ink-soft">
            What we do.
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:[grid-template-rows:repeat(6,auto)]">
            {services.map((s) => (
              <li
                key={s.title}
                className="grid justify-items-center rounded-xl border border-ink/10 bg-cream px-8 py-10 text-center sm:row-span-6 sm:[grid-template-rows:subgrid]"
              >
                <SketchIcon name={s.icon} size={36} className="text-accent-coral" />
                <p className="mt-5 font-serif text-2xl font-semibold">{s.hook}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-soft">{s.title}</p>
                <div className="mt-4 h-px w-10 bg-ink/15" />
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                <Link
                  href="/services"
                  className="mt-6 font-mono text-xs font-medium uppercase tracking-widest text-accent-coral underline decoration-1 underline-offset-4 hover:text-ink"
                >
                  More info & pricing →
                </Link>
              </li>
            ))}
          </ul>

        </section>

        {/* ── Free audit ─────────────────────────────────────────────────── */}
        <section id="audit" className="py-12 text-center sm:py-24">
          <p className="text-right font-mono text-xs font-medium uppercase tracking-widest text-ink-soft sm:text-center">
            Free audit
          </p>
          <h2 className="mt-3 text-right font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-center sm:text-4xl">
            See how <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-accent-teal/30" />
              <span className="relative">YOU</span>
            </span>
            <br />
            show up online.
          </h2>
          <div className="mt-10">
            <FreeAuditForm />
          </div>
        </section>

        {/* ── Work · alternating rows ────────────────────────────────────── */}
        <section id="work" className="py-12 sm:py-24">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">
            Battles won.
          </h2>
          <ul className="mt-12 space-y-20">
            {work.map((w, i) => (
              <li
                key={w.title}
                className={`flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
              >
                {/* image stack */}
                <div className="sm:w-3/5">
                  <WorkCardStack images={w.images} title={w.title} fit={w.imageFit} />
                </div>
                {/* text */}
                <div className="sm:w-2/5">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                    {w.category}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    {w.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{w.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Pricing preview ───────────────────────────────────────────── */}
        <section className="border-t border-ink/10 py-12 sm:py-24">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight">
            Simple, flat pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-ink-soft">
            One flat monthly rate. No setup fee, no surprises.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:[grid-template-rows:repeat(4,auto)]">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`grid justify-items-center rounded-xl border px-6 py-8 text-center sm:row-span-4 sm:[grid-template-rows:subgrid] ${
                  pkg.save ? "border-accent-coral/40 bg-paper-warm/60" : "border-ink/10 bg-white/60"
                }`}
              >
                <p className="h-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-coral">
                  {pkg.save ? "Recommended" : ""}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold">{pkg.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft/70">{pkg.description}</p>
                <div className="mt-4 flex flex-col items-center">
                  {pkg.save && (
                    <span className="font-mono text-xs text-ink-soft/50 line-through">
                      ${pkg.monthly + Math.round(pkg.save / 12)}/mo
                    </span>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-serif text-3xl font-semibold">${pkg.monthly}</span>
                    <span className="text-sm text-ink-soft">/mo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/services"
              className="inline-block rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium transition-colors hover:border-ink/50 hover:text-ink"
            >
              See full details →
            </a>
          </div>
        </section>


        {/* ── Onward · contact ───────────────────────────────────────────── */}
        <section id="contact" className="border-t border-ink/10 pt-20 pb-12 sm:pt-32 sm:pb-24 text-center">
          <h2 className="font-serif text-base font-normal tracking-tight text-ink-soft">
            What's on your mind?
          </h2>
          <a
            href={`mailto:${studio.email}`}
            className="mt-4 inline-block font-serif text-lg font-semibold underline decoration-1 underline-offset-4 hover:text-accent-coral"
          >
            {studio.email}
          </a>
        </section>
      </main>

      <footer className="mt-16 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6">
          <Image
            src="/logo.png"
            alt="Studio Rocinante"
            width={80}
            height={80}
            className="h-auto w-10 mix-blend-multiply opacity-60"
          />
          <p className="font-mono text-xs text-ink-soft">© 2026 Studio Rocinante</p>
          <div className="flex gap-5">
            <Link href="/terms" className="font-mono text-xs text-ink-soft hover:text-ink">Terms</Link>
            <Link href="/privacy" className="font-mono text-xs text-ink-soft hover:text-ink">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
