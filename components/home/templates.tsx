"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useThemePreset } from "@/context/theme-context";
import type { ThemeKey } from "@/lib/themes";
import { useEffect, useRef } from "react";

const templates: { key: ThemeKey; name: string; desc: string; preview: string }[] = [
  { key: "neon",    name: "Neon",    desc: "High-contrast neon accents", preview: "linear-gradient(135deg,#00ffff55,#ff00ff55)" },
  { key: "aurora",  name: "Aurora",  desc: "Soft cinematic glow",        preview: "linear-gradient(135deg,#7dd3fc55,#a78bfa55)" },
  { key: "slate",   name: "Slate",   desc: "Understated elegance",       preview: "linear-gradient(135deg,#94a3b855,#e2e8f055)" },
  { key: "royal",   name: "Royal",   desc: "Premium & bold",             preview: "linear-gradient(135deg,#60a5fa55,#f472b655)" },
  { key: "sunset",  name: "Sunset",  desc: "Warm & vibrant",             preview: "linear-gradient(135deg,#fb718555,#fbbf2455)" },
  { key: "emerald", name: "Emerald", desc: "Fresh & techy",              preview: "linear-gradient(135deg,#34d39955,#06b6d455)" },
  { key: "amber",   name: "Amber",   desc: "Bright & punchy",            preview: "linear-gradient(135deg,#f59e0b55,#ef444455)" }
];

export default function HomeTemplates() {
  const { theme, setTheme } = useThemePreset();
  const rootRef = useRef<HTMLDivElement>(null);

  // Ensure nothing above us steals pointer events
  useEffect(() => {
    if (rootRef.current) rootRef.current.style.pointerEvents = "auto";
  }, []);

  return (
    <section className="space-y-4" id="templates" ref={rootRef}>
      <h2 className="text-2xl font-semibold">Template previews (click to apply)</h2>
      <div role="listbox" aria-label="Theme templates" className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
        {templates.map((t) => {
          const active = theme === t.key;
          return (
            <motion.button
              key={t.key}
              type="button"
              role="option"
              aria-selected={active}
              whileHover={{ scale: 1.02 }}
              onClick={() => setTheme(t.key)}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)] rounded-2xl"
              style={{ zIndex: 1 }} // ensure clickable above any subtle patterns
            >
              <Card className={`overflow-hidden border-white/10 p-0 ${active ? "ring-1 ring-[color:var(--ring-soft)] shadow-[0_0_24px_var(--ring-soft)]" : ""}`}>
                <div className="h-20 w-full" style={{ background: t.preview }} />
                <div className="p-3">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[12px] text-white/70">{t.desc}</div>
                </div>
              </Card>
            </motion.button>
          );
        })}
      </div>
      <div className="text-xs text-white/60">Your selection updates the entire preview instantly and is remembered.</div>
    </section>
  );
}
