"use client";

import styles from "./signal.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Natural Wine", desc: "rotating selection, ask your server", price: "From $14" },
  { name: "Charcuterie Board", desc: "cured meats, pickles, mustard, bread", price: "$28" },
  { name: "Oysters", desc: "P.E.I., mignonette, lemon", price: "$4 ea" },
  { name: "Burrata", desc: "heirloom tomato, basil oil, fleur de sel", price: "$22" },
  { name: "Steak Frites", desc: "bavette, herb butter, hand-cut frites", price: "$38" },
  { name: "Chocolate Mousse", desc: "crème fraîche, cocoa nib", price: "$14" },
];

export default function Signal() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Faro";
  return (
      <TemplateShell templateId="bold-marquee-signal">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navLeft}>{copy.eyebrow ?? "Wine bar · Parkdale · Toronto"}</span>
        <a href="#contact" className={styles.navCta}>Reserve</a>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroNameCol}>
          <h1 className={styles.heroName}>{name}</h1>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <span className={styles.heroLabel}>{copy.eyebrow ?? "Natural Wine Bar · Parkdale · Toronto"}</span>
            <p className={styles.heroTagline}>
              {copy.tagline ?? "Low-intervention wines. Good food. A room worth staying in."}
            </p>
          </div>
          <div className={styles.heroBottom}>
            <span className={styles.heroDetail}>{client?.address ?? "1062 Queen St W, Toronto"}</span>
            <span className={styles.heroDetail}>{client?.hours ?? "Tue – Sun · 5 pm – 1 am"}</span>
            <span className={styles.heroDetail}>{client?.phone ?? "(416) 555-0148"}</span>
          </div>
        </div>
        <div className={styles.heroImage} aria-hidden />
      </section>

      <section className={styles.menu} id="menu">
        <span className={styles.menuSidebar} aria-hidden>{copy.label ?? "Menu"}</span>
        <div className={styles.menuList}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <div className={styles.menuItemLeft}>
                <span className={styles.menuItemName}>{item.name}</span>
                <span className={styles.menuItemDesc}>{item.desc}</span>
              </div>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
        <div className={styles.menuImage} aria-hidden />
      </section>

      <footer className={styles.footer} id="contact">
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{client?.address ?? "1062 Queen St W · Parkdale · Toronto"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
