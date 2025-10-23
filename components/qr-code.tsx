"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

function getAccent() {
  if (typeof window === "undefined") return "#00FFFF";
  const s = getComputedStyle(document.documentElement);
  return s.getPropertyValue("--accent-1").trim() || "#00FFFF";
}

export default function QrCode({ value, size=180 }: { value: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    QRCode.toCanvas(ref.current, value, {
      width: size,
      margin: 1,
      color: { dark: getAccent(), light: "#00000000" }
    });
  }, [value, size]);
  return <canvas ref={ref} className="rounded-xl border border-white/10 shadow-[0_0_24px_color-mix(in_oklab,var(--accent-1)_25%,transparent)]" />;
}
