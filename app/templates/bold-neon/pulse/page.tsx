"use client";

import styles from "./pulse.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Wonton Noodle Soup", desc: "handmade wontons, thin egg noodles, clear broth", price: "$14" },
  { name: "Char Siu Rice", desc: "honey-glazed pork, steamed rice, bok choy", price: "$16" },
  { name: "Egg Tarts (3)", desc: "flaky pastry, silky custard", price: "$7" },
  { name: "Kong Style Milk Tea", desc: "strong brew, evaporated milk, served hot or iced", price: "$6" },
  { name: "Pineapple Bun", desc: "toasted, with a slab of cold butter", price: "$5" },
  { name: "Crispy Tofu", desc: "five-spice, soy-ginger dip", price: "$13" },
];

const tickerItems = [
  "Open Late", "Walk-ins Welcome", "Milk Tea All Day",
  "Est. 2021", "Dundas West", "Open Late", "Walk-ins Welcome",
  "Milk Tea All Day", "Est. 2021", "Dundas West",
];

export default function Pulse() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Kong";
  return (
      <TemplateShell templateId="bold-neon-pulse">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#info">Find us</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTop}>
            <div className={styles.heroStatus}>
              <span className={styles.statusDot} aria-hidden />
              Open now
            </div>
            <h1 className={styles.heroName}>{name}</h1>
          </div>
          <div className={styles.heroBottom}>
            <p className={styles.heroTagline}>
              {copy.tagline ?? "Hong Kong diner food, made right. Late nights on Dundas West."}
            </p>
            <a href="#menu" className={styles.heroCta}>{copy.cta ?? "See the menu"}</a>
          </div>
        </div>
        <div className={styles.heroRight} aria-hidden>
          <div className={styles.heroRightGlow} />
        </div>
      </section>

      <div className={styles.ticker} aria-hidden>
        <div className={styles.tickerInner}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className={styles.tickerItem}>{item}</span>
          ))}
        </div>
      </div>

      <section className={styles.menu} id="menu">
        <div className={styles.menuHeader}>
          <h2 className={styles.menuTitle}>{copy.label ?? "Menu"}</h2>
          <span className={styles.menuTime}>Served all day</span>
        </div>
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

      <div className={styles.info} id="info">
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Hours</span>
          <p className={styles.infoValue}>{client?.hours ?? <>Daily<br />11 am – 2 am</>}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Address</span>
          <p className={styles.infoValue}>{client?.address ?? <>988 Dundas St W<br />Toronto, ON</>}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Phone</span>
          <p className={styles.infoValue}>{client?.phone ?? "(416) 555-0122"}</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{client?.neighbourhood
          ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " · Toronto · Open Late"
          : "Dundas West · Toronto · Open Late"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
