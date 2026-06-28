"use client";

import styles from "./chronicle.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Sunday Gravy", price: "$22" },
  { name: "Eggplant Parmigiana", price: "$19" },
  { name: "Spaghetti Cacio e Pepe", price: "$20" },
  { name: "Chicken Cacciatore", price: "$24" },
  { name: "Arancini (3pc)", price: "$14" },
  { name: "Cannoli", price: "$8" },
];

export default function Chronicle() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Lulu's";
  return (
      <TemplateShell templateId="atmosphere-corner-chronicle">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#visit">Visit</a></li>
        </ul>
      </nav>

      {/* Chapter I — The place */}
      <section className={styles.heroChapter}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroFade} aria-hidden />
        <div className={styles.heroInner}>
          <span className={styles.chapterNum}>Chapter I</span>
          <h1 className={styles.heroName}>{name}</h1>
          <p className={styles.heroDek}>
            {copy.tagline ?? "Italian home cooking on College Street. Four generations, one kitchen."}
          </p>
        </div>
      </section>

      {/* Chapter II — The story */}
      <div className={styles.chapter}>
        <div className={styles.chapterSidebar}>
          <span className={styles.chapterLabel}>Chapter II</span>
        </div>
        <div className={styles.chapterBody}>
          <h2 className={styles.chapterHeading}>{copy.sections?.[0]?.title ?? "It started with a pot of gravy."}</h2>
          <p className={styles.chapterText}>
            {copy.body ?? "Lulu Marchetti arrived in Toronto in 1962 with two suitcases and her mother's recipe for Sunday gravy. She cooked out of her College Street apartment for years before her daughter Rosa finally convinced her to open a proper restaurant in 1979. Today, Rosa's daughter Mia runs the kitchen. The gravy is the same."}
          </p>
        </div>
      </div>

      {/* Atmosphere image */}
      <div className={styles.atmosphereBlock} aria-hidden />

      {/* Chapter III — The menu */}
      <div className={styles.menuChapter} id="menu">
        <div className={styles.chapterSidebar}>
          <span className={styles.chapterLabel}>Chapter III</span>
        </div>
        <div className={styles.menuBody}>
          <h2 className={styles.menuHeading}>{copy.label ?? "What we're cooking."}</h2>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Closing — Visit */}
      <div className={styles.closing} id="visit">
        <div className={styles.closingBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Tue – Sun<br />5 pm – 10 pm<br />Closed Monday</>}</p>
        </div>
        <div className={styles.closingBlock}>
          <h3>Find us</h3>
          <p>{client?.address ?? <>1188 College St<br />Little Italy<br />Toronto, ON</>}</p>
        </div>
        <div className={styles.closingBlock}>
          <h3>Reserve</h3>
          <p>{client?.phone ?? "(416) 555-0109"}<br />Walk-ins welcome</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerSub}>{copy.eyebrow ?? "Little Italy · Toronto · Est. 1979"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
