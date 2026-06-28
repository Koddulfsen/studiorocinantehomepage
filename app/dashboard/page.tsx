"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

interface Lead {
  slug: string;
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  social?: string;
  socialUrl?: string;
  neighbourhood: string;
  area: string;
  city: string;
  province: string;
  country: string;
  types: string[];
  rating?: number;
  ratingCount?: number;
  priceLevel?: number;
  photoCount: number;
}

type View = "browse" | "shortlist";

function photoPath(lead: Lead, filename: string) {
  return `/api/leads/photo?p=${lead.country}/${lead.province}/${lead.city}/${lead.area}/${lead.neighbourhood}/${lead.slug}/photos/${filename}`;
}

function stars(rating?: number) {
  if (!rating) return "no rating";
  return `★ ${rating.toFixed(1)}`;
}

function price(level?: number) {
  if (!level) return "";
  return "$".repeat(level);
}

function mainType(types: string[]) {
  const priority = ["restaurant", "cafe", "bar", "bakery", "meal_takeaway"];
  for (const t of priority) {
    if (types.includes(t)) return t.replace("_", " ");
  }
  return types[0] ?? "";
}

function channel(lead: Lead): "instagram" | "facebook" | "call" {
  if (lead.social === "instagram") return "instagram";
  if (lead.social === "facebook") return "facebook";
  return "call";
}

function fmt(s: string) {
  return s.replace(/-/g, " ");
}

