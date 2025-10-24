"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Highlights({ site, tokens }: SectionProps) {
  const feats = site.services?.slice(0, 3) ?? [];
  if (!feats.length) return null;

  return (
    <section className="grid md:grid-cols-3 gap-4">
      {feats.map((s) => (
        <Card key={s.id} className={`p-5 ${tokens.card}`}>
          <div className="text-lg font-semibold">{s.name}</div>
          {s.summary && <div className="text-sm text-white/75 mt-1">{s.summary}</div>}
        </Card>
      ))}
    </section>
  );
}
