"use client";
import { useState } from "react";
import type { Testimonial } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { value?: Testimonial; onChange: (val: Testimonial) => void; };

export default function TestimonialForm({ value, onChange }: Props) {
  const [state, setState] = useState<Testimonial>(value ?? {
    id: crypto.randomUUID(),
    quote: "",
    author: "",
    role: "",
    avatarUrl: "",
    rating: 5,
    order: 0,
  });

  function commit(patch: Partial<Testimonial>) {
    const next = { ...state, ...patch };
    setState(next);
    onChange(next);
  }

  return (
    <div className="grid gap-3">
      <div>
        <Label>Quote</Label>
        <Textarea rows={3} value={state.quote} onChange={e=>commit({ quote: e.target.value })} placeholder="Amazing experience!" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Author</Label>
          <Input value={state.author} onChange={e=>commit({ author: e.target.value })} placeholder="Jane Doe" />
        </div>
        <div>
          <Label>Role (optional)</Label>
          <Input value={state.role || ""} onChange={e=>commit({ role: e.target.value })} placeholder="CEO, Nova" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Avatar URL</Label>
          <Input value={state.avatarUrl || ""} onChange={e=>commit({ avatarUrl: e.target.value })} placeholder="https://..." />
        </div>
        <div>
          <Label>Rating (1–5)</Label>
          <Input type="number" min={1} max={5} value={state.rating ?? 5} onChange={e=>commit({ rating: Number(e.target.value) })} />
        </div>
      </div>
    </div>
  );
}
