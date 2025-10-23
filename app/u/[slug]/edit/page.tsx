"use client";
import { useParams, useRouter } from "next/navigation";
import { useClients } from "@/context/clients-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function ClientSelfEdit() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug, update } = useClients();
  const item = getBySlug(slug);
  const router = useRouter();
  const { push } = useToast();

  const [form, setForm] = useState({
    name: "", title: "", email: "", phone: "", location: "", bio: "", avatarUrl: "", socials: "" // comma list
  });

  useEffect(() => {
    if (!item) return;
    setForm({
      name: item.name, title: item.title, email: item.email, phone: item.phone ?? "", location: item.location ?? "",
      bio: item.bio, avatarUrl: item.avatarUrl, socials: item.socials.map(s => `${s.label}:${s.url}`).join(", ")
    });
  }, [item]);

  if (!item) return <div className="text-white/70">Not found.</div>;

  function save() {
    const socials = form.socials.split(",").map(x => x.trim()).filter(Boolean).map(entry => {
      const [label, ...rest] = entry.split(":");
      const url = rest.join(":").trim();
      return { label, url, icon: label.toLowerCase() };
    });
    if (!item) return;
    update(item.id, { ...item, ...form, socials });
    push({ title: "Profile updated" });
    router.push(`/u/${item.slug}`);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Edit your profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div><Label>Name</Label><Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
        <div><Label>Title</Label><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        <div><Label>Email</Label><Input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></div>
        <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></div>
        <div><Label>Location</Label><Input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
        <div className="md:col-span-2"><Label>Avatar URL</Label><Input value={form.avatarUrl} onChange={e=>setForm(f=>({...f,avatarUrl:e.target.value}))} /></div>
        <div className="md:col-span-2"><Label>Bio</Label><Textarea value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} /></div>
        <div className="md:col-span-2">
          <Label>Socials (format: Label:https://url, Label:https://url)</Label>
          <Input value={form.socials} onChange={e=>setForm(f=>({...f,socials:e.target.value}))} placeholder="LinkedIn:https://..., Twitter:https://..." />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={save}>Save</Button>
        <Button variant="outline" onClick={()=>history.back()}>Cancel</Button>
      </div>
    </div>
  );
}
