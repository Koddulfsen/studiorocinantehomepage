"use client";

import styles from "./slate.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Seared Scallop", desc: "cauliflower purée, caviar, dill oil", price: "$36" },
  { name: "Duck Confit", desc: "cherry gastrique, lentil, micro herbs", price: "$48" },
  { name: "Wagyu Bavette", desc: "bone marrow jus, truffle pomme purée", price: "$64" },
  { name: "Halibut", desc: "beurre blanc, fennel, preserved lemon", price: "$52" },
  { name: "Cheese Selection", desc: "three cheeses, accompaniments", price: "$24" },
  { name: "Dark Chocolate Délice", desc: "hazelnut praline, sea salt", price: "$18" },
];

export default function Slate() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Oren";
  return (
      <TemplateShell templateId="minimal-manor-slate">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Reserve</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroName}>{name}</h1>
        </div>
        <div className={styles.heroRight}>
          <span className={styles.heroLabel}>{copy.eyebrow ?? "Yorkville · Toronto"}</span>
          <p className={styles.heroTagline}>
            {copy.tagline ?? "Contemporary fine dining. A short menu, changed often, built around what is best right now."}
          </p>
          <a href="#contact" className={styles.heroCta}>{copy.cta ?? "Reserve a table"}</a>
        </div>
      </section>

      <div className={styles.image} aria-hidden />

      <section className={styles.menu} id="menu">
        <span className={styles.menuLabel}>{copy.label ?? "Current menu"}</span>
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
          <div key={item.name} className={styles.menuItem}>
            <div className={styles.menuItemLeft}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemDesc}>{item.desc}</span>
            </div>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Tue – Sat<br />6 pm – 10 pm</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Address</h3>
          <p>{client?.address ?? <>22 Hazelton Ave<br />Toronto, ON</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Reserve</h3>
          <p>{client?.phone ?? "(416) 555-0155"}</p>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
