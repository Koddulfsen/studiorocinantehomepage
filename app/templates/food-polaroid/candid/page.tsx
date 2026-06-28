"use client";

import styles from "./candid.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Avocado Toast", price: "$14" },
  { name: "Shakshuka", price: "$16" },
  { name: "Granola Bowl", price: "$12" },
  { name: "Cortado", price: "$5" },
  { name: "Oat Latte", price: "$6.50" },
];

export default function Candid() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Claro";
  return (
      <TemplateShell templateId="food-polaroid-candid">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <span className={styles.navSub}>{client?.hours ?? "Open Tues–Sun · 8am–4pm"}</span>
      </nav>

      <div className={styles.heroPhoto}>
        <span className={styles.heroCaption}>{copy.slotCaptions?.["slot-1"] ?? "— the counter, late morning"}</span>
      </div>

      <section className={styles.intro}>
        <div className={styles.introLeft}>
          <h1 className={styles.introName}>{name}</h1>
          <span className={styles.introLocation}>{copy.eyebrow ?? "Kensington Market · Toronto"}</span>
        </div>
        <div className={styles.introRight}>
          <p className={styles.introBody}>
            {copy.tagline ?? "We make coffee the way we like it, and food the way our mothers made it. Small space, good people, no fuss."}
          </p>
        </div>
      </section>

      <div className={styles.photos}>
        <div className={`${styles.photo} ${styles.p1}`} />
        <div className={`${styles.photo} ${styles.p2}`} />
        <div className={`${styles.photo} ${styles.p3}`} />
      </div>

      <section className={styles.menu}>
        <h2 className={styles.menuLabel}>{copy.label ?? "What We Make"}</h2>
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
          <div key={i} className={styles.menuItem}>
            <span className={styles.menuItemName}>{item.name}</span>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>
          {client?.address ?? <>12 Augusta Ave<br />Toronto, ON</>}<br />
          {client?.hours ?? "Tues–Sun 8–4"}
        </span>
      </footer>
    </div>
      </TemplateShell>
  );
}
