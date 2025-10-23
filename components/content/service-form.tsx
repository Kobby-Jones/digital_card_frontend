"use client";
import { useState } from "react";
import type { Service } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value?: Service;
  onChange: (val: Service) => void;
};

export default function ServiceForm({ value, onChange }: Props) {
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

  function commit(patch: Partial<Service>) {
    const next = { ...state, ...patch };
    setState(next);
    onChange(next);
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
      <div className="text-xs text-white/60">Toggle featured and reorder on the list; no need here.</div>
    </div>
  );
}
