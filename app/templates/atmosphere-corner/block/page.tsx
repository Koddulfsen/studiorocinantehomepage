"use client";

import styles from "./block.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Avocado Toast", price: "$14" },
  { name: "Smoked Salmon Bagel", price: "$17" },
  { name: "Shakshuka", price: "$16" },
  { name: "Granola Bowl", price: "$13" },
  { name: "Croque Monsieur", price: "$15" },
  { name: "Banana Bread", price: "$6" },
];

export default function Block() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "The Ruby";
  return (
      <TemplateShell templateId="atmosphere-corner-block">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <span className={styles.navRight}>{copy.eyebrow ?? "The Annex · Toronto"}</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTop}>
            <span className={styles.heroCuisine}>{client?.cuisine ?? "Neighbourhood Café"}</span>
            <h1 className={styles.heroName}>{name}</h1>
          </div>
          <div className={styles.heroBottom}>
            <p className={styles.heroTagline}>
              {copy.tagline ?? "A quiet corner of Bloor Street. Good coffee, no fuss, always a seat."}
            </p>
            <address className={styles.heroAddress} style={{ fontStyle: "normal" }}>
              {client?.address ?? <>612 Bloor St W<br />The Annex, Toronto</>}<br />
              {client?.hours ?? "Open daily 7 am – 6 pm"}
            </address>
          </div>
        </div>
        <div className={styles.heroRight} aria-hidden>
          <span className={styles.heroRightLabel} aria-hidden>Interior</span>
        </div>
      </section>

      <div className={styles.strip}>
        <span className={styles.stripItem}><strong>Est.</strong> 2011</span>
        <span className={styles.stripItem}><strong>Neighbourhood</strong> {client?.neighbourhood
          ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : "The Annex"}</span>
        <span className={styles.stripItem}><strong>Hours</strong> {client?.hours ?? "7 am – 6 pm daily"}</span>
        <span className={styles.stripItem}><strong>Phone</strong> {client?.phone ?? "(416) 555-0177"}</span>
      </div>

      <section className={styles.about}>
        <div className={styles.aboutLeft}>
          <p className={styles.aboutYear}>2011</p>
          <span className={styles.aboutSince}>Since</span>
        </div>
        <div className={styles.aboutRight}>
          <h2 className={styles.aboutHeading}>
            {copy.sections?.[0]?.title ?? "Your neighbourhood café, for over a decade."}
          </h2>
          <p className={styles.aboutBody}>
            {copy.body ?? "The Ruby opened on Bloor West in 2011 as a place for the neighbourhood to slow down for a moment. Same owners. Same corner. The lattes are better now, but not much else has changed — and that's the point."}
          </p>
        </div>
        <div className={styles.aboutImage} />
      </section>

      <section className={styles.menu} id="menu">
        <div className={styles.menuTop}>
          <h2 className={styles.menuTitle}>{copy.label ?? "Menu"}</h2>
          <span className={styles.menuSub}>Served all day</span>
        </div>
        <div className={styles.menuRule} aria-hidden />
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
          <div key={item.name} className={styles.menuItem}>
            <span className={styles.menuItemName}>{item.name}</span>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer} id="contact">
        <span className={styles.footerLeft}>{name}</span>
        <div className={styles.footerRight}>
          {client?.address ?? "612 Bloor St W, Toronto"}<br />
          {client?.hours ?? "Daily · 7 am – 6 pm"}
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
