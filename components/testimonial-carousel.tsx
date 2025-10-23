"use client";
import { useMemo, useState } from "react";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialCarousel({ items }: { items: { id:string; quote:string; author:string; role?:string; avatar?:string }[] }) {
  const [i, setI] = useState(0);
  const total = items.length;
  const curr = useMemo(()=> items[i % total], [i, total, items]);

  if (!total) return null;

  return (
    <Card className="p-6 border-white/10">
      <AnimatePresence mode="wait">
        <motion.div key={curr.id}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          className="space-y-3">
          <div className="text-lg leading-relaxed">“{curr.quote}”</div>
          <div className="text-sm text-white/80">{curr.author}{curr.role ? ` — ${curr.role}` : ""}</div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 mt-4">
        {Array.from({ length: total }).map((_, idx)=>(
          <button key={idx} onClick={()=>setI(idx)}
            className={`h-1.5 w-6 rounded-full ${i===idx ? "bg-cyan-400" : "bg-white/20"}`} />
        ))}
      </div>
    </Card>
  );
}
