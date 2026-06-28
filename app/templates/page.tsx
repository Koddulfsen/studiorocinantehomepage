import Link from "next/link";
import styles from "./templates.module.css";

const groups = [
  {
    combo: "Food Closeup + Noir",
    templates: [
      { slug: "food-noir/obsidian", label: "Obsidian", accent: "#c9a84c" },
      { slug: "food-noir/velvet",   label: "Velvet",   accent: "#c9a84c" },
      { slug: "food-noir/ember",    label: "Ember",    accent: "#d4521a" },
    ],
  },
  {
    combo: "Bold Graphic + Neon",
    templates: [
      { slug: "bold-neon/volt",  label: "Volt",  accent: "#EEFF00", core: true },
      { slug: "bold-neon/clash", label: "Clash", accent: "#D42B1E", core: true },
      { slug: "bold-neon/pulse", label: "Pulse", accent: "#00FF87" },
    ],
  },
  {
    combo: "Atmosphere + Corner",
    templates: [
      { slug: "atmosphere-corner/warmth",    label: "Warmth",    accent: "#a07840" },
      { slug: "atmosphere-corner/block",     label: "Block",     accent: "#a07840" },
      { slug: "atmosphere-corner/chronicle", label: "Chronicle", accent: "#8a5c28", core: true },
    ],
  },
  {
    combo: "Story + Broadsheet",
    templates: [
      { slug: "story-broadsheet/ledger",  label: "Ledger",  accent: "#B8001F" },
      { slug: "story-broadsheet/feature", label: "Feature", accent: "#B8001F" },
      { slug: "story-broadsheet/byline",  label: "Byline",  accent: "#B8001F", core: true },
    ],
  },
  {
    combo: "Minimal + Manor",
    templates: [
      { slug: "minimal-manor/slate",  label: "Slate",  accent: "#E8E2D8" },
      { slug: "minimal-manor/linen",  label: "Linen",  accent: "#1A1612", core: true },
      { slug: "minimal-manor/paper",  label: "Paper",  accent: "#111008" },
    ],
  },
  {
    combo: "Bold Graphic + Marquee",
    templates: [
      { slug: "bold-marquee/billboard", label: "Billboard", accent: "#F7F200" },
      { slug: "bold-marquee/stamp",     label: "Stamp",     accent: "#0D0D0D", core: true },
      { slug: "bold-marquee/signal",    label: "Signal",    accent: "#F2EDE4", core: true },
    ],
  },
  {
    combo: "Food Closeup + Polaroid",
    templates: [
      { slug: "food-polaroid/roll",    label: "Roll",    accent: "#C9A07A", core: true },
      { slug: "food-polaroid/contact", label: "Contact", accent: "#E8E0D0", core: true },
      { slug: "food-polaroid/candid",  label: "Candid",  accent: "#18130A", core: true },
    ],
  },
  {
    combo: "Atmosphere + Manor",
    templates: [
      { slug: "atmosphere-manor/salon",  label: "Salon",  accent: "#C9A84C" },
      { slug: "atmosphere-manor/cellar", label: "Cellar", accent: "#EDE0D4" },
      { slug: "atmosphere-manor/suite",  label: "Suite",  accent: "#14100C" },
    ],
  },
  {
    combo: "Story + Market",
    templates: [
      { slug: "story-market/harvest", label: "Harvest", accent: "#C45A1A" },
      { slug: "story-market/grove",   label: "Grove",   accent: "#2A5A1A", core: true },
      { slug: "story-market/pantry",  label: "Pantry",  accent: "#1C140A", core: true },
    ],
  },
  {
    combo: "Minimal + Mochi",
    templates: [
      { slug: "minimal-mochi/hana", label: "Hana", accent: "#C4877A", core: true },
    ],
  },
];

const total = groups.reduce((n, g) => n + g.templates.length, 0);

export default function TemplateShowcase() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backLink}>← Studio Rocinante</Link>
          <h1 className={styles.pageTitle}>Template Library</h1>
        </div>
        <span className={styles.pageCount}>{total} templates</span>
      </div>

      {groups.map((group) => (
        <section key={group.combo} className={styles.group}>
          <p className={styles.groupLabel}>{group.combo}</p>
          <div className={styles.grid}>
            {group.templates.map((t) => (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.card}${t.core ? ` ${styles.cardCore}` : ""}`}
              >
                <div className={styles.previewWrap}>
                  <iframe
                    src={`/templates/${t.slug}`}
                    title={t.label}
                    className={styles.previewFrame}
                    tabIndex={-1}
                    aria-hidden
                  />
                  <div className={styles.previewOverlay} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardName}>
                    <span
                      className={styles.accentDot}
                      style={{ background: t.accent }}
                      aria-hidden
                    />
                    {t.label}
                  </span>
                  <span className={styles.cardOpen}>Open ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
