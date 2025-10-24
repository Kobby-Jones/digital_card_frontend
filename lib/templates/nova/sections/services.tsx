"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Services({ site, tokens }: SectionProps) {
  if (!site.services?.length) return null;
  return (
    <section className={`${tokens.spacingY}`}>
      <h2 className={`text-2xl ${tokens.heading}`}>Services</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {site.services.map((svc) => (
          <Card key={svc.id} className={`p-5 ${tokens.card}`}>
            <div className="font-semibold">{svc.name}</div>
            {svc.summary && <div className="text-sm text-white/75 mt-1">{svc.summary}</div>}
            {!!svc.features?.length && (
              <ul className="mt-3 text-sm text-white/80 space-y-1 list-disc pl-5">
                {svc.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
            {svc.priceFrom && <div className="mt-3 text-sm text-white/90">From <b>{svc.priceFrom}</b></div>}
          </Card>
        ))}
      </div>
    </section>
  );
}
