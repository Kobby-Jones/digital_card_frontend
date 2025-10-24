"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useClients } from "@/context/clients-context";
import { getTemplate, getSectionRenderer } from "@/lib/templates";
import type { SectionKey } from "@/lib/templates/types";

/** Fallback order if nothing set */
const FALLBACK_ORDER: SectionKey[] = [
  "hero", "logos", "highlights", "services", "projects", "testimonials", "pricing", "faqs", "cta", "contact", "footer"
];

export default function PublicSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const { getBySlug } = useClients();

  const site = getBySlug(slug);
  if (!site) return <div className="text-white/70">Site not found.</div>;

  // Template selection: prefer site.theme.templateKey, allow query ?template=key, default nova
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const previewTpl = (params?.get("template") as any) || (params?.get("tpl") as any);
  const tplKey = (previewTpl || (site.theme as any)?.templateKey || "nova") as any;
  const template = getTemplate(tplKey);

  const layoutOrder: SectionKey[] =
    ((site as any)?.layout?.sections as SectionKey[]) ?? FALLBACK_ORDER;

  return (
    <div className={`${template.tokens.container} my-10 space-y-10`}>
      {layoutOrder.map((key) => {
        const Section = getSectionRenderer(template, key);
        if (!Section) return null;
        return (
          <motion.section key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Section site={site} tokens={template.tokens} />
          </motion.section>
        );
      })}
    </div>
  );
}
