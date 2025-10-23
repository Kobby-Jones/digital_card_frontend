"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@/lib/types";

type AuthCtx = {
  user: User | null;
  signIn: (u: Omit<User, "id">) => void;
  signOut: () => void;
  isAdmin: boolean;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("digi_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const api = useMemo<AuthCtx>(() => ({
    user,
    isAdmin: user?.role === "admin",
    signIn: (u) => {
      const newUser: User = { id: crypto.randomUUID(), ...u };
      setUser(newUser);
      localStorage.setItem("digi_user", JSON.stringify(newUser));
    },
    signOut: () => {
      setUser(null);
      localStorage.removeItem("digi_user");
    }
  }), [user]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
