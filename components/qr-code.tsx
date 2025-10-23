"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrCode({ value, size=180 }: { value: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    QRCode.toCanvas(ref.current, value, {
      width: size,
      margin: 1,
      color: { dark: "#00FFFF", light: "#00000000" }
    });
  }, [value, size]);
  return <canvas ref={ref} className="rounded-xl border border-white/10 shadow-[0_0_24px_rgba(0,255,255,0.25)]" />;
}
