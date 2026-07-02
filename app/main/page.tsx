import Link from "next/link";
import Image from "next/image";
import { WorkCardStack } from "@/components/WorkCardStack";
import {
  studio,
  services,
  work,
  process,
  promises,
  about,
  nav,
  journey,
} from "@/lib/content";
import { SketchIcon } from "@/components/sketch";


// Stripped-back, single-surface layout: one cream + paper-grain background
// throughout, hairline dividers, plain type. Structure kept, styling removed.

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
      {children}
    </p>
  );
}

export default function Main() {
  return (
    <div className="paper-grain min-h-screen bg-paper text-ink">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
            Studio Rocinante
          </Link>
          <nav className="flex items-center gap-5 sm:gap-7">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="grid items-center gap-8 py-14 sm:py-20 md:grid-cols-[1fr_1fr]">
          {/* text — left column, right-aligned */}
          <div className="text-right translate-y-[50px]">
            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              <span className="block whitespace-nowrap">Pull up a chair,</span>
              <span className="block whitespace-nowrap">let&apos;s build something.</span>
            </h1>
            <p className="ml-auto mt-5 max-w-md text-lg leading-relaxed text-ink-soft [text-wrap:balance]">
              Websites, tools, and the odd impossible thing.
            </p>
            <a
              href={`mailto:${studio.email}`}
              className="mt-8 inline-block text-sm font-medium underline decoration-1 underline-offset-4 hover:text-gold-deep"
            >
              Start a project
            </a>
          </div>

          {/* windmill — right column */}
          <div className="min-w-0">
            <Image
              src="/windmill.png"
              alt="A hand-drawn windmill"
              width={600}
              height={600}
              priority
              className="mx-auto block h-auto w-80 mix-blend-multiply sm:w-[28rem] md:w-full md:max-w-none md:scale-110"
            />
          </div>
        </section>

        {/* ── The Armory · services ──────────────────────────────────────── */}
        <section className="border-t border-ink/10 py-12 sm:py-16">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight">
            Which way, traveler?
          </h2>

          {/* 2×2 grid, split by a hand-drawn cross (desktop) / rules (mobile) */}
          <div className="relative mt-10 sm:max-w-xl sm:mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {services.map((s, i) => (
                <li
                  key={s.title}
                  className={`flex flex-col px-1 py-8 sm:px-10 sm:py-10${i === 2 ? " sm:col-span-2 sm:max-w-sm sm:mx-auto" : ""}`}
                >
                  <SketchIcon name={s.icon} size={40} className="mx-auto text-gold-deep" />
                  <h3 className="mt-4 text-center font-serif text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-center leading-relaxed text-ink-soft">{s.description}</p>
                </li>
              ))}
            </ul>

          </div>
        </section>

        {/* ── Work · alternating rows ────────────────────────────────────── */}
        <section id="work" className="border-t border-ink/10 py-12 sm:py-16">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">
            Battles won:
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

        {/* ── Process ────────────────────────────────────────────────────── */}
        <section className="border-t border-ink/10 py-12 sm:py-16">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">How we ride.</h2>
          <p className="mt-3 max-w-xl text-ink-soft leading-relaxed">This is your project. We build it, no matter what your heart desires.</p>
          <ol className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
            {[
              { n: "01", title: "Sketch", icon: "pencil" as const },
              { n: "02", title: "Refinement", icon: "compass" as const },
              { n: "03", title: "Launch", icon: "spark" as const },
            ].map((step, i) => (
              <li key={step.n} className="flex items-center gap-0">
                <div className="flex flex-col items-center text-center">
                  <SketchIcon name={step.icon} size={40} className="text-gold-deep" />
                  <span className="mt-2 font-serif text-xl font-semibold">{step.title}</span>
                </div>
                {i < 2 && (
                  <span className="mx-6 hidden text-2xl text-ink/20 sm:block">——</span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── Onward · contact ───────────────────────────────────────────── */}
        <section id="contact" className="border-t border-ink/10 py-12 sm:py-16 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">
            Onward.
          </h2>
          <p className="mt-4 mx-auto max-w-xl leading-relaxed text-ink-soft">
            Every quest needs a starting point. Ours is usually an email.
          </p>
          <a
            href={`mailto:${studio.email}`}
            className="mt-8 inline-block font-serif text-2xl font-semibold underline decoration-1 underline-offset-4 hover:text-gold-deep"
          >
            {studio.email}
          </a>
          <p className="mt-6 text-sm text-ink-soft">
            {promises.join(" · ")}
          </p>
        </section>
      </main>

      <footer className="mt-[50px] py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6">
          <Image
            src="/logo.png"
            alt="Studio Rocinante"
            width={80}
            height={80}
            className="h-auto w-10 mix-blend-multiply opacity-60"
          />
          <p className="font-mono text-xs text-ink-soft">© 2026 Studio Rocinante</p>
        </div>
      </footer>
    </div>
  );
}
