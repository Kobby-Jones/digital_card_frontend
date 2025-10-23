"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Site } from "@/lib/types";
import { SCHEMA_VERSION } from "@/lib/types";
import { MOCK_SITES } from "@/lib/mock";
import { migrateToV2 } from "@/lib/migrate";

type ClientsCtx = {
  sites: Site[] | null; // null = loading
  list: () => Site[];
  getBySlug: (slug: string) => Site | undefined;
  getById: (id: string) => Site | undefined;
  slugAvailable: (slug: string) => boolean;
  add: (s: Site) => void;
  update: (id: string, patch: Partial<Site>) => void;
  remove: (id: string) => void;
  resetToMock: () => void;
};

const STORAGE_KEY = "digi_sites_v2"; // new key

const Ctx = createContext<ClientsCtx | null>(null);

function safeLoad(): Site[] {
  try {
    // Prefer new key
    const rawV2 = localStorage.getItem(STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (Array.isArray(parsed) && parsed.every((x) => x && x._v === SCHEMA_VERSION)) {
        return parsed as Site[];
      }
    }

    // Try legacy key and migrate (older projects used digi_clients)
    const legacy = localStorage.getItem("digi_clients");
    if (legacy) {
      const arr = JSON.parse(legacy);
      if (Array.isArray(arr)) {
        const migrated: Site[] = arr
          .map((x) => migrateToV2(x))
          .filter(Boolean) as Site[];
        if (migrated.length) return migrated;
      }
    }

    // Fallback to mock seed
    return [...MOCK_SITES];
  } catch {
    return [...MOCK_SITES];
  }
}

export function ClientsProvider({ children }: { children: React.ReactNode }) {
  const [sites, setSites] = useState<Site[] | null>(null);

  // initial load
  useEffect(() => {
    const data = safeLoad();
    setSites(data);
  }, []);

  // persist
  useEffect(() => {
    if (sites) localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
  }, [sites]);

  const api: ClientsCtx = useMemo(
    () => ({
      sites,
      list: () => (sites ?? []).slice().sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1)),
      getBySlug: (slug) => (sites ?? []).find((s) => s.domain.slug === slug),
      getById: (id) => (sites ?? []).find((s) => s.id === id),
      slugAvailable: (slug) => !(sites ?? []).some((s) => s.domain.slug === slug),
      add: (s) => setSites((prev) => [s, ...(prev ?? [])]),
      update: (id, patch) =>
        setSites((prev) =>
          (prev ?? []).map((s) => (s.id === id ? { ...s, ...patch, updatedAt: new Date().toISOString() } : s))
        ),
      remove: (id) => setSites((prev) => (prev ?? []).filter((s) => s.id !== id)),
      resetToMock: () => setSites([...MOCK_SITES]),
    }),
    [sites]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useClients() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useClients must be used within ClientsProvider");
  return ctx;
}
