"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Testimonials({ site, tokens }: SectionProps) {
  if (!site.testimonials?.length) return null;
  return (
    <section className={`${tokens.spacingY}`}>
      <h2 className={`text-2xl ${tokens.heading}`}>What clients say</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {site.testimonials.map((t) => (
          <Card key={t.id} className={`p-5 ${tokens.card}`}>
            <div className="text-white/90">“{t.quote}”</div>
            <div className="text-sm text-white/70 mt-2">— {t.author}{t.role ? `, ${t.role}` : ""}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
