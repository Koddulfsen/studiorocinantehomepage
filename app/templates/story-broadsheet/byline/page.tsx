"use client";

import styles from "./byline.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Venison Tartare", desc: "pickled mustard, rye crisp, juniper oil", price: "$24" },
  { name: "Wild Mushroom Soup", desc: "spruce tip cream, toasted seeds", price: "$18" },
  { name: "Lake Trout", desc: "birch butter, smoked potato, watercress", price: "$44" },
  { name: "Bison Striploin", desc: "bone marrow butter, roasted roots, jus", price: "$58" },
  { name: "Aged Cheddar & Honey", desc: "Ontario cheddar, local wildflower honey", price: "$16" },
  { name: "Maple Tart", desc: "burnt caramel, crème fraîche", price: "$14" },
];

export default function Byline() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "North";
  return (
      <TemplateShell templateId="story-broadsheet-byline">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#visit">Visit</a></li>
        </ul>
      </nav>

      <section className={styles.opening}>
        <div className={styles.openingLeft}>
          <span className={styles.openingKicker}>{copy.eyebrow ?? "Modern Canadian · Ossington · Toronto"}</span>
          <h1 className={styles.openingName}>{name}</h1>
        </div>
        <div className={styles.openingRight}>
          <p className={styles.openingDek}>
            {copy.body ?? "Chef Daniel Chartier grew up fishing with his father in northern Ontario. The menu at North is his attempt to cook that landscape — wild, seasonal, and honest about where it comes from."}
          </p>
          <span className={styles.openingByline}>
            {copy.eyebrow ?? "Modern Canadian · Ossington · Toronto"}
          </span>
        </div>
      </section>

      <section className={styles.spread}>
        <div className={styles.spreadImage} aria-hidden />
        <div className={styles.spreadText}>
          <span className={styles.spreadLabel}>{copy.label ?? "The kitchen"}</span>
          <h2 className={styles.spreadHeading}>
            {copy.sections?.[0]?.title ?? "Canadian ingredients. No apology for the winter."}
          </h2>
          <p className={styles.spreadPara}>
            {copy.sections?.[1]?.body ?? "The menu changes every six weeks, built around what can be sourced from the farms and waters nearby. Seasonal, honest, and rooted in place."}
          </p>
          <p className={styles.spreadPara}>
            {copy.sections?.[2]?.body ?? ""}
          </p>
        </div>
      </section>

      <section className={styles.menu} id="menu">
        <div className={styles.menuLeft}>
          <h2 className={styles.menuTitle}>{copy.label2 ?? "Current menu"}</h2>
          <span className={styles.menuSub}>{copy.sections?.[0]?.body ?? "Changes seasonally"}</span>
          <div className={styles.menuImage} />
        </div>
        <div className={styles.menuRight}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <div className={styles.menuItemLeft}>
                <span className={styles.menuItemName}>{item.name}</span>
                <span className={styles.menuItemDesc}>{item.desc}</span>
              </div>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer} id="visit">
        <div className={styles.footerBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Wed – Sun<br />6 pm – 10 pm</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Address</h3>
          <p>{client?.address ?? <>176 Ossington Ave<br />Toronto, ON</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Reserve</h3>
          <p>{client?.phone ?? "(416) 555-0143"}</p>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
