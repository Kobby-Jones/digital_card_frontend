"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
  glow?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "default", glow = true, ...props }, ref
) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";
  const styles = {
    default: "neon-gradient text-black hover:opacity-90",
    ghost: "bg-transparent hover:bg-white/10 border border-transparent",
    outline: "bg-transparent border border-[var(--border)] hover:border-white/30"
  }[variant];

  return (
    <button
      ref={ref}
      className={cn(base, styles, glow && "shadow-glow", className)}
      {...props}
    />
  );
});
