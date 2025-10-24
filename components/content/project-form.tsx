"use client";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AssetPicker from "@/components/media/asset-picker";
import { useClients } from "@/context/clients-context";

type Props = { value?: Project; onChange: (val: Project) => void; siteId?: string };

export default function ProjectForm({ value, onChange, siteId }: Props) {
  const [state, setState] = useState<Project>(value ?? {
    id: crypto.randomUUID(),
    name: "",
    cover: "",
    description: "",
    tags: [],
    url: "",
    order: 0,
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const { getById } = useClients();
  const site = siteId ? getById(siteId) : null;

  function commit(patch: Partial<Project>) {
    const next = { ...state, ...patch };
    setState(next);
    onChange(next);
  }

  return (
    <div className="grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Name</Label>
          <Input value={state.name} onChange={e=>commit({ name: e.target.value })} placeholder="GlowBank App" />
        </div>
        <div>
          <Label>Project URL</Label>
          <Input value={state.url || ""} onChange={e=>commit({ url: e.target.value })} placeholder="https://example.com" />
        </div>
      </div>

      <div>
        <Label>Cover Image</Label>
        <div className="flex gap-2">
          <Input value={state.cover} onChange={e=>commit({ cover: e.target.value })} placeholder="https://..." />
          {site && <Button type="button" variant="outline" onClick={()=>setPickerOpen(true)}>Pick from Library</Button>}
        </div>
        {state.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={state.cover} alt="" className="mt-2 h-28 w-full object-cover rounded-lg border border-white/10" />
        )}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea rows={3} value={state.description || ""} onChange={e=>commit({ description: e.target.value })} />
      </div>
      <div>
        <Label>Tags (comma separated)</Label>
        <Input
          value={(state.tags ?? []).join(", ")}
          onChange={e=>commit({ tags: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })}
          placeholder="Fintech, Mobile"
        />
      </div>

      {site && (
        <AssetPicker
          open={pickerOpen}
          onClose={()=>setPickerOpen(false)}
          assets={(site.mediaLibrary ?? []).map(a => ({ id: a.id, src: a.src, alt: a.alt, tags: a.tags, createdAt: a.createdAt }))}
          onSelect={(asset) => commit({ cover: asset.src })}
        />
      )}
    </div>
  );
}
