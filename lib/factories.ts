// lib/factories.ts
import { SCHEMA_VERSION, type Site, type ThemeKey, type ID } from "./types";

export function newId(): ID {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export function nowIso() {
  return new Date().toISOString();
}

/** Create a new blank site with sensible defaults */
export function createSite(opts: {
  ownerUserId: ID;
  slug: string;
  theme?: ThemeKey;
  fullName: string;
  email?: string;
}): Site {
  const created = nowIso();
  return {
    _v: SCHEMA_VERSION,
    id: newId(),
    ownerUserId: opts.ownerUserId,
    domain: { slug: opts.slug },
    person: {
      fullName: opts.fullName,
      email: opts.email,
      title: "",
      shortBio: "",
    },
    business: undefined,
    socials: [],
    contacts: [],
    services: [],
    projects: [],
    testimonials: [],
    faqs: [],
    mediaLibrary: [],
    theme: {
      theme: opts.theme ?? "neon",
      accentStrategy: "preset",
      font: "Inter",
      layoutDensity: "comfortable",
    },
    seo: undefined,
    publication: {
      status: "published",
      visibility: "public",
      publishedAt: created,
    },
    analytics: {
      last30dVisits: 0,
      last30dQRScans: 0,
      topReferrers: [],
    },
    billing: { plan: "free" },
    createdAt: created,
    updatedAt: created,
  };
}
