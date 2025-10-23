"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChevronLeft } from "lucide-react";

import { useClients } from "@/context/clients-context";
import { useThemePreset } from "@/context/theme-context";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QrCode from "@/components/qr-code";

import type { ThemeKey } from "@/lib/types";

const THEME_OPTIONS: ThemeKey[] = ["neon","aurora","slate","royal","sunset","emerald","amber"];

export default function SiteSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update, slugAvailable } = useClients();
  const { theme, setTheme } = useThemePreset();

  const site = getById(id);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [id]);

  const [form, setForm] = useState(() => {
    if (!site) return null as any;
    return {
      slug: site.domain.slug,
      customDomain: site.domain.customDomain || "",
      seoTitle: site.seo?.title || "",
      seoDesc: site.seo?.description || "",
      seoImage: site.seo?.image || "",
      status: site.publication.status,
      visibility: site.publication.visibility,
      theme: site.theme.theme as ThemeKey,
    };
  });

  useEffect(() => {
    if (site) {
      setForm({
        slug: site.domain.slug,
        customDomain: site.domain.customDomain || "",
        seoTitle: site.seo?.title || "",
        seoDesc: site.seo?.description || "",
        seoImage: site.seo?.image || "",
        status: site.publication.status,
        visibility: site.publication.visibility,
        theme: site.theme.theme as ThemeKey,
      });
    }
  }, [site?.id]); // eslint-disable-line

  const url = useMemo(() => `https://prepgo.me/${form?.slug || ""}`, [form?.slug]);

  if (!site || !form) {
    return (
      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <Card className="p-6 border-white/10">Site not found.</Card>
      </div>
    );
  }

  function save() {
    // Basic slug collision guard
    const nextSlug = form.slug.trim().toLowerCase();
    if (site && nextSlug !== site.domain.slug && !slugAvailable(nextSlug)) {
      alert("Slug already taken. Choose another.");
      return;
    }

    if (!site) return;
    update(site.id, {
      domain: { slug: nextSlug, customDomain: form.customDomain || undefined },
      seo: {
        title: form.seoTitle || undefined,
        description: form.seoDesc || undefined,
        image: form.seoImage || undefined,
      },
      publication: {
        ...site.publication,
        status: form.status,
        visibility: form.visibility,
      },
      theme: {
        ...site.theme,
        theme: form.theme,
      },
    });
    setTheme(form.theme); // preview live
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/u/${site.domain.slug}`)}>View</Button>
          <Button onClick={save}>{saved ? <><Check className="size-4" /> Saved</> : "Save changes"}</Button>
        </div>
      </div>

      {/* Domain */}
      <Card className="p-6 border-white/10 space-y-4">
        <div className="text-lg font-semibold">Domain</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Slug (prepgo.me/&lt;slug&gt;)</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.replace(/[^a-z0-9-]/g, "").toLowerCase() })} />
            <div className="text-xs text-white/60 mt-1 break-all">{url}</div>
          </div>
          <div>
            <Label>Custom domain</Label>
            <Input placeholder="example.com" value={form.customDomain} onChange={(e) => setForm({ ...form, customDomain: e.target.value })} />
            <div className="text-xs text-white/60 mt-1">Automated SSL & mapping (to be integrated).</div>
          </div>
        </div>
      </Card>

      {/* SEO */}
      <Card className="p-6 border-white/10 space-y-4">
        <div className="text-lg font-semibold">SEO</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
          </div>
          <div>
            <Label>Social image URL</Label>
            <Input value={form.seoImage} onChange={(e) => setForm({ ...form, seoImage: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <Textarea rows={3} value={form.seoDesc} onChange={(e) => setForm({ ...form, seoDesc: e.target.value })} />
          </div>
        </div>
      </Card>

      {/* Theme + Publication */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border-white/10 space-y-4">
          <div className="text-lg font-semibold">Theme</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {THEME_OPTIONS.map((t) => (
              <button
                key={t}
                onClick={() => setForm({ ...form, theme: t })}
                className={`glass rounded-xl p-3 border transition ${form.theme === t ? "border-[var(--accent-1)] ring-1 ring-[color:var(--ring-soft)]" : "border-white/10 hover:border-white/20"}`}
              >
                <div className="text-sm capitalize">{t}</div>
                <div
                  className="mt-2 h-10 rounded-md"
                  style={{
                    background:
                      t === "neon" ? "linear-gradient(135deg,#00ffff55,#ff00ff55)"
                      : t === "aurora" ? "linear-gradient(135deg,#7dd3fc55,#a78bfa55)"
                      : t === "slate" ? "linear-gradient(135deg,#94a3b855,#e2e8f055)"
                      : t === "royal" ? "linear-gradient(135deg,#60a5fa55,#f472b655)"
                      : t === "sunset" ? "linear-gradient(135deg,#fb718555,#fbbf2455)"
                      : t === "emerald" ? "linear-gradient(135deg,#34d39955,#06b6d455)"
                      : "linear-gradient(135deg,#f59e0b55,#ef444455)",
                  }}
                />
              </button>
            ))}
          </div>
          <div className="pt-2 text-xs text-white/60">Selecting a theme updates the entire preview instantly.</div>
        </Card>

        <Card className="p-6 border-white/10 space-y-4">
          <div className="text-lg font-semibold">Publication</div>
          <div className="grid gap-4">
            <div>
              <Label>Status</Label>
              <select
                className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              >
                <option className="bg-[#0a0f1f]" value="draft">Draft</option>
                <option className="bg-[#0a0f1f]" value="published">Published</option>
                <option className="bg-[#0a0f1f]" value="archived">Archived</option>
              </select>
            </div>
            <div>
              <Label>Visibility</Label>
              <select
                className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm"
                value={form.visibility}
                onChange={(e) => setForm({ ...form, visibility: e.target.value as any })}
              >
                <option className="bg-[#0a0f1f]" value="public">Public</option>
                <option className="bg-[#0a0f1f]" value="unlisted">Unlisted</option>
                <option className="bg-[#0a0f1f]" value="private">Private</option>
              </select>
            </div>
            <div>
              <Label>QR Preview</Label>
              <div className="mt-2 flex items-center gap-4">
                <QrCode value={url} size={120} />
                <div className="text-xs text-white/60 break-all">{url}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
