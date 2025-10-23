"use client";
import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn("w-full min-h-[120px] rounded-xl glass px-3 py-2 text-sm placeholder:text-white/50 focus:ring-2 focus:ring-fuchsia-400/40 outline-none", className)}
        {...props}
      />
    );
  }
);
