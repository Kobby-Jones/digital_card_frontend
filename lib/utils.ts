import { type ClassValue } from "clsx";
import clsx from "clsx";

export function cn(...inputs: ClassValue[]) { return clsx(inputs); }

export function neonRing() {
  // Uses CSS variables from the active theme
  return "ring-1 [--r1:var(--ring-soft)] [--r2:var(--ring-soft-2)] shadow-[0_0_24px_var(--r1),0_0_24px_var(--r2)] ring-[color:var(--ring-soft)]";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
