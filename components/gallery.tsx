"use client";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "./ui/modal";
import { motion } from "framer-motion";

export default function Gallery({ items }: { items: { id: string; image: string; title?: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const current = items.find(i => i.id === active);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(i => (
          <motion.button key={i.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
            onClick={() => setActive(i.id)}>
            <Image alt={i.title ?? "gallery"} src={i.image} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {i.title && <div className="absolute bottom-2 left-2 text-xs">{i.title}</div>}
          </motion.button>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {current && (
          <div className="relative">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.image} alt={current.title ?? ""} className="w-full h-full object-cover" />
            </div>
            {current.title && <div className="mt-3 text-sm text-white/80">{current.title}</div>}
          </div>
        )}
      </Modal>
    </>
  );
}
