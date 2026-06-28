"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SlotPicker } from "./SlotPicker";
import { defaultConfig, resolveSlotVars, type SlotConfig } from "@/lib/slots";
import { useTemplateMode } from "@/lib/templateMode";

interface Props {
  templateId: string;
  children: React.ReactNode;
}

const LS_KEY = (id: string) => `slots:${id}`;

export function TemplateShell({ templateId, children }: Props) {
  const { clientMode, cssVars: clientCssVars } = useTemplateMode();

  const [config, setConfig] = useState<SlotConfig>(() => defaultConfig(templateId));

  useEffect(() => {
    if (clientMode) return;
    try {
      const saved = localStorage.getItem(LS_KEY(templateId));
      if (saved) setConfig(JSON.parse(saved));
    } catch {}
  }, [templateId, clientMode]);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleChange = useCallback((next: SlotConfig) => {
    setConfig(next);
    try { localStorage.setItem(LS_KEY(templateId), JSON.stringify(next)); } catch {}
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await fetch("/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, config: next }),
      });
    }, 800);
  }, [templateId]);

  if (clientMode) {
    const vars = clientCssVars ?? {};
    // CSS custom properties set on .page override inherited vars from a parent div,
    // so we inject a <style> tag with !important to win the cascade.
    const styleStr = Object.entries(vars)
      .map(([k, v]) => `${k}: ${v} !important`)
      .join("; ");
    return (
      <div data-client-vars="">
        {styleStr && (
          <style dangerouslySetInnerHTML={{ __html: `[data-client-vars] > * { ${styleStr} }` }} />
        )}
        {children}
      </div>
    );
  }

  const cssVars = resolveSlotVars(config, "stock");
  return (
    <>
      <div style={cssVars as React.CSSProperties}>
        {children}
      </div>
      <SlotPicker templateId={templateId} config={config} onChange={handleChange} />
    </>
  );
}
