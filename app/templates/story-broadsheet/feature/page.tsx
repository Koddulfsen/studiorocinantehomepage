"use client";

import styles from "./feature.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const DEFAULT_ITEMS = [
  { name: "Lamb Shoulder", price: "$38" },
  { name: "Roasted Cauliflower", price: "$26" },
  { name: "Hand-rolled Pasta", price: "$29" },
  { name: "Grilled Octopus", price: "$34" },
  { name: "Cheese Board", price: "$22" },
  { name: "Fig Tart", price: "$14" },
];

export default function Feature() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Nadia's";
  return (
      <TemplateShell templateId="story-broadsheet-feature">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <span className={styles.navLabel}>Chef-owned · Leslieville · Toronto</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroImage} aria-hidden />
        <div className={styles.heroText}>
          <span className={styles.heroKicker}>Chef Profile · Issue No. 1</span>
          <h1 className={styles.heroHeadline}>
            {copy.tagline ?? "“I cook the food I grew up missing.”"}
          </h1>
          <p className={styles.heroDek}>
            {copy.body ?? "Nadia Osman left a career in law to open a 28-seat restaurant on Gerrard Street. Two years later, people are still waiting a month for a table."}
          </p>
          <span className={styles.heroByline}>By Nadia Osman · Leslieville, Toronto</span>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyMain}>
          <p className={`${styles.storyPara} ${styles.dropCap}`}>
            There is a particular kind of homesickness that doesn&apos;t go away when you
            arrive somewhere new. It lives in food — specifically in the food you can&apos;t
            find anywhere. Nadia Osman felt it every time she sat down at a restaurant
            in Toronto and couldn&apos;t find anything on the menu that tasted like her mother&apos;s kitchen.
          </p>
          <p className={styles.storyPara}>
            So she built one. &ldquo;I didn&apos;t plan to open a restaurant,&rdquo; she says, sitting
            at the chef&apos;s table on a Tuesday afternoon. &ldquo;I planned to keep practising law
            until I retired. But there was this space on Gerrard, and I couldn&apos;t stop
            thinking about it.&rdquo;
          </p>
          <blockquote className={styles.pullQuote}>
            <p className={styles.pullQuoteText}>
              &ldquo;The menu is my memory. Every dish is something I was chasing for years before I figured out how to make it here.&rdquo;
            </p>
          </blockquote>
          <p className={styles.storyPara}>
            Nadia&apos;s opened in the spring of 2022 with 28 seats, no reservations system,
            and a menu written on a chalkboard. The chalkboard is still there. The
            reservations system arrived six months later, when the line outside became
            a problem for the neighbours.
          </p>
        </div>
        <div className={styles.storySide}>
          <span className={styles.sideLabel}>{copy.label ?? "On the menu"}</span>
          <div className={styles.sideMenu}>
            {(copy.menuItems ?? DEFAULT_ITEMS).map((item) => (
              <div key={item.name} className={styles.sideMenuItem}>
                <span className={styles.sideMenuName}>{item.name}</span>
                <span className={styles.sideMenuPrice}>{item.price}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideRule} />
          <div className={styles.sideInfo}>
            <h4>Address</h4>
            <p>{client?.address ?? <>814 Gerrard St E<br />Leslieville, Toronto</>}</p>
            <h4>Hours</h4>
            <p>{client?.hours ?? <>Wed – Sun<br />6 pm – 10 pm</>}</p>
            <h4>Reservations</h4>
            <p>{client?.phone ?? "(416) 555-0198"}</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerName}>{name}</span>
        <span className={styles.footerRight}>{client?.address ?? "814 Gerrard St E · Leslieville · Toronto"}</span>
      </footer>
    </div>
      </TemplateShell>
  );
}
