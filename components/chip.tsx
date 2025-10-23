import { cn } from "@/lib/utils";
export default function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-[11px] px-2 py-0.5 rounded-md bg-white/10 border border-white/15", className)}>{children}</span>;
}
