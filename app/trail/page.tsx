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
import styles from "./trail.module.css";

// ── Small in-file helpers ──────────────────────────────────────────────────
function Waypoint({
  index,
  dark = false,
}: {
  index: number;
  dark?: boolean;
}) {
  const beat = journey[index];
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid h-11 w-11 place-items-center rounded-full font-serif text-lg font-semibold ${
          dark
            ? "bg-gold/15 text-gold-soft"
            : "bg-ink/5 text-gold-deep"
        }`}
      >
        <span className="relative">
          <SketchFrame radius={999} className={dark ? "text-gold/50" : "text-gold-deep/60"} />
          {beat.chapter}
        </span>
      </span>
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.35em] ${
          dark ? "text-gold-soft/80" : "text-gold-deep"
        }`}
      >
        Chapter {beat.chapter} · {beat.waypoint}
      </span>
    </div>
  );
}

export default function Trail() {
  return (
    <div className={`${styles.page} bg-paper text-ink`}>
      {/* Scroll-progress rail + travelling windmill (large screens) */}
      <div className={`${styles.rail} hidden lg:block`} aria-hidden>
        <div className={styles.railTrack} />
        <div className={styles.railFill} />
      </div>
      <div className={`${styles.rider} hidden lg:block`} aria-hidden>
        <Windmill size={26} spin />
      </div>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
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
              Start a project
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Chapter I · The Village (Ordinary world + the call) ───────── */}
        <section
          className="relative flex min-h-screen items-center overflow-hidden pt-24"
          style={{
            background:
              "linear-gradient(180deg,#fbf7ef 0%,#f8ead0 52%,#f3dca8 100%)",
          }}
        >
          {/* horizon scene */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,transparent 0%,rgba(185,112,26,0.10) 100%)",
              }}
            />
            <div className="absolute bottom-[28%] left-[12%] text-ink/70 sm:left-[18%]">
              <Windmill size={64} spin />
            </div>
            <div className="absolute bottom-[30%] right-[14%] text-ink/45">
              <Windmill size={40} spin />
            </div>
            {/* ground line */}
            <div className="absolute bottom-[27%] left-0 right-0 h-px bg-ink/25" />
          </div>
          {/* sun glow */}
          <div
            className="pointer-events-none absolute right-[16%] top-[22%] h-48 w-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(240,198,79,0.55),transparent 70%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-6xl px-5">
            <Waypoint index={0} />
            <p className="mt-8 font-hand text-2xl text-gold-deep">
              Every quest begins at home —
            </p>
            <h1 className="mt-1 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
              We build the things
              <br />
              others ride past.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              {studio.introShort}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${studio.email}`}
                className="ink-shadow rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-gold-deep"
              >
                See the work ↓
              </a>
            </div>

            {/* the road out of town */}
            <div className="mt-14 flex items-center gap-3 text-gold-deep/70">
              <span className="font-hand text-xl">the road out of town</span>
              <SketchArrow className="h-7 w-12" />
            </div>
          </div>
        </section>

        {/* ── Chapter II · The Armory (Crossing the threshold) ──────────── */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background:
              "linear-gradient(180deg,#f3dca8 0%,#faf4e8 26%,#ffffff 100%)",
          }}
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className={styles.reveal}>
              <Waypoint index={1} />
              <h2 className="mt-6 max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Choose your tools.
              </h2>
              <div className="mt-2 flex items-center gap-3">
                <Squiggle className="h-3 w-40 text-gold" />
                <span className="font-hand text-xl text-gold-deep">
                  pack light, ride far
                </span>
              </div>
              <p className="mt-5 max-w-xl text-ink-soft">
                {journey[1].line} Whatever the quest, here&apos;s the kit we
                carry — and the craft we bring to each.
              </p>
            </div>

            <ul className="mt-14 grid gap-6 sm:grid-cols-2">
              {services.map((s) => (
                <li
                  key={s.title}
                  className={`${styles.reveal} group relative rounded-2xl bg-cream p-8`}
                >
                  <SketchFrame className="text-ink/60" />
                  <div className="relative flex items-start gap-5">
                    <span className="shrink-0 text-gold-deep">
                      <SketchIcon name={s.icon} size={40} />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Chapter III · The Giants (First resistance) ───────────────── */}
        <section
          id="work"
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background:
              "linear-gradient(180deg,#ffffff 0%,#efe4d1 42%,#d9cdb8 100%)",
          }}
        >
          {/* drifting cloud band */}
          <div
            className={`${styles.drift} pointer-events-none absolute inset-x-0 top-1/4 h-40 opacity-60`}
            style={{
              background:
                "radial-gradient(60% 100% at 30% 50%,rgba(120,110,95,0.18),transparent 70%),radial-gradient(50% 100% at 75% 40%,rgba(120,110,95,0.16),transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <div className={styles.reveal}>
              <Waypoint index={2} />
              <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                The windmills others ride past.
              </h2>
              <p className="mt-5 max-w-xl text-ink-soft">
                Some called them giants; everyone said they weren&apos;t worth
                the fight. These are a few we&apos;ve taken on — restaurant sites
                built to win customers, not awards.
              </p>
            </div>

            <ul className="mt-14 grid gap-7 md:grid-cols-3">
              {work.map((w) => (
                <li key={w.title} className={`${styles.reveal} group`}>
                  <WorkCardStack images={w.images} title={w.title} fit={w.imageFit} />
                  <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-gold-deep">
                      {w.category}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold">
                      {w.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{w.description}</p>
                    <p className="mt-2 font-hand text-lg text-gold-deep">
                      a giant, felled.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Chapter IV · The Dark Stretch (The abyss → the glimmer) ───── */}
        <section
          className="relative overflow-hidden py-24 text-paper sm:py-36"
          style={{
            background:
              "linear-gradient(180deg,#d9cdb8 0%,#2a2017 16%,#14110c 52%,#0e0c08 100%)",
          }}
        >
          {/* lantern glimmer */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(240,198,79,0.22),transparent 68%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <div className={styles.reveal}>
              <Waypoint index={3} dark />
              <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
                This is where most ride off.
              </h2>
              <p className="mt-5 max-w-xl text-paper/70">
                Halfway through, the budget creaks, the agency goes quiet, the
                half-built thing gathers dust. We&apos;ve all seen it. So this
                is exactly where we dig in — and how we get you through it.
              </p>
            </div>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/10 sm:grid-cols-3">
              {process.map((step) => (
                <li
                  key={step.n}
                  className={`${styles.reveal} bg-[#14110c] p-8`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-semibold text-gold">
                      {step.n}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-paper">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-paper/65">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-14 flex items-center justify-center gap-3 text-center font-hand text-3xl text-gold-soft">
              <SketchIcon name="spark" size={28} />
              We don&apos;t ride off.
            </p>
          </div>
        </section>

        {/* ── Chapter V · Rocinante (Allies / the mentor arrives) ───────── */}
        <section
          id="studio"
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            background:
              "linear-gradient(180deg,#0e0c08 0%,#3a2a16 22%,#b9701a 72%,#edcf86 100%)",
          }}
        >
          <div className="relative mx-auto max-w-6xl px-5">
            <div className={`${styles.reveal} text-paper`}>
              <Waypoint index={4} dark />
              <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {about.lede}
              </h2>
            </div>

            <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
              <div className={`${styles.reveal} space-y-5 text-lg leading-relaxed text-paper/85`}>
                {about.body.map((p) => (
                  <p key={p.slice(0, 16)}>{p}</p>
                ))}
                <p className="font-hand text-2xl text-[#2a1c0c]">
                  you don&apos;t ride alone.
                </p>
              </div>

              <ul className={`${styles.reveal} space-y-4`}>
                {about.principles.map((pr) => (
                  <li
                    key={pr.title}
                    className="relative rounded-xl bg-[#1c1813]/85 p-5 text-paper"
                  >
                    <SketchFrame className="text-gold/40" />
                    <div className="relative">
                      <h3 className="font-serif text-lg font-semibold text-gold-soft">
                        {pr.title}
                      </h3>
                      <p className="mt-1 text-sm text-paper/70">{pr.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Chapter VI · The Summit (Triumph) ─────────────────────────── */}
        <section
          id="contact"
          className="relative overflow-hidden py-28 sm:py-40"
          style={{
            background:
              "linear-gradient(180deg,#edcf86 0%,#f6e3b8 46%,#fbf7ef 100%)",
          }}
        >
          <div className={styles.sunrays} />
          <div className="relative mx-auto max-w-3xl px-5 text-center">
            <div className="group mx-auto mb-6 w-fit text-ink">
              <Windmill size={88} spin />
            </div>
            <Waypoint index={5} />
            <h2 className="mt-6 font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
              Onward.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">
              The windmill turns — a friend now, not a foe. Tell us what
              you&apos;re building and we&apos;ll send back a real draft to
              react to. No pressure, no jargon.
            </p>
            <a
              href={`mailto:${studio.email}`}
              className="ink-shadow-gold mt-9 inline-block rounded-full bg-ink px-9 py-4 font-mono text-sm uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5"
            >
              {studio.email}
            </a>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {promises.map((p) => (
                <li
                  key={p}
                  className="font-mono text-[11px] uppercase tracking-widest text-gold-deep"
                >
                  ✦ {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink/10 bg-paper py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
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
