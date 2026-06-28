"use client";

import styles from "./grove.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Roasted Carrot Soup", desc: "ginger, coconut, coriander", price: "$12" },
  { name: "Kale Caesar", desc: "house dressing, seeds, parmesan", price: "$15" },
  { name: "Mushroom Tartine", desc: "sourdough, truffle oil, aged gouda", price: "$16" },
  { name: "Lentil Bowl", desc: "roasted beet, feta, herb dressing", price: "$17" },
  { name: "Matcha Latte", desc: "ceremonial grade, oat milk", price: "$6" },
];

export default function Grove() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Canopy";
  return (
      <TemplateShell templateId="story-market-grove">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <a href="#" className={styles.navCta}>Order Ahead</a>
      </nav>

      <section className={styles.hero}>
        <span className={styles.heroTag}>{copy.eyebrow ?? "Farm to Table · Toronto"}</span>
        <h1 className={styles.heroName}>{name}</h1>
        <p className={styles.heroTagline}>{copy.tagline ?? "Slow food from fast friends. We grow what we can, source the rest close by, and cook everything from scratch every morning."}</p>
        <div className={styles.heroImage} />
      </section>

      <section className={styles.story}>
        <div className={styles.storyLeft}>
          <span className={styles.storyLabel}>Since</span>
          <div className={styles.storyYear}>2017</div>
        </div>
        <div className={styles.storyRight}>
          <h2 className={styles.storyHeading}>{copy.sections?.[0]?.title ?? "A Kitchen Garden and a Very Stubborn Chef"}</h2>
          <p className={styles.storyBody}>
            {copy.body ?? "Canopy grew out of a backyard garden and a conviction that restaurant food didn't have to mean industrial supply chains. We work with eight Ontario farms, visit each one at least twice a season, and haven't bought a non-local vegetable in four years."}
          </p>
        </div>
        <div className={styles.storyPhotos}>
          <div className={`${styles.storyPhoto} ${styles.storyPhoto1}`} />
          <div className={`${styles.storyPhoto} ${styles.storyPhoto2}`} />
          <div className={`${styles.storyPhoto} ${styles.storyPhoto3}`} />
        </div>
      </section>

      <section className={styles.menu}>
        <span className={styles.menuLabel}>{copy.label ?? "What's On"}</span>
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
          <div key={i} className={styles.menuItem}>
            <div className={styles.menuItemLeft}>
              <span className={styles.menuItemName}>{item.name}</span>
              {item.desc && <span className={styles.menuItemDesc}>{item.desc}</span>}
            </div>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>
          {client?.address ?? "88 Roncesvalles Ave · Toronto"}<br />
          {client?.hours ?? "Mon–Sat · 8am–3pm"}
        </span>
      </footer>
    </div>
      </TemplateShell>
  );
}
