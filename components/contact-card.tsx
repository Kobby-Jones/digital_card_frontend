"use client";
import { Button } from "./ui/button";
import { Mail, Phone, Globe, MessageCircle } from "lucide-react";
import { useToast } from "./ui/toast";

export default function ContactCard({ channels }: { channels?: { type:"email"|"phone"|"whatsapp"|"website"; value:string }[] }) {
  const { push } = useToast();
  if (!channels?.length) return null;

  const icon = {
    email: Mail, phone: Phone, whatsapp: MessageCircle, website: Globe
  } as const;

  function onContact(type: string) {
    push({ title: `Opening ${type}…` });
  }

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-3">
      <div className="text-sm text-white/70">Contact</div>
      <div className="grid sm:grid-cols-2 gap-2">
        {channels.map((c, i) => {
          const Ico = icon[c.type];
          const href = c.type === "email" ? `mailto:${c.value}`
            : c.type === "phone" ? `tel:${c.value}`
            : c.type === "whatsapp" ? `https://wa.me/${c.value.replace(/\D/g,"")}`
            : c.value;
          return (
            <a key={i} href={href} target={c.type==="website" ? "_blank" : "_self"} rel="noreferrer">
              <Button variant="outline" className="w-full" onClick={()=>onContact(c.type)}>
                <Ico className="size-4" /> {c.value}
              </Button>
            </a>
          );
        })}
      </div>
    </div>
  );
}
