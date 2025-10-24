"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Pricing({ site, tokens }: SectionProps) {
  // Use services with priceFrom as mock pricing tiers
  const tiers = (site.services ?? []).filter(s => s.priceFrom).slice(0, 3);
  if (!tiers.length) return null;

  return (
    <section className={`${tokens.spacingY}`}>
      <h2 className={`text-2xl ${tokens.heading}`}>Pricing</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t, i) => (
          <Card key={t.id} className={`p-6 ${tokens.card} ${i===1 ? "ring-1 ring-[var(--ring-soft)]" : ""}`}>
            <div className="text-lg font-semibold">{t.name}</div>
            <div className="text-2xl mt-2">{t.priceFrom}</div>
            {t.summary && <div className="text-sm text-white/75 mt-1">{t.summary}</div>}
            {!!t.features?.length && (
              <ul className="mt-3 text-sm text-white/80 space-y-1 list-disc pl-5">
                {t.features.slice(0, 5).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
