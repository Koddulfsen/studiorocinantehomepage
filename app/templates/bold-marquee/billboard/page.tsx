"use client";

import styles from "./billboard.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Smash Burger", price: "$16" },
  { name: "Double Smash", price: "$20" },
  { name: "Crispy Chicken", price: "$17" },
  { name: "Fries", price: "$7" },
  { name: "Onion Rings", price: "$8" },
  { name: "Milkshake", price: "$9" },
];

export default function Billboard() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Smash";
  return (
      <TemplateShell templateId="bold-marquee-billboard">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navLeft}>{name} · {copy.eyebrow ?? "Ossington · Toronto"}</span>
        <a href="#menu" className={styles.navCta}>Menu</a>
      </nav>

      <section className={styles.marqueeHero}>
        <h1 className={styles.heroName}>{name}</h1>
        <p className={styles.heroSub}>
          {client?.neighbourhood
            ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : "Ossington"}
          <span className={styles.heroDot}>·</span>
          Toronto
          <span className={styles.heroDot}>·</span>
          {client?.hours ?? "Open Late"}
        </p>
      </section>

      <div className={styles.infoBar}>
        <div className={styles.infoBarItem}>
          <span className={styles.infoBarLabel}>Open</span>
          <span className={styles.infoBarValue}>{client?.hours ?? "Daily 11–2am"}</span>
        </div>
        <div className={styles.infoBarItem}>
          <span className={styles.infoBarLabel}>Address</span>
          <span className={styles.infoBarValue}>{client?.address ?? "244 Ossington"}</span>
        </div>
        <div className={styles.infoBarItem}>
          <span className={styles.infoBarLabel}>Phone</span>
          <span className={styles.infoBarValue}>{client?.phone ?? "(416) 555-0133"}</span>
        </div>
        <div className={styles.infoBarItem}>
          <span className={styles.infoBarLabel}>Order</span>
          <span className={styles.infoBarValue}>Walk up</span>
        </div>
      </div>

      <section className={styles.menu} id="menu">
        <span className={styles.menuTitle}>{copy.label ?? "Menu"}</span>
        <div className={styles.menuRule} aria-hidden />
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
          <div key={item.name} className={styles.menuItem}>
            <span className={styles.menuItemName}>{item.name}</span>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{copy.eyebrow ?? "Ossington · Toronto"} · {client?.hours ?? "Open Late"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
