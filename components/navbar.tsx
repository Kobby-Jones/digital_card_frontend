"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NeonLogo from "./neon-logo";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Dashboard" }
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 glass rounded-b-2xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <NeonLogo />
          <nav className="flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`text-sm hover:text-white ${pathname===l.href ? "text-white" : "text-white/70"}`}>
                {l.label}
              </Link>
            ))}
           <Link href="/login">
            <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
            <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
