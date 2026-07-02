import type { CSSProperties } from "react";
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
import { Windmill, SketchIcon, Squiggle } from "@/components/sketch";
import styles from "./horizon.module.css";

// Each vista declares the sky gradient + atmosphere of its beat. The light
// progresses down the page: dawn → bright day → cool overcast → starlit night
// → returning gold → luminous sunrise. The same distant windmill anchors them.
type Vista = CSSProperties & {
  "--sky": string;
  "--glow-color"?: string;
  "--glow-x"?: string;
  "--glow-y"?: string;
  "--land"?: string;
  "--line"?: string;
  "--mill"?: string;
  "--mill-x"?: string;
};

// ── A small overline that marks each beat of the journey ───────────────────
function Overline({
  index,
  tone = "ink",
}: {
  index: number;
  tone?: "ink" | "paper";
}) {
  const beat = journey[index];
  const muted = tone === "paper" ? "text-paper/55" : "text-ink-soft/70";
  const accent = tone === "paper" ? "text-gold-soft" : "text-gold-deep";
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em]">
      <span className={accent}>{beat.chapter}</span>
      <span aria-hidden className={`h-px w-8 ${tone === "paper" ? "bg-paper/30" : "bg-ink/20"}`} />
      <span className={muted}>{beat.waypoint}</span>
    </p>
  );
}

// ── The recurring distant windmill on the horizon of a vista ────────────────
function DistantWindmill({
  size = 44,
  spin = false,
  x = "16%",
}: {
  size?: number;
  spin?: boolean;
  x?: string;
}) {
  return (
    <div className={styles.distant} style={{ ["--mill-x" as string]: x }} aria-hidden>
      <Windmill size={size} spin={spin} rough />
    </div>
  );
}

