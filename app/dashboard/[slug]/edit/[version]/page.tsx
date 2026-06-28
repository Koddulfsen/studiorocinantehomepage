"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./editor.module.css";
import { FONT_PRESETS, RADIUS_PRESETS } from "@/lib/fontPresets";
import { TEMPLATE_SLOTS } from "@/lib/slots";

interface Photo { filename: string; url: string; }
interface TemplateVersion {
  version: number;
  templateId: string;
  fontPreset: string;
  radius: string;
  accent: string;
  titleSize: number;
  titleTransform: "none" | "uppercase" | "lowercase";
  slots: Record<string, string>;
}

export default function TemplateEditor() {
  const params  = useParams();
  const router  = useRouter();
  const clientSlug = params.slug as string;
  const version    = parseInt(params.version as string, 10);

  const [tv, setTv]           = useState<TemplateVersion | null>(null);
  const [photos, setPhotos]   = useState<Photo[]>([]);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [vibe, setVibe]         = useState("");
  const [copied, setCopied]     = useState(false);
  const iframeRef               = useRef<HTMLIFrameElement>(null);

  // Load current config
  useEffect(() => {
    fetch(`/api/clients/${clientSlug}`)
      .then((r) => r.json())
      .then((cfg) => {
        const found = cfg.templates?.find((t: TemplateVersion) => t.version === version);
        if (found) setTv(found);
        if (cfg.vibe) setVibe(cfg.vibe);
      });
  }, [clientSlug, version]);

  const [photoDir, setPhotoDir] = useState<string>("");

  // Load client photos
  useEffect(() => {
    fetch(`/api/clients/${clientSlug}/photos`)
      .then((r) => r.json())
      .then((d) => {
        setPhotos(d.photos ?? []);
        setPhotoDir(d.dir ?? "");
      });
  }, [clientSlug]);

  async function save(next: TemplateVersion) {
    setSaving(true);
    await fetch(`/api/clients/${clientSlug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
    // Refresh preview iframe
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }

  function update(patch: Partial<TemplateVersion>) {
    if (!tv) return;
    const next = { ...tv, ...patch };
    setTv(next);
    save(next);
  }

  function copyPrompt() {
    if (!vibe.trim() || !tv) return;

    const slotLines = Object.entries(tv.slots)
      .map(([id, url]) => {
        const filename = url.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") ?? "";
        return `  ${id}: "${filename}"`;
      })
      .join("\n");

    const prompt = `Generate copy for a restaurant/café website.

Client slug: ${clientSlug}
Version: ${version}
Template: ${tv.templateId}
Vibe: ${vibe}
${slotLines ? `\nPhoto slots (use filenames as image captions):\n${slotLines}` : ""}
Respond with only a JSON object — no explanation, no markdown:
{
  "tagline": "short evocative line, max 10 words",
  "body": "2-3 sentences, warm and specific",
  "cta": "2-4 word call to action",
  "eyebrow": "SHORT CONTEXT LABEL IN CAPS",
  "label": "PRIMARY SECTION HEADER IN CAPS (e.g. WHAT WE DO / WHAT WE MAKE)",
  "label2": "SECONDARY SECTION HEADER IN CAPS (e.g. FROM OUR KITCHEN / THE MENU)",
  "sections": [
    { "title": "Category name", "body": "2-3 sentence description of this category" },
    { "title": "Category name", "body": "2-3 sentence description of this category" },
    { "title": "Category name", "body": "2-3 sentence description of this category" }
  ],
  "menuItems": [
    { "name": "item name", "desc": "one short phrase", "price": "$XX" }
  ],
  "slotCaptions": {
${Object.keys(tv.slots).map((id) => `    "${id}": "caption from filename"`).join(",\n")}
  }
}`;

    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reloadPreview() {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  }

  function assignSlot(slotId: string, photoUrl: string) {
    if (!tv) return;
    const next = { ...tv, slots: { ...tv.slots, [slotId]: photoUrl } };
    setTv(next);
    save(next);
    setActiveSlot(null);
  }

  if (!tv) {
    return <div className={styles.loading}>Loading editor…</div>;
  }

  const slotDefs = TEMPLATE_SLOTS[tv.templateId.replace(/-([a-z])/g, (_, c) => `-${c}`)] ?? [];
  const previewUrl = `/${clientSlug}-${version}`;

  return (
    <div className={styles.page}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <Link href={`/dashboard/${clientSlug}/select`} className={styles.back}>← Templates</Link>
        <span className={styles.topTitle}>
          Editing template {version} · {tv.templateId}
        </span>
        <div className={styles.topRight}>
          {saved && <span className={styles.savedBadge}>Saved ✓</span>}
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className={styles.previewLink}>
            Open preview ↗
          </a>
        </div>
      </div>

      <div className={styles.layout}>

        {/* ── Left panel: controls ── */}
        <aside className={styles.panel}>

          {/* COPY */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Generate copy</h2>
            <textarea
              className={styles.vibeInput}
              placeholder="Describe the place and vibe… e.g. 'cozy Korean café, soft music, matcha and rice cakes, feels like someone's living room'"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              rows={3}
            />
            <div className={styles.generateRow}>
              <button
                className={styles.generateBtn}
                onClick={copyPrompt}
                disabled={!vibe.trim()}
              >
                {copied ? "Copied ✓" : "Copy prompt"}
              </button>
              <button
                className={styles.reloadBtn}
                onClick={reloadPreview}
                title="Reload preview after applying copy"
              >
                ↺
              </button>
            </div>
          </section>

          {/* PHOTOS */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Photos</h2>
            {photoDir && (
              <p className={styles.photoDir}>Drop files in: <code>{photoDir}</code></p>
            )}

            {slotDefs.length === 0 ? (
              <p className={styles.noSlots}>No photo slots for this template.</p>
            ) : (
              <div className={styles.slotList}>
                {slotDefs.map((def) => {
                  const assigned = tv.slots[def.id];
                  return (
                    <div key={def.id} className={styles.slotRow}>
                      <span className={styles.slotLabel}>{def.label}</span>
                      <div
                        className={`${styles.slotThumb} ${activeSlot === def.id ? styles.slotActive : ""}`}
                        onClick={() => setActiveSlot(activeSlot === def.id ? null : def.id)}
                        style={assigned ? { backgroundImage: `url(${assigned})` } : undefined}
                      >
                        {!assigned && <span className={styles.slotEmpty}>tap to set</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Photo picker grid — shown when a slot is active */}
            {activeSlot && (
              <div className={styles.photoPicker}>
                <p className={styles.pickHint}>
                  Assigning: <strong>{slotDefs.find((d) => d.id === activeSlot)?.label}</strong>
                </p>
                {photos.length === 0 ? (
                  <p className={styles.noPhotos}>No photos found for this client.</p>
                ) : (
                  <div className={styles.photoGrid}>
                    {photos.map((p) => (
                      <button
                        key={p.filename}
                        className={styles.photoBtn}
                        style={{ backgroundImage: `url(${p.url})` }}
                        onClick={() => assignSlot(activeSlot, p.url)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* FONTS */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Font</h2>
            <div className={styles.fontGrid}>
              {FONT_PRESETS.map((fp) => (
                <button
                  key={fp.id}
                  className={`${styles.fontCard} ${tv.fontPreset === fp.id ? styles.fontActive : ""}`}
                  onClick={() => update({ fontPreset: fp.id })}
                >
                  <span className={styles.fontLabel}>{fp.label}</span>
                  <span className={styles.fontSpecimen}>{fp.specimen}</span>
                </button>
              ))}
            </div>
          </section>

          {/* SHAPE */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Button shape</h2>
            <div className={styles.radiusRow}>
              {RADIUS_PRESETS.map((r) => (
                <button
                  key={r.id}
                  className={`${styles.radiusBtn} ${tv.radius === r.id ? styles.radiusActive : ""}`}
                  style={{ borderRadius: r.value }}
                  onClick={() => update({ radius: r.id })}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </section>

          {/* TITLE CASE */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Title case</h2>
            <div className={styles.radiusRow}>
              {(["none", "uppercase", "lowercase"] as const).map((t) => (
                <button
                  key={t}
                  className={`${styles.radiusBtn} ${(tv.titleTransform ?? "none") === t ? styles.radiusActive : ""}`}
                  onClick={() => update({ titleTransform: t })}
                >
                  {t === "none" ? "Aa" : t === "uppercase" ? "AA" : "aa"}
                </button>
              ))}
            </div>
          </section>

          {/* TITLE SIZE */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Title size</h2>
            <div className={styles.sliderRow}>
              <input
                type="range"
                min={0}
                max={100}
                value={tv.titleSize ?? 50}
                className={styles.slider}
                onChange={(e) => setTv((prev) => prev ? { ...prev, titleSize: Number(e.target.value) } : prev)}
                onMouseUp={(e) => update({ titleSize: Number((e.target as HTMLInputElement).value) })}
                onTouchEnd={(e) => update({ titleSize: Number((e.target as HTMLInputElement).value) })}
              />
              <span className={styles.sliderVal}>
                {((3 + ((tv.titleSize ?? 50) / 100) * 13)).toFixed(1)}rem
              </span>
            </div>
          </section>

          {/* COLOR */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Accent color</h2>
            <div className={styles.colorRow}>
              <input
                type="color"
                className={styles.colorPicker}
                value={tv.accent}
                onChange={(e) => setTv((prev) => prev ? { ...prev, accent: e.target.value } : prev)}
                onBlur={(e) => update({ accent: e.target.value })}
              />
              <span className={styles.colorHex}>{tv.accent.toUpperCase()}</span>
            </div>
          </section>

        </aside>

        {/* ── Right panel: iframe preview ── */}
        <div className={styles.preview}>
          <iframe
            ref={iframeRef}
            src={previewUrl}
            className={styles.previewFrame}
            title="Template preview"
          />
          <div className={styles.previewNote}>
            {saving ? "Saving…" : "Changes save automatically · Refresh to see updates"}
          </div>
        </div>

      </div>
    </div>
  );
}
