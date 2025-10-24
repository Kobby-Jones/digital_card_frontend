"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  onFiles: (items: { src: string; name: string }[]) => void;
};

export default function MediaUploader({ onFiles }: Props) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr: { src: string; name: string }[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) continue;
      const src = await fileToDataUrl(f);
      arr.push({ src, name: f.name });
    }
    if (arr.length) onFiles(arr);
  }, [onFiles]);

  return (
    <Card
      className={`p-6 border-white/10 text-center ${drag ? "ring-1 ring-[color:var(--ring-soft)]" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex flex-col items-center gap-2">
        <UploadCloud className="size-8 text-[var(--accent-1)]" />
        <div className="text-sm text-white/80">Drag & drop images here, or</div>
        <Button variant="outline" onClick={() => inputRef.current?.click()}>Browse files</Button>
        <div className="text-xs text-white/60">PNG, JPG, GIF • Max ~10MB (demo)</div>
      </div>
    </Card>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result));
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}
