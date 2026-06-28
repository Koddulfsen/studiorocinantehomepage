"use client";

import { createContext, useContext } from "react";
import type { TemplateCopy } from "./templateCopy";

const CopyContext = createContext<TemplateCopy>({});

export function CopyProvider({
  copy,
  children,
}: {
  copy: TemplateCopy;
  children: React.ReactNode;
}) {
  return <CopyContext.Provider value={copy}>{children}</CopyContext.Provider>;
}

export function useCopy(): TemplateCopy {
  return useContext(CopyContext);
}

export function slotCaption(slots: Record<string, string>, slotId: string): string {
  const url = slots[slotId];
  if (!url) return "";
  const filename = url.split("/").pop() ?? "";
  return filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}
