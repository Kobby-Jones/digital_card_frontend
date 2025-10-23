"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClients } from "@/context/clients-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Pencil } from "lucide-react";

export default function AdminClientLegacyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, remove } = useClients();

  const site = getById(id);

  if (!site) {
    return (
      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <Card className="p-6 border-white/10">Site not found.</Card>
      </div>
    );
  }

  const url = `https://prepgo.me/${site.domain.slug}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <div className="flex gap-2">
          <Link href={`/admin/sites/${site.id}/settings`}>
            <Button variant="outline"><Pencil className="size-4" /> Settings</Button>
          </Link>
          <a href={`/u/${site.domain.slug}`} target="_blank" rel="noreferrer">
            <Button variant="ghost"><ExternalLink className="size-4" /> View</Button>
          </a>
          <Button className="text-red-300" variant="ghost" onClick={() => { remove(site.id); router.push("/admin"); }}>
            Delete
          </Button>
        </div>
      </div>

      <Card className="p-6 border-white/10 space-y-2">
        <div className="text-lg font-semibold">{site.person.fullName}</div>
        <div className="text-sm text-white/70">{site.person.title}</div>
        <div className="text-sm text-white/70">{site.person.email} · {site.person.phone}</div>
        <div className="text-sm text-white/70">{site.person.location}</div>
        <div className="text-sm text-white/70 break-all">{url}</div>
      </Card>
    </div>
  );
}
