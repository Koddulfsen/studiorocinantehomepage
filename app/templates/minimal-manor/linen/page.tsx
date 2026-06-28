"use client";

import styles from "./linen.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Tasting Menu", price: "$135" },
  { name: "Wine Pairing", price: "$85" },
  { name: "À la carte — Starters", price: "From $22" },
  { name: "À la carte — Mains", price: "From $44" },
  { name: "Cheese Course", price: "$28" },
  { name: "Dessert", price: "$18" },
];

export default function Linen() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Estelle";
  return (
      <TemplateShell templateId="minimal-manor-linen">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Reserve</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.heroEyebrow}>{copy.eyebrow ?? "Rosedale · Toronto · Est. 2018"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <div className={styles.heroRule} aria-hidden />
          <p className={styles.heroTagline}>
            {copy.tagline ?? "A quietly serious restaurant. We take the food seriously. Everything else stays easy."}
          </p>
        </div>
        <div className={styles.heroImage} aria-hidden />
      </section>

      <section className={styles.split}>
        <div className={styles.splitImage} aria-hidden />
        <div className={styles.splitText}>
          <span className={styles.splitLabel}>{copy.label2 ?? "The dining room"}</span>
          <h2 className={styles.splitHeading}>
            {copy.sections?.[0]?.title
              ? copy.sections[0].title
              : <>Fourteen tables.<br />No background music.</>}
          </h2>
          <p className={styles.splitBody}>
            {copy.body ?? "Estelle opened in Rosedale in 2018. The room is small by design. The kitchen sends out what it wants to cook that week, not what a fixed menu demands. Reservations are recommended; walk-ins are always welcome if there’s a seat."}
          </p>
          <a href="#contact" className={styles.splitCta}>{copy.cta ?? "Reserve a table →"}</a>
        </div>
      </section>

      <div className={styles.heroImageMobile} aria-hidden />

      <section className={styles.menu} id="menu">
        <span className={styles.menuLabel}>{copy.label ?? "Menu"}</span>
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
          <div key={item.name} className={styles.menuItem}>
            <span className={styles.menuItemName}>{item.name}</span>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer} id="contact">
        <span className={styles.footerName}>{name}</span>
        <div className={styles.footerInfo}>
          <div className={styles.footerBlock}>
            <h3>Hours</h3>
            <p>{client?.hours ?? <>Wed – Sun<br />6 pm – 10 pm</>}</p>
          </div>
          <div className={styles.footerBlock}>
            <h3>Address</h3>
            <p>{client?.address ?? <>88 Cluny Dr<br />Toronto, ON</>}</p>
          </div>
          <div className={styles.footerBlock}>
            <h3>Phone</h3>
            <p>{client?.phone ?? "(416) 555-0117"}</p>
          </div>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
