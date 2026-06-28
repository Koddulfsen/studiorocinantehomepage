"use client";

import { useState } from "react";

// A dev preview frame. Loads /main inside an iframe so the page's REAL
// responsive breakpoints fire at 375px (a plain narrow div would not).
// Toggle the button to expand the frame to full desktop width and back.

const PREVIEW_SRC = "/main";

export default function Preview() {
  const [mode, setMode] = useState<"mobile" | "desktop">("mobile");
  const isMobile = mode === "mobile";

  return (
    <div className="flex h-screen flex-col bg-neutral-900 text-neutral-100">
      {/* ── Toolbar (the button lives OUTSIDE the frame) ─────────────────── */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-700 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold tracking-tight">
            Main · live preview
          </span>
          <span className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-xs text-neutral-400">
            {isMobile ? "375 px" : "full width"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMode(isMobile ? "desktop" : "mobile")}
          aria-pressed={!isMobile}
          className="rounded-full bg-amber-500 px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 transition hover:bg-amber-400 active:scale-95"
        >
          {isMobile ? "⤢  Expand to desktop" : "⤡  Collapse to 375 px"}
        </button>
      </div>

      {/* ── Stage ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 justify-center overflow-auto p-4 sm:p-8">
        <div
          className={`h-full overflow-hidden bg-white shadow-2xl transition-[width,max-width,border-radius] duration-300 ease-in-out ${
            isMobile
              ? "rounded-[2.25rem] border-[8px] border-neutral-800"
              : "rounded-lg border border-neutral-700"
          }`}
          style={{
            width: isMobile ? 375 : "100%",
            maxWidth: isMobile ? 375 : "100%",
          }}
        >
          <iframe
            src={PREVIEW_SRC}
            title="Main preview"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
