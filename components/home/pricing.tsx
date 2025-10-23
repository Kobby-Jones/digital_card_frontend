"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "demo",
    features: [
      "1 website",
      "QR + unique URL",
      "Neon theme",
      "About, Services, Projects, Contact"
    ],
    cta: { href: "/register", label: "Start free" }
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    features: [
      "Unlimited websites",
      "Advanced themes",
      "Testimonials & FAQs",
      "Downloadable vCard",
      "Priority support"
    ],
    highlighted: true,
    cta: { href: "/register", label: "Upgrade to Pro" }
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    features: [
      "Custom domain mapping",
      "Team access",
      "Export high-res QR",
      "Analytics (coming soon)",
      "White-label options"
    ],
    cta: { href: "/register", label: "Choose Business" }
  }
];

export default function HomePricing() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Simple pricing</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p, i) => (
          <Card key={i} className={`p-5 border-white/10 ${p.highlighted ? "ring-1 ring-cyan-300/30 shadow-glow" : ""}`}>
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="mt-2">
              <span className="text-3xl font-extrabold">{p.price}</span>
              <span className="text-white/60">{p.period}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2">
                  <Check className="size-4 text-cyan-300 mt-0.5" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Link href={p.cta.href}><Button className="w-full">{p.cta.label}</Button></Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
