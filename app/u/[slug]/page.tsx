"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download } from "lucide-react";

import { useClients } from "@/context/clients-context";
import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QrCode from "@/components/qr-code";
import { neonRing } from "@/lib/utils";
import { buildVCard } from "@/components/vcard";

export default function PublicSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug, sites } = useClients();
  const { user } = useAuth();

  if (sites === null) return <div className="text-white/70">Loading…</div>;

  const site = getBySlug(slug);
  if (!site) {
    return (
      <div className="text-white/70">
        Site not found. (Try reseeding demo data in Admin)
      </div>
    );
  }

  const url = `https://prepgo.me/${site.domain.slug}`;
  const canEdit =
    !!user && (user.role === "admin" || user.primarySiteId === site.id);

  function downloadVcf() {
    if (!site) return;

    const blob = buildVCard({
      name: site.person.fullName,
      title: site.person.title,
      email: site.person.email,
      phone: site.person.phone,
      org: site.business?.company,
      url,
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${site.domain.slug}.vcf`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // -------------------------------
  // NEW: Dynamic Layout Order System
  // -------------------------------
  const layoutOrder: string[] =
    ((site as any)?.layout?.sections as string[]) ?? [
      "hero",
      "about",
      "services",
      "projects",
      "gallery",
      "testimonials",
      "faqs",
      "contact",
    ];

  // Helper: Check if section has content
  const has = {
    gallery: !!site.mediaLibrary?.length,
    services: !!site.services?.length,
    projects: !!site.projects?.length,
    testimonials: !!site.testimonials?.length,
    faqs: !!site.faqs?.length,
  };

  return (
    <div className="space-y-10">
      {layoutOrder.map((key) => {
        switch (key) {
          // ---------------- HERO ----------------
          case "hero":
            return (
              <motion.section
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl glass p-6 border ${neonRing()}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      site.person.avatarUrl ||
                      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={site.person.fullName}
                    className="size-24 rounded-2xl object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold">
                        {site.person.fullName}
                      </h1>
                      {site.person.title && (
                        <span className="px-2 py-0.5 rounded-md text-xs bg-white/10 border border-white/10">
                          {site.person.title}
                        </span>
                      )}
                      {site.business?.company && (
                        <span className="px-2 py-0.5 rounded-md text-xs bg-white/10 border border-white/10">
                          {site.business.company}
                        </span>
                      )}
                      {site.person.location && (
                        <span className="px-2 py-0.5 rounded-md text-xs bg-white/10 border border-white/10">
                          {site.person.location}
                        </span>
                      )}
                    </div>
                    {site.person.shortBio && (
                      <div className="text-white/80 mt-2">
                        {site.person.shortBio}
                      </div>
                    )}
                  </div>
                  <div className="grid place-items-center">
                    <QrCode value={url} />
                    <div className="text-xs text-white/60 mt-2 break-all">
                      {url}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" onClick={downloadVcf}>
                        <Download className="size-4" /> vCard
                      </Button>
                      {canEdit && (
                        <Link href={`/admin/sites/${site.id}/settings`}>
                          <Button variant="outline">Edit</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            );

          // ---------------- ABOUT ----------------
          case "about":
            return site.person.longBio || site.business ? (
              <section key={key} className="grid md:grid-cols-3 gap-6">
                <Card className="p-5 border-white/10 md:col-span-1">
                  <div className="text-sm text-white/70 mb-2">About</div>
                  <div className="space-y-3 text-white/85 leading-relaxed">
                    {site.person.longBio && <p>{site.person.longBio}</p>}
                    {site.business?.addressLine && (
                      <div className="text-sm">
                        <div className="text-white/70">Address</div>
                        <div>{site.business.addressLine}</div>
                        <div>
                          {[
                            site.business.city,
                            site.business.region,
                            site.business.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      </div>
                    )}
                    {!!site.business?.openingHours?.length && (
                      <div className="text-sm">
                        <div className="text-white/70 mb-1">Opening Hours</div>
                        <ul className="space-y-1">
                          {site.business.openingHours.map((h, i) => (
                            <li
                              key={i}
                              className="flex justify-between text-white/80"
                            >
                              <span>{h.dayLabel}</span>
                              <span>
                                {h.closed ? "Closed" : `${h.open}–${h.close}`}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>

                <div className="md:col-span-2">
                  {has.gallery ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {site.mediaLibrary.slice(0, 6).map((m) => (
                        <div
                          key={m.id}
                          className="overflow-hidden rounded-xl border border-white/10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={m.src}
                            alt={m.alt || ""}
                            className="w-full h-48 object-cover hover:scale-[1.02] transition"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-6 border-white/10 text-white/70">
                      No gallery items yet.
                    </Card>
                  )}
                </div>
              </section>
            ) : null;

          // ---------------- SERVICES ----------------
          case "services":
            return has.services ? (
              <section key={key} className="space-y-4">
                <h2 className="text-xl font-semibold">Services</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {site.services.map((svc) => (
                    <Card key={svc.id} className="p-5 border-white/10">
                      <div className="font-semibold">{svc.name}</div>
                      {svc.summary && (
                        <div className="text-sm text-white/75 mt-1">
                          {svc.summary}
                        </div>
                      )}
                      {!!svc.features?.length && (
                        <ul className="mt-3 text-sm text-white/80 space-y-1 list-disc pl-5">
                          {svc.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      )}
                      {svc.priceFrom && (
                        <div className="mt-3 text-sm text-white/90">
                          From <b>{svc.priceFrom}</b>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </section>
            ) : null;

          // ---------------- PROJECTS ----------------
          case "projects":
            return has.projects ? (
              <section key={key} className="space-y-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {site.projects.map((p) => (
                    <Card
                      key={p.id}
                      className="overflow-hidden border-white/10"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.cover}
                        alt={p.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="font-semibold">{p.name}</div>
                        {p.description && (
                          <div className="text-sm text-white/75 mt-1">
                            {p.description}
                          </div>
                        )}
                        {!!p.tags?.length && (
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                            {p.tags.map((t, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null;

          // ---------------- TESTIMONIALS ----------------
          case "testimonials":
            return has.testimonials ? (
              <section key={key} className="space-y-4">
                <h2 className="text-xl font-semibold">Testimonials</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {site.testimonials.map((t) => (
                    <Card key={t.id} className="p-5 border-white/10">
                      <div className="text-white/90">“{t.quote}”</div>
                      <div className="text-sm text-white/70 mt-2">
                        — {t.author}
                        {t.role ? `, ${t.role}` : ""}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null;

          // ---------------- FAQS ----------------
          case "faqs":
            return has.faqs ? (
              <section key={key} className="space-y-4">
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
            ) : null;

          // ---------------- CONTACT ----------------
          case "contact":
            return (
              <section key={key} className="space-y-3">
                <h2 className="text-xl font-semibold">Contact</h2>
                <Card className="p-5 border-white/10 text-white/85">
                  <div>Email: {site.person.email}</div>
                  <div>Phone: {site.person.phone}</div>
                  {site.business?.company && (
                    <div>Company: {site.business.company}</div>
                  )}
                </Card>
              </section>
            );

          // ---------------- DEFAULT ----------------
          default:
            return null;
        }
      })}
    </div>
  );
}
