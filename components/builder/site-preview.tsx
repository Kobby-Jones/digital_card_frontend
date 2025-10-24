"use client";

import { Card } from "@/components/ui/card";
import QrCode from "@/components/qr-code";
import { neonRing } from "@/lib/utils";
import type { Site } from "@/lib/types";
import Link from "next/link";

type Props = {
  site: Site;
  sections: { key: string; enabled: boolean }[];
};

export default function SitePreview({ site, sections }: Props) {
  const url = `https://prepgo.me/${site.domain.slug}`;

  return (
    <div className="relative space-y-8">
      {/* Theme ribbon */}
      <div className="pointer-events-none absolute right-0 -top-3 sm:-top-4">
        <div className="pointer-events-auto glass border rounded-xl px-3 py-2 flex items-center gap-3">
          <div className="text-xs">
            Theme: <b className="capitalize">{site.theme.theme}</b>
          </div>
          <div
            className="h-4 w-20 rounded"
            style={{ background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))" }}
          />
          <Link
            href={`/marketplace?suggest=${encodeURIComponent(site.theme.theme)}`}
            className="text-xs underline text-white/80"
          >
            Try Themes
          </Link>
        </div>
      </div>

      {sections.map((s) => {
        if (!s.enabled) return null;

        switch (s.key) {
          case "hero":
            return (
              <section key={s.key} className={`rounded-3xl glass p-6 border ${neonRing()}`}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={site.person.avatarUrl || "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop"}
                    alt={site.person.fullName}
                    className="size-24 rounded-2xl object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">
                      {site.person.fullName} <span className="accent-text accent-glow">•</span>
                    </h1>
                    {site.person.title && <div className="text-white/70">{site.person.title}</div>}
                    {site.person.shortBio && <div className="text-white/80 mt-2">{site.person.shortBio}</div>}
                  </div>
                  <div className="grid place-items-center">
                    <QrCode value={url} />
                    <div className="text-xs text-white/60 mt-2 break-all">{url}</div>
                  </div>
                </div>
              </section>
            );
          case "about":
            if (!site.person.longBio && !site.business) return null;
            return (
              <section key={s.key} className="grid md:grid-cols-3 gap-6">
                <Card className="p-5 border-white/10 md:col-span-1">
                  <div className="text-sm text-white/70 mb-2">About</div>
                  <div className="space-y-3 text-white/85 leading-relaxed">
                    {site.person.longBio && <p>{site.person.longBio}</p>}
                    {site.business?.addressLine && (
                      <div className="text-sm">
                        <div className="text-white/70">Address</div>
                        <div>{site.business.addressLine}</div>
                        <div>{[site.business.city, site.business.region, site.business.country].filter(Boolean).join(", ")}</div>
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="p-5 border-white/10 md:col-span-2">
                  <div className="text-sm text-white/70 mb-2">Contact</div>
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
                    <div className="text-white/60">No contact channels yet.</div>
                  )}
                </Card>
              </section>
            );
          case "gallery":
            return (
              <section key={s.key} className="space-y-4">
                <h2 className="text-xl font-semibold">Gallery</h2>
                {site.mediaLibrary?.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {site.mediaLibrary.slice(0, 6).map((m) => (
                      <div key={m.id} className="overflow-hidden rounded-xl border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.src} alt={m.alt || ""} className="w-full h-40 object-cover hover:scale-[1.02] transition" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 border-white/10 text-white/70">No gallery items yet.</Card>
                )}
              </section>
            );
          case "services":
            if (!site.services?.length) return null;
            return (
              <section key={s.key} className="space-y-4">
                <h2 className="text-xl font-semibold">Services</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {site.services.map((svc) => (
                    <Card key={svc.id} className="p-5 border-white/10">
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
          case "projects":
            if (!site.projects?.length) return null;
            return (
              <section key={s.key} className="space-y-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {site.projects.map((p) => (
                    <Card key={p.id} className="overflow-hidden border-white/10">
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
          case "testimonials":
            if (!site.testimonials?.length) return null;
            return (
              <section key={s.key} className="space-y-4">
                <h2 className="text-xl font-semibold">Testimonials</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {site.testimonials.map((t) => (
                    <Card key={t.id} className="p-5 border-white/10">
                      <div className="text-white/90">“{t.quote}”</div>
                      <div className="text-sm text-white/70 mt-2">— {t.author}{t.role ? `, ${t.role}` : ""}</div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          case "faqs":
            if (!site.faqs?.length) return null;
            return (
              <section key={s.key} className="space-y-4">
                <h2 className="text-xl font-semibold">FAQs</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {site.faqs.map((f) => (
                    <Card key={f.id} className="p-4 border-white/10">
                      <div className="font-semibold">{f.q}</div>
                      <div className="text-sm text-white/80 mt-1">{f.a}</div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          case "contact":
            return (
              <section key={s.key} className="space-y-3">
                <h2 className="text-xl font-semibold">Contact</h2>
                <Card className="p-5 border-white/10">
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
          default:
            return null;
        }
      })}
    </div>
  );
}
