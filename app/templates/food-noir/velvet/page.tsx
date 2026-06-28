"use client";

import styles from "./noir-velvet.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Burrata & Heirloom", price: "$24" },
  { name: "Roasted Bone Marrow", price: "$28" },
  { name: "Tagliatelle al Ragù", price: "$32" },
  { name: "Grilled Branzino", price: "$42" },
  { name: "Beef Tenderloin", price: "$58" },
  { name: "Tiramisu", price: "$16" },
];

export default function NoirVelvet() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Maro";
  return (
      <TemplateShell templateId="food-noir-velvet">
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.headerName}>{name}</span>
        <nav>
          <ul className={styles.headerNav}>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#story">Story</a></li>
            <li><a href="#contact">Reserve</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImage} aria-hidden>
          <div className={styles.heroImageFade} />
        </div>
        <div className={styles.heroText}>
          <span className={styles.heroOverline}>King St W · Toronto</span>
          <h1 className={styles.heroTitle}>
            {copy.tagline ?? "Honest food, carefully made."}
          </h1>
          <div className={styles.heroLine} aria-hidden />
          <p className={styles.heroCopy}>
            {copy.body ?? "A small room. A menu that changes with what arrives. Open Tuesday through Sunday from five."}
          </p>
          <a href="#contact" className={styles.heroCta}>{copy.cta ?? "Reserve a table"}</a>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story} id="story">
        <div className={styles.storyText}>
          <span className={styles.storyLabel}>The kitchen</span>
          <h2 className={styles.storyHeading}>
            We cook what we&apos;d want to eat.
          </h2>
          <p className={styles.storyBody}>
            {name} opened in 2019 with eight tables and no printer. The menu is written on a board,
            changed when it should be, and kept short enough that everything on it is worth ordering.
          </p>
        </div>
        <div className={styles.storyImage} aria-hidden />
      </section>

      {/* Menu */}
      <section className={styles.menu} id="menu">
        <span className={styles.menuLabel}>{copy.label ?? "Current menu"}</span>
        <div className={styles.menuGrid}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer} id="contact">
        <div className={styles.footerBlock}>
          <div className={styles.goldLine} aria-hidden />
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Tue – Sun<br />5 pm – 11 pm</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <div className={styles.goldLine} aria-hidden />
          <h3>Address</h3>
          <p>{client?.address ?? <>342 King St W<br />Toronto ON</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <div className={styles.goldLine} aria-hidden />
          <h3>Reserve</h3>
          <p>{client?.phone ?? "(416) 555-0100"}</p>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
