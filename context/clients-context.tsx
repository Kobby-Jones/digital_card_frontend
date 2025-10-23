"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ClientProfile } from "@/lib/types";
import { MOCK_CLIENTS } from "@/lib/mock";

type ClientsCtx = {
  clients: ClientProfile[] | null;                 // null = loading/hydrating
  getById: (id: string) => ClientProfile | undefined;
  getBySlug: (slug: string) => ClientProfile | undefined;
  slugAvailable: (slug: string) => boolean;
  add: (c: ClientProfile) => void;
  update: (id: string, patch: Partial<ClientProfile>) => void;
  remove: (id: string) => void;
  resetToMock: () => void;                         // NEW: reseed demo data
};

const STORAGE_KEY = "digi_clients";
const Ctx = createContext<ClientsCtx | null>(null);

function safeLoad(): ClientProfile[] {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return [...MOCK_CLIENTS];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...MOCK_CLIENTS];
    // If storage was accidentally wiped to [], reseed demo for UX
    if (parsed.length === 0) return [...MOCK_CLIENTS];
    return parsed;
  } catch {
    return [...MOCK_CLIENTS];
  }
}

export function ClientsProvider({ children }: { children: React.ReactNode }) {
  // null during hydration; set to array once loaded
  const [clients, setClients] = useState<ClientProfile[] | null>(null);

  // Load once on mount
  useEffect(() => {
    const data = safeLoad();
    setClients(data);
  }, []);

  // Persist AFTER we have a non-null state
  useEffect(() => {
    if (clients) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    }
  }, [clients]);

  const api: ClientsCtx = useMemo(() => ({
    clients,
    getById: (id) => (clients ?? []).find(c => c.id === id),
    getBySlug: (slug) => (clients ?? []).find(c => c.slug === slug),
    slugAvailable: (slug) => !(clients ?? []).some(c => c.slug === slug),
    add: (c) => setClients(prev => ([c, ...((prev ?? []) as ClientProfile[])])),
    update: (id, patch) => setClients(prev => {
      const arr = (prev ?? []) as ClientProfile[];
      return arr.map(c => c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c);
    }),
    remove: (id) => setClients(prev => (prev ?? []).filter(c => c.id !== id)),
    resetToMock: () => setClients([...MOCK_CLIENTS]),
  }), [clients]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useClients() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useClients must be used within ClientsProvider");
  return ctx;
}
