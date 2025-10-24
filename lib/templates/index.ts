import type { Template, TemplateKey, SectionKey } from "./types";
import nova from "./nova/template";

const REGISTRY: Record<TemplateKey, Template> = {
  nova,
};

export function listTemplates(): Template[] {
  return Object.values(REGISTRY);
}

export function getTemplate(key?: TemplateKey | null): Template {
  if (!key) return REGISTRY["nova"];
  return REGISTRY[key] ?? REGISTRY["nova"];
}

/** Safe renderer: return a function that renders a section or null if not implemented. */
export function getSectionRenderer(tpl: Template, key: SectionKey) {
  return tpl.sections[key] ?? (() => null);
}
