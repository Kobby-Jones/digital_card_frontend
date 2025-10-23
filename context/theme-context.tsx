"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ThemeKey } from "@/lib/themes";

type ThemeCtx = {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
};

const STORAGE_KEY = "digi_theme";
const Ctx = createContext<ThemeCtx | null>(null);

export function ThemePresetProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("neon");

  // Apply immediately on first client mount
  useEffect(() => {
    let t: ThemeKey = "neon";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) t = raw as ThemeKey;
    } catch {}
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const api = useMemo<ThemeCtx>(() => ({
    theme,
    setTheme: (t) => setThemeState(t)
  }), [theme]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useThemePreset() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useThemePreset must be used within ThemePresetProvider");
  return ctx;
}
