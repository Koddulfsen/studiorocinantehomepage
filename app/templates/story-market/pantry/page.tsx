"use client";

import styles from "./pantry.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_SECTIONS = [
  { title: "Bread", body: "Sourdough loaves baked before sunrise. Whole grain, seeded, country white. A limited run each day — first come." },
  { title: "Pastry", body: "Butter croissants, kouign-amann, seasonal tarts. The pastry case is refilled until noon, then it's gone." },
  { title: "Lunch", body: "Three or four things, made properly. Soup, a sandwich, a grain bowl. Written on the board each morning." },
];

const DEFAULT_ITEMS = [
  { name: "Country Sourdough", price: "$12" },
  { name: "Croissant", price: "$4.50" },
  { name: "Pain au Chocolat", price: "$5" },
  { name: "Seasonal Tart", price: "$6.50" },
  { name: "Soup of the Day", price: "$10" },
  { name: "Market Sandwich", price: "$14" },
  { name: "Grain Bowl", price: "$15" },
  { name: "Filter Coffee", price: "$3" },
];

export default function Pantry() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "The Provisions Co.";
  const items = copy.menuItems ?? DEFAULT_ITEMS;
  const half = Math.ceil(items.length / 2);
  const sections = copy.sections ?? DEFAULT_SECTIONS;

  return (
    <TemplateShell templateId="story-market-pantry">
      <div className={styles.page}>
        <nav className={styles.nav}>
          <span className={styles.navName}>{name}</span>
          <span className={styles.navRight}>{client?.hours ?? "Open Daily · 7am–6pm"}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.heroSmall}>{copy.eyebrow ?? "Bakery & Café · Toronto"}</span>
            <h1 className={styles.heroName}>{name}</h1>
            <p className={styles.heroTagline}>{copy.tagline ?? "Made from scratch, every morning. Bread, pastries, and a short lunch menu that changes with the market."}</p>
            <a href="#" className={styles.heroCta}>{copy.cta ?? "Our Full Menu"}</a>
          </div>
          <div className={styles.heroImage} />
        </section>

        <section className={styles.provisions}>
          <span className={styles.provisionsLabel}>{copy.label ?? "What We Do"}</span>
          <div className={styles.provisionsGrid}>
            {sections.map((s, i) => (
              <div key={i} className={styles.provision}>
                <div className={`${styles.provisionImg} ${i === 0 ? styles.provisionImg1 : i === 1 ? styles.provisionImg2 : styles.provisionImg3}`} />
                <h3 className={styles.provisionTitle}>{s.title}</h3>
                <p className={styles.provisionBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.menu}>
          <div className={styles.menuHeader}>
            <h2 className={styles.menuTitle}>{copy.label2 ?? "From the Counter"}</h2>
            <p className={styles.menuSub}>A taste of what you&apos;ll find</p>
          </div>
          <div className={styles.menuRule} />
          <div className={styles.menuColumns}>
            <div>
              {items.slice(0, half).map((item, i) => (
                <div key={i} className={styles.menuItem}>
                  <span className={styles.menuItemName}>{item.name}</span>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
            <div>
              {items.slice(half).map((item, i) => (
                <div key={i} className={styles.menuItem}>
                  <span className={styles.menuItemName}>{item.name}</span>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerName}>{name}</span>
          <span className={styles.footerRight}>
            {client?.address ?? "224 Harbord St · Toronto"}<br />
            {client?.hours ?? "Daily 7am–6pm"}
          </span>
        </footer>
      </div>
    </TemplateShell>
  );
}
