"use client";

import dynamic from "next/dynamic";
import { ClientDataProvider, type ClientData } from "@/lib/clientContext";
import { TemplateModeProvider } from "@/lib/templateMode";
import { CopyProvider } from "@/lib/copyContext";
import type { TemplateCopy } from "@/lib/templateCopy";
import { FONT_PRESETS, RADIUS_PRESETS, HEADING_FONT_VARS, BODY_FONT_VARS } from "@/lib/fontPresets";
import type { TemplateVersion } from "@/lib/clientConfig";

const REGISTRY: Record<string, React.ComponentType> = {
  "minimal-mochi-hana":          dynamic(() => import("@/app/templates/minimal-mochi/hana/page")),
  "minimal-manor-linen":         dynamic(() => import("@/app/templates/minimal-manor/linen/page")),
  "minimal-manor-paper":         dynamic(() => import("@/app/templates/minimal-manor/paper/page")),
  "minimal-manor-slate":         dynamic(() => import("@/app/templates/minimal-manor/slate/page")),
  "atmosphere-corner-chronicle": dynamic(() => import("@/app/templates/atmosphere-corner/chronicle/page")),
  "atmosphere-corner-block":     dynamic(() => import("@/app/templates/atmosphere-corner/block/page")),
  "atmosphere-corner-warmth":    dynamic(() => import("@/app/templates/atmosphere-corner/warmth/page")),
  "atmosphere-manor-salon":      dynamic(() => import("@/app/templates/atmosphere-manor/salon/page")),
  "atmosphere-manor-cellar":     dynamic(() => import("@/app/templates/atmosphere-manor/cellar/page")),
  "atmosphere-manor-suite":      dynamic(() => import("@/app/templates/atmosphere-manor/suite/page")),
  "story-broadsheet-byline":     dynamic(() => import("@/app/templates/story-broadsheet/byline/page")),
  "story-broadsheet-feature":    dynamic(() => import("@/app/templates/story-broadsheet/feature/page")),
  "story-broadsheet-ledger":     dynamic(() => import("@/app/templates/story-broadsheet/ledger/page")),
  "story-market-grove":          dynamic(() => import("@/app/templates/story-market/grove/page")),
  "story-market-pantry":         dynamic(() => import("@/app/templates/story-market/pantry/page")),
  "story-market-harvest":        dynamic(() => import("@/app/templates/story-market/harvest/page")),
  "bold-neon-volt":              dynamic(() => import("@/app/templates/bold-neon/volt/page")),
  "bold-neon-clash":             dynamic(() => import("@/app/templates/bold-neon/clash/page")),
  "bold-neon-pulse":             dynamic(() => import("@/app/templates/bold-neon/pulse/page")),
  "bold-marquee-stamp":          dynamic(() => import("@/app/templates/bold-marquee/stamp/page")),
  "bold-marquee-signal":         dynamic(() => import("@/app/templates/bold-marquee/signal/page")),
  "bold-marquee-billboard":      dynamic(() => import("@/app/templates/bold-marquee/billboard/page")),
  "food-noir-obsidian":          dynamic(() => import("@/app/templates/food-noir/obsidian/page")),
  "food-noir-velvet":            dynamic(() => import("@/app/templates/food-noir/velvet/page")),
  "food-noir-ember":             dynamic(() => import("@/app/templates/food-noir/ember/page")),
  "food-polaroid-roll":          dynamic(() => import("@/app/templates/food-polaroid/roll/page")),
  "food-polaroid-contact":       dynamic(() => import("@/app/templates/food-polaroid/contact/page")),
  "food-polaroid-candid":        dynamic(() => import("@/app/templates/food-polaroid/candid/page")),
};

function buildCssVars(tv: TemplateVersion): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [slotId, url] of Object.entries(tv.slots)) {
    vars[`--${slotId}`] = `url(${url})`;
  }

  if (tv.accent) vars["--accent"] = tv.accent;

  const preset = FONT_PRESETS.find((p) => p.id === tv.fontPreset);
  if (preset) {
    vars["--font-primary"]   = preset.heading;
    vars["--font-secondary"] = preset.body;
    vars["--font-body"]      = preset.body;
    // Extract the actual var name from e.g. "var(--font-playfair)" → "--font-playfair"
    const headingSrc = preset.heading.match(/var\((--font-[^)]+)\)/)?.[1];
    const bodySrc    = preset.body.match(/var\((--font-[^)]+)\)/)?.[1];
    // Override every template font var — but skip the source var itself to
    // avoid CSS circular references (var resolves to itself → invalid → ignored)
    for (const v of HEADING_FONT_VARS) {
      if (v !== headingSrc) vars[v] = preset.heading;
    }
    for (const v of BODY_FONT_VARS) {
      if (v !== bodySrc) vars[v] = preset.body;
    }
  }

  const radius = RADIUS_PRESETS.find((r) => r.id === tv.radius);
  if (radius) vars["--radius"] = radius.value;

  if (tv.titleSize != null) {
    const rem = (3 + (tv.titleSize / 100) * 13).toFixed(2);
    vars["--hero-title-size"] = `${rem}rem`;
  }

  if (tv.titleWeight) vars["--hero-title-weight"] = String(tv.titleWeight);
  if (tv.titleTransform) vars["--hero-title-transform"] = tv.titleTransform;

  return vars;
}

interface Props {
  tv: TemplateVersion;
  lead: ClientData;
}

export function ClientTemplateRenderer({ tv, lead }: Props) {
  const Template = REGISTRY[tv.templateId];
  if (!Template) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", fontFamily: "sans-serif" }}>
        <p>Unknown template: <strong>{tv.templateId}</strong></p>
      </div>
    );
  }

  const cssVars = buildCssVars(tv);

  // Derive slot captions from filenames for templates that display them
  const slotCaptions: Record<string, string> = {};
  for (const [slotId, url] of Object.entries(tv.slots)) {
    const filename = (url.split("/").pop() ?? "").replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    if (filename) slotCaptions[slotId] = filename;
  }
  const copy: TemplateCopy = { ...tv.copy, slotCaptions };

  return (
    <ClientDataProvider data={lead}>
      <CopyProvider copy={copy}>
        <TemplateModeProvider cssVars={cssVars}>
          <Template />
        </TemplateModeProvider>
      </CopyProvider>
    </ClientDataProvider>
  );
}
