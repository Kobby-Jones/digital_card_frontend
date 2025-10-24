"use client";
import type { SectionProps } from "../../types";
import QrCode from "@/components/qr-code";
import { neonRing } from "@/lib/utils";

export default function Hero({ site, tokens }: SectionProps) {
  const url = `https://prepgo.me/${site.domain.slug}`;
  return (
    <section className={`${tokens.card} ${tokens.radius} p-8 md:p-10 ${neonRing()}`}>
      <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8">
        <div>
          <h1 className={`text-3xl md:text-5xl ${tokens.heading}`}>
            {site.person.fullName}
            {site.person.title && <span className="block mt-2 text-white/70">{site.person.title}</span>}
          </h1>
          {site.person.shortBio && <p className={`mt-4 ${tokens.body}`}>{site.person.shortBio}</p>}
        </div>
        <div className="flex items-center md:justify-end gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.person.avatarUrl || "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop"}
            alt={site.person.fullName}
            className="size-28 md:size-32 object-cover rounded-2xl border border-white/20"
          />
          <div className="grid place-items-center">
            <QrCode value={url} />
            <div className="text-xs text-white/60 mt-2 break-all">{url}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
