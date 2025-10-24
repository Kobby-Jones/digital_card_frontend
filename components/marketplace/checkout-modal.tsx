"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ThemeKey } from "@/lib/types";
import { useClients } from "@/context/clients-context";

type Props = {
  open: boolean;
  themeKey: ThemeKey | null;
  onClose: () => void;
  onPurchased: (themeKey: ThemeKey, applyToSiteId?: string) => void;
};

export function getOwnedThemes(): ThemeKey[] {
  try {
    const raw = localStorage.getItem("digi_owned_themes");
    return raw ? (JSON.parse(raw) as ThemeKey[]) : [];
  } catch {
    return [];
  }
}

export function setOwnedThemes(keys: ThemeKey[]) {
  localStorage.setItem("digi_owned_themes", JSON.stringify(keys));
}

export default function CheckoutModal({ open, themeKey, onClose, onPurchased }: Props) {
  const { sites } = useClients();
  const [loading, setLoading] = useState(false);
  const [siteId, setSiteId] = useState<string>("");

  useEffect(() => {
    if (!open) setSiteId("");
  }, [open]);

  const siteOptions = useMemo(() => (sites ?? []).map(s => ({ id: s.id, label: `${s.person.fullName} (${s.domain.slug})` })), [sites]);

  async function handleBuy() {
    if (!themeKey) return;
    setLoading(true);
    // simulate payment latency
    await new Promise(r => setTimeout(r, 900));
    const owned = getOwnedThemes();
    if (!owned.includes(themeKey)) {
      setOwnedThemes([...owned, themeKey]);
    }
    setLoading(false);
    onPurchased(themeKey, siteId || undefined);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-[min(680px,92vw)]"
          >
            <Card className="p-5 border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Checkout</div>
                <button onClick={onClose} className="p-1 rounded hover:bg-white/10" aria-label="Close">
                  <X className="size-5" />
                </button>
              </div>

              <div className="text-white/80">
                You’re purchasing a <b>Premium Theme</b>. Once completed, it’ll unlock for your account forever.
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-white/70">Payment</div>
                  <div className="rounded-xl border border-white/10 p-3 bg-white/5 text-sm">
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4" /> Visa •••• 4242
                    </div>
                    <div className="text-white/60">Mock payment — no charge.</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-white/70">Apply to site (optional)</div>
                  <select
                    className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm"
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                  >
                    <option className="bg-[#0a0f1f]" value="">Just unlock it</option>
                    {siteOptions.map((o) => (
                      <option key={o.id} value={o.id} className="bg-[#0a0f1f]">{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="inline-flex items-center gap-1">
                  <ShieldCheck className="size-3" /> Secure mock checkout
                </div>
                <div>Total: <b>$18</b> one-time</div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleBuy} disabled={loading}>
                  {loading ? "Processing…" : "Pay & Unlock"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
