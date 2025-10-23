"use client";

import { useParams } from "next/navigation";
import { useClients } from "@/context/clients-context";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditPublicSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug, update } = useClients();

  const site = getBySlug(slug);
  if (!site) return <div className="text-white/70">Site not found.</div>;

  const [form, setForm] = useState({
    fullName: site.person.fullName,
    title: site.person.title || "",
    email: site.person.email || "",
    phone: site.person.phone || "",
    location: site.person.location || "",
    shortBio: site.person.shortBio || "",
    avatarUrl: site.person.avatarUrl || "",
    socials: site.socials.map(s => ({ platform: s.platform, url: s.url, label: s.label })),
  });

  function save() {
    if (site) {
      update(site.id, {
        person: {
          ...site.person,
          fullName: form.fullName,
          title: form.title,
          email: form.email,
          phone: form.phone,
          location: form.location,
          shortBio: form.shortBio,
          avatarUrl: form.avatarUrl,
        },
        socials: form.socials.map(s => ({ platform: s.platform, url: s.url, label: s.label })),
      });
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <Input value={form.fullName} onChange={e=>setForm(f=>({ ...f, fullName: e.target.value }))} placeholder="Full name" />
        <Input value={form.title} onChange={e=>setForm(f=>({ ...f, title: e.target.value }))} placeholder="Title" />
        <Input value={form.email} onChange={e=>setForm(f=>({ ...f, email: e.target.value }))} placeholder="Email" />
        <Input value={form.phone} onChange={e=>setForm(f=>({ ...f, phone: e.target.value }))} placeholder="Phone" />
        <Input value={form.location} onChange={e=>setForm(f=>({ ...f, location: e.target.value }))} placeholder="Location" />
        <Input value={form.avatarUrl} onChange={e=>setForm(f=>({ ...f, avatarUrl: e.target.value }))} placeholder="Avatar URL" />
        <div className="md:col-span-2">
          <Textarea rows={4} value={form.shortBio} onChange={e=>setForm(f=>({ ...f, shortBio: e.target.value }))} placeholder="Short bio" />
        </div>
      </div>

      {/* Simple socials editor (example) */}
      <div className="space-y-2">
        {form.socials.map((s, i) => (
          <div key={i} className="grid md:grid-cols-3 gap-2">
            <Input value={s.platform} readOnly />
            <Input value={s.url} onChange={e=>{
              const v = e.target.value;
              setForm(f => {
                const arr = [...f.socials]; arr[i] = { ...arr[i], url: v }; return { ...f, socials: arr };
              });
            }} />
            <Input placeholder="Label (optional)" value={s.label || ""} onChange={e=>{
              const v = e.target.value;
              setForm(f => {
                const arr = [...f.socials]; arr[i] = { ...arr[i], label: v }; return { ...f, socials: arr };
              });
            }} />
          </div>
        ))}
      </div>

      <Button onClick={save}>Save</Button>
    </div>
  );
}
