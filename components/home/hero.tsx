"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

import { QrCode, Zap } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        {/* <Badge className="mb-4">Neon • Glass • QR • Framer Motion</Badge> */}
              {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl glass p-8 border">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Build a stunning business website in minutes.  
            <span className="block mt-2 accent-text accent-glow">Launch</span> without limits.
          </h1>

          <p className="mt-4 text-white/80 max-w-2xl">
          Pick a premium neon theme, add your details, and go live with a unique URL and QR code.
          Share online or print the QR on your business card.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/onboard">
              <Button>Get Started <ArrowRight className="size-4" /></Button>
            </Link>
            {/* Deep-link into Marketplace with a suggested theme */}
            <Link href="/marketplace?suggest=royal">
              <Button variant="outline">Explore Themes</Button>
            </Link>
          </div>
        </motion.div>

        {/* Subtle backdrop flourish */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(600px 300px at 10% -10%, color-mix(in oklab, var(--accent-1) 22%, transparent), transparent 60%), radial-gradient(800px 400px at 110% 110%, color-mix(in oklab, var(--accent-2) 18%, transparent), transparent 60%)",
          }}
        />
      </section>

      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative glass rounded-3xl p-6 border border-white/10"
      >
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="aspect-square rounded-2xl border border-white/10 grid place-items-center bg-white/5"
            >
              <QrCode className="size-8 text-[var(--accent-1)]" />
            </motion.div>
          ))}
        </div>
        <div className="absolute -inset-1 rounded-3xl pointer-events-none border border-[color:var(--ring-soft)]"></div>
      </motion.div>
    </section>
  );
}
