import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-[10px] uppercase tracking-wide px-2 py-1 rounded-md bg-white/10 border border-white/15", className)} {...props} />;
}
