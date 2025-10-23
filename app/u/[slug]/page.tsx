"use client";
import { useParams } from "next/navigation";
import { useClients } from "@/context/clients-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QrCode from "@/components/qr-code";
import Gallery from "@/components/gallery";
import { SocialIcon } from "@/components/social-icons";
import { neonRing } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import SectionHeader from "@/components/section-header";
import ServiceCard from "@/components/service-card";
import ProjectCard from "@/components/project-card";
import TestimonialCarousel from "@/components/testimonial-carousel";
import ContactCard from "@/components/contact-card";
import Subnav from "@/components/subnav";
import ShareBar from "@/components/share-bar";
import { buildVCard } from "@/components/vcard";
import { Download } from "lucide-react";

export default function PublicBusinessSite() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug, clients } = useClients();
  const { user } = useAuth();

  if (clients === null) {
    return <div className="text-white/70">Loading site…</div>;
  }

  const c = getBySlug(slug);
  if (!c) {
    return <div className="text-white/70">This site was not found. Try seeding demo data again from the Admin dashboard.</div>;
  }

  const url = `https://prepgo.me/${c.slug}`;
  const canEdit = !!user && (user.role === "admin" || user.id === c.ownerId);

  function downloadVcf() {
    if (!c) return;
    const blob = buildVCard({
      name: c.name, title: c.title, email: c.email, phone: c.phone, org: c.business?.company, url
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${c.slug}.vcf`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="space-y-10">
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl glass p-6 border ${neonRing()}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.avatarUrl} alt={c.name} className="size-24 rounded-2xl object-cover border border-white/20" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{c.name}</h1>
              {c.location && <Badge>{c.location}</Badge>}
              {c.business?.company && <Badge>{c.business.company}</Badge>}
            </div>
            <div className="text-white/80 mt-1">{c.title}</div>
            {c.business?.tagline && <div className="text-sm text-white/70 mt-1">{c.business.tagline}</div>}
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/80">
              {c.socials.map(s => (
                <a key={s.label} href={s.url} className="inline-flex items-center gap-1 hover:text-white" target="_blank" rel="noreferrer">
                  <SocialIcon name={s.icon} /> {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="grid place-items-center">
            <QrCode value={url} />
            <div className="text-xs text-white/60 mt-2">{url}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" onClick={downloadVcf}><Download className="size-4" /> vCard</Button>
              {canEdit && <Link href={`/u/${c.slug}/edit`}><Button variant="outline">Edit</Button></Link>}
            </div>
          </div>
        </div>
      </motion.section>

      <Subnav />

      {/* Services */}
      <section className="space-y-4">
        <SectionHeader id="services" title="Services" subtitle="What I offer" />
        {c.services?.length ? (
          <div className="grid md:grid-cols-3 gap-4">
            {c.services.map(s => (
              <ServiceCard key={s.id} name={s.name} summary={s.summary} priceFrom={s.priceFrom} features={s.features} icon={s.icon} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-6 border border-white/10 text-white/70">Services will appear here.</div>
        )}
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <SectionHeader id="projects" title="Projects" subtitle="Selected work" />
        {c.projects?.length ? (
          <div className="grid md:grid-cols-3 gap-4">
            {c.projects.map(p => <ProjectCard key={p.id} cover={p.cover} name={p.name} description={p.description} tags={p.tags} url={p.url} />)}
          </div>
        ) : (
          <div className="glass rounded-xl p-6 border border-white/10 text-white/70">Projects coming soon.</div>
        )}
      </section>

      {/* About + Gallery */}
      <section className="space-y-4">
        <SectionHeader id="about" title="About" subtitle="Background & story" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 glass rounded-2xl p-5 border border-white/10">
            <div className="text-sm text-white/70 mb-2">Bio</div>
            <p className="text-white/85 leading-relaxed">{c.bio}</p>
            {c.business?.addressLine && (
              <div className="mt-4 text-sm text-white/80">
                <div className="text-white/70">Address</div>
                <div>{c.business.addressLine}</div>
                <div>{c.business.city}{c.business.country ? `, ${c.business.country}` : ""}</div>
              </div>
            )}
            {c.business?.openingHours?.length ? (
              <div className="mt-4 text-sm">
                <div className="text-white/70 mb-1">Opening Hours</div>
                <ul className="space-y-1">
                  {c.business.openingHours.map((h,i)=>(
                    <li key={i} className="flex justify-between text-white/80">
                      <span>{h.day}</span>
                      <span>{h.closed ? "Closed" : `${h.open}–${h.close}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="md:col-span-2">
            {c.gallery.length ? <Gallery items={c.gallery} /> : (
              <div className="glass rounded-xl p-6 border border-white/10 text-white/70">No gallery items yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {c.testimonials?.length ? (
        <section className="space-y-4">
          <SectionHeader id="testimonials" title="Testimonials" subtitle="What clients say" />
          <TestimonialCarousel items={c.testimonials} />
        </section>
      ) : null}

      {/* Contact + Map + Share */}
      <section className="space-y-4">
        <SectionHeader id="contact" title="Contact" subtitle="Reach out" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ContactCard channels={c.business?.channels} />
            <div className="mt-4">
              <ShareBar url={url} title={`${c.name} — ${c.title}`} />
            </div>
          </div>
          <div className="md:col-span-2 glass rounded-2xl p-4 border border-white/10">
            <div className="text-sm text-white/70 mb-2">Find us</div>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
              {c.business?.mapUrl ? (
                <iframe className="w-full h-full" src={c.business.mapUrl.replace("http://","https://")} loading="lazy" />
              ) : (
                <div className="w-full h-full grid place-items-center text-white/60">Map will appear here.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {c.faqs?.length ? (
        <section className="space-y-4">
          <SectionHeader id="faqs" title="FAQs" />
          <div className="grid md:grid-cols-2 gap-4">
            {c.faqs.map((f,i)=>(
              <div key={i} className="glass rounded-xl p-4 border border-white/10">
                <div className="font-semibold">{f.q}</div>
                <div className="text-sm text-white/80 mt-1">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
