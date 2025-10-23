import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: HTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm text-white/80", className)} {...props} />;
}
