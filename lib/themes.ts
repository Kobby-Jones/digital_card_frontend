export type ThemeKey = "neon" | "aurora" | "slate" | "royal" | "sunset" | "emerald" | "amber";

export const THEME_META: Record<ThemeKey, { name: string; accents: [string, string] }> = {
  neon:    { name: "Neon",    accents: ["#00FFFF", "#FF00FF"] },
  aurora:  { name: "Aurora",  accents: ["#7dd3fc", "#a78bfa"] },
  slate:   { name: "Slate",   accents: ["#94a3b8", "#e2e8f0"] },
  royal:   { name: "Royal",   accents: ["#60a5fa", "#f472b6"] },
  sunset:  { name: "Sunset",  accents: ["#fb7185", "#fbbf24"] },
  emerald: { name: "Emerald", accents: ["#34d399", "#06b6d4"] },
  amber:   { name: "Amber",   accents: ["#f59e0b", "#ef4444"] }
};
