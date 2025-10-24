"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, ChevronLeft, Eye, Check } from "lucide-react";

import { useThemePreset } from "@/context/theme-context";
import { useClients } from "@/context/clients-context";
import type { ThemeKey } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import ThemeCard, { type ThemeMeta } from "@/components/marketplace/theme-card";
import CheckoutModal, { getOwnedThemes } from "@/components/marketplace/checkout-modal";

const THEMES: ThemeMeta[] = [
  {
    key: "neon",
    name: "Neon Pulse",
    tier: "free",
    blurb: "Signature dual-cyan-magenta neon with glass panels and soft glows.",
    preview: "linear-gradient(135deg,#00ffff55,#ff00ff55)",
    features: ["Neon blur cards", "Accent headline", "QR focus"],
  },
  {
    key: "aurora",
    name: "Aurora Drift",
    tier: "free",
    blurb: "Cool sky gradients with subtle motion feel and airy spacing.",
    preview: "linear-gradient(135deg,#7dd3fc55,#a78bfa55)",
    features: ["Calm gradients", "Readable body", "Soft borders"],
  },
  {
    key: "slate",
    name: "Slate Pro",
    tier: "free",
    blurb: "Minimal grayscale elegance with crisp text and restrained glow.",
    preview: "linear-gradient(135deg,#94a3b855,#e2e8f055)",
    features: ["Contrast-focused", "Serious tone", "Corporate friendly"],
  },
  {
    key: "royal",
    name: "Royal Bloom",
    tier: "premium",
    blurb: "Regal blue/pink accents with elegant chips and ornate shadows.",
    preview: "linear-gradient(135deg,#60a5fa55,#f472b655)",
    features: ["Premium palette", "Hero badge set", "Refined hover"],
  },
  {
    key: "sunset",
    name: "Sunset Glow",
    tier: "premium",
    blurb: "Warm coral to amber with cinematic glass and vivid highlights.",
    preview: "linear-gradient(135deg,#fb718555,#fbbf2455)",
    features: ["Warm contrast", "Vivid buttons", "Vibe-rich glow"],
  },
  {
    key: "emerald",
    name: "Emerald Tide",
    tier: "premium",
    blurb: "Green to cyan spectrum with sleek chips and polished feels.",
    preview: "linear-gradient(135deg,#34d39955,#06b6d455)",
    features: ["Modern vibe", "Clean chips", "Fresh accents"],
  },
  {
    key: "amber",
    name: "Amber Forge",
    tier: "premium",
    blurb: "Industrial amber/red glow with bold CTAs and sharp edges.",
    preview: "linear-gradient(135deg,#f59e0b55,#ef444455)",
    features: ["High contrast", "Bold CTAs", "Edgy glow"],
  },
];

export default function MarketplacePage() {
  const { theme, setTheme } = useThemePreset();
  const { sites, update } = useClients();

  const [owned, setOwned] = useState<ThemeKey[]>(() => getOwnedThemes());
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutTheme, setCheckoutTheme] = useState<ThemeKey | null>(null);
  const [applySiteId, setApplySiteId] = useState<string>("");

  const ownedSet = useMemo(() => new Set(owned), [owned]);

  function handlePreview(key: ThemeKey) {
    setTheme(key); // live page preview
  }

  function applyToSite(key: ThemeKey) {
    if (!applySiteId) {
      setTheme(key);
      alert("Theme applied for preview. Select a site to persist it.");
      return;
    }
    const s = (sites ?? []).find(x => x.id === applySiteId);
    if (!s) { alert("Select a valid site first."); return; }
    update(s.id, { theme: { ...s.theme, theme: key } });
    setTheme(key);
  }

  function handleBuy(key: ThemeKey) {
    setCheckoutTheme(key);
    setCheckoutOpen(true);
  }

  function onPurchased(key: ThemeKey, siteId?: string) {
    setOwned((prev) => Array.from(new Set([...prev, key])));
    if (siteId) {
      const s = (sites ?? []).find(x => x.id === siteId);
      if (s) {
        update(s.id, { theme: { ...s.theme, theme: key } });
      }
    }
    setTheme(key);
  }

  const siteOptions = useMemo(
    () => (sites ?? []).map(s => ({ id: s.id, label: `${s.person.fullName} (${s.domain.slug})` })),
    [sites]
  );

  const free = THEMES.filter(t => t.tier === "free");
  const premium = THEMES.filter(t => t.tier === "premium");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/70">Theme Marketplace</div>
          <h1 className="text-2xl font-semibold">Explore, preview, and apply themes</h1>
        </div>
        <Link href="/admin"><Button variant="outline"><ChevronLeft className="size-4" /> Back to Admin</Button></Link>
      </div>

      {/* Toolbar */}
      <Card className="p-4 border-white/10 flex flex-wrap items-center gap-3">
        <div className="text-sm text-white/70">Apply to:</div>
        <select
          className="min-w-56 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm"
          value={applySiteId}
          onChange={(e) => setApplySiteId(e.target.value)}
        >
          <option className="bg-[#0a0f1f]" value="">Preview only (no save)</option>
          {siteOptions.map((s) => (
            <option key={s.id} value={s.id} className="bg-[#0a0f1f]">{s.label}</option>
          ))}
        </select>

        <div className="ml-auto text-xs text-white/60 inline-flex items-center gap-2">
          <Eye className="size-3" /> Live preview uses your global theme system.
        </div>
      </Card>

      {/* Free themes */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-emerald-300" />
          <h2 className="text-xl font-semibold">Free</h2>
          <span className="text-xs text-white/60">No purchase required</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {free.map((t) => (
            <ThemeCard
              key={t.key}
              theme={t}
              owned
              onPreview={handlePreview}
              onApply={(k) => applyToSite(k)}
              onBuy={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Premium themes */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-amber-300" />
          <h2 className="text-xl font-semibold">Premium</h2>
          <span className="text-xs text-white/60">One-time unlock per account</span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {premium.map((t) => (
            <ThemeCard
              key={t.key}
              theme={t}
              owned={ownedSet.has(t.key)}
              onPreview={handlePreview}
              onApply={(k) => {
                if (!ownedSet.has(k)) return handleBuy(k);
                applyToSite(k);
              }}
              onBuy={handleBuy}
            />
          ))}
        </div>
      </section>

      {/* Current theme indicator */}
      <Card className="p-4 border-white/10 flex items-center justify-between">
        <div className="text-sm text-white/80">
          Current preview theme: <b className="capitalize">{theme}</b>
        </div>
        <div className="text-xs text-white/60">
          {applySiteId
            ? <>Applying updates to: <b>{siteOptions.find(s => s.id === applySiteId)?.label}</b></>
            : <>Preview mode only. Pick a site to persist theme.</>}
        </div>
      </Card>

      <CheckoutModal
        open={checkoutOpen}
        themeKey={checkoutTheme}
        onClose={() => setCheckoutOpen(false)}
        onPurchased={onPurchased}
      />
    </div>
  );
}
