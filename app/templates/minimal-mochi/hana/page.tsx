"use client";

import styles from "./hana.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Pour Over",   price: "$7" },
  { name: "Cortado",     price: "$6" },
  { name: "Oat Latte",   price: "$7.50" },
  { name: "Cold Brew",   price: "$6.50" },
];

const matchaItems = [
  { name: "Ceremonial Matcha", price: "$6.50" },
  { name: "Matcha Latte",      price: "$7" },
  { name: "Hojicha Latte",     price: "$7" },
  { name: "Yuzu Soda",         price: "$6" },
];

const foodItems = [
  { name: "Tamago Sando",  price: "$11" },
  { name: "Onigiri (2pc)", price: "$9" },
  { name: "Yuzu Tart",     price: "$7" },
  { name: "Mochi Waffle",  price: "$10" },
];

export default function Hana() {
  const client = useClientData();
  const copy = useCopy();
  const name    = client?.name         ?? "Hana";
  const address = client?.address      ?? "556 Queen St W, Toronto";
  const hood    = client?.neighbourhood
    ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Queen West";

  return (
    <TemplateShell templateId="minimal-mochi-hana">
      <div className={styles.page}>

        <nav className={styles.nav}>
          <span className={styles.navName}>{name}</span>
          <ul className={styles.navLinks}>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#visit">Visit</a></li>
          </ul>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroImg} aria-hidden />
          <div className={styles.heroOverlay}>
            <p className={styles.heroSub}>{hood} · Toronto</p>
            <h1 className={styles.heroName}>{name}</h1>
            <p className={styles.heroTagline}>{copy.tagline ?? "slow coffee. soft hours."}</p>
          </div>
        </section>

        <section className={styles.intro}>
          <p className={styles.introText}>
            {copy.body ?? "A quiet corner on Queen West. We pour slowly, bake a little, and keep the music low. Come to stay a while."}
          </p>
        </section>

        <section className={styles.photoRow}>
          <div className={styles.photoWrap}>
            <div className={styles.photoLeft} aria-hidden />
            <span className={styles.photoCaption}>{copy.slotCaptions?.["slot-1"] ?? "matcha season"}</span>
          </div>
          <div className={styles.photoWrap}>
            <div className={styles.photoRight} aria-hidden />
            <span className={styles.photoCaption}>{copy.slotCaptions?.["slot-2"] ?? "the morning pour"}</span>
          </div>
        </section>

        <section className={styles.menu} id="menu">
          <span className={styles.menuEyebrow}>{copy.label ?? "what we make"}</span>
          <div className={styles.menuGrid}>
            <div className={styles.menuSection}>
              <span className={styles.menuSectionLabel}>Coffee</span>
              {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
                <div key={i} className={styles.menuItem}>
                  <span className={styles.menuItemName}>{item.name}</span>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
            <div className={styles.menuSection}>
              <span className={styles.menuSectionLabel}>Matcha & Tea</span>
              {matchaItems.map((item) => (
                <div key={item.name} className={styles.menuItem}>
                  <span className={styles.menuItemName}>{item.name}</span>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
            <div className={styles.menuSection}>
              <span className={styles.menuSectionLabel}>Food</span>
              {foodItems.map((item) => (
                <div key={item.name} className={styles.menuItem}>
                  <span className={styles.menuItemName}>{item.name}</span>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.visit} id="visit">
          <div className={styles.visitImg} aria-hidden />
          <div className={styles.visitInfo}>
            <div className={styles.visitBlock}>
              <span className={styles.visitLabel}>Hours</span>
              <p className={styles.visitText}>
                {client?.hours ?? <>Mon – Fri&nbsp;&nbsp;8 am – 6 pm<br />Sat – Sun&nbsp;&nbsp;9 am – 5 pm</>}
              </p>
            </div>
            <div className={styles.visitBlock}>
              <span className={styles.visitLabel}>Find us</span>
              <p className={styles.visitText}>{address}</p>
            </div>
            <div className={styles.visitBlock}>
              <span className={styles.visitLabel}>Say hi</span>
              <p className={styles.visitText}>
                {client?.social ? `@${client.social.replace(/^@/, "")}` : "@hanacafe.to"}<br />
                hello@hanacafe.ca
              </p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerName}>{name}</span>
          <span className={styles.footerRight}>{address}</span>
        </footer>

      </div>
    </TemplateShell>
  );
}
