"use client";

import styles from "./paper.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Omakase — 8 courses", price: "$180" },
  { name: "Omakase — 12 courses", price: "$260" },
  { name: "Sake pairing", price: "$90" },
  { name: "Wine pairing", price: "$110" },
  { name: "Non-alcoholic pairing", price: "$60" },
];

export default function Paper() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Sora";
  return (
      <TemplateShell templateId="minimal-manor-paper">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <a href="#contact" className={styles.navCta}>Reserve</a>
      </nav>
      <div className={styles.rule} aria-hidden />

      <section className={styles.hero}>
        <span className={styles.heroSmall}>{copy.eyebrow ?? "Omakase · King West · Toronto"}</span>
        <h1 className={styles.heroName}>{name}</h1>
        <p className={styles.heroSub}>
          {copy.tagline ?? "Eight seats. One menu. What arrived this morning shapes what you eat tonight."}
        </p>
      </section>

      <div className={styles.rule} aria-hidden />

      <div className={styles.imageRow} aria-hidden>
        <div className={styles.imageMain} />
        <div className={styles.imageSide} />
      </div>

      <section className={styles.about}>
        <span className={styles.aboutLabel}>About</span>
        <div className={styles.aboutText}>
          <h2 className={styles.aboutHeading}>
            {copy.sections?.[0]?.title ?? "Chef Kenji Mori has been cooking omakase in Toronto since 2016."}
          </h2>
          <p className={styles.aboutBody}>
            {copy.body ?? "Sora seats eight people at a hinoki counter. There is one seating per evening, Wednesday through Saturday. The menu is never written down in advance. Chef Mori sources daily from Chinatown, from farms he has worked with for years, and from the Japanese fish market that arrives twice weekly. You eat what that combination produces."}
          </p>
        </div>
      </section>

      <div className={styles.rule} aria-hidden />

      <section className={styles.menu} id="menu">
        <span className={styles.menuLabel}>{copy.label ?? "Menu"}</span>
        <div className={styles.menuList}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.rule} aria-hidden />

      <footer className={styles.footer} id="contact">
        <span className={styles.footerName}>{name}</span>
        <div className={styles.footerDetails}>
          {client?.address ?? "342 King St W · Toronto"}<br />
          {client?.hours ?? "Wed – Sat · One seating at 7 pm"} · {client?.phone ?? "(416) 555-0190"}
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
