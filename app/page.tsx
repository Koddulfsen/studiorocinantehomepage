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
        <section className="grid items-center gap-8 py-14 sm:py-32 md:grid-cols-[1fr_1fr]">
          {/* text — left column, right-aligned */}
          <div className="text-right md:translate-y-[50px]">
            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              <span className="block whitespace-nowrap">Get found.</span>
              <span className="block whitespace-nowrap">Stay found.</span>
            </h1>
            <p className="ml-auto mt-5 max-w-md text-lg leading-relaxed text-ink-soft [text-wrap:balance]">
              We handle your online presence so you can focus on running your business.
            </p>
            <a
              href="/services"
              className="mt-8 inline-block text-sm font-medium underline decoration-1 underline-offset-4 hover:text-gold-deep"
            >
              See packages →
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

        {/* ── Services ───────────────────────────────────────────────────── */}
        <section className="border-t border-ink/10 py-12 sm:py-24">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight">
            What we do.
          </h2>
          <p className="mt-3 text-center text-ink-soft">Three things. That's it.</p>

          <ul className="mt-10 grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {services.map((s) => (
              <li key={s.title} className="flex flex-col items-center px-8 py-10 text-center">
                <SketchIcon name={s.icon} size={36} className="text-gold-deep" />
                <p className="mt-5 font-serif text-2xl font-semibold">{s.hook}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-ink-soft">{s.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{s.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <a
              href="/services"
              className="inline-block rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium transition-colors hover:border-ink/50 hover:text-ink"
            >
              See packages →
            </a>
          </div>
        </section>

        {/* ── Work · alternating rows ────────────────────────────────────── */}
        <section id="work" className="border-t border-ink/10 py-12 sm:py-24">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">
            Work.
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


        {/* ── Onward · contact ───────────────────────────────────────────── */}
        <section id="contact" className="border-t border-ink/10 py-12 sm:py-24 text-center">
          <h2 className="font-serif text-xl font-normal tracking-tight text-ink-soft">
            What's on your mind?
          </h2>
          <a
            href={`mailto:${studio.email}`}
            className="mt-4 inline-block font-serif text-2xl font-semibold underline decoration-1 underline-offset-4 hover:text-gold-deep"
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
