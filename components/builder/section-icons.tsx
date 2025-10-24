"use client";
import {
  Blocks, User, Images, Briefcase, MessageSquareQuote, HelpCircle, Wrench, Phone,
  DollarSign, Star, Layers, Building2, BarChart3, LineChart, MapPin, Newspaper,
  Award, Users, BookOpen, Download, ShieldCheck, Sparkles
} from "lucide-react";

export const SECTION_ICONS: Record<string, any> = {
  hero: User,
  logos: Building2,
  highlights: Sparkles,
  about: Blocks,
  stats: BarChart3,
  features: Layers,
  services: Wrench,
  pricing: DollarSign,
  projects: Briefcase,
  caseStudies: BookOpen,
  gallery: Images,
  team: Users,
  process: LineChart,
  timeline: LineChart,
  testimonials: MessageSquareQuote,
  faqs: HelpCircle,
  cta: Sparkles,
  contact: Phone,
  map: MapPin,
  newsletter: Newspaper,
  blog: Newspaper,
  awards: Award,
  partners: Building2,
  certifications: ShieldCheck,
  downloads: Download,
  footer: Blocks,
};

export type SectionKey =
  | "hero" | "logos" | "highlights" | "about" | "stats" | "features" | "services" | "pricing"
  | "projects" | "caseStudies" | "gallery" | "team" | "process" | "timeline" | "testimonials"
  | "faqs" | "cta" | "contact" | "map" | "newsletter" | "blog" | "awards" | "partners"
  | "certifications" | "downloads" | "footer";
