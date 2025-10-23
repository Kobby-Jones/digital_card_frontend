import { Sparkles } from "lucide-react";

export default function NeonLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Sparkles className="size-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
      </div>
      <span className="font-semibold tracking-wide">
        <span className="text-cyan-300">Prep</span><span className="text-fuchsia-400">Go</span><span className="text-white/80">.me</span>
      </span>
    </div>
  );
}
