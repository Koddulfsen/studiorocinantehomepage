"use client";

import styles from "./volt.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Karaage Don", desc: "fried chicken, pickled daikon, kewpie", price: "$16" },
  { name: "Spicy Tuna Roll", desc: "sriracha mayo, cucumber, sesame", price: "$14" },
  { name: "Gyoza (6pc)", desc: "pork & cabbage, yuzu dipping sauce", price: "$11" },
  { name: "Ramen", desc: "tonkotsu broth, chashu, soft egg, nori", price: "$18" },
  { name: "Takoyaki (8pc)", desc: "octopus, bonito flakes, okonomi sauce", price: "$12" },
  { name: "Mochi Ice Cream", desc: "matcha, black sesame, or strawberry", price: "$8" },
];

export default function Volt() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Yatai";
  return (
      <TemplateShell templateId="bold-neon-volt">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#info">Hours</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.heroTag}>{client?.cuisine ?? "Japanese Street Food"}</span>
          <span className={styles.heroLocation}>{copy.eyebrow ?? "Kensington Market · Toronto"}</span>
        </div>
        <div className={styles.heroImgWrap}>
          <div className={styles.heroImg} aria-hidden />
          <h1 className={styles.heroName}>{name}</h1>
        </div>
        <div className={styles.heroBottom}>
          <p className={styles.heroTagline}>{copy.tagline ?? "Fast food with actual flavour."}</p>
          <a href="#info" className={styles.heroCta}>{copy.cta ?? "Find us"}</a>
        </div>
      </section>

      <section className={styles.menu} id="menu">
        <div className={styles.menuHeader}>
          <span className={styles.menuTitle}>{copy.label ?? "Menu"}</span>
          <span className={styles.menuNote}>Order at the window</span>
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
          <p className={styles.infoValue}>{client?.hours ?? <>Mon – Sat<br />11 am – 10 pm</>}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Find us</span>
          <p className={styles.infoValue}>{client?.address ?? <>214 Augusta Ave<br />Toronto, ON</>}</p>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Order</span>
          <p className={styles.infoValue}>Walk up<br />{client?.phone ?? "(416) 555-0188"}</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{copy.eyebrow ?? "Kensington Market · Toronto"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
