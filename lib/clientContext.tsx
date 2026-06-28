"use client";

import { createContext, useContext } from "react";

export interface ClientData {
  name: string;
  address: string;
  neighbourhood: string;
  city?: string;
  phone?: string;
  hours?: string;
  cuisine?: string;
  social?: string;
}

const ClientContext = createContext<ClientData | null>(null);

export function ClientDataProvider({ data, children }: { data: ClientData; children: React.ReactNode }) {
  return <ClientContext.Provider value={data}>{children}</ClientContext.Provider>;
}

export function useClientData(): ClientData | null {
  return useContext(ClientContext);
}
