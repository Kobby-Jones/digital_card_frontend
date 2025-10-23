"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NeonLogo from "./neon-logo";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Dashboard" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faqs", label: "FAQs" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 py-3 glass rounded-b-2xl border-b border-white/10">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="shrink-0">
            <NeonLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => {
              const isActive =
                l.href === "/"
                  ? pathname === "/"
                  : pathname === l.href || (l.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-sm hover:text-white transition-colors",
                    isActive ? "text-white" : "text-white/70"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button>Create your site</Button>
            </Link>
          </nav>

          {/* Mobile: hamburger */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 glass border border-white/10"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-7xl px-4"
          >
            <div className="mt-2 glass rounded-2xl border border-white/10 overflow-hidden">
              <ul className="flex flex-col divide-y divide-white/10">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block px-4 py-3 text-sm hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="flex gap-2 p-3">
                  <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Sign in</Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setOpen(false)}>
                    <Button className="w-full">Create your site</Button>
                  </Link>
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
