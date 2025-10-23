import { type ClassValue } from "clsx";
import clsx from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function neonRing(color: "cyan" | "magenta" | "dual" = "dual") {
  if (color === "cyan") return "ring-1 ring-cyan-300/40 shadow-[0_0_24px_rgba(34,211,238,0.25)]";
  if (color === "magenta") return "ring-1 ring-fuchsia-400/40 shadow-[0_0_24px_rgba(232,121,249,0.25)]";
  return "ring-1 ring-cyan-300/40 md:ring-2 md:ring-fuchsia-400/40 shadow-glow";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
