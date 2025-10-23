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

export default function PublicPortfolio() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug } = useClients();
  const c = getBySlug(slug);

  if (!c) return <div className="text-white/70">Portfolio not found.</div>;

  const url = `https://prepgo.me/${c.slug}`;

  return (
    <div className="space-y-10">
      {/* Header Card */}
      <motion.section
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl glass p-6 border ${neonRing(c.accent)}`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.avatarUrl} alt={c.name} className="size-24 rounded-2xl object-cover border border-white/20" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{c.name}</h1>
              <Badge>{c.location ?? "Remote"}</Badge>
            </div>
            <div className="text-white/80 mt-1">{c.title}</div>
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
          </div>
        </div>
      </motion.section>

      {/* About */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 glass rounded-2xl p-5 border border-white/10">
          <div className="text-sm text-white/70">Contact</div>
          <div className="mt-2 text-sm">
            <div>{c.email}</div>
            {c.phone && <div className="text-white/80">{c.phone}</div>}
          </div>
          <Link href={`/u/${c.slug}/edit`} className="block mt-4">
            <Button variant="outline">Edit Profile</Button>
          </Link>
        </div>
        <div className="md:col-span-2 glass rounded-2xl p-5 border border-white/10">
          <div className="text-sm text-white/70 mb-2">About</div>
          <p className="text-white/85 leading-relaxed">{c.bio}</p>
        </div>
      </motion.section>

      {/* Gallery */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Portfolio</h3>
          <div className="text-sm text-white/70">{c.gallery.length} items</div>
        </div>
        {c.gallery.length ? (
          <Gallery items={c.gallery} />
        ) : (
          <div className="glass rounded-xl p-6 text-white/70 border border-white/10">No items yet.</div>
        )}
      </motion.section>
    </div>
  );
}
