"use client";

import styles from "./clash.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Tacos al Pastor (3)", desc: "pork, pineapple, cilantro, onion", price: "$16" },
  { name: "Birria Quesadilla", desc: "braised beef, consommé, oaxaca cheese", price: "$18" },
  { name: "Elote", desc: "grilled corn, cotija, chili, lime crema", price: "$9" },
  { name: "Ceviche", desc: "shrimp, mango, jalapeño, tortilla chips", price: "$17" },
  { name: "Pollo a la Brasa", desc: "half chicken, chimichurri, rice & beans", price: "$24" },
  { name: "Churros", desc: "cinnamon sugar, dark chocolate dipping sauce", price: "$10" },
];

export default function Clash() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Fuego";
  return (
      <TemplateShell templateId="bold-neon-clash">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <a href="#contact" className={styles.navCta}>Reserve</a>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden>{name}</div>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>{copy.eyebrow ?? "Latin Grill · Little Portugal · Toronto"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroTagline}>
            {copy.tagline ?? "Wood fire. Big flavour. No apologies."}
          </p>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutText}>
          <span className={styles.aboutLabel}>The grill</span>
          <h2 className={styles.aboutHeading}>Everything goes<br />over the fire.</h2>
          <p className={styles.aboutBody}>
            {copy.body ?? "Fuego has been cooking over hardwood on Dundas West since 2017. The menu is short and changes weekly — whatever looked best at the market that morning ends up on the grill by evening."}
          </p>
        </div>
        <div className={styles.aboutImage} aria-hidden />
      </section>

      <section className={styles.menu} id="menu">
        <div className={styles.menuTop}>
          <h2 className={styles.menuLabel}>{copy.label ?? "Menu"}</h2>
          <span className={styles.menuSub}>Changes weekly</span>
        </div>
        <div className={styles.menuDivider} aria-hidden />
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

      <section className={styles.contact} id="contact">
        <div className={styles.contactLeft}>
          <h2 className={styles.contactHeading}>{copy.label2 ?? "Come eat."}</h2>
          <p className={styles.contactSub}>Walk-ins welcome. Reservations for groups of 6+.</p>
        </div>
        <div className={styles.contactRight}>
          <span className={styles.contactDetail}>{client?.address ?? "1842 Dundas St W, Toronto"}</span>
          <span className={styles.contactDetail}>{client?.hours ?? "Tue – Sun · 5 pm – 11 pm"}</span>
          <span className={styles.contactDetail}>{client?.phone ?? "(416) 555-0144"}</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{client?.neighbourhood
          ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " · Toronto"
          : "Little Portugal · Toronto"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
