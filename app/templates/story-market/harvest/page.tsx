"use client";

import styles from "./harvest.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Smashed Cucumber", desc: "sesame, chili crisp, rice vinegar", price: "$11" },
  { name: "Grain Bowl", desc: "farro, roasted squash, tahini, herbs", price: "$17" },
  { name: "Tomato Toast", desc: "sourdough, ricotta, heirloom tomato", price: "$14" },
  { name: "Corn Chowder", desc: "smoked paprika, crème fraîche", price: "$13" },
  { name: "Peach Galette", desc: "almond cream, honey", price: "$9" },
];

export default function Harvest() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Root & Acre";
  return (
      <TemplateShell templateId="story-market-harvest">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Market</a></li>
          <li><a href="#">Find Us</a></li>
        </ul>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroSeason}>{copy.eyebrow ?? "Now Open · Summer Menu"}</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroTagline}>{copy.tagline ?? "A farm-to-table café rooted in the Greenbelt. We cook what the season gives us, nothing more."}</p>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <span className={styles.heroCardLabel}>Location</span>
            <span className={styles.heroCardValue}>{client?.address ?? "612 College St, Toronto"}</span>
          </div>
          <div className={styles.heroCard}>
            <span className={styles.heroCardLabel}>Hours</span>
            <span className={styles.heroCardValue}>{client?.hours ?? "Tues–Sun · 9am–5pm"}</span>
          </div>
          <div className={styles.heroCardSub}>
            Market saturdays — pick up your weekly box at the door, no order required.
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyImage} />
        <div className={styles.storyText}>
          <span className={styles.storyLabel}>{copy.label2 ?? "Our Story"}</span>
          <h2 className={styles.storyHeading}>{copy.sections?.[0]?.title ?? "Started at a market stall. Stayed because of the people."}</h2>
          <p className={styles.storyBody}>
            {copy.body ?? "We started selling bread and jam at the Farmers Market in 2016. By 2020, we had a kitchen. Today we source everything from seven farms within 150km and change the menu every two weeks. That's the whole plan."}
          </p>
        </div>
      </section>

      <section className={styles.menu}>
        <div className={styles.menuTop}>
          <h2 className={styles.menuTitle}>{copy.label ?? "This Week's Menu"}</h2>
          <span className={styles.menuNote}>Changes every other Tuesday</span>
        </div>
        <div className={styles.menuRule} />
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
          <div key={i} className={styles.menuItem}>
            <div className={styles.menuItemLeft}>
              <span className={styles.menuItemName}>{item.name}</span>
              {item.desc && <span className={styles.menuItemDesc}>{item.desc}</span>}
            </div>
            <span className={styles.menuItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>
          {client?.address ?? "612 College St · Toronto"}<br />
          {client?.hours ?? "Tues–Sun · 9am–5pm"}
        </span>
      </footer>
    </div>
      </TemplateShell>
  );
}
