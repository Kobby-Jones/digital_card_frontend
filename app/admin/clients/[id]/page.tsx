"use client";
import { useParams, useRouter } from "next/navigation";
import { useClients } from "@/context/clients-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function EditClientAdmin() {
  const { id } = useParams<{ id: string }>();
  const { getById, update } = useClients();
  const item = getById(id);
  const router = useRouter();
  const { push } = useToast();

  const [form, setForm] = useState({
    name: "", slug: "", title: "", email: "", phone: "", location: "", bio: "", avatarUrl: "", accent: "dual" as "dual"|"cyan"|"magenta"
  });

  useEffect(() => {
    if (!item) return;
    setForm({
      name: item.name, slug: item.slug, title: item.title, email: item.email, phone: item.phone ?? "",
      location: item.location ?? "", bio: item.bio, avatarUrl: item.avatarUrl, accent: item.accent ?? "dual"
    });
  }, [item]);

  if (!item) return <div className="text-white/70">Client not found.</div>;

  function save() {
    if (!item) return;
    update(item.id, { ...form, slug: form.slug.toLowerCase() });
    push({ title: "Saved changes" });
    router.push("/admin");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Edit Client (Admin)</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div><Label>Name</Label><Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
        <div><Label>Slug</Label><Input value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value}))} /></div>
        <div><Label>Title</Label><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        <div><Label>Email</Label><Input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></div>
        <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></div>
        <div><Label>Location</Label><Input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
        <div className="md:col-span-2"><Label>Avatar URL</Label><Input value={form.avatarUrl} onChange={e=>setForm(f=>({...f,avatarUrl:e.target.value}))} /></div>
        <div className="md:col-span-2"><Label>Bio</Label><Textarea value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} /></div>
        <div className="md:col-span-2">
          <Label>Accent</Label>
          <div className="mt-2 flex gap-3 text-sm">
            {["dual","cyan","magenta"].map(a=>(
              <label key={a} className="flex items-center gap-2">
                <input type="radio" name="accent" value={a} checked={form.accent===a} onChange={()=>setForm(f=>({...f,accent:a as any}))}/>
                <span className="capitalize">{a}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={save}>Save</Button>
        <Button variant="outline" onClick={()=>history.back()}>Cancel</Button>
      </div>
    </div>
  );
}
