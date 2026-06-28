"use client";

import styles from "./salon.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Oysters, Half Dozen", price: "$28" },
  { name: "Lobster Bisque", price: "$22" },
  { name: "Beef Wellington", price: "$58" },
  { name: "Sole Meunière", price: "$48" },
  { name: "Duck à l'Orange", price: "$46" },
  { name: "Chocolate Fondant", price: "$16" },
];

export default function Salon() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "The Pemberton";
  return (
      <TemplateShell templateId="atmosphere-manor-salon">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Private Dining</a></li>
          <li><a href="#">Reservations</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroFade} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>{copy.eyebrow ?? "Fine Dining · Toronto"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroTagline}>{copy.tagline ?? "A private dining salon in the spirit of the great London clubs — polished without pretence, warm without compromise."}</p>
          <a href="#" className={styles.heroCta}>{copy.cta ?? "Reserve Your Evening"}</a>
        </div>
      </section>

      <section className={styles.interior}>
        <div className={styles.interiorImage} />
        <div className={styles.interiorText}>
          <span className={styles.interiorLabel}>{copy.label2 ?? "About the Salon"}</span>
          <h2 className={styles.interiorHeading}>{copy.sections?.[0]?.title ?? "A room that asks nothing of you except that you enjoy it."}</h2>
          <p className={styles.interiorBody}>
            {copy.body ?? "Chef Marlowe has spent thirty years in kitchens from London to Lyon. The Pemberton is the place he always wanted — no performance, no theatre, just exceptional food and a room worth lingering in."}
          </p>
        </div>
      </section>

      <section className={styles.menu}>
        <span className={styles.menuLabel}>{copy.label ?? "Tonight's Selections"}</span>
        <div className={styles.menuGrid}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
            <div key={i} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Tues–Sat<br />Dinner from 6pm</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Location</h3>
          <p>{client?.address ?? <>92 King Street West<br />Toronto, Ontario</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Reservations</h3>
          <p>Recommended<br />{client?.phone ?? "(416) 555-0142"}</p>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
