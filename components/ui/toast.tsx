"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Toast = { id: string; title: string; desc?: string };
type ToastCtx = { push: (t: Omit<Toast, "id">) => void };

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const api = useMemo<ToastCtx>(() => ({
    push: (t) => {
      const id = Math.random().toString(36).slice(2);
      setItems(prev => [...prev, { ...t, id }]);
      setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 3500);
    }
  }), []);

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <AnimatePresence>
          {items.map(t => (
            <motion.div key={t.id} className="glass rounded-xl px-4 py-3 w-[320px] border-white/20"
              initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 30, opacity: 0 }}>
              <div className="text-sm font-semibold">{t.title}</div>
              {t.desc && <div className="text-xs text-white/70 mt-1">{t.desc}</div>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
