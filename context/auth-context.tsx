"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Role, User, ID } from "@/lib/types";

/* =========================
   Auth Context (Frontend-only mock)
   - Persists to localStorage
   - Migrates legacy keys
   - Cross-tab sync
   - Helpers: isAdmin, attach/detach primary site
   ========================= */

type SignInInput = {
  email: string;
  role?: Role;      // default "client"
  name?: string;
  primarySiteId?: ID;
};

type AuthCtx = {
  user: User | null;
  isAdmin: boolean;
  signIn: (input: SignInInput) => void;
  signOut: () => void;

  // profile tweaks (handy for onboarding)
  setName: (name?: string) => void;
  setEmail: (email: string) => void;

  // link a created site to this user
  attachPrimarySite: (siteId: ID) => void;
  detachPrimarySite: () => void;
};

const STORAGE_KEY = "digi_user_v2";            // new, versioned key
const LEGACY_KEYS = ["digi_user"];             // old keys we migrate from

const Ctx = createContext<AuthCtx | null>(null);

/* ---------- helpers ---------- */

function newId(): ID {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

function safeParseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    // Normalize/minimal validation
    const role: Role = parsed.role === "admin" || parsed.role === "client" ? parsed.role : "client";
    const email: string | undefined = typeof parsed.email === "string" ? parsed.email : undefined;
    const id: string = typeof parsed.id === "string" && parsed.id.length > 0 ? parsed.id : newId();
    const name: string | undefined = typeof parsed.name === "string" ? parsed.name : undefined;
    const primarySiteId: string | undefined =
      typeof parsed.primarySiteId === "string" ? parsed.primarySiteId : undefined;

    if (!email) return null; // we require email for a valid session in this demo

    const u: User = { id, role, email, name, primarySiteId };
    return u;
  } catch {
    return null;
  }
}

function migrateLegacyUser(): User | null {
  // Try each legacy key, newest first
  for (const key of LEGACY_KEYS) {
    try {
      const legacy = localStorage.getItem(key);
      const u = safeParseUser(legacy);
      if (u) {
        // Persist migrated user into v2 key and remove legacy
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        localStorage.removeItem(key);
        return u;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

/* ---------- Provider ---------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const didInit = useRef(false);

  // Initial load + migration
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    let u: User | null = null;
    try {
      u = safeParseUser(localStorage.getItem(STORAGE_KEY));
      if (!u) u = migrateLegacyUser();
    } catch {
      // ignore
    }
    if (u) setUser(u);
  }, []);

  // Persist whenever user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage failures in demo mode
    }
  }, [user]);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setUser(safeParseUser(e.newValue));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const api = useMemo<AuthCtx>(() => {
    return {
      user,
      isAdmin: user?.role === "admin",

      signIn: (input) => {
        const u: User = {
          id: newId(),
          role: input.role ?? "client",
          email: input.email.trim(),
          name: input.name?.trim() || undefined,
          primarySiteId: input.primarySiteId,
        };
        setUser(u);
      },

      signOut: () => setUser(null),

      setName: (name) => setUser((prev) => (prev ? { ...prev, name } : prev)),
      setEmail: (email) => setUser((prev) => (prev ? { ...prev, email } : prev)),

      attachPrimarySite: (siteId) =>
        setUser((prev) => (prev ? { ...prev, primarySiteId: siteId } : prev)),

      detachPrimarySite: () =>
        setUser((prev) => (prev ? { ...prev, primarySiteId: undefined } : prev)),
    };
  }, [user]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

/* ---------- Hook ---------- */

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
