"use client";
import { useState } from "react";
import type { FAQ } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { value?: FAQ; onChange: (val: FAQ) => void; };

export default function FaqForm({ value, onChange }: Props) {
  const [state, setState] = useState<FAQ>(value ?? {
    id: crypto.randomUUID(),
    q: "",
    a: "",
    order: 0,
  });

  function commit(patch: Partial<FAQ>) {
    const next = { ...state, ...patch };
    setState(next);
    onChange(next);
  }

  return (
    <div className="grid gap-3">
      <div>
        <Label>Question</Label>
        <Input value={state.q} onChange={e=>commit({ q: e.target.value })} placeholder="Do you offer retainers?" />
      </div>
      <div>
        <Label>Answer</Label>
        <Textarea rows={3} value={state.a} onChange={e=>commit({ a: e.target.value })} placeholder="Yes, we have 10/20/40 hr plans." />
      </div>
    </div>
  );
}
