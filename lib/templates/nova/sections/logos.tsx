"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Logos({ site, tokens }: SectionProps) {
  const logos = site.partners?.slice(0, 6) ?? [];
  if (!logos.length) return null;

  return (
    <section className={`${tokens.card} ${tokens.radius} p-6`}>
      <div className={`${tokens.body} text-sm mb-3`}>Trusted by</div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 place-items-center opacity-90">
        {logos.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.id} src={p.logo} alt={p.name} className="h-7 object-contain opacity-80" />
        ))}
      </div>
    </section>
  );
}
