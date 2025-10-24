"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Faqs({ site, tokens }: SectionProps) {
  if (!site.faqs?.length) return null;
  return (
    <section className={`${tokens.spacingY}`}>
      <h2 className={`text-2xl ${tokens.heading}`}>FAQs</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {site.faqs.map((f) => (
          <Card key={f.id} className={`p-4 ${tokens.card}`}>
            <div className="font-semibold">{f.q}</div>
            <div className="text-sm text-white/80 mt-1">{f.a}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
