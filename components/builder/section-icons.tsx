"use client";
import { Blocks, User, Images, Briefcase, MessageSquareQuote, HelpCircle, Wrench, Phone } from "lucide-react";

export const SECTION_ICONS: Record<string, any> = {
  hero: User,
  about: Blocks,
  gallery: Images,
  services: Wrench,
  projects: Briefcase,
  testimonials: MessageSquareQuote,
  faqs: HelpCircle,
  contact: Phone,
};

export type SectionKey =
  | "hero"
  | "about"
  | "gallery"
  | "services"
  | "projects"
  | "testimonials"
  | "faqs"
  | "contact";
