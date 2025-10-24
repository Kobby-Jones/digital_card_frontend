"use client";

import { useMemo, useState } from "react";
import { Pencil, Scissors, Trash2, Tag as TagIcon, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Asset = {
  id: string;
  src: string;
  alt?: string;
  tags?: string[];
  createdAt: string;
};

type Props = {
  assets: Asset[];
  onUpdate: (id: string, patch: Partial<Asset>) => void;
  onDelete: (id: string) => void;
  onCrop: (id: string) => void;
  selectable?: boolean;
  onSelect?: (asset: Asset) => void;
};

export default function AssetGrid({ assets, onUpdate, onDelete, onCrop, selectable, onSelect }: Props) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("");

  const tags = useMemo(() => {
    const set = new Set<string>();
    assets.forEach(a => (a.tags ?? []).forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [assets]);

  const list = useMemo(() => {
    const text = q.trim().toLowerCase();
    return assets.filter(a => {
      const hitText = !text || a.alt?.toLowerCase().includes(text) || (a.tags ?? []).some(t => t.toLowerCase().includes(text));
      const hitTag = !tag || (a.tags ?? []).includes(tag);
      return hitText && hitTag;
    });
  }, [assets, q, tag]);

  return (
    <div className="space-y-3">
      <Card className="p-3 border-white/10 flex flex-wrap items-center gap-2">
        <input
          className="bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm flex-1"
          placeholder="Search alt text or tags…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="min-w-44 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option className="bg-[#0a0f1f]" value="">All tags</option>
          {tags.map(t => <option key={t} value={t} className="bg-[#0a0f1f]">{t}</option>)}
        </select>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {list.map(a => (
          <Card key={a.id} className="p-3 border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.src} alt={a.alt || ""} className="w-full h-40 object-cover rounded-lg border border-white/10" />
            <div className="mt-3 space-y-2">
              <input
                className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-1.5 text-sm"
                placeholder="Alt text"
                value={a.alt || ""}
                onChange={(e) => onUpdate(a.id, { alt: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60"><TagIcon className="size-3 inline mr-1" />Tags:</span>
                <input
                  className="flex-1 bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs"
                  placeholder="comma separated"
                  value={(a.tags ?? []).join(", ")}
                  onChange={(e) => onUpdate(a.id, { tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => onCrop(a.id)}><Scissors className="size-4" /> Crop</Button>
                <Button variant="ghost" className="text-red-300 hover:text-red-200" onClick={() => onDelete(a.id)}>
                  <Trash2 className="size-4" /> Delete
                </Button>
                {selectable && onSelect && (
                  <Button onClick={() => onSelect(a)}><Check className="size-4" /> Use</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
