import type { Site } from "@/lib/types";
import { ReactNode } from "react";

/** Extended section keys — you can keep growing this list. */
export type SectionKey =
  | "hero" | "heroCarousel"
  | "logos" | "highlights" | "about" | "stats" | "features" | "capabilities"
  | "services" | "pricing" | "projects" | "caseStudies" | "gallery"
  | "team" | "process" | "timeline"
  | "testimonials" | "faqs" | "cta" | "contact" | "map"
  | "newsletter" | "blog" | "news"
  | "awards" | "partners" | "certifications" | "downloads"
  | "footer";

/** Slug / id for template families. */
export type TemplateKey = "nova" | "zenith";

/** Design tokens per template. */
export type TemplateTokens = {
  container: string;
  radius: string;
  spacingY: string;
  heading: string;
  body: string;
  card: string;
  lightCard?: string;  // optional lighter surface for light templates
  accent?: string;     // accent color class
};

/** Props every section receives. */
export type SectionProps = { site: Site; tokens: TemplateTokens };

/** Optional chrome components (header/footer). */
export type TemplateChrome = {
  Header?: (p: SectionProps) => ReactNode;
  Footer?: (p: SectionProps) => ReactNode;
};

/** A template implements some sections & optional chrome. */
export type Template = {
  key: TemplateKey;
  name: string;
  preview: string;
  tokens: TemplateTokens;
  sections: Partial<Record<SectionKey, (p: SectionProps) => ReactNode>>;
  chrome?: TemplateChrome;
};
