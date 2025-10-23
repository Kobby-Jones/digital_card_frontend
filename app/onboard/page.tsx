"use client";
import { useAuth } from "@/context/auth-context";
import { useClients } from "@/context/clients-context";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import QrCode from "@/components/qr-code";
import { motion } from "framer-motion";

const themes = [
  { key: "neon", name: "Neon (default)" },
  { key: "aurora", name: "Aurora" },
  { key: "slate", name: "Slate" },
  { key: "royal", name: "Royal" }
] as const;

export default function Onboard() {
  const { user } = useAuth();
  const { add, slugAvailable } = useClients();
  const { push } = useToast();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // require login as client
    if (!user) location.href = "/(auth)/register";
  }, [user]);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    title: "",
    email: user?.email ?? "",
    phone: "",
    location: "",
    slug: "",
    bio: "Entrepreneur building awesome things.",
    avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
    theme: "neon" as "neon" | "aurora" | "slate" | "royal"
  });

  const url = useMemo(() => `https://prepgo.me/${form.slug || "your-slug"}`, [form.slug]);

  function next() { setStep(s => Math.min(4, s + 1)); }
  function prev() { setStep(s => Math.max(1, s - 1)); }

  function createSite() {
    const slug = form.slug.toLowerCase().trim();
    if (!slug || !slugAvailable(slug)) { push({ title: "Choose a unique slug" }); return; }
    const id = crypto.randomUUID();
    add({
      id,
      ownerId: user!.id,
      slug,
      name: form.name,
      title: form.title,
      email: form.email,
      phone: form.phone,
      location: form.location,
      bio: form.bio,
      avatarUrl: form.avatarUrl,
      socials: [],
      gallery: [],
      accent: "dual",
      theme: form.theme,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    push({ title: "Your site is live (mock)!" });
    location.href = `/u/${slug}`;
  }

  return (
    <div className="max-w-3xl mx-auto glass rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">Create your business website</h2>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 text-xs">
        {[1,2,3,4].map(n => (
          <div key={n} className={`px-2 py-1 rounded-md ${n<=step ? "bg-white/20" : "bg-white/5"} border border-white/10`}>Step {n}</div>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="grid md:grid-cols-2 gap-4">
          <div><Label>Name</Label><Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div><Label>Title</Label><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Business Owner" /></div>
          <div><Label>Email</Label><Input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></div>
          <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></div>
          <div className="md:col-span-2"><Label>Location</Label><Input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="grid gap-4">
          <div><Label>Custom URL Slug (unique)</Label><Input value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value.replace(/\s+/g,"-")}))} placeholder="kwaku-mensah" /></div>
          <div className="text-sm text-white/70">Your link: <span className="text-white/90">{url}</span></div>
          <div><Label>Avatar URL</Label><Input value={form.avatarUrl} onChange={e=>setForm(f=>({...f,avatarUrl:e.target.value}))} /></div>
          <div><Label>Bio</Label><Textarea value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} /></div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Label>Theme</Label>
            <div className="mt-2 grid sm:grid-cols-4 gap-3">
              {themes.map(t=>(
                <button key={t.key} onClick={()=>setForm(f=>({...f,theme:t.key}))}
                  className={`glass rounded-xl p-3 border ${form.theme===t.key ? "border-cyan-300" : "border-white/10"}`}>
                  <div className="text-sm">{t.name}</div>
                  <div className="mt-2 h-10 rounded-md
                    bg-gradient-to-r from-cyan-400/40 via-white/10 to-fuchsia-400/40" />
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <Label>Preview QR</Label>
            <div className="mt-2 flex items-center gap-4">
              <QrCode value={url} size={140} />
              <div className="text-xs text-white/70 break-all">{url}</div>
            </div>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="space-y-3">
          <div className="text-white/80">Final review</div>
          <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
            <li><b>Name</b>: {form.name} — <b>Title</b>: {form.title}</li>
            <li><b>Slug</b>: {form.slug} — <b>URL</b>: {url}</li>
            <li><b>Email</b>: {form.email} — <b>Phone</b>: {form.phone}</li>
            <li><b>Theme</b>: {form.theme}</li>
          </ul>
          <div className="text-xs text-white/60">Payment step will be integrated later. For now, creating your site is instant in demo mode.</div>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={step===1}>Back</Button>
        {step < 4 ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={createSite}>Create my website</Button>
        )}
      </div>
    </div>
  );
}
