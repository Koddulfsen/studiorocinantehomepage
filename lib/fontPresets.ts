export interface FontPreset {
  id: string;
  label: string;
  specimen: string;
  heading: string;   // CSS value for heading/display fonts
  body: string;      // CSS value for body/ui fonts
}

export const FONT_PRESETS: FontPreset[] = [
  // ── Serif-led ──────────────────────────────────────────────────────────
  { id: "classic",   label: "Classic",   specimen: "Playfair / Lora",          heading: "var(--font-playfair)",   body: "var(--font-lora)" },
  { id: "novel",     label: "Novel",     specimen: "Cormorant / Lora",          heading: "var(--font-cormorant)",  body: "var(--font-lora)" },
  { id: "craft",     label: "Craft",     specimen: "Fraunces / Crimson",        heading: "var(--font-fraunces)",   body: "var(--font-crimson)" },
  { id: "gazette",   label: "Gazette",   specimen: "Garamond / Baskerville",    heading: "var(--font-garamond)",   body: "var(--font-baskerville)" },
  { id: "dispatch",  label: "Dispatch",  specimen: "DM Serif / Space Grotesk",  heading: "var(--font-dm-serif)",   body: "var(--font-space-grotesk)" },
  { id: "luxury",    label: "Luxury",    specimen: "Bodoni / Cormorant",        heading: "var(--font-bodoni)",     body: "var(--font-cormorant)" },
  { id: "literary",  label: "Literary",  specimen: "Spectral / Nunito",         heading: "var(--font-spectral)",   body: "var(--font-nunito)" },
  { id: "harvest",   label: "Harvest",   specimen: "Fraunces / Spectral",       heading: "var(--font-fraunces)",   body: "var(--font-spectral)" },
  { id: "hana",      label: "Hana",      specimen: "Cormorant / Josefin",       heading: "var(--font-cormorant)",  body: "var(--font-josefin)" },
  // ── Sans-led ───────────────────────────────────────────────────────────
  { id: "modern",    label: "Modern",    specimen: "Josefin / Inter",           heading: "var(--font-josefin)",    body: "var(--font-inter)" },
  { id: "editorial", label: "Editorial", specimen: "Playfair / Inter",          heading: "var(--font-playfair)",   body: "var(--font-inter)" },
  { id: "studio",    label: "Studio",    specimen: "Josefin / Josefin",         heading: "var(--font-josefin)",    body: "var(--font-josefin)" },
  { id: "deco",      label: "Deco",      specimen: "Josefin / Raleway",         heading: "var(--font-josefin)",    body: "var(--font-raleway)" },
  { id: "warmth",    label: "Warmth",    specimen: "DM Serif / Nunito",         heading: "var(--font-dm-serif)",   body: "var(--font-nunito)" },
  { id: "avant",     label: "Avant",     specimen: "Syne / Space Grotesk",      heading: "var(--font-syne)",       body: "var(--font-space-grotesk)" },
  // ── Bold / Display ─────────────────────────────────────────────────────
  { id: "ink",       label: "Ink",       specimen: "Bebas / Lora",              heading: "var(--font-bebas)",      body: "var(--font-lora)" },
  { id: "signal",    label: "Signal",    specimen: "Bebas / Inter",             heading: "var(--font-bebas)",      body: "var(--font-inter)" },
  { id: "marquee",   label: "Marquee",   specimen: "Abril / Inter",             heading: "var(--font-abril)",      body: "var(--font-inter)" },
  { id: "neon",      label: "Neon",      specimen: "Bebas / Syne",              heading: "var(--font-bebas)",      body: "var(--font-syne)" },
  // ── Mono / Whimsy ──────────────────────────────────────────────────────
  { id: "press",     label: "Press",     specimen: "Playfair / Mono",           heading: "var(--font-playfair)",   body: "var(--font-jetbrains)" },
  { id: "memo",      label: "Memo",      specimen: "Mono / Inter",              heading: "var(--font-jetbrains)",  body: "var(--font-inter)" },
  { id: "whimsy",    label: "Whimsy",    specimen: "Caveat / Crimson",          heading: "var(--font-caveat)",     body: "var(--font-crimson)" },
  { id: "tender",    label: "Tender",    specimen: "Cormorant / Nunito",        heading: "var(--font-cormorant)",  body: "var(--font-nunito)" },
  { id: "vogue",     label: "Vogue",     specimen: "Bodoni / Raleway",          heading: "var(--font-bodoni)",     body: "var(--font-raleway)" },
];

// All CSS vars that templates use for heading/display fonts
export const HEADING_FONT_VARS = [
  "--font-cormorant", "--font-fraunces", "--font-bebas", "--font-playfair",
  "--font-caveat", "--font-dm-serif", "--font-bodoni", "--font-abril",
  "--font-garamond", "--font-syne", "--font-serif", "--font-display",
];

// All CSS vars that templates use for body/ui fonts
export const BODY_FONT_VARS = [
  "--font-josefin", "--font-inter", "--font-jetbrains", "--font-lora",
  "--font-crimson", "--font-space-grotesk", "--font-raleway", "--font-nunito",
  "--font-baskerville", "--font-spectral", "--font-mono", "--font-body-serif",
  "--font-sans",
];

export const RADIUS_PRESETS = [
  { id: "sharp",  label: "Sharp",  value: "0px" },
  { id: "soft",   label: "Soft",   value: "4px" },
  { id: "round",  label: "Round",  value: "12px" },
  { id: "pill",   label: "Pill",   value: "999px" },
] as const;

export type RadiusPreset = typeof RADIUS_PRESETS[number]["id"];
