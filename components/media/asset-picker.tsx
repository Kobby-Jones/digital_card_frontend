"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import AssetGrid, { type Asset } from "./asset-grid";

type Props = {
  open: boolean;
  assets: Asset[];
  onClose: () => void;
  onSelect: (asset: Asset) => void;
};

export default function AssetPicker({ open, assets, onClose, onSelect }: Props) {
  const [local, setLocal] = useState<Asset[]>(assets);
  useEffect(() => setLocal(assets), [assets]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            className="relative w-[min(1000px,96vw)] max-h-[90vh] overflow-y-auto"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <Card className="p-5 border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Pick an asset</div>
                <button className="p-1 rounded hover:bg-white/10" onClick={onClose}><X className="size-5" /></button>
              </div>
              <AssetGrid
                assets={local}
                onUpdate={() => {}}
                onDelete={() => {}}
                onCrop={() => {}}
                selectable
                onSelect={(a) => { onSelect(a); onClose(); }}
              />
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
