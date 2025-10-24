"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Projects({ site, tokens }: SectionProps) {
  if (!site.projects?.length) return null;
  return (
    <section className={`${tokens.spacingY}`}>
      <h2 className={`text-2xl ${tokens.heading}`}>Projects</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {site.projects.map((p) => (
          <Card key={p.id} className={`overflow-hidden ${tokens.card}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-semibold">{p.name}</div>
              {p.description && <div className="text-sm text-white/75 mt-1">{p.description}</div>}
              {!!p.tags?.length && (
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                  {p.tags.map((t, i) => <span key={i} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">{t}</span>)}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
