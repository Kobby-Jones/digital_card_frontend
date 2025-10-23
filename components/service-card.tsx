import { Card } from "./ui/card";
import { createElement } from "react";
import * as Icons from "lucide-react";

export default function ServiceCard({ name, summary, priceFrom, features, icon }: {
  name: string; summary: string; priceFrom?: string; features?: string[]; icon?: string;
}) {
  const IconComp = (icon && (Icons as any)[icon]) || (Icons as any).Sparkles;
  return (
    <Card className="p-5 border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3">
        {createElement(IconComp, { className:"size-5 text-fuchsia-400" })}
        <div className="font-semibold">{name}</div>
      </div>
      <div className="text-sm text-white/80 mt-2 flex-1">{summary}</div>
      <div className="text-xs text-white/60 mt-2">{priceFrom ? `From ${priceFrom}` : "\u00A0"}</div>
      {features?.length ? (
        <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-white/80">
          {features.map((f,i)=><li key={i}>{f}</li>)}
        </ul>
      ) : null}
    </Card>
  );
}
