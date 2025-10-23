import { Globe, Instagram, Linkedin, Twitter } from "lucide-react";

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const n = name.toLowerCase();
  const common = `inline size-4 ${className ?? ""}`;
  if (n.includes("linkedin")) return <Linkedin className={common} />;
  if (n.includes("twitter") || n.includes("x")) return <Twitter className={common} />;
  if (n.includes("instagram")) return <Instagram className={common} />;
  return <Globe className={common} />;
}
