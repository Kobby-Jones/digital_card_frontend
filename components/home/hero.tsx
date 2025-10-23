"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { QrCode, Zap } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <Badge className="mb-4">Neon • Glass • QR • Framer Motion</Badge>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="accent-text accent-glow">Launch</span> your modern business website in minutes.
        </motion.h1>
        <p className="mt-4 text-white/80">
          Pick a premium neon theme, add your details, and go live with a unique URL and QR code.
          Share online or print the QR on your business card.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/register"><Button><Zap className="size-4" /> Create your site</Button></Link>
          <Link href="/login"><Button variant="outline">Sign in</Button></Link>
        </div>

        <div className="mt-4 text-xs text-white/60">
          Example: <span className="text-white/80">https://prepgo.me/john-smith</span>
        </div>
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
