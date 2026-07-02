// Hand-drawn SVG kit — the connective brand thread across all four templates.
// Everything strokes `currentColor`, so colour is controlled by the parent.
// The wobble comes from an SVG turbulence filter defined once in layout (#sketch-rough).

import type { IconName } from "@/lib/content";

type SvgProps = React.SVGProps<SVGSVGElement>;

const base: SvgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// Each icon is a deliberately simple line drawing; the #sketch-rough filter
// (applied via the `rough` prop) gives it the wobbly, inked-by-hand quality.
const paths: Record<IconName, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 8 4 12l4.5 4" />
      <path d="M15.5 8 20 12l-4.5 4" />
      <path d="M13.5 6 10.5 18" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20l1-4L16 5a2 2 0 0 1 3 3L8 19l-4 1Z" />
      <path d="M14 7l3 3" />
    </>
  ),
  gears: (
    <>
      {/* large gear */}
      <circle cx="9" cy="9" r="3" />
      <path d="M9 3v2M9 13v2M3 9h2M13 9h2M4.9 4.9l1.4 1.4M11.7 11.7l1.4 1.4M13.1 4.9l-1.4 1.4M6.3 11.7l-1.4 1.4" />
      {/* small gear */}
      <circle cx="16.5" cy="16.5" r="2" />
      <path d="M16.5 13v1.5M16.5 18.5V20M13 16.5h1.5M18.5 16.5H20M14.4 14.4l1 1M18.6 18.6l1 1M18.6 14.4l-1 1M14.4 18.6l-1 1" />
    </>
  ),
  windmill: (
    <>
      {/* tower */}
      <path d="M9.5 21h5l-1-9h-3l-1 9Z" />
      {/* hub + 4 sails */}
      <circle cx="12" cy="9.5" r="1" />
      <path d="M12 9.5 4.5 5M12 9.5 19.5 5M12 9.5 5 16.5M12 9.5 19 16.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  quill: (
    <>
      <path d="M19 4c-7 1-11 5-13 12 4-1 7-2 9.5-4.5C18 9 19 6.5 19 4Z" />
      <path d="M6 16c1.5-2 3.5-3.5 6-4.5" />
      <path d="M4 20l3-3" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="M12 9c.6 1.6 1.4 2.4 3 3-1.6.6-2.4 1.4-3 3-.6-1.6-1.4-2.4-3-3 1.6-.6 2.4-1.4 3-3Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8.5 20v-5" />
      <path d="M13 20v-9" />
      <path d="M17.5 20v-4" />
    </>
  ),
  star: (
    <path d="M12 2l2.6 7.8h8.2l-6.6 4.8 2.5 7.7L12 17.8l-6.7 4.5 2.5-7.7L1.2 9.8h8.2L12 2Z" />
  ),
  mappin: (
    <>
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
};

export function SketchIcon({
  name,
  size = 28,
  rough = true,
  ...rest
}: { name: IconName; size?: number; rough?: boolean } & SvgProps) {
  return (
    <svg
      {...base}
      width={size}
      height={size}
      filter={rough ? "url(#sketch-rough)" : undefined}
      aria-hidden
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

// Animated windmill brand mark. By default the sails spin on hover of an
// ancestor `.group`; pass `spin` to make them turn continuously on their own.
export function Windmill({
  size = 64,
  rough = true,
  spin = false,
  ...rest
}: { size?: number; rough?: boolean; spin?: boolean } & SvgProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={rough ? "url(#sketch-rough)" : undefined}
      aria-hidden
      {...rest}
    >
      <path d="M24 56h16l-3-26H27l-3 26Z" />
      <g
        className={
          spin
            ? "sail-spin"
            : "origin-[32px_28px] [transition:transform_1.2s_ease] group-hover:[transform:rotate(120deg)] motion-reduce:transform-none"
        }
        style={{ transformBox: "view-box" }}
      >
        <circle cx="32" cy="28" r="2.2" />
        <path d="M32 28 11 14M32 28 53 14M32 28 14 45M32 28 50 45" />
        <path d="M11 14l2-5 6 2M53 14l-2-5-6 2M14 45l-5 1-1-6M50 45l5 1 1-6" />
      </g>
    </svg>
  );
}

// A wavy, hand-inked underline. Drop under a heading; stretches to its width.
export function Squiggle({
  className = "",
  rough = true,
}: { className?: string; rough?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      filter={rough ? "url(#sketch-rough)" : undefined}
      aria-hidden
    >
      <path d="M2 7c30-7 60 7 90 0s60-7 90 0 60 7 116 1" />
    </svg>
  );
}

// Hand-drawn calligraphy stroke. The key insight: both edges are INDEPENDENT
// cubic beziers — they don't mirror each other. The top edge peaks earlier than
// the bottom (like a nib under varying pressure), creating genuine thickness
// variation throughout rather than a symmetric lens. The center line drifts
// slightly so the stroke has a natural curve, not a mechanical straight line.
// No displacement filter — that causes pixel jagging on stretched SVGs.
export function SketchLine({
  className = "",
  vertical = false,
}: { className?: string; vertical?: boolean }) {
  return (
    <svg
      viewBox={vertical ? "0 0 24 300" : "0 0 300 24"}
      preserveAspectRatio="none"
      className={className}
      fill="currentColor"
      stroke="none"
      aria-hidden
    >
      <path
        d={
          vertical
            // Vertical stroke: tip at top, tip at bottom.
            // Left edge bows left early (high pressure start), right edge lags.
            // Center drifts slightly right in the lower third — natural pen sway.
            ? [
                "M12 3",
                "C5 55, 3 120, 7 175",   // left edge: bows hard left early
                "C10 220, 11 260, 12 297", // left edge: straightens toward tip
                "C13 260, 15 215, 17 170", // right edge: peaks later, lower
                "C20 125, 19 60, 12 3",    // right edge: returns to tip
                "Z",
              ].join(" ")
            // Horizontal stroke: tip at left, tip at right.
            // Top edge bows up early, bottom edge peaks later/deeper.
            // End tip drifts slightly up — stroke curves gently across its length.
            : [
                "M3 12",
                "C55 5, 120 3, 175 7",    // top edge: bows hard up early
                "C220 10, 260 11, 297 12", // top edge: straightens toward tip
                "C260 15, 215 17, 170 19", // bottom edge: peaks later, deeper
                "C125 21, 55 19, 3 12",    // bottom edge: returns to tip
                "Z",
              ].join(" ")
        }
      />
    </svg>
  );
}

// A wobbly hand-drawn rectangle border. Place inside a `relative` container;
// it fills the parent and sits behind the content.
export function SketchFrame({
  className = "",
  radius = 14,
  rough = true,
}: { className?: string; radius?: number; rough?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      preserveAspectRatio="none"
      filter={rough ? "url(#sketch-rough)" : undefined}
      aria-hidden
    >
      <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx={radius} />
    </svg>
  );
}

// A short, scribbled arrow for "look here" annotations.
export function SketchArrow({
  className = "",
  rough = true,
}: { className?: string; rough?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={rough ? "url(#sketch-rough)" : undefined}
      aria-hidden
    >
      <path d="M4 8c14 2 28 10 40 24" />
      <path d="M44 32l-2-9M44 32l-9 1" />
    </svg>
  );
}
