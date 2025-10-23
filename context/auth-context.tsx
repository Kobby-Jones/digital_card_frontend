// context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User, Role } from "@/lib/types";

type AuthCtx = {
  user: User | null;
  isAdmin: boolean;
  signIn: (u: { email: string; role: Role; name?: string; clientId?: string }) => void;
  signOut: () => void;
  linkClient: (clientId: string) => void; // optional helper to attach owned profile later
};

const STORAGE_KEY = "digi_user";

const Ctx = createContext<AuthCtx | null>(null);

function safeParseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    // Legacy migration: ensure required fields exist
    if (!parsed || typeof parsed !== "object") return null;

    const role: Role | undefined =
      parsed.role === "admin" || parsed.role === "client" ? parsed.role : undefined;

    const email = typeof parsed.email === "string" ? parsed.email : undefined;

    // introduce id if older sessions didn't have one
    const id = typeof parsed.id === "string" && parsed.id.length > 0
      ? parsed.id
      : crypto.randomUUID();

    if (!role || !email) return null;

    const user: User = {
      id,
      role,
      email,
      name: typeof parsed.name === "string" ? parsed.name : undefined,
      clientId: typeof parsed.clientId === "string" ? parsed.clientId : undefined
    };

    // If we had to inject an id (migration), persist the upgraded object
    if (!parsed.id) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }

    return user;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load from storage once on mount
  useEffect(() => {
    const u = safeParseUser(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null);
    if (u) setUser(u);
  }, []);

  const api = useMemo<AuthCtx>(() => ({
    user,
    isAdmin: user?.role === "admin",

    signIn: ({ email, role, name, clientId }) => {
      const newUser: User = {
        id: crypto.randomUUID(),
        role,
        email,
        name,
        clientId
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    },

    signOut: () => {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    },

    linkClient: (clientId: string) => {
      setUser(prev => {
        if (!prev) return prev;
        const updated = { ...prev, clientId };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }), [user]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
