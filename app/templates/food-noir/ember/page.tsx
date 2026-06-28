"use client";

import styles from "./noir-ember.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Burrata & Heirloom", desc: "farm tomatoes, cold-pressed oil", price: "$24" },
  { name: "Roasted Bone Marrow", desc: "toasted bread, gremolata", price: "$28" },
  { name: "Tagliatelle al Ragù", desc: "twelve-hour pork, fresh pasta", price: "$32" },
  { name: "Grilled Branzino", desc: "whole, charred lemon, herbs", price: "$42" },
  { name: "Beef Tenderloin", desc: "dry-aged 40 days, bone marrow jus", price: "$58" },
  { name: "Tiramisu", desc: "our best attempt", price: "$16" },
];

export default function NoirEmber() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Maro";
  return (
      <TemplateShell templateId="food-noir-ember">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <a href="#contact" className={styles.navReserve}>Reserve</a>
      </nav>

      {/* Title card */}
      <section className={styles.titleCard}>
        <div className={styles.titleGlow} aria-hidden />
        <h1 className={styles.titleName}>{name}</h1>
        <p className={styles.titleSub}>
          {copy.eyebrow ?? <>King St W<span className={styles.titleDot} aria-hidden>·</span>Toronto<span className={styles.titleDot} aria-hidden>·</span>Est. 2019</>}
        </p>
      </section>

      {/* Feature dish */}
      <section className={styles.feature}>
        <div className={styles.featureImage} aria-hidden />
        <div className={styles.featureText}>
          <div className={styles.featureAccent} aria-hidden />
          <span className={styles.featureLabel}>Tonight</span>
          <h2 className={styles.featureName}>{copy.sections?.[0]?.title ?? "Beef Tenderloin"}</h2>
          <p className={styles.featureDesc}>
            {copy.sections?.[0]?.body ?? "Dry-aged forty days. Bone marrow jus, roasted shallots, hand-cut fries — because we never stopped loving them."}
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className={styles.menu} id="menu">
        <span className={styles.menuLabel}>{copy.label ?? "Menu"}</span>
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
          <div key={item.name} className={styles.menuEntry}>
            <div className={styles.menuEntryLeft}>
              <span className={styles.menuName}>{item.name}</span>
              <span className={styles.menuDesc}>{item.desc}</span>
            </div>
            <span className={styles.menuPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      {/* CTA banner */}
      <section className={styles.banner} id="contact">
        <div>
          <h2 className={styles.bannerHeading}>{copy.label2 ?? "Come hungry."}</h2>
          <a href="tel:+14165550100" className={styles.bannerCta}>{copy.cta ?? "Reserve a table"}</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerLeft}>{name}</span>
        <div className={styles.footerRight}>
          {client?.address ?? "342 King St W, Toronto"}<br />
          {client?.hours ?? "Tue – Sun · 5 pm – 11 pm"}
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
