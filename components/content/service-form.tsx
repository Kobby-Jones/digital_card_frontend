"use client";
import { useState } from "react";
import type { Service } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AssetPicker from "@/components/media/asset-picker";
import { useClients } from "@/context/clients-context";

type Props = {
  value?: Service;
  onChange: (val: Service) => void;
  siteId?: string;
};

export default function ServiceForm({ value, onChange, siteId }: Props) {
  const [state, setState] = useState<Service>(value ?? {
    id: crypto.randomUUID(),
    name: "",
    summary: "",
    priceFrom: "",
    features: [],
    icon: "Wrench",
    isFeatured: false,
    order: 0,
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const { getById } = useClients();
  const site = siteId ? getById(siteId) : null;

  function commit(patch: Partial<Service> & { image?: string }) {
    const next = { ...state, ...patch } as Service & { image?: string };
    setState(next as Service);
    onChange(next as Service);
  }

  return (
    <div className="grid gap-3">
      <div>
        <Label>Name</Label>
        <Input value={state.name} onChange={e=>commit({ name: e.target.value })} placeholder="Website Design" />
      </div>
      <div>
        <Label>Summary</Label>
        <Textarea rows={3} value={state.summary || ""} onChange={e=>commit({ summary: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Starting Price</Label>
          <Input value={state.priceFrom || ""} onChange={e=>commit({ priceFrom: e.target.value })} placeholder="GHS 3,000" />
        </div>
        <div>
          <Label>Icon (lucide name)</Label>
          <Input value={state.icon || ""} onChange={e=>commit({ icon: e.target.value })} placeholder="Wrench" />
        </div>
      </div>
      <div>
        <Label>Features (comma separated)</Label>
        <Input
          value={(state.features ?? []).join(", ")}
          onChange={e=>commit({ features: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })}
          placeholder="Responsive, SEO, CMS"
        />
      </div>

      {/* Optional: illustrative image */}
      <div>
        <Label>Illustration (optional)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Image URL"
            value={(state as any).image || ""}
            onChange={(e)=>commit({ image: e.target.value } as any)}
          />
          {site && <Button variant="outline" type="button" onClick={()=>setPickerOpen(true)}>Pick from Library</Button>}
        </div>
        {(state as any).image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={(state as any).image} alt="" className="mt-2 h-28 w-full object-cover rounded-lg border border-white/10" />
        )}
      </div>

      {site && (
        <AssetPicker
          open={pickerOpen}
          onClose={()=>setPickerOpen(false)}
          assets={(site.mediaLibrary ?? []).map(a => ({ id: a.id, src: a.src, alt: a.alt, tags: a.tags, createdAt: a.createdAt }))}
          onSelect={(asset) => commit({ image: asset.src } as any)}
        />
      )}
      <div className="text-xs text-white/60">Toggle featured and reorder in the list.</div>
    </div>
  );
}
