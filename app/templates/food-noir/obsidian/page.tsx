"use client";

import styles from "./noir-obsidian.module.css";
import { TemplateShell } from "@/components/TemplateShell";
import { useClientData } from "@/lib/clientContext";
import { useCopy } from "@/lib/copyContext";

const dishes = [
  {
    course: "Opening",
    n: "01",
    name: "Grilled Branzino",
    desc: "Line-caught, served whole. Charred lemon, herbs from the window box, olive oil pressed in Calabria.",
    bg: "radial-gradient(ellipse 55% 65% at 50% 50%, #1e2838 0%, #0a0f18 50%, #030508 100%)",
  },
  {
    course: "First",
    n: "02",
    name: "Burrata & Heirloom",
    desc: "Straciatella flown in Tuesday. Tomatoes from the farm sixty kilometres north. Nothing else needed.",
    bg: "radial-gradient(ellipse 55% 65% at 50% 48%, #2a3020 0%, #0f1208 45%, #040404 100%)",
  },
  {
    course: "Second",
    n: "03",
    name: "Tagliatelle al Ragù",
    desc: "Twelve hours, low heat, pork shoulder. Fresh pasta rolled each afternoon.",
    bg: "radial-gradient(ellipse 55% 65% at 52% 50%, #3d1a06 0%, #150803 50%, #020202 100%)",
  },
  {
    course: "Main",
    n: "04",
    name: "Beef Tenderloin",
    desc: "Dry-aged forty days. Bone marrow jus, roasted shallots, hand-cut fries — because we never stopped loving them.",
    bg: "radial-gradient(ellipse 55% 65% at 48% 52%, #4a2008 0%, #1a0a04 50%, #030202 100%)",
  },
  {
    course: "Close",
    n: "05",
    name: "Tiramisu",
    desc: "My grandmother made it better. This is our best attempt.",
    bg: "radial-gradient(ellipse 55% 65% at 50% 55%, #3a2010 0%, #120a04 50%, #020202 100%)",
  },
];

export default function NoirObsidian() {
  const client = useClientData();
  const copy = useCopy();
  const name = client?.name ?? "Maro";
  return (
      <TemplateShell templateId="food-noir-obsidian">
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.navName}>{name}</span>
        <a href="#contact" className={styles.navReserve}>{copy.cta ?? "Reserve"}</a>
      </nav>

      {dishes.map((d, i) => (
        <section key={d.n} className={styles.scene}>
          <div
            className={styles.sceneBg}
            style={{ backgroundImage: `var(--slot-${d.n}, none)`, background: d.bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-hidden
          />
          {i > 0 && <div className={styles.sceneRule} aria-hidden />}
          <div className={styles.sceneContent}>
            <span className={styles.sceneLabel}>{d.course} · {d.n}</span>
            <h2 className={styles.sceneName}>{copy.sections?.[i]?.title ?? d.name}</h2>
            <p className={styles.sceneDesc}>{copy.sections?.[i]?.body ?? d.desc}</p>
          </div>
          {i === 0 && (
            <span className={styles.scrollHint} aria-hidden>Scroll</span>
          )}
        </section>
      ))}

      <footer className={styles.footer} id="contact">
        <div className={styles.footerBlock}>
          <h3>Hours</h3>
          <p>{client?.hours ?? <>Tuesday – Sunday<br />5 pm – 11 pm<br />Closed Monday</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Find us</h3>
          <p>{client?.address ?? <>342 King St W<br />Toronto, Ontario<br />M5V 1J2</>}</p>
        </div>
        <div className={styles.footerBlock}>
          <h3>Reserve</h3>
          <p>Book a table for two,<br />or the whole room.</p>
          <a href={client?.phone ? `tel:${client.phone.replace(/\D/g, "")}` : "tel:+14165550100"} className={styles.footerCta}>Call us</a>
        </div>
      </footer>
    </div>
      </TemplateShell>
  );
}
