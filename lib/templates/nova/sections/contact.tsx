"use client";
import type { SectionProps } from "../../types";
import { Card } from "@/components/ui/card";

export default function Contact({ site, tokens }: SectionProps) {
  return (
    <section className={`${tokens.spacingY}`}>
      <h2 className={`text-2xl ${tokens.heading}`}>Contact</h2>
      <Card className={`p-5 ${tokens.card}`}>
        {site.contacts?.length ? (
          <ul className="space-y-2 text-sm text-white/85">
            {site.contacts.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-xs">{c.type}</span>
                <span>{c.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-white/60">Add email/phone/WhatsApp in settings.</div>
        )}
      </Card>
    </section>
  );
}
