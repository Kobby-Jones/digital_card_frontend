"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Do I need design or coding skills?", a: "No. Pick a theme, enter your info, and publish—no code needed." },
  { q: "Can I use my own domain?", a: "Yes (with backend integration). For now, you get a prepgo.me/your-name URL." },
  { q: "Can I print the QR on my business card?", a: "Yes. Your QR is generated automatically and works instantly." },
  { q: "Can I update content later?", a: "Anytime. Edit your bio, services, projects, gallery, and links whenever you want." }
];

export default function HomeFaqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">FAQs</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Card key={i} className="border-white/10">
              <button
                className="w-full text-left p-4 flex items-center justify-between"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-white/80">
                  {f.a}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
