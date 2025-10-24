"use client";
import type { SectionProps } from "../../types";

export default function Footer({ site, tokens }: SectionProps) {
  return (
    <footer className="text-center text-xs text-white/60 py-6">
      © {new Date().getFullYear()} {site.person.fullName}. All rights reserved.
    </footer>
  );
}
