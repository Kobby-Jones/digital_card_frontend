"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id:"services", label:"Services" },
  { id:"projects", label:"Projects" },
  { id:"about", label:"About" },
  { id:"testimonials", label:"Testimonials" },
  { id:"contact", label:"Contact" },
  { id:"faqs", label:"FAQs" }
];

export default function Subnav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0,1]});
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-20 z-30 glass rounded-xl px-3 py-2 border border-white/10 flex gap-3 overflow-x-auto">
      {sections.map(s => (
        <Link key={s.id} href={`#${s.id}`} className={`text-xs whitespace-nowrap ${active===s.id ? "text-white" : "text-white/70"}`}>
          {s.label}
        </Link>
      ))}
    </div>
  );
}
