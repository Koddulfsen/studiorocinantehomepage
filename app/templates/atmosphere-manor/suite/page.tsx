"use client";

import styles from "./suite.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Hamachi Crudo", desc: "yuzu, cucumber, shiso", price: "$24" },
  { name: "Heritage Beet", desc: "goat cheese, walnut, honey", price: "$18" },
  { name: "Ontario Lamb Loin", desc: "green garlic, ramp, morel", price: "$54" },
  { name: "Wild Halibut", desc: "white asparagus, brown butter, lemon", price: "$48" },
  { name: "Passionfruit Pavlova", desc: "mango, coconut cream", price: "$16" },
];

export default function Suite() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Sable";
  return (
      <TemplateShell templateId="atmosphere-manor-suite">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#">Menu</a></li>
          <li><a href="#">The Room</a></li>
          <li><a href="#">Reserve</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBgText} aria-hidden>{name.toUpperCase()}</div>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>{copy.eyebrow ?? "Contemporary Fine Dining · Toronto"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroTagline}>{copy.tagline ?? "Modern Canadian cuisine in a room designed for conversation. No theatrics — just very good food and attentive care."}</p>
          <a href="#" className={styles.heroCta}>{copy.cta ?? "Reserve"}</a>
        </div>
      </section>

      <div className={styles.image} />

      <section className={styles.about}>
        <span className={styles.aboutLabel}>{copy.label2 ?? "Our Philosophy"}</span>
        <div className={styles.aboutRight}>
          <h2 className={styles.aboutHeading}>{copy.sections?.[0]?.title ?? "Restraint as a form of generosity."}</h2>
          <p className={styles.aboutBody}>
            {copy.body ?? "Chef Clara Voss trained in Copenhagen and returned to Toronto with a single conviction: that the best hospitality is invisible. The menu changes with the seasons. The room stays the same — quiet, warm, and entirely focused on you."}
          </p>
        </div>
      </section>

      <section className={styles.menu}>
        <div className={styles.menuLeft}>
          <h2 className={styles.menuTitle}>{copy.label ?? "Menu"}</h2>
          <span className={styles.menuSub}>Spring · 2026</span>
        </div>
        <div className={styles.menuRight}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
            <div key={i} className={styles.menuItem}>
              <div className={styles.menuItemLeft}>
                <span className={styles.menuItemName}>{item.name}</span>
                {item.desc && <span className={styles.menuItemDesc}>{item.desc}</span>}
              </div>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Wed–Sat<br />Dinner 5:30–10pm</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Location</h3>
          <p>{client?.address ?? <>55 Adelaide St E<br />Toronto, Ontario</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Contact</h3>
          <p>Reservations required<br />{client?.phone ?? "(416) 555-0391"}</p>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
