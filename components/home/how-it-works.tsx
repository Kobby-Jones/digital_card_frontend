import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus, FileSpreadsheet, QrCode, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create an account", desc: "Sign up with your email to get started." },
  { icon: FileSpreadsheet, title: "Add your details", desc: "Name, role, services, photos, and social links." },
  { icon: QrCode, title: "Choose your URL", desc: "Pick a custom slug—your QR code is generated instantly." },
  { icon: CheckCircle2, title: "Publish & share", desc: "Go live with one click and share your link or QR anywhere." }
];

export default function HomeHowItWorks() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">How it works</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <Card key={i} className="p-5 border-white/10">
            <s.icon className="size-6 text-cyan-300" />
            <div className="mt-3 font-semibold">{s.title}</div>
            <div className="text-sm text-white/75 mt-1">{s.desc}</div>
          </Card>
        ))}
      </div>
      <div className="pt-2">
        <Link href="/register"><Button>Create your site</Button></Link>
      </div>
    </section>
  );
}
