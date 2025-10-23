"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CrudModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  disabled?: boolean;
};

export default function CrudModal({
  open, title, children, onClose, onSubmit, submitLabel = "Save", disabled
}: CrudModalProps) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-[min(640px,92vw)]"
          >
            <Card className="p-5 border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{title}</div>
                <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-white/10">
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-4">{children}</div>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                {onSubmit && (
                  <Button onClick={onSubmit} disabled={disabled}>{submitLabel}</Button>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
