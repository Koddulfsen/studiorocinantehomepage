import Link from "next/link";
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
import {
  Windmill,
  SketchIcon,
  Squiggle,
  SketchFrame,
  SketchArrow,
} from "@/components/sketch";
import styles from "./manuscript.module.css";

// ── Illuminated chapter heading ────────────────────────────────────────────
// "Chapter I · The Village" rendered as a rubricated manuscript header.
function ChapterHead({
  index,
  night = false,
}: {
  index: number;
  night?: boolean;
}) {
  const beat = journey[index];
  const label = night ? "text-gold-soft/80" : "text-gold-deep";
  return (
    <div className="flex flex-col items-start gap-3">
      <span
        className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] ${label}`}
      >
        <SketchIcon
          name="quill"
          size={18}
          className={night ? "text-gold-soft" : "text-gold-deep"}
        />
        Chapter {beat.chapter} · {beat.waypoint}
      </span>
      <Squiggle
        className={`h-2.5 w-36 ${night ? "text-gold/50" : "text-gold/70"}`}
      />
    </div>
  );
}

// ── A handwritten marginalia note pinned to the page margin ─────────────────
function Marginalia({
  children,
  className = "",
  night = false,
}: {
  children: React.ReactNode;
  className?: string;
  night?: boolean;
}) {
  return (
    <aside
      className={`${styles.margin} pointer-events-none select-none font-hand leading-tight ${
        night ? "text-gold-soft/80" : "text-gold-deep/80"
      } ${className}`}
    >
      {children}
    </aside>
  );
}

export default function Manuscript() {
  return (
    <div className={`${styles.page} bg-cream text-ink`}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href="/" className="group flex items-center gap-2 text-ink">
            <Windmill size={30} />
            <span className="font-serif text-lg font-semibold tracking-tight">
              Studio Rocinante
            </span>
          </Link>
          <nav className="hidden items-center gap-7 sm:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-gold-deep"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`mailto:${studio.email}`}
              className="rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-gold-deep"
            >
              Commission a page
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Chapter I · The Village (dawn parchment) ───────────────────── */}
        <section
          className="paper-grain relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
          style={{
            background:
              "linear-gradient(180deg,#fbf7ef 0%,#f6ecd8 60%,#f1e1c0 100%)",
          }}
        >
          {/* soft dawn glow in the corner */}
          <div
            className="pointer-events-none absolute right-[8%] top-[18%] h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(240,198,79,0.5),transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-5xl px-5">
            <div className="relative grid items-start gap-10 md:grid-cols-[1fr_auto]">
              <div className={styles.folio}>
                <ChapterHead index={0} />
                <p className="mt-7 font-hand text-2xl text-gold-deep">
                  Here begins the tale of a small studio —
                </p>
                <h1 className="mt-2 max-w-3xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
                  We build the things
                  <br />
                  others{" "}
                  <span className="hand-underline">tilt away from.</span>
                </h1>
                <div
                  className={`${styles.dropcap} mt-8 max-w-xl text-lg leading-relaxed text-ink-soft`}
                >
                  {studio.introShort}
                </div>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <a
                    href={`mailto:${studio.email}`}
                    className="ink-shadow rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
                  >
                    Begin your chapter
                  </a>
                  <a
                    href="#work"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-gold-deep"
                  >
                    Turn the page <span aria-hidden>↓</span>
                  </a>
                </div>
              </div>

              {/* Illuminated frontispiece — the windmill in a gilt frame */}
              <div className="group relative hidden h-64 w-52 place-items-center md:grid">
                <SketchFrame className="text-gold-deep/70" radius={10} />
                <div
                  className="absolute inset-2 rounded-md"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 38%,rgba(240,198,79,0.28),transparent 72%)",
                  }}
                  aria-hidden
                />
                <div className="relative text-ink/80">
                  <Windmill size={120} spin />
                </div>
                <Marginalia className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center text-xl">
                  our patron saint of
                  <br />
                  stubborn ideas
                </Marginalia>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-3 text-gold-deep/70">
              <span className="font-hand text-xl">{journey[0].line}</span>
              <SketchArrow className="h-7 w-12" />
            </div>
          </div>
        </section>

        {/* ── Chapter II · The Armory (bright midday parchment) ──────────── */}
        <section
          className="paper-grain relative overflow-hidden py-24 sm:py-32"
          style={{
            background:
              "linear-gradient(180deg,#f1e1c0 0%,#fbf7ef 30%,#ffffff 100%)",
          }}
        >
          <div className="mx-auto max-w-5xl px-5">
            <div className={styles.folio}>
              <ChapterHead index={1} />
              <h2 className="mt-6 max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {journey[1].title}
              </h2>
              <p
                className={`${styles.dropcap} mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft`}
              >
                {journey[1].line} Whatever the quest demands, here is the kit we
                carry into it — and the craft we bring to the use of each.
              </p>
            </div>

            <ul className="relative mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/10 sm:grid-cols-2">
              {services.map((s, i) => (
                <li
                  key={s.title}
                  className={`${styles.folio} group relative bg-cream p-8`}
                >
                  <div className="flex items-start gap-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep">
                      <SketchIcon name={s.icon} size={32} />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-2xl font-semibold text-gold-deep/70">
                          {String.fromCharCode(8544 + i) /* I, II, III, IV */}
                        </span>
                        <h3 className="font-serif text-2xl font-semibold">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {s.blurb}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Marginalia className="mt-6 text-right text-xl">
              pack light, ride far ✦
            </Marginalia>
          </div>
        </section>

        {/* ── Chapter III · The Giants (cooling afternoon) ───────────────── */}
        <section
          id="work"
          className="paper-grain relative overflow-hidden py-24 sm:py-32"
          style={{
            background:
              "linear-gradient(180deg,#ffffff 0%,#efe4d1 46%,#ddcfb6 100%)",
          }}
        >
          <div className="relative mx-auto max-w-5xl px-5">
            <div className={styles.folio}>
              <ChapterHead index={2} />
              <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {journey[2].title}
              </h2>
              <p
                className={`${styles.dropcap} mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft`}
              >
                Some called them giants; everyone agreed they weren&apos;t worth
                the fight. These are a few we rode straight at — restaurant sites
                built to win customers, not awards.
              </p>
            </div>

            <ul className="mt-14 grid gap-8 md:grid-cols-3">
              {work.map((w) => (
                  <li key={w.title} className={`${styles.folio} group`}>
                    <WorkCardStack images={w.images} title={w.title} fit={w.imageFit} />
                    <div className="mt-4">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-gold-deep">
                        {w.category}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl font-semibold">
                        {w.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {w.blurb}
                      </p>
                      <p className="mt-2 font-hand text-lg text-gold-deep">
                        a giant, felled.
                      </p>
                    </div>
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Chapter IV · The Dark Stretch (candle-lit night folio) ─────── */}
        <section
          className="relative overflow-hidden py-24 text-paper sm:py-36"
          style={{
            background:
              "linear-gradient(180deg,#ddcfb6 0%,#2a2017 14%,#141009 52%,#0e0b06 100%)",
          }}
        >
          {/* breathing candle glow */}
          <div
            className={`${styles.candle} pointer-events-none absolute left-1/2 top-[38%] h-80 w-80 -translate-x-1/2 rounded-full`}
            style={{
              background:
                "radial-gradient(circle,rgba(240,198,79,0.24),transparent 68%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-5xl px-5">
            <div className={styles.folio}>
              <ChapterHead index={3} night />
              <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
                {journey[3].title}
              </h2>
              <p
                className={`${styles.dropcapNight} ${styles.ruledNight} mt-6 max-w-2xl rounded-lg p-5 text-lg leading-[1.9] text-paper/80`}
              >
                Halfway through, the budget creaks, the agency goes quiet, the
                half-built thing gathers dust. We&apos;ve all read that chapter.
                So this candle-lit stretch is exactly where we dig in — and the
                three steps that carry you through to morning.
              </p>
            </div>

            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-gold/25 bg-gold/10 sm:grid-cols-3">
              {process.map((step) => (
                <li
                  key={step.n}
                  className={`${styles.folio} relative bg-[#141009] p-8`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-semibold text-gold-soft">
                      {step.n}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-paper">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-paper/65">
                    {step.blurb}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-14 flex items-center justify-center gap-3 text-center font-hand text-3xl text-gold-soft">
              <SketchIcon name="spark" size={28} className="text-gold-soft" />
              and so the candle does not go out.
            </p>
          </div>
        </section>

        {/* ── Chapter V · Rocinante (returning gold, dawn after night) ───── */}
        <section
          id="studio"
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background:
              "linear-gradient(180deg,#0e0b06 0%,#3a2a16 20%,#b9701a 70%,#eecd84 100%)",
          }}
        >
          <div className="relative mx-auto max-w-5xl px-5">
            <div className={`${styles.folio} text-paper`}>
              <ChapterHead index={4} night />
              <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {about.lede}
              </h2>
            </div>

            <div className="mt-10 grid gap-12 md:grid-cols-[1.5fr_1fr]">
              <div className={styles.folio}>
                <div
                  className={`${styles.columns} ${styles.dropcap} space-y-5 text-lg leading-relaxed text-paper/90`}
                >
                  {about.body.map((p) => (
                    <p key={p.slice(0, 16)}>{p}</p>
                  ))}
                </div>
                <div className={`${styles.goldRule} mt-8`} aria-hidden />
                <p className="mt-5 font-hand text-2xl text-[#2a1c0c]">
                  you don&apos;t ride alone. — {studio.shortName}
                </p>
              </div>

              <ul className={`${styles.folio} space-y-4`}>
                {about.principles.map((pr) => (
                  <li
                    key={pr.title}
                    className="relative rounded-xl bg-[#1c1813]/85 p-5 text-paper"
                  >
                    <SketchFrame className="text-gold/45" />
                    <div className="relative">
                      <h3 className="font-serif text-lg font-semibold text-gold-soft">
                        {pr.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-paper/70">
                        {pr.blurb}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Chapter VI · The Summit (blazing, gilded triumph) ──────────── */}
        <section
          id="contact"
          className="paper-grain relative overflow-hidden py-28 sm:py-40"
          style={{
            background:
              "linear-gradient(180deg,#eecd84 0%,#f6e3b8 44%,#fbf7ef 100%)",
          }}
        >
          <div
            className={`${styles.halo} pointer-events-none absolute left-1/2 top-0 h-[120%] w-[140%] -translate-x-1/2`}
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center">
            <div className="group mx-auto mb-6 w-fit text-ink">
              <Windmill size={92} spin />
            </div>
            <div className="flex justify-center">
              <ChapterHead index={5} />
            </div>
            <h2 className="mt-6 font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
              <span className={styles.shimmer}>Onward.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              {journey[5].line} Tell us what you&apos;re building and we&apos;ll
              send back a real draft to react to — the first page of your own
              illuminated chapter.
            </p>
            <a
              href={`mailto:${studio.email}`}
              className="ink-shadow-gold mt-9 inline-block rounded-full bg-ink px-9 py-4 font-mono text-sm uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
            >
              {studio.email}
            </a>
            <div className={`${styles.goldRule} mx-auto mt-12 max-w-xs`} aria-hidden />
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {promises.map((p) => (
                <li
                  key={p}
                  className="font-mono text-[11px] uppercase tracking-widest text-gold-deep"
                >
                  ✦ {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-hand text-2xl text-gold-deep">
              — here ends the tale, and begins yours.
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer (colophon) ──────────────────────────────────────────────── */}
      <footer className="border-t border-ink/10 bg-cream py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <Link href="/" className="group flex items-center gap-2 text-ink">
            <Windmill size={26} />
            <span className="font-serif text-base font-semibold">
              {studio.name}
            </span>
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            {studio.location} · {studio.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
