"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Crown, Lock, Paintbrush, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ThemeKey } from "@/lib/types";

type Tier = "free" | "premium";

export type ThemeMeta = {
  key: ThemeKey;
  name: string;
  tier: Tier;
  blurb: string;
  preview: string; // css gradient string
  features: string[];
};

type Props = {
  theme: ThemeMeta;
  owned: boolean;
  onPreview: (key: ThemeKey) => void;
  onApply: (key: ThemeKey) => void;
  onBuy: (key: ThemeKey) => void;
};

export default function ThemeCard({ theme, owned, onPreview, onApply, onBuy }: Props) {
  const isPremium = theme.tier === "premium";
  const lock = isPremium && !owned;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-4 border-white/10 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold">{theme.name}</div>
            <div className="text-xs text-white/60">
              {isPremium ? (
                <span className="inline-flex items-center gap-1 text-amber-300">
                  <Crown className="size-3" /> Premium
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <BadgeCheck className="size-3" /> Free
                </span>
              )}
              {owned && isPremium && <span className="ml-2 text-xs text-white/70">(owned)</span>}
            </div>
          </div>
          <Paintbrush className="size-5 text-[var(--accent-1)]" />
        </div>

        {/* Preview swatch */}
        <div
          className="h-28 rounded-xl border border-white/10"
          style={{ background: theme.preview }}
        />

        {/* Blurb */}
        <div className="text-sm text-white/80">{theme.blurb}</div>

        <ul className="text-xs text-white/70 grid sm:grid-cols-2 gap-1">
          {theme.features.map((f, i) => (
            <li key={i} className="flex items-center gap-1">
              <Sparkles className="size-3 text-[var(--accent-2)]" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => onPreview(theme.key)}>Preview</Button>
          {!lock ? (
            <Button onClick={() => onApply(theme.key)}>Apply</Button>
          ) : (
            <Button onClick={() => onBuy(theme.key)}>
              <Lock className="size-4" /> Buy & Apply
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
