"use client";

import { createContext, useContext } from "react";

interface TemplateModeCtx {
  clientMode: boolean;
  cssVars?: Record<string, string>;
}

const TemplateModeContext = createContext<TemplateModeCtx>({ clientMode: false });

export function TemplateModeProvider({
  cssVars,
  children,
}: {
  cssVars: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <TemplateModeContext.Provider value={{ clientMode: true, cssVars }}>
      {children}
    </TemplateModeContext.Provider>
  );
}

export function useTemplateMode() {
  return useContext(TemplateModeContext);
}
