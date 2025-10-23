import { Card } from "@/components/ui/card";
import { QrCode, LayoutPanelTop, PencilLine, ShieldCheck, Share2, Smartphone } from "lucide-react";

const items = [
  { icon: LayoutPanelTop, title: "Beautiful templates", desc: "Neon-glass themes with subtle motion and perfect responsiveness." },
  { icon: QrCode, title: "Instant QR & URL", desc: "Every site gets a unique link and a ready-to-print QR code." },
  { icon: PencilLine, title: "Edit anytime", desc: "Update your bio, services, projects, and gallery in seconds." },
  { icon: Share2, title: "Easy sharing", desc: "Copy your link, share via WhatsApp, or place the QR on your card." },
  { icon: Smartphone, title: "Mobile-first", desc: "Looks stunning on phones, tablets, and desktops out of the box." },
  { icon: ShieldCheck, title: "Built to scale", desc: "Role-based guards and clean architecture—connect your backend when ready." }
];

export default function HomeFeatures() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Everything you need to go live</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((f, i) => (
          <Card key={i} className="p-5 border-white/10">
            <f.icon className="size-6 text-fuchsia-400" />
            <div className="mt-3 font-semibold">{f.title}</div>
            <div className="text-sm text-white/75 mt-1">{f.desc}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
