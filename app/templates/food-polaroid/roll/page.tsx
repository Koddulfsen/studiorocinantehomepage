"use client";

import styles from "./roll.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Soupe de Saison", price: "$12" },
  { name: "Salade Verte", price: "$14" },
  { name: "Bavette et Frites", price: "$32" },
  { name: "Canard Rôti", price: "$36" },
  { name: "Crème Brûlée", price: "$11" },
  { name: "Tarte du Jour", price: "$10" },
];

export default function Roll() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Maison Levant";
  return (
      <TemplateShell templateId="food-polaroid-roll">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Visit</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroPolaroid}>
            <div className={styles.heroPolaroidImg} />
            <p className={styles.heroPolaroidCaption}>{copy.slotCaptions?.["slot-1"] ?? "the kitchen, sunday morning"}</p>
          </div>
        </div>
        <div className={styles.heroRight}>
          <span className={styles.heroLabel}>{copy.eyebrow ?? "Toronto · Est. 2019"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroTagline}>{copy.tagline ?? "A neighbourhood bistro where every dish is made from memory and instinct."}</p>
          <a href="#" className={styles.heroCta}>{copy.cta ?? "Reserve a Table"}</a>
        </div>
      </section>

      <section className={styles.grid}>
        <span className={styles.gridLabel}>{copy.label2 ?? "From the Kitchen"}</span>
        <div className={styles.polaroid}>
          <div className={`${styles.polaroidImg} ${styles.food1}`} />
          <p className={styles.polaroidCaption}>{copy.slotCaptions?.["slot-2"] ?? "duck confit, autumn"}</p>
        </div>
        <div className={styles.polaroid}>
          <div className={`${styles.polaroidImg} ${styles.food2}`} />
          <p className={styles.polaroidCaption}>{copy.slotCaptions?.["slot-3"] ?? "market salad"}</p>
        </div>
        <div className={styles.polaroid}>
          <div className={`${styles.polaroidImg} ${styles.food3}`} />
          <p className={styles.polaroidCaption}>{copy.slotCaptions?.["slot-4"] ?? "tarte tatin"}</p>
        </div>
      </section>

      <section className={styles.menu}>
        <span className={styles.menuLabel}>{copy.label ?? "Carte du Soir"}</span>
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
          <div key={i} className={styles.menuItem}>
            <span className={styles.menuItemName}>{item.name}</span>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{client?.address ?? "847 Queen St W · Toronto"} · {client?.hours ?? "Open Wed–Sun"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
