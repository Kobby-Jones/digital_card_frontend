"use client";
import { Button } from "./ui/button";
import { Copy, Share2,MessageCircle } from "lucide-react";

import { useToast } from "./ui/toast";

export default function ShareBar({ url, title }: { url: string; title: string }) {
  const { push } = useToast();
  function copy() {
    navigator.clipboard.writeText(url);
    push({ title: "Link copied" });
  }
  function webShare() {
    if ((navigator as any).share) (navigator as any).share({ url, title }).catch(()=>{});
    else copy();
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={copy} variant="outline"><Copy className="size-4" /> Copy link</Button>
      <Button onClick={webShare} variant="ghost"><Share2 className="size-4" /> Share</Button>
      <a href={`https://wa.me/?text=${encodeURIComponent(title+" "+url)}`} target="_blank">
        <Button variant="ghost"><MessageCircle className="size-4" /> WhatsApp</Button>
      </a>
    </div>
  );
}
