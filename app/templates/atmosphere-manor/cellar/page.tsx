"use client";

import styles from "./cellar.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Muscadet Sèvre et Maine", desc: "Loire Valley · France", price: "$14 / $54" },
  { name: "Sancerre Blanc", desc: "Loire Valley · France", price: "$18 / $72" },
  { name: "Ribera del Duero Reserva", desc: "Castile · Spain", price: "$16 / $62" },
  { name: "Barolo Classico", desc: "Piedmont · Italy", price: "$22 / $88" },
  { name: "Côtes du Rhône", desc: "Rhône Valley · France", price: "$13 / $50" },
];

export default function Cellar() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Dusk & Vine";
  return (
      <TemplateShell templateId="atmosphere-manor-cellar">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <a href="#" className={styles.navCta}>Book a Table</a>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft} />
        <div className={styles.heroRight}>
          <div className={styles.heroTop}>
            <span className={styles.heroEyebrow}>{copy.eyebrow ?? "Wine Bar · Toronto"}</span>
            <h1 className={styles.heroName}>{name}</h1>
          </div>
          <div className={styles.heroBottom}>
            <p className={styles.heroTagline}>{copy.tagline ?? "A candlelit room with seventy wines by the glass and small plates that know their place."}</p>
            <div className={styles.heroInfo}>
              <span>{client?.address ?? "1440 Yonge St · Toronto"}</span><br />
              <span>{client?.hours ?? "Wed – Sun · 5pm – Late"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.wines}>
        <h2 className={styles.winesTitle}>{copy.label ?? "The List"}</h2>
        <span className={styles.winesSub}>{copy.label2 ?? "A selection — ask your server for the full cellar"}</span>
        <div className={styles.winesRule} />
        {(copy.menuItems ?? DEFAULT_ITEMS).map((item, i) => (
          <div key={i} className={styles.wineItem}>
            <div className={styles.wineItemLeft}>
              <span className={styles.wineItemName}>{item.name}</span>
              <span className={styles.wineItemRegion}>{item.desc}</span>
            </div>
            <span className={styles.wineItemPrice}>{item.price}</span>
          </div>
        ))}
      </section>

      <div className={styles.strip} />

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerName}>{name}</span>
          <span className={styles.footerSub}>{copy.eyebrow ?? "Wine Bar · Toronto"}</span>
        </div>
        <div className={styles.footerRight}>
          {client?.address ?? "1440 Yonge St · Toronto"}<br />
          {client?.hours ?? "Wed–Sun · 5pm until late"}<br />
          {client?.phone ?? "(416) 555-0280"}
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
