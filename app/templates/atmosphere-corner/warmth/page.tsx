"use client";

import styles from "./warmth.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "French Toast Stack", price: "$16" },
  { name: "Eggs Benedict", price: "$18" },
  { name: "Blueberry Pancakes", price: "$14" },
  { name: "The Classic Burger", price: "$17" },
  { name: "Caesar Salad", price: "$15" },
  { name: "Grilled Cheese & Tomato Soup", price: "$13" },
];

export default function Warmth() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Marlowe's";
  return (
      <TemplateShell templateId="atmosphere-corner-warmth">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#contact">Visit</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroFade} aria-hidden />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>{copy.eyebrow ?? "Queen West · Toronto · Since 1987"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroTagline}>
            {copy.tagline ?? "The kind of place you bring your parents. And then keep coming back alone."}
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyImage} aria-hidden />
        <div className={styles.storyText}>
          <span className={styles.storyLabel}>{copy.label2 ?? "The room"}</span>
          <h2 className={styles.storyHeading}>
            {copy.sections?.[0]?.title ?? "Thirty-seven years on the same corner."}
          </h2>
          <p className={styles.storyBody}>
            {copy.body ?? "Marlowe's has been feeding Queen West since 1987. The booths haven't changed. The coffee is still refilled without asking. The menu is short and everything on it is done right."}
          </p>
        </div>
      </section>

      <section className={styles.menu} id="menu">
        <span className={styles.menuLabel}>{copy.label ?? "Menu"}</span>
        <div className={styles.menuGrid}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Daily<br />7 am – 10 pm</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Address</h3>
          <p>{client?.address ?? <>874 Queen St W<br />Toronto, ON</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Phone</h3>
          <p>{client?.phone ?? "(416) 555-0131"}</p>
        </div>
      </footer>
      <div className={styles.footerDivider} aria-hidden />
      <div className={styles.footerBase}>
        <span className={styles.footerBaseName}>{name} Diner</span>
        <span className={styles.footerBaseNeighborhood}>{copy.eyebrow ?? "Queen West · Toronto"}</span>
      </div>
    </div>
      </TemplateShell>
  );
}
