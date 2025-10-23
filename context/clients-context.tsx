"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ClientProfile } from "@/lib/types";
import { MOCK_CLIENTS } from "@/lib/mock";

type ClientsCtx = {
  clients: ClientProfile[];
  getById: (id: string) => ClientProfile | undefined;
  getBySlug: (slug: string) => ClientProfile | undefined;
  add: (c: ClientProfile) => void;
  update: (id: string, patch: Partial<ClientProfile>) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<ClientsCtx | null>(null);

export function ClientsProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<ClientProfile[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("digi_clients");
    if (stored) setClients(JSON.parse(stored));
    else setClients(MOCK_CLIENTS);
  }, []);
  useEffect(() => {
    if (clients.length) localStorage.setItem("digi_clients", JSON.stringify(clients));
  }, [clients]);

  const api = useMemo<ClientsCtx>(() => ({
    clients,
    getById: (id) => clients.find(c => c.id === id),
    getBySlug: (slug) => clients.find(c => c.slug === slug),
    add: (c) => setClients(prev => [c, ...prev]),
    update: (id, patch) => setClients(prev => prev.map(c => c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c)),
    remove: (id) => setClients(prev => prev.filter(c => c.id !== id))
  }), [clients]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useClients() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useClients must be used within ClientsProvider");
  return ctx;
}
