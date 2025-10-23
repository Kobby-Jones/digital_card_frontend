"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClients } from "@/context/clients-context";
import { createSite } from "@/lib/factories";

export default function AdminNewPage() {
  const { add, slugAvailable } = useClients();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState("");

  function onCreate() {
    const s = slug.toLowerCase();
    if (!s || !slugAvailable(s)) return alert("Pick a unique slug.");
    if (!fullName) return alert("Name required.");

    const site = createSite({
      ownerUserId: "admin-created",
      slug: s,
      theme: "neon",
      fullName,
      email,
    });

    add(site);
    router.push(`/admin/sites/${site.id}/settings`);
  }

  return (
    <Card className="p-6 border-white/10 space-y-4">
      <div className="text-lg font-semibold">Create new site</div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Full name</Label>
          <Input value={fullName} onChange={e=>setFullName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label>Slug (prepgo.me/&lt;slug&gt;)</Label>
          <Input value={slug} onChange={e=>setSlug(e.target.value.replace(/[^a-z0-9-]/g,"").toLowerCase())} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onCreate}>Create</Button>
      </div>
    </Card>
  );
}
