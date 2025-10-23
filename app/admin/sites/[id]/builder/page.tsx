"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Reorder, motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Check, Eye, GripVertical, PlusCircle } from "lucide-react";

import { useClients } from "@/context/clients-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SitePreview from "@/components/builder/site-preview";
import { SECTION_ICONS, type SectionKey } from "@/components/builder/section-icons";

type SectionItem = { key: SectionKey; enabled: boolean };

const DEFAULT_SECTIONS: SectionKey[] = [
  "hero", "about", "services", "projects", "gallery", "testimonials", "faqs", "contact"
];

export default function BuilderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update } = useClients();

  const site = getById(id);
  const [saved, setSaved] = useState(false);

  // hydrate editor state from site.layout if present, else infer defaults
  const initialSections = useMemo<SectionItem[]>(() => {
    if (!site) return [];
    const savedOrder: SectionKey[] | undefined = (site as any)?.layout?.sections;
    const order = savedOrder ?? DEFAULT_SECTIONS;
    // Infer visibility: hide empty data sections by default
    const has = {
      gallery: !!site.mediaLibrary?.length,
      services: !!site.services?.length,
      projects: !!site.projects?.length,
      testimonials: !!site.testimonials?.length,
      faqs: !!site.faqs?.length,
    };
    return order.map((k) => ({
      key: k,
      enabled:
        k === "hero" || k === "about" || k === "contact" ? true :
        k in has ? (has as any)[k] : true
    }));
  }, [site?.id]); // eslint-disable-line

  const [items, setItems] = useState<SectionItem[]>(initialSections);

  useEffect(() => {
    setItems(initialSections);
  }, [initialSections]);

  if (!site) {
    return (
      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <Card className="p-6 border-white/10">Site not found.</Card>
      </div>
    );
  }

  function toggle(k: SectionKey) {
    setItems((arr) => arr.map((s) => (s.key === k ? { ...s, enabled: !s.enabled } : s)));
  }

  function addMissing(k: SectionKey) {
    setItems((arr) => (arr.some((x) => x.key === k) ? arr : [...arr, { key: k, enabled: true }]));
  }

  function save() {
    const layout = { sections: items.map((x) => x.key) };
    if (site) {
      update(site.id, { ...(site as any), layout } as any);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  // Build side palette (disabled vs enabled)
  const allKeys: SectionKey[] = DEFAULT_SECTIONS;
  const missing = allKeys.filter((k) => !items.some((x) => x.key === k));

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      {/* Left: Controls */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
            <ChevronLeft className="size-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/u/${site.domain.slug}`} target="_blank">
              <Button variant="outline"><Eye className="size-4" /> View</Button>
            </Link>
            <Button onClick={save}>{saved ? <><Check className="size-4" /> Saved</> : "Save layout"}</Button>
          </div>
        </div>

        {/* Reorder list */}
        <Card className="p-4 border-white/10">
          <div className="text-sm font-semibold mb-3">Sections & order</div>
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
            {items.map((item) => {
              const Icon = SECTION_ICONS[item.key] || GripVertical;
              return (
                <Reorder.Item
                  key={item.key}
                  value={item}
                  as="div"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  whileDrag={{ scale: 1.02 }}
                >
                  <GripVertical className="size-4 text-white/50" />
                  <Icon className="size-5 text-[var(--accent-1)]" />
                  <div className="flex-1 capitalize">{item.key}</div>
                  <label className="inline-flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggle(item.key)}
                      className="accent-[var(--accent-1)]"
                    />
                    <span>{item.enabled ? "Shown" : "Hidden"}</span>
                  </label>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </Card>

        {/* Add missing sections */}
        {missing.length > 0 && (
          <Card className="p-4 border-white/10">
            <div className="text-sm font-semibold mb-3">Add sections</div>
            <div className="grid grid-cols-2 gap-2">
              {missing.map((k) => {
                const Icon = SECTION_ICONS[k];
                return (
                  <button
                    key={k}
                    onClick={() => addMissing(k)}
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                  >
                    <PlusCircle className="size-4" />
                    <Icon className="size-5 text-[var(--accent-1)]" />
                    <span className="capitalize">{k}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        <Card className="p-4 border-white/10 text-xs text-white/70">
          Drag to reorder sections. Toggle visibility per section.  
          Click **Save layout** to apply on the live site.
        </Card>
      </div>

      {/* Right: Live preview */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="text-sm text-white/70">Live preview (auto-updates)</div>
        <SitePreview site={site} sections={items} />
      </motion.div>
    </div>
  );
}