export default function Horizon() {
  return (
    <div className={`${styles.page} bg-paper text-ink`}>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="group flex items-center gap-2.5 text-ink">
            <Windmill size={28} />
            <span className="font-serif text-lg font-semibold tracking-tight">
              Studio Rocinante
            </span>
          </Link>
          <nav className="flex items-center gap-6 sm:gap-8">
            <div className="hidden items-center gap-8 sm:flex">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft transition-colors hover:text-gold-deep"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <a
              href={`mailto:${studio.email}`}
              className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
            >
              Get in touch
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── I · The Village — pale dawn ──────────────────────────────────── */}
        <section
          className={`${styles.vista} flex min-h-screen items-center pt-24`}
          style={
            {
              "--sky":
                "linear-gradient(180deg,#fbf7ef 0%,#f7eede 40%,#f3dec0 78%,#eccb9a 100%)",
              "--glow-color": "rgba(240,198,79,0.5)",
              "--glow-x": "80%",
              "--glow-y": "30%",
              "--mill": "rgba(28,24,19,0.5)",
            } as Vista as CSSProperties
          }
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div className={styles.horizon} aria-hidden />
          <DistantWindmill size={56} spin x="14%" />

          <div className="mx-auto w-full max-w-6xl px-6">
            <div className={styles.rise}>
              <Overline index={0} />
              <p className="mt-7 font-hand text-2xl text-gold-deep">
                first light, an idea —
              </p>
              <h1 className="mt-1 max-w-4xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
                {studio.taglineAlt}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
                {studio.introShort}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-7">
                <a
                  href={`mailto:${studio.email}`}
                  className="rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                </a>
                <a
                  href="#work"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-gold-deep"
                >
                  See the work ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── II · The Armory — bright, clear day ──────────────────────────── */}
        <section
          className={`${styles.vista} py-28 sm:py-36`}
          style={
            {
              "--sky":
                "linear-gradient(180deg,#eccb9a 0%,#f4ecdd 22%,#fdfbf6 60%,#ffffff 100%)",
              "--glow-color": "rgba(224,231,240,0.5)",
              "--glow-x": "24%",
              "--glow-y": "18%",
              "--land": "rgba(28,24,19,0.05)",
              "--mill": "rgba(28,24,19,0.32)",
            } as Vista as CSSProperties
          }
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div
            className={`${styles.clouds} pointer-events-none absolute inset-x-0 top-[12%] -z-10 h-32 opacity-70`}
            aria-hidden
            style={{
              background:
                "radial-gradient(50% 100% at 28% 50%,rgba(255,255,255,0.9),transparent 70%),radial-gradient(40% 100% at 68% 40%,rgba(255,255,255,0.8),transparent 70%)",
            }}
          />
          <div className={styles.horizon} aria-hidden />
          <DistantWindmill size={40} spin x="82%" />

          <div className="mx-auto max-w-6xl px-6">
            <div className={`${styles.rise} max-w-2xl`}>
              <Overline index={1} />
              <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Choose your tools.
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <Squiggle className="h-3 w-36 text-gold" />
                <span className="font-hand text-xl text-gold-deep">pack light, ride far</span>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {journey[1].line}
              </p>
            </div>

            <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.title} className={`${styles.rise} flex gap-5`}>
                  <span className="shrink-0 pt-1 text-gold-deep">
                    <SketchIcon name={s.icon} size={34} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── III · The Giants — cooling, overcast ─────────────────────────── */}
        <section
          id="work"
          className={`${styles.vista} py-28 sm:py-36`}
          style={
            {
              "--sky":
                "linear-gradient(180deg,#ffffff 0%,#eef0ee 30%,#dcdcd6 70%,#c8c6bd 100%)",
              "--glow-color": "rgba(255,255,255,0.55)",
              "--glow-x": "70%",
              "--glow-y": "14%",
              "--land": "rgba(28,24,19,0.1)",
              "--line": "rgba(28,24,19,0.28)",
              "--mill": "rgba(28,24,19,0.45)",
            } as Vista as CSSProperties
          }
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div className={styles.horizon} aria-hidden />
          <DistantWindmill size={46} x="10%" />

          <div className="mx-auto max-w-6xl px-6">
            <div className={`${styles.rise} max-w-3xl`}>
              <Overline index={2} />
              <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                The windmills others ride past.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Some called them giants — too small a fight, too fiddly to bother. These
                are a few we&apos;ve taken on: restaurant sites built to win customers, not
                awards.
              </p>
            </div>

            <ul className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
              {work.map((w) => (
                  <li key={w.title} className={`${styles.rise} group`}>
                    <WorkCardStack images={w.images} title={w.title} fit={w.imageFit} />
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-deep">
                      {w.category}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold tracking-tight">
                      {w.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{w.description}</p>
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── IV · The Dark Stretch — starlit night (the one dark beat) ────── */}
        <section
          className={`${styles.vista} py-28 text-paper sm:py-40`}
          style={
            {
              "--sky":
                "linear-gradient(180deg,#c8c6bd 0%,#3b3c40 12%,#15161c 46%,#0c0d12 100%)",
              "--glow-color": "rgba(240,198,79,0.18)",
              "--glow-x": "50%",
              "--glow-y": "62%",
              "--land": "rgba(0,0,0,0.5)",
              "--line": "rgba(251,247,239,0.18)",
              "--mill": "rgba(251,247,239,0.32)",
            } as Vista as CSSProperties
          }
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.stars} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div className={styles.horizon} aria-hidden />
          <DistantWindmill size={48} x="78%" />

          <div className="mx-auto max-w-6xl px-6">
            <div className={`${styles.rise} max-w-3xl`}>
              <Overline index={3} tone="paper" />
              <h2 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
                Where most ride off.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/65">
                Halfway through, budgets creak and studios go quiet — the half-built thing
                gathers dust. This is exactly where we dig in. Here&apos;s how we carry a
                project through the dark stretch.
              </p>
            </div>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-gold/15 bg-gold/10 sm:grid-cols-3">
              {process.map((step) => (
                <li key={step.n} className={`${styles.rise} bg-[#0e0f15]/85 p-8`}>
                  <span className="font-serif text-3xl font-semibold text-gold">{step.n}</span>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-paper/60">{step.description}</p>
                </li>
              ))}
            </ol>

            <p className="mt-14 flex items-center gap-3 font-hand text-3xl text-gold-soft">
              <SketchIcon name="spark" size={26} />
              and the sky starts to warm again.
            </p>
          </div>
        </section>

        {/* ── V · Rocinante — warm gold returning at dawn ──────────────────── */}
        <section
          id="studio"
          className={`${styles.vista} py-28 sm:py-36`}
          style={
            {
              "--sky":
                "linear-gradient(180deg,#0c0d12 0%,#2e2517 16%,#7a4d18 52%,#c98a2a 82%,#e9c878 100%)",
              "--glow-color": "rgba(240,198,79,0.4)",
              "--glow-x": "60%",
              "--glow-y": "70%",
              "--land": "rgba(0,0,0,0.28)",
              "--line": "rgba(251,247,239,0.3)",
              "--mill": "rgba(28,24,19,0.5)",
            } as Vista as CSSProperties
          }
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div className={styles.horizon} aria-hidden />
          <DistantWindmill size={52} spin x="20%" />

          <div className="mx-auto max-w-6xl px-6">
            <div className={`${styles.rise} max-w-3xl text-paper`}>
              <Overline index={4} tone="paper" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-soft">
                {about.heading}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                {about.lede}
              </h2>
            </div>

            <div className="mt-12 grid gap-12 md:grid-cols-[1.45fr_1fr]">
              <div className={`${styles.rise} space-y-5 text-lg leading-relaxed text-paper/85`}>
                {about.body.map((p) => (
                  <p key={p.slice(0, 16)}>{p}</p>
                ))}
                <p className="font-hand text-2xl text-[#241a0c]">you don&apos;t ride alone.</p>
              </div>

              <ul className={`${styles.rise} space-y-7`}>
                {about.principles.map((pr) => (
                  <li key={pr.title} className="border-l border-paper/25 pl-5">
                    <h3 className="font-serif text-lg font-semibold text-gold-soft">
                      {pr.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/70">{pr.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── VI · The Summit — luminous sunrise, triumphant contact ───────── */}
        <section
          id="contact"
          className={`${styles.vista} py-32 sm:py-44`}
          style={
            {
              "--sky":
                "linear-gradient(180deg,#e9c878 0%,#f6e3b5 42%,#fcf3df 74%,#fbf7ef 100%)",
              "--glow-color": "rgba(240,198,79,0.55)",
              "--glow-x": "50%",
              "--glow-y": "72%",
              "--land": "rgba(185,112,26,0.12)",
              "--line": "rgba(28,24,19,0.2)",
              "--mill": "rgba(28,24,19,0.55)",
            } as Vista as CSSProperties
          }
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.rays} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div className={styles.horizon} aria-hidden />
          <DistantWindmill size={40} spin x="84%" />

          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className={styles.rise}>
              <div className="group mx-auto mb-7 w-fit text-ink">
                <Windmill size={84} spin />
              </div>
              <div className="flex justify-center">
                <Overline index={5} />
              </div>
              <h2 className="mt-6 font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                Onward.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                The windmill turns — a friend now, not a foe. Tell us what you&apos;re
                building and we&apos;ll send back a real draft to react to. No pressure, no
                jargon.
              </p>
              <a
                href={`mailto:${studio.email}`}
                className="mt-10 inline-block font-serif text-2xl font-semibold tracking-tight text-ink underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-gold-deep sm:text-3xl"
              >
                {studio.email}
              </a>
              <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2">
                {promises.map((p) => (
                  <li
                    key={p}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-deep"
                  >
                    ✦ {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink/10 bg-paper py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Link href="/" className="group flex items-center gap-2.5 text-ink">
            <Windmill size={24} />
            <span className="font-serif text-base font-semibold">{studio.name}</span>
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            {studio.location} · {studio.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
