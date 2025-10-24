"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Eye, Scissors } from "lucide-react";

import { useClients } from "@/context/clients-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MediaUploader from "@/components/media/uploader";
import AssetGrid, { type Asset } from "@/components/media/asset-grid";
import CropModal from "@/components/media/crop-modal";

export default function SiteMediaPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, update } = useClients();

  const site = getById(id);
  const [cropOpen, setCropOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropId, setCropId] = useState<string | null>(null);

  useEffect(() => { setCropOpen(false); setCropSrc(null); setCropId(null); }, [id]);

  if (!site) {
    return (
      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70"><ChevronLeft className="size-4" /> Back</Link>
        <Card className="p-6 border-white/10">Site not found.</Card>
      </div>
    );
  }

  const assets: Asset[] = (site.mediaLibrary ?? []).map(m => ({
    id: m.id, src: m.src, alt: m.alt, tags: m.tags, createdAt: m.createdAt,
  }));

  function commitAssets(next: Asset[]) {
    if (!site) return;
    update(site.id, {
      mediaLibrary: next.map(a => ({ id: a.id, kind: "image", src: a.src, alt: a.alt, tags: a.tags, createdAt: a.createdAt })),
    });
  }

  function onFiles(items: { src: string; name: string }[]) {
    const now = new Date().toISOString();
    const add = items.map(it => ({
      id: crypto.randomUUID(),
      src: it.src,
      alt: it.name.replace(/\.[a-z0-9]+$/i, ""),
      tags: [],
      createdAt: now,
    }));
    commitAssets([...(assets ?? []), ...add]);
  }

  function onUpdate(id: string, patch: Partial<Asset>) {
    const next = assets.map(a => a.id === id ? { ...a, ...patch } : a);
    commitAssets(next);
  }

  function onDelete(id: string) {
    const next = assets.filter(a => a.id !== id);
    commitAssets(next);
  }

  function onCrop(id: string) {
    const a = assets.find(x => x.id === id);
    if (!a) return;
    setCropId(id);
    setCropSrc(a.src);
    setCropOpen(true);
  }

  function onCropped(dataUrl: string) {
    if (!cropId) return;
    onUpdate(cropId, { src: dataUrl });
  }

  const url = `https://prepgo.me/${site.domain.slug}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <a href={`/u/${site.domain.slug}`} target="_blank" rel="noreferrer">
          <Button variant="outline"><Eye className="size-4" /> View Site</Button>
        </a>
      </div>

      <MediaUploader onFiles={onFiles} />

      <div className="flex items-center gap-2 text-sm text-white/70">
        <Scissors className="size-4" /> Click <b className="mx-1">Crop</b> on any asset to reframe.
      </div>

      <AssetGrid
        assets={assets}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCrop={onCrop}
      />

      <CropModal
        open={cropOpen}
        src={cropSrc}
        onClose={() => setCropOpen(false)}
        onCropped={onCropped}
      />
    </div>
  );
}
