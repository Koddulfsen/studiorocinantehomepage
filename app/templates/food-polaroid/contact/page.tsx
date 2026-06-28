"use client";

import styles from "./contact.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Cured Char", desc: "crème fraîche · dill · buckwheat", price: "—" },
  { name: "Celery Root Velouté", desc: "truffle · aged cheddar", price: "—" },
  { name: "Duck Breast", desc: "cherry gastrique · roasted kohlrabi", price: "—" },
  { name: "Chocolate Ganache", desc: "smoked caramel · sea salt", price: "—" },
  { name: "Tasting Menu", desc: "8 courses · beverage pairings available", price: "$145 pp" },
];

export default function Contact() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Atelier No. 4";
  return (
      <TemplateShell templateId="food-polaroid-contact">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <span className={styles.navRight}>{copy.eyebrow ?? "Toronto · Est. 2021"}</span>
      </nav>

      <div className={styles.filmStrip}>
        <div className={styles.frame}>
          <div className={`${styles.frameImg} ${styles.f1}`} />
          <span className={styles.frameNum}>01</span>
        </div>
        <div className={styles.frame}>
          <div className={`${styles.frameImg} ${styles.f2}`} />
          <span className={styles.frameNum}>02</span>
        </div>
        <div className={styles.frame}>
          <div className={`${styles.frameImg} ${styles.f3}`} />
          <span className={styles.frameNum}>03</span>
        </div>
        <div className={styles.frame}>
          <div className={`${styles.frameImg} ${styles.f4}`} />
          <span className={styles.frameNum}>04</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroLabel}>{copy.label2 ?? "A Tasting Kitchen"}</span>
          <h1 className={styles.heroName}>{name}</h1>
        </div>
        <div className={styles.heroRight}>
          <p className={styles.heroTagline}>{copy.tagline ?? "An intimate eight-course dinner where the menu changes with what comes in from the farms each morning."}</p>
          <a href="#" className={styles.heroCta}>{copy.cta ?? "Book Your Seat"}</a>
        </div>
      </section>

      <section className={styles.menu}>
        <span className={styles.menuLabel}>{copy.label ?? "Tonight's Menu"}</span>
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
        <span className={styles.footerRight}>{client?.address ?? "1203 Dundas St W · Toronto"} · {client?.hours ?? "Thu–Sat Only"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