export default function Dashboard() {
  const router = useRouter();
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("browse");
  const [selectedHood, setSelectedHood] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [clientTemplates, setClientTemplates] = useState<Record<string, { version: number; templateId: string }[]>>({});
  const [reviewedHoods, setReviewedHoods] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("reviewedHoods") ?? "[]")); }
    catch { return new Set(); }
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchLeads() {
      const [leads, shortlist]: [Lead[], string[]] = await Promise.all([
        fetch("/api/leads").then((r) => r.json()),
        fetch("/api/leads/shortlist").then((r) => r.json()),
      ]);
      if (cancelled) return;
      setAllLeads(leads);
      setShortlisted((prev) => {
        // merge server shortlist with any local changes made during this interval
        return new Set([...prev, ...shortlist]);
      });
      setLoading(false);
    }

    fetchLeads();
    const interval = setInterval(fetchLeads, 8000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // All unique neighbourhoods — fresh (unreviewed) first, reviewed last
  const neighbourhoods = useMemo(() => {
    const hoods = [...new Set(allLeads.map((l) => l.neighbourhood))].sort();
    return [
      ...hoods.filter((h) => !reviewedHoods.has(h)),
      ...hoods.filter((h) => reviewedHoods.has(h)),
    ];
  }, [allLeads, reviewedHoods]);

  // Leads filtered by selected neighbourhood
  const leads = useMemo(() => {
    if (selectedHood === "all") return allLeads;
    return allLeads.filter((l) => l.neighbourhood === selectedHood);
  }, [allLeads, selectedHood]);

  // Reset index when neighbourhood changes
  useEffect(() => { setIndex(0); }, [selectedHood]);

  // Mark hood reviewed when reaching the last lead
  useEffect(() => {
    if (selectedHood === "all" || !leads.length || index < leads.length - 1) return;
    if (reviewedHoods.has(selectedHood)) return;
    const next = new Set(reviewedHoods);
    next.add(selectedHood);
    setReviewedHoods(next);
    localStorage.setItem("reviewedHoods", JSON.stringify([...next]));
  }, [index, leads.length, selectedHood, reviewedHoods]);

  const lead = leads[index];

  const photos = useMemo(() => {
    if (!lead) return [];
    return Array.from({ length: lead.photoCount }, (_, i) => `photo-${i + 1}.jpg`);
  }, [lead]);

  const toggleShortlist = useCallback(async (l: Lead) => {
    const isIn = shortlisted.has(l.placeId);
    const action = isIn ? "remove" : "add";
    const next = new Set(shortlisted);
    if (isIn) next.delete(l.placeId); else next.add(l.placeId);
    setShortlisted(next);
    setFlash(isIn ? "Removed" : "Shortlisted ✓");
    setTimeout(() => setFlash(null), 600);
    await fetch("/api/leads/shortlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId: l.placeId, action }),
    });
  }, [shortlisted]);

  async function toggleExpand(slug: string) {
    if (expanded === slug) { setExpanded(null); return; }
    setExpanded(slug);
    if (!clientTemplates[slug]) {
      const res = await fetch(`/api/clients/${slug}`);
      const cfg = await res.json();
      setClientTemplates((prev) => ({ ...prev, [slug]: cfg.templates ?? [] }));
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (view !== "browse" || !leads.length) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, leads.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); if (lead) toggleShortlist(lead); }
      else if (e.key === "s") setView("shortlist");
      else if (e.key === "Escape") setView("browse");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [leads, index, lead, toggleShortlist, view]);

  // Shortlisted leads for the current neighbourhood filter
  const shortlistedLeads = useMemo(() => leads.filter((l) => shortlisted.has(l.placeId)), [leads, shortlisted]);
  const instagramLeads = shortlistedLeads.filter((l) => channel(l) === "instagram");
  const facebookLeads  = shortlistedLeads.filter((l) => channel(l) === "facebook");
  const callLeads      = shortlistedLeads.filter((l) => channel(l) === "call");

  // Count shortlisted in current filter
  const shortlistCount = shortlistedLeads.length;

  if (loading) return <div className={styles.page}><div className={styles.empty}>Loading leads…</div></div>;
  if (!allLeads.length) return <div className={styles.page}><div className={styles.empty}>No leads — run npm run scrape first</div></div>;

  return (
    <div className={styles.page}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={styles.topBarLeft}>Studio Rocinante</span>
        <div className={styles.topBarTabs}>
          <button className={`${styles.tabBtn} ${view === "browse" ? styles.tabActive : ""}`} onClick={() => setView("browse")}>Browse</button>
          <button className={`${styles.tabBtn} ${view === "shortlist" ? styles.tabActive : ""}`} onClick={() => setView("shortlist")}>Shortlist · {shortlistCount}</button>
        </div>
        <span className={styles.topBarRight}>{allLeads.length} leads total</span>
      </div>

      {/* Neighbourhood selector */}
      <div className={styles.hoodBar}>
        <button
          className={`${styles.hoodBtn} ${selectedHood === "all" ? styles.hoodActive : ""}`}
          onClick={() => setSelectedHood("all")}
        >
          All ({allLeads.length})
        </button>
        {neighbourhoods.map((h) => {
          const count = allLeads.filter((l) => l.neighbourhood === h).length;
          const slCount = allLeads.filter((l) => l.neighbourhood === h && shortlisted.has(l.placeId)).length;
          return (
            <button
              key={h}
              className={`${styles.hoodBtn} ${selectedHood === h ? styles.hoodActive : ""} ${reviewedHoods.has(h) ? styles.hoodReviewed : ""}`}
              onClick={() => setSelectedHood(h)}
            >
              {fmt(h)} ({count}){slCount > 0 && <span className={styles.hoodShortlistPip}>{slCount}</span>}
            </button>
          );
        })}
      </div>

      {/* ── Browse view ── */}
      {view === "browse" && (
        <>
          {!lead ? (
            <div className={styles.empty}>No leads in this neighbourhood</div>
          ) : (
            <>
              <div className={styles.infoBar}>
                <div className={styles.infoLeft}>
                  <h1 className={styles.businessName}>{lead.name}</h1>
                  <span className={styles.businessMeta}>{mainType(lead.types)} · {fmt(lead.neighbourhood)}</span>
                </div>
                <div className={styles.infoRight}>
                  {lead.phone
                    ? <a href={`tel:${lead.phone}`} className={styles.phone}>{lead.phone}</a>
                    : <span className={styles.phone} style={{ opacity: 0.3 }}>no phone</span>
                  }
                  {lead.social && (
                    <a href={lead.socialUrl ?? "#"} target="_blank" rel="noopener noreferrer"
                      className={styles.socialBadge} data-platform={lead.social}>
                      {lead.social}
                    </a>
                  )}
                  <span className={styles.rating}>
                    <span className={styles.ratingVal}>{stars(lead.rating)}</span>
                    {lead.ratingCount ? `${lead.ratingCount.toLocaleString()} reviews` : ""}
                    {price(lead.priceLevel) ? ` · ${price(lead.priceLevel)}` : ""}
                  </span>
                  <span className={styles.address}>{lead.address}</span>
                </div>
              </div>

              <div className={styles.photos}>
                {photos.length > 0
                  ? photos.map((fname) => <img key={fname} src={photoPath(lead, fname)} alt="" className={styles.photo} />)
                  : <div className={styles.photoPlaceholder}>No photos</div>
                }
              </div>

              <div className={styles.bottomBar}>
                <div className={styles.hints}>
                  <span className={styles.hint}><span>↑↓</span>navigate</span>
                  <span className={styles.hint}><span>←</span>shortlist</span>
                  <span className={styles.hint}><span>S</span>shortlist view</span>
                </div>
                <div className={styles.actions}>
                  <span className={styles.counter}>
                    {index + 1} / {leads.length} · <span className={styles.counterShortlisted}>{shortlistCount} shortlisted</span>
                  </span>
                  <button
                    className={`${styles.shortlistBtn} ${shortlisted.has(lead.placeId) ? styles.active : ""}`}
                    onClick={() => toggleShortlist(lead)}
                  >
                    {shortlisted.has(lead.placeId) ? "Shortlisted ✓" : "Shortlist"}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* ── Shortlist view ── */}
      {view === "shortlist" && (
        <div className={styles.shortlistView}>
          {shortlistedLeads.length === 0 ? (
            <div className={styles.empty}>No shortlisted leads {selectedHood !== "all" ? `in ${fmt(selectedHood)}` : ""}</div>
          ) : (
            <>
              {[
                { leads: instagramLeads, label: "Instagram DM", platform: "instagram" },
                { leads: facebookLeads,  label: "Facebook Message", platform: "facebook" },
                { leads: callLeads,      label: "Call", platform: "call" },
              ].filter(g => g.leads.length > 0).map(({ leads: groupLeads, label, platform }) => (
                <div key={platform} className={styles.channel}>
                  <div className={styles.channelHeader} data-platform={platform}>{label} · {groupLeads.length}</div>
                  {groupLeads.map((l) => {
                    const isOpen = expanded === l.slug;
                    const templates = clientTemplates[l.slug] ?? [];
                    return (
                      <div key={l.placeId} className={styles.shortlistItem}>
                        <div
                          className={styles.shortlistCard}
                          onClick={() => toggleExpand(l.slug)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className={styles.shortlistCardLeft}>
                            <span className={styles.shortlistCardName}>{l.name}</span>
                            <span className={styles.shortlistCardMeta}>{fmt(l.neighbourhood)} · {mainType(l.types)}</span>
                            {l.phone && <span className={styles.shortlistCardPhone}>{l.phone}</span>}
                          </div>
                          <div className={styles.shortlistCardRight}>
                            {platform !== "call" && (
                              <a href={l.socialUrl ?? "#"} target="_blank" rel="noopener noreferrer"
                                className={styles.socialBadge} data-platform={platform}
                                onClick={e => e.stopPropagation()}>{platform}</a>
                            )}
                            <button
                              className={styles.addTemplateBtn}
                              onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/${l.slug}/select`); }}
                            >+ Template</button>
                            <span className={styles.expandChevron}>{isOpen ? "▲" : "▼"}</span>
                          </div>
                        </div>
                        {isOpen && (
                          <div className={styles.templateList}>
                            {templates.length === 0
                              ? <span className={styles.templateListEmpty}>No templates yet</span>
                              : templates.map((t) => (
                                <div key={t.version} className={styles.templateRow}>
                                  <span className={styles.templateRowName}>v{t.version} · {t.templateId}</span>
                                  <div className={styles.templateRowActions}>
                                    <a href={`/${l.slug}-${t.version}`} target="_blank" rel="noopener noreferrer" className={styles.templateRowBtn}>View ↗</a>
                                    <button className={styles.templateRowBtn} onClick={() => router.push(`/dashboard/${l.slug}/edit/${t.version}`)}>Edit</button>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {flash && <div className={styles.flashShortlist}>{flash}</div>}
    </div>
  );
}
