"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useClients } from "@/context/clients-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function NewClient() {
  const { add } = useClients();
  const router = useRouter();
  const { push } = useToast();

  const [form, setForm] = useState({
    name: "", title: "", email: "", phone: "", location: "", slug: "", bio: "", avatarUrl: "/avatars/john.png"
  });

  function onSubmit() {
    if (!form.name || !form.slug || !form.email) { push({ title: "Fill required fields" }); return; }
    const id = crypto.randomUUID();
    add({
      id,
      slug: form.slug.toLowerCase(),
      name: form.name,
      title: form.title,
      email: form.email,
      phone: form.phone,
      location: form.location,
      bio: form.bio || "New client biography.",
      avatarUrl: form.avatarUrl,
      socials: [],
      gallery: [],
      accent: "dual",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    push({ title: "Client created" });
    router.push("/admin");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Create Client</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div><Label>Name*</Label><Input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
        <div><Label>Slug* (URL)</Label><Input value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value.replace(/\s+/g,'-')}))} /></div>
        <div><Label>Title</Label><Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        <div><Label>Email*</Label><Input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></div>
        <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} /></div>
        <div><Label>Location</Label><Input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
        <div className="md:col-span-2"><Label>Avatar URL</Label><Input value={form.avatarUrl} onChange={e=>setForm(f=>({...f,avatarUrl:e.target.value}))} /></div>
        <div className="md:col-span-2"><Label>Bio</Label><Textarea value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} /></div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onSubmit}>Save</Button>
        <Button variant="outline" onClick={()=>history.back()}>Cancel</Button>
      </div>
    </div>
  );
}
