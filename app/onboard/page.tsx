"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useAuth } from "@/context/auth-context";
import { useClients } from "@/context/clients-context";
import { useThemePreset } from "@/context/theme-context";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import QrCode from "@/components/qr-code";
import { Card } from "@/components/ui/card";
import { Check, AlertTriangle, Loader2 } from "lucide-react";

// Available themes (keys must match ThemeKey)
const THEMES = [
  { key: "neon", name: "Neon" },
  { key: "aurora", name: "Aurora" },
  { key: "slate", name: "Slate" },
  { key: "royal", name: "Royal" },
  { key: "sunset", name: "Sunset" },
  { key: "emerald", name: "Emerald" },
  { key: "amber", name: "Amber" },
] as const;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Onboard() {
  const router = useRouter();
  const { user, linkClient } = useAuth();
  const { add, slugAvailable } = useClients();
  const { push } = useToast();
  const { theme, setTheme } = useThemePreset();

  const [step, setStep] = useState(1);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugOk, setSlugOk] = useState<boolean | null>(null);

  // Require login
  useEffect(() => {
    if (!user) router.replace("/register");
  }, [user, router]);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    title: "",
    email: user?.email ?? "",
    phone: "",
    location: "",
    slug: "",
    bio: "Entrepreneur building awesome things.",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
    theme: (theme as typeof THEMES[number]["key"]) || "neon",
  });

  // Suggest slug when name changes (but only if user hasn't manually edited slug)
  const [manualSlug, setManualSlug] = useState(false);
  useEffect(() => {
    if (!manualSlug && form.name) {
      const s = slugify(form.name);
      setForm((f) => ({ ...f, slug: s }));
    }
  }, [form.name, manualSlug]);

  const url = useMemo(
    () => `https://prepgo.me/${form.slug || "your-slug"}`,
    [form.slug]
  );

  function next() {
    setStep((s) => Math.min(4, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  // Validate required fields for each step
  const stepValid = useMemo(() => {
    if (step === 1) {
      return !!form.name && !!form.title && !!form.email;
    }
    if (step === 2) {
      return !!form.slug && slugOk === true && !!form.avatarUrl && !!form.bio;
    }
    if (step === 3) {
      return !!form.theme;
    }
    return true;
  }, [step, form, slugOk]);

  // Debounced slug check
  useEffect(() => {
    if (!form.slug) {
      setSlugOk(null);
      return;
    }
    let active = true;
    setCheckingSlug(true);
    const h = setTimeout(() => {
      const ok = slugAvailable(form.slug.toLowerCase());
      if (active) {
        setSlugOk(ok);
        setCheckingSlug(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(h);
    };
  }, [form.slug, slugAvailable]);

  function createSite() {
    const rawSlug = slugify(form.slug);
    if (!rawSlug) {
      push({ title: "Please choose a slug" });
      return;
    }
    if (!slugAvailable(rawSlug)) {
      push({ title: "Slug already taken. Try another." });
      return;
    }
    const id = crypto.randomUUID();
    add({
      id,
      ownerId: user!.id,
      slug: rawSlug,
      name: form.name.trim(),
      title: form.title.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      bio: form.bio.trim(),
      avatarUrl: form.avatarUrl.trim(),
      socials: [],
      gallery: [],
      services: [],
      projects: [],
      testimonials: [],
      faqs: [],
      business: {
        company: undefined,
        tagline: undefined,
        addressLine: form.location.trim() || undefined,
        city: undefined,
        country: undefined,
        mapUrl: undefined,
        channels: [
          ...(form.email ? [{ type: "email" as const, value: form.email.trim() }] : []),
          ...(form.phone ? [{ type: "phone" as const, value: form.phone.trim() }] : []),
        ],
      },
      accent: "dual",
      theme: form.theme as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // Optional: link this profile id to the user session (owner)
    linkClient?.(id);

    push({ title: "Your site is live (demo)!" });
    router.replace(`/u/${rawSlug}`);
  }

  return (
    <div className="max-w-3xl mx-auto glass rounded-2xl p-6 space-y-6 border border-white/10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Create your business website</h2>
        <div className="text-xs text-white/60">Step {step} of 4</div>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 text-xs">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`px-2 py-1 rounded-md ${
              n <= step ? "bg-white/20" : "bg-white/5"
            } border border-white/10`}
          >
            Step {n}
          </div>
        ))}
      </div>

      {/* STEP 1: Basic info */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Kwaku Mensah"
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Business Owner"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@business.com"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+233 24 123 4567"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              placeholder="Accra, Ghana"
            />
          </div>
          {!stepValid && (
            <div className="md:col-span-2 text-xs text-amber-300 flex items-center gap-2">
              <AlertTriangle className="size-4" /> Name, Title and Email are required.
            </div>
          )}
        </motion.div>
      )}

      {/* STEP 2: URL + avatar + bio */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <Label>Custom URL Slug (unique)</Label>
              <Input
                value={form.slug}
                onChange={(e) => {
                  setManualSlug(true);
                  const v = slugify(e.target.value);
                  setForm((f) => ({ ...f, slug: v }));
                }}
                placeholder="kwaku-mensah"
              />
            </div>
            <Card className="p-2 border-white/10 min-h-[42px] grid place-items-center">
              {checkingSlug ? (
                <div className="text-xs text-white/70 inline-flex items-center gap-2">
                  <Loader2 className="size-3 animate-spin" /> checking…
                </div>
              ) : slugOk === true ? (
                <div className="text-xs text-emerald-300 inline-flex items-center gap-1">
                  <Check className="size-3" /> available
                </div>
              ) : slugOk === false ? (
                <div className="text-xs text-rose-300 inline-flex items-center gap-1">
                  <AlertTriangle className="size-3" /> taken
                </div>
              ) : (
                <div className="text-xs text-white/60">—</div>
              )}
            </Card>
          </div>

          <div className="text-sm text-white/70">
            Your link: <span className="text-white/90 break-all">{url}</span>
          </div>

          <div>
            <Label>Avatar URL</Label>
            <Input
              value={form.avatarUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, avatarUrl: e.target.value }))
              }
            />
          </div>

          <div>
            <Label>Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={4}
            />
          </div>

          {!stepValid && (
            <div className="text-xs text-amber-300 inline-flex items-center gap-2">
              <AlertTriangle className="size-4" /> Slug must be unique. Avatar & Bio required.
            </div>
          )}
        </motion.div>
      )}

      {/* STEP 3: Theme (live site-wide preview) + QR */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          <div className="md:col-span-2">
            <Label>Choose a theme (click to preview)</Label>
            <div className="mt-3 grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {THEMES.map((t) => {
                const active = form.theme === t.key;
                return (
                  <button
                    type="button"
                    key={t.key}
                    onClick={() => {
                        setForm((f) => ({ ...f, theme: t.key }));
                        setTheme(t.key as any); // ⬅ live preview
                      }}
                    className={`glass rounded-xl p-3 border transition ${
                      active
                        ? "border-[var(--accent-1)] ring-1 ring-[color:var(--ring-soft)]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="text-sm">{t.name}</div>
                    <div
                      className="mt-2 h-10 rounded-md"
                      style={{
                        background:
                          t.key === "neon"
                            ? "linear-gradient(135deg,#00ffff55,#ff00ff55)"
                            : t.key === "aurora"
                            ? "linear-gradient(135deg,#7dd3fc55,#a78bfa55)"
                            : t.key === "slate"
                            ? "linear-gradient(135deg,#94a3b855,#e2e8f055)"
                            : t.key === "royal"
                            ? "linear-gradient(135deg,#60a5fa55,#f472b655)"
                            : t.key === "sunset"
                            ? "linear-gradient(135deg,#fb718555,#fbbf2455)"
                            : t.key === "emerald"
                            ? "linear-gradient(135deg,#34d39955,#06b6d455)"
                            : "linear-gradient(135deg,#f59e0b55,#ef444455)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <Label>Preview QR (updates with theme)</Label>
            <div className="mt-2 flex items-center gap-4">
              <QrCode value={url} size={140} />
              <div className="text-xs text-white/70 break-all">{url}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 4: Review */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="text-white/80">Final review</div>
          <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
            <li>
              <b>Name</b>: {form.name} — <b>Title</b>: {form.title}
            </li>
            <li>
              <b>Slug</b>: {form.slug} — <b>URL</b>: {url}
            </li>
            <li>
              <b>Email</b>: {form.email} — <b>Phone</b>: {form.phone || "—"}
            </li>
            <li>
              <b>Theme</b>: {form.theme}
            </li>
          </ul>
          <div className="text-xs text-white/60">
            Payment step will be integrated later. For now, creating your site is instant in demo
            mode.
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={prev} disabled={step === 1}>
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={next} disabled={!stepValid}>
            Next
          </Button>
        ) : (
          <Button onClick={createSite}>Create my website</Button>
        )}
      </div>
    </div>
  );
}
