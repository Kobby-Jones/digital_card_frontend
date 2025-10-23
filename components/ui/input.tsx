"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props }, ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl glass px-3 py-2 text-sm placeholder:text-white/50 focus:ring-2 focus:ring-cyan-300/40 outline-none",
        className
      )}
      {...props}
    />
  );
});
