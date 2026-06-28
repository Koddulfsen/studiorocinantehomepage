"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./select.module.css";

const ALL_TEMPLATES = [
  { combo: "Minimal + Mochi",       id: "minimal-mochi-hana",          label: "Hana",      path: "minimal-mochi/hana",          accent: "#C4877A" },
  { combo: "Minimal + Manor",       id: "minimal-manor-linen",         label: "Linen",     path: "minimal-manor/linen",         accent: "#7a9e7e" },
  { combo: "Minimal + Manor",       id: "minimal-manor-paper",         label: "Paper",     path: "minimal-manor/paper",         accent: "#111008" },
  { combo: "Minimal + Manor",       id: "minimal-manor-slate",         label: "Slate",     path: "minimal-manor/slate",         accent: "#E8E2D8" },
  { combo: "Atmosphere + Corner",   id: "atmosphere-corner-chronicle", label: "Chronicle", path: "atmosphere-corner/chronicle", accent: "#8a5c28" },
  { combo: "Atmosphere + Corner",   id: "atmosphere-corner-block",     label: "Block",     path: "atmosphere-corner/block",     accent: "#a07840" },
  { combo: "Atmosphere + Corner",   id: "atmosphere-corner-warmth",    label: "Warmth",    path: "atmosphere-corner/warmth",    accent: "#a07840" },
  { combo: "Story + Broadsheet",    id: "story-broadsheet-byline",     label: "Byline",    path: "story-broadsheet/byline",     accent: "#B8001F" },
  { combo: "Story + Broadsheet",    id: "story-broadsheet-feature",    label: "Feature",   path: "story-broadsheet/feature",    accent: "#B8001F" },
  { combo: "Story + Broadsheet",    id: "story-broadsheet-ledger",     label: "Ledger",    path: "story-broadsheet/ledger",     accent: "#B8001F" },
  { combo: "Story + Market",        id: "story-market-grove",          label: "Grove",     path: "story-market/grove",          accent: "#2A5A1A" },
  { combo: "Story + Market",        id: "story-market-pantry",         label: "Pantry",    path: "story-market/pantry",         accent: "#8B5E1A" },
  { combo: "Story + Market",        id: "story-market-harvest",        label: "Harvest",   path: "story-market/harvest",        accent: "#C45A1A" },
  { combo: "Bold Graphic + Neon",   id: "bold-neon-volt",              label: "Volt",      path: "bold-neon/volt",              accent: "#EEFF00" },
  { combo: "Bold Graphic + Neon",   id: "bold-neon-clash",             label: "Clash",     path: "bold-neon/clash",             accent: "#D42B1E" },
  { combo: "Bold Graphic + Neon",   id: "bold-neon-pulse",             label: "Pulse",     path: "bold-neon/pulse",             accent: "#00FF87" },
  { combo: "Bold Graphic + Marquee",id: "bold-marquee-stamp",          label: "Stamp",     path: "bold-marquee/stamp",          accent: "#2A5C3A" },
  { combo: "Bold Graphic + Marquee",id: "bold-marquee-signal",         label: "Signal",    path: "bold-marquee/signal",         accent: "#A0607A" },
  { combo: "Bold Graphic + Marquee",id: "bold-marquee-billboard",      label: "Billboard", path: "bold-marquee/billboard",      accent: "#F7F200" },
  { combo: "Food Closeup + Noir",   id: "food-noir-obsidian",          label: "Obsidian",  path: "food-noir/obsidian",          accent: "#c9a84c" },
  { combo: "Food Closeup + Noir",   id: "food-noir-velvet",            label: "Velvet",    path: "food-noir/velvet",            accent: "#c9a84c" },
  { combo: "Food Closeup + Noir",   id: "food-noir-ember",             label: "Ember",     path: "food-noir/ember",             accent: "#d4521a" },
  { combo: "Food Closeup + Polaroid",id:"food-polaroid-roll",          label: "Roll",      path: "food-polaroid/roll",          accent: "#C9843A" },
  { combo: "Food Closeup + Polaroid",id:"food-polaroid-contact",       label: "Contact",   path: "food-polaroid/contact",       accent: "#C47A2A" },
  { combo: "Food Closeup + Polaroid",id:"food-polaroid-candid",        label: "Candid",    path: "food-polaroid/candid",        accent: "#A0522D" },
  { combo: "Atmosphere + Manor",    id: "atmosphere-manor-salon",      label: "Salon",     path: "atmosphere-manor/salon",      accent: "#C9A84C" },
  { combo: "Atmosphere + Manor",    id: "atmosphere-manor-cellar",     label: "Cellar",    path: "atmosphere-manor/cellar",     accent: "#EDE0D4" },
  { combo: "Atmosphere + Manor",    id: "atmosphere-manor-suite",      label: "Suite",     path: "atmosphere-manor/suite",      accent: "#14100C" },
];

// Group by combo
const groups = ALL_TEMPLATES.reduce<Record<string, typeof ALL_TEMPLATES>>((acc, t) => {
  (acc[t.combo] ??= []).push(t);
  return acc;
}, {});

export default function SelectTemplate() {
  const params = useParams();
  const router = useRouter();
  const clientSlug = params.slug as string;

  async function pick(templateId: string) {
    // Create photo folder for this client
    await fetch(`/api/clients/${clientSlug}/init`, { method: "POST" });

    // Find next available version number
    const res = await fetch(`/api/clients/${clientSlug}`);
    const config = await res.json();
    const nextVersion = (config.templates?.length ?? 0) + 1;

    // Create a stub entry
    await fetch(`/api/clients/${clientSlug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: nextVersion,
        templateId,
        fontPreset: "hana",
        radius: "sharp",
        accent: "#C4877A",
        titleSize: 50,
        titleTransform: "none",
        slots: {},
      }),
    });

    router.push(`/dashboard/${clientSlug}/edit/${nextVersion}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/dashboard" className={styles.back}>← Dashboard</Link>
        <h1 className={styles.title}>Choose a template</h1>
        <p className={styles.sub}>Pick the right vibe for this client. You can add more later.</p>
      </div>

      {Object.entries(groups).map(([combo, templates]) => (
        <section key={combo} className={styles.group}>
          <p className={styles.groupLabel}>{combo}</p>
          <div className={styles.grid}>
            {templates.map((t) => (
              <div key={t.id} className={styles.card}>
                <div className={styles.previewWrap}>
                  <iframe
                    src={`/templates/${t.path}`}
                    className={styles.previewFrame}
                    tabIndex={-1}
                    aria-hidden
                  />
                  <div className={styles.previewOverlay} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardName}>
                    <span className={styles.dot} style={{ background: t.accent }} />
                    {t.label}
                  </span>
                  <button className={styles.useBtn} onClick={() => pick(t.id)}>
                    Use this →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
