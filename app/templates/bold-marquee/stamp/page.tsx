"use client";

import styles from "./stamp.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Croissant", price: "$5" },
  { name: "Pain au Chocolat", price: "$5" },
  { name: "Almond Tart", price: "$7" },
  { name: "Lemon Tart", price: "$7" },
  { name: "Café au Lait", price: "$6" },
  { name: "Matcha Latte", price: "$7" },
];

export default function Stamp() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Pâte";
  return (
      <TemplateShell templateId="bold-marquee-stamp">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navLeft}>Certified Good Pastry</span>
        <span className={styles.navRight}>{client?.neighbourhood
          ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " · Toronto"
          : "Little Portugal · Toronto"}</span>
      </nav>

      <section className={styles.stamp}>
        <div className={styles.stampBg} aria-hidden />
        <div className={styles.stampBox}>
          <div className={styles.stampBoxInner}>
            <span className={styles.stampTop}>{copy.eyebrow ?? "Little Portugal · Toronto · Est. 2020"}</span>
            <h1 className={styles.stampName}>{name}</h1>
            <div className={styles.stampDivider}>
              <span className={styles.stampDividerText}>{copy.label2 ?? "Pastry · Coffee"}</span>
            </div>
            <p className={styles.stampTagline}>
              {copy.tagline ?? "Everything baked on the premises. Nothing from a box, ever."}
            </p>
            <a href="#menu" className={styles.stampCta}>{copy.cta ?? "See the menu"}</a>
          </div>
        </div>
      </section>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Hours</span>
          <span className={styles.detailValue}>{client?.hours ?? <>Daily<br />7 am – 5 pm</>}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Address</span>
          <span className={styles.detailValue}>{client?.address ?? <>1194 Dundas St W<br />Toronto, ON</>}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Phone</span>
          <span className={styles.detailValue}>{client?.phone ?? "(416) 555-0166"}</span>
        </div>
      </div>

      <section className={styles.menu} id="menu">
        <div className={styles.menuSideImg} aria-hidden />
        <div className={styles.menuContent}>
          <span className={styles.menuLabel}>{copy.label ?? "Today's bakes"}</span>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
        <div className={`${styles.menuSideImg} ${styles.menuSideImgRight}`} aria-hidden />
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{client?.address ?? "Dundas St W"} · {client?.neighbourhood
          ? client.neighbourhood.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " · Toronto"
          : "Little Portugal · Toronto"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
