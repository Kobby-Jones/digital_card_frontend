"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  src: string | null;
  onClose: () => void;
  onCropped: (dataUrl: string) => void;
};

type Aspect = "free" | "1:1" | "16:9";

export default function CropModal({ open, src, onClose, onCropped }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [aspect, setAspect] = useState<Aspect>("16:9");

  useEffect(() => {
    if (!open) {
      setScale(1); setPos({ x: 0, y: 0 }); setAspect("16:9");
    }
  }, [open]);

  const frame = useMemo(() => {
    if (aspect === "1:1") return { w: 420, h: 420 };
    if (aspect === "16:9") return { w: 560, h: 315 };
    return { w: 560, h: 420 }; // free: 4:3-ish
  }, [aspect]);

  function onPointerDown(e: React.PointerEvent) {
    setDragging(true);
    setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    (e.target as Element).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    setPos({ x: e.clientX - start.x, y: e.clientY - start.y });
  }
  function onPointerUp(e: React.PointerEvent) {
    setDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  }

  function doCrop() {
    if (!imgRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = frame.w;
    canvas.height = frame.h;
    const ctx = canvas.getContext("2d")!;
    // compute visible area: we draw the image at pos with scale into the frame
    const img = imgRef.current;
    const iw = img.naturalWidth * scale;
    const ih = img.naturalHeight * scale;

    // The image is centered at pos offset inside the frame box. We need to map frame coords back to source.
    // Translate so that image's top-left is at (pos.x, pos.y) relative to frame (0,0).
    // Draw image at that offset scaled to iw/ih
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, frame.w, frame.h);

    // To maintain crispness, compute draw offset
    const dx = pos.x + (frame.w - iw) / 2;
    const dy = pos.y + (frame.h - ih) / 2;

    ctx.drawImage(img, dx, dy, iw, ih);
    const data = canvas.toDataURL("image/jpeg", 0.92);
    onCropped(data);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            className="relative w-[min(760px,96vw)]"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <Card className="p-5 border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Crop Image</div>
                <button className="p-1 rounded hover:bg-white/10" onClick={onClose}><X className="size-5" /></button>
              </div>

              {/* Frame */}
              <div className="grid gap-3">
                <div
                  ref={wrapRef}
                  className="mx-auto rounded-xl border border-white/15 bg-black/40 overflow-hidden relative"
                  style={{ width: frame.w, height: frame.h, touchAction: "none" }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={src}
                    alt=""
                    className="select-none pointer-events-none absolute will-change-transform"
                    style={{
                      left: "50%", top: "50%",
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
                      userSelect: "none",
                    }}
                    draggable={false}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/70">Aspect:</span>
                    <button onClick={()=>setAspect("free")} className={`px-3 py-1.5 rounded-lg border text-xs ${aspect==="free"?"bg-white/15 border-white/30":"bg-white/5 border-white/10 hover:bg-white/10"}`}>Free</button>
                    <button onClick={()=>setAspect("1:1")} className={`px-3 py-1.5 rounded-lg border text-xs ${aspect==="1:1"?"bg-white/15 border-white/30":"bg-white/5 border-white/10 hover:bg-white/10"}`}>1:1</button>
                    <button onClick={()=>setAspect("16:9")} className={`px-3 py-1.5 rounded-lg border text-xs ${aspect==="16:9"?"bg-white/15 border-white/30":"bg-white/5 border-white/10 hover:bg-white/10"}`}>16:9</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/70">Zoom</span>
                    <input type="range" min={0.5} max={3} step={0.01} value={scale} onChange={(e)=>setScale(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={doCrop}>Save Crop</Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
