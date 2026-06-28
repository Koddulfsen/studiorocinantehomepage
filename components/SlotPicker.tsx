"use client";

import { useState } from "react";
import {
  CATEGORIES, TEMPLATE_SLOTS, STOCK_AVAILABLE, stockPhotoUrl, stockPreviewUrl,
  type Category, type SlotConfig,
} from "@/lib/slots";

interface Props {
  templateId: string;
  config: SlotConfig;
  onChange: (config: SlotConfig) => void;
}

const PANEL: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
  background: "#0E0E0E",
  borderLeft: "1px solid rgba(232,228,220,0.1)",
  width: "340px",
  display: "flex",
  flexDirection: "column",
  fontFamily: "var(--font-mono)",
  overflowY: "auto",
};

const LABEL: React.CSSProperties = {
  fontSize: "0.5625rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "rgba(232,228,220,0.3)",
  marginBottom: "0.5rem",
};

export function SlotPicker({ templateId, config, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const defs = TEMPLATE_SLOTS[templateId] ?? [];

  if (defs.length === 0) return null;

  function update(slotId: string, patch: Partial<{ category: Category; number: number; stockNum: number }>) {
    const def = defs.find((d) => d.id === slotId)!;
    const current = config[slotId] ?? { category: def.defaultCategory, number: def.defaultNumber };
    onChange({ ...config, [slotId]: { ...current, ...patch } });
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: open ? "356px" : "1.5rem",
          zIndex: 1000,
          background: open ? "#E8E4DC" : "#111",
          color: open ? "#111" : "#E8E4DC",
          border: "1px solid rgba(232,228,220,0.2)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.625rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          padding: "0.6rem 1.2rem",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        {open ? "Close" : "Photo Slots"}
      </button>

      {open && (
        <div style={PANEL}>
          {/* Header */}
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(232,228,220,0.08)", flexShrink: 0 }}>
            <div style={{ fontSize: "0.5625rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,220,0.3)", marginBottom: "0.25rem" }}>
              {templateId}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#E8E4DC" }}>
              {defs.length} photo slot{defs.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Slots */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {defs.map((def) => {
              const current = config[def.id] ?? { category: def.defaultCategory, number: def.defaultNumber };
              const isActive = activeSlot === def.id;
              const stockNums = STOCK_AVAILABLE[current.category] ?? [];

              return (
                <div
                  key={def.id}
                  style={{
                    borderBottom: "1px solid rgba(232,228,220,0.06)",
                    background: isActive ? "rgba(232,228,220,0.03)" : "transparent",
                  }}
                >
                  {/* Slot header row */}
                  <div
                    style={{ padding: "0.875rem 1.25rem", cursor: "pointer", display: "flex", gap: "0.75rem", alignItems: "center" }}
                    onClick={() => setActiveSlot(isActive ? null : def.id)}
                  >
                    {/* Current photo thumb */}
                    <div style={{
                      width: "52px", height: "38px", flexShrink: 0,
                      backgroundImage: `url(${stockPreviewUrl(current.category, current.stockNum)})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      border: "1px solid rgba(232,228,220,0.1)",
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.6875rem", color: "#E8E4DC", marginBottom: "0.2rem" }}>{def.label}</div>
                      <div style={{ fontSize: "0.5625rem", letterSpacing: "0.15em", color: "rgba(232,228,220,0.3)", textTransform: "uppercase" }}>
                        {current.category} · client: {current.category}-{current.number}.jpg
                      </div>
                    </div>
                    <div style={{ fontSize: "0.625rem", color: "rgba(232,228,220,0.25)" }}>{isActive ? "▲" : "▼"}</div>
                  </div>

                  {/* Expanded editor */}
                  {isActive && (
                    <div style={{ padding: "0 1.25rem 1rem" }}>

                      {/* Category selector */}
                      <div style={LABEL}>Category</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }}>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => update(def.id, { category: cat, stockNum: STOCK_AVAILABLE[cat][0] })}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.5625rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              padding: "0.3rem 0.65rem",
                              border: "1px solid rgba(232,228,220,0.15)",
                              background: current.category === cat ? "#E8E4DC" : "transparent",
                              color: current.category === cat ? "#0E0E0E" : "rgba(232,228,220,0.4)",
                              cursor: "pointer",
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Stock photo grid */}
                      <div style={LABEL}>Stock photo (preview)</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.375rem", marginBottom: "1rem" }}>
                        {stockNums.map((n) => {
                          const url = stockPhotoUrl(current.category, n);
                          const selected = (current.stockNum ?? stockNums[0]) === n;
                          return (
                            <div
                              key={n}
                              onClick={() => update(def.id, { stockNum: n })}
                              style={{
                                aspectRatio: "4/3",
                                backgroundImage: `url(${url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                cursor: "pointer",
                                border: selected ? "2px solid #E8E4DC" : "2px solid transparent",
                                boxSizing: "border-box",
                                position: "relative",
                              }}
                            >
                              <div style={{
                                position: "absolute", bottom: 0, right: 0,
                                background: "rgba(0,0,0,0.6)",
                                fontSize: "0.5rem",
                                padding: "0.1rem 0.3rem",
                                fontFamily: "var(--font-mono)",
                                color: "rgba(255,255,255,0.6)",
                              }}>
                                {String(n).padStart(2, "0")}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Client file number */}
                      <div style={LABEL}>Client file number</div>
                      <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => update(def.id, { number: n })}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.6875rem",
                              padding: "0.3rem 0.65rem",
                              border: "1px solid rgba(232,228,220,0.15)",
                              background: current.number === n ? "#E8E4DC" : "transparent",
                              color: current.number === n ? "#0E0E0E" : "rgba(232,228,220,0.4)",
                              cursor: "pointer",
                            }}
                          >
                            {n}
                          </button>
                        ))}
                        <span style={{ fontSize: "0.5625rem", color: "rgba(232,228,220,0.2)", marginLeft: "0.5rem" }}>
                          → {current.category}-{current.number}.jpg
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
