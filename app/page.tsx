"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, QrCode, Users2, Wand2 } from "lucide-react";

export default function Landing() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Badge className="mb-4">Neon • Glass • Framer Motion</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Digital Business Cards that <span className="text-cyan-300">wow</span>.
          </motion.h1>
          <p className="mt-4 text-white/80">
            Generate unique, futuristic portfolios for your clients. Share via QR on a physical card.
          </p>
          <div className="mt-6 flex gap-3">
          <Link href="/register"><Button>Get Started</Button></Link>
            <Link href="/admin"><Button variant="outline">Admin Dashboard</Button></Link>
          </div>
          <div className="mt-6 text-xs text-white/60">Example URL: <span className="text-white/80">https://digicard.me/john-smith</span></div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="relative glass rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-3 gap-3">
            {[QrCode, Users2, Wand2, Sparkles, QrCode, Wand2].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                className="aspect-square rounded-xl border border-white/10 grid place-items-center bg-white/5"
              >
                <Icon className="size-7 text-cyan-300" />
              </motion.div>
            ))}
          </div>
          <div className="absolute -inset-1 rounded-2xl pointer-events-none border border-cyan-300/10"></div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { title: "QR-ready Links", desc: "Each portfolio gets a unique URL and QR code.", icon: QrCode },
          { title: "Neon UI", desc: "Glassy cards, gradients, and micro-interactions.", icon: Sparkles },
          { title: "Admin & Client Flows", desc: "Admins create; clients edit later.", icon: Users2 }
        ].map((f, i) => (
          <Card key={i} className="p-6 border-white/10">
            <f.icon className="size-6 text-fuchsia-400" />
            <div className="mt-3 font-semibold">{f.title}</div>
            <div className="text-sm text-white/70 mt-1">{f.desc}</div>
          </Card>
        ))}
      </section>
    </div>
  );
}
