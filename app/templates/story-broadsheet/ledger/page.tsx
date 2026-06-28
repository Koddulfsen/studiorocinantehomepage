"use client";

import styles from "./ledger.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Club Sandwich", price: "$17" },
  { name: "Fish & Chips", price: "$22" },
  { name: "Beef Stew", price: "$19" },
  { name: "Pea Soup", price: "$10" },
  { name: "Liver & Onions", price: "$18" },
  { name: "Butter Tart", price: "$5" },
];

export default function Ledger() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "The Press Room";
  return (
      <TemplateShell templateId="story-broadsheet-ledger">
    <div className={styles.page}>
      <div className={styles.masthead}>
        <span className={styles.mastheadEyebrow}>{copy.eyebrow ?? "Est. 1954 · King St E · Toronto"}</span>
        <h1 className={styles.mastheadName}>{name}</h1>
        <div className={styles.mastheadRule}>
          <span className={styles.mastheadTagline}>{copy.tagline ?? "Serving the neighbourhood since Diefenbaker"}</span>
        </div>
      </div>

      <div className={styles.heroImage} aria-hidden />

      <div className={styles.sectionStrip}>
        <span className={styles.sectionItem}>History</span>
        <span className={styles.sectionItemAccent}>Est. 1954</span>
        <span className={styles.sectionItem}>Menu</span>
        <span className={styles.sectionItem}>Hours & Location</span>
      </div>

      <div className={styles.body}>
        <div className={styles.col}>
          <span className={styles.colLabel}>The story</span>
          <h2 className={styles.colHeading}>{copy.sections?.[0]?.title ?? "Seventy years on the same corner of King Street."}</h2>
          <div className={styles.colRule} />
          <p className={styles.colBody}>
            {copy.body ?? "The Press Room opened in 1954, two doors down from the old Toronto Telegram building. Reporters, typesetters, and editors would pile in after deadline for the blue plate special and a beer. The Telegram is long gone. The Press Room is not."}
          </p>
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>The kitchen</span>
          <h2 className={styles.colHeading}>Canadian comfort food. Nothing more, nothing less.</h2>
          <div className={styles.colRule} />
          <p className={styles.colBody}>
            The menu hasn&apos;t changed much in seventy years and there&apos;s a reason for that.
            The fish and chips are still battered to order. The beef stew still goes on the
            stove at six in the morning. The butter tarts come from a bakery two blocks away
            that&apos;s been supplying them since 1961.
          </p>
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>Find us</span>
          <div className={styles.infoItem}>
            <h4>Address</h4>
            <p>{client?.address ?? <>42 King St E<br />Toronto, ON<br />M5C 1E6</>}</p>
          </div>
          <div className={styles.colRule} />
          <div className={styles.infoItem}>
            <h4>Hours</h4>
            <p>{client?.hours ?? <>Mon – Fri<br />7 am – 9 pm<br />Sat – Sun<br />9 am – 4 pm</>}</p>
          </div>
          <div className={styles.colRule} />
          <div className={styles.infoItem}>
            <h4>Phone</h4>
            <p>{client?.phone ?? "(416) 555-0162"}</p>
          </div>
        </div>
      </div>

      <div className={styles.menu} id="menu">
        <div className={styles.menuHead}>
          <h2 className={styles.menuTitle}>{copy.label ?? "Menu"}</h2>
          <div className={styles.menuRule} aria-hidden />
        </div>
        <div className={styles.menuGrid}>
          {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
            <div key={item.name} className={styles.menuItem}>
              <span className={styles.menuItemName}>{item.name}</span>
              <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name} · Est. 1954</span>
        <span className={styles.footerRight}>{client?.address ?? "42 King St E · Toronto"} · {client?.phone ?? "(416) 555-0162"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
