// lib/migrate.ts
import type { Site } from "./types";
import { SCHEMA_VERSION } from "./types";

/** Accepts any previous stored object and attempts to map it into v2 Site.
 *  Keeps best-effort compatibility with your earlier ClientProfile.
 */
export function migrateToV2(input: any): Site | null {
  try {
    // If already v2
    if (input && input._v === SCHEMA_VERSION) return input as Site;

    // v1 ClientProfile → v2 Site mapping
    if (input && typeof input === "object" && input.slug && input.name) {
      const created = input.createdAt ?? new Date().toISOString();
      const updated = input.updatedAt ?? created;

      const site: Site = {
        _v: SCHEMA_VERSION,
        id: input.id ?? crypto.randomUUID(),
        ownerUserId: input.ownerId ?? input.ownerUserId ?? "unknown-owner",
        domain: { slug: input.slug, customDomain: input.customDomain },
        person: {
          fullName: input.name,
          title: input.title,
          avatarUrl: input.avatarUrl,
          location: input.location,
          phone: input.phone,
          email: input.email,
          shortBio: input.bio,
        },
        business: input.business
          ? {
              company: input.business.company,
              tagline: input.business.tagline,
              addressLine: input.business.addressLine,
              city: input.business.city,
              country: input.business.country,
              mapUrl: input.business.mapUrl,
              openingHours: input.business.openingHours,
            }
          : undefined,
        socials: (input.socials || []).map((s: any) => ({
          platform: (s.icon || "website") as any,
          label: s.label,
          url: s.url,
        })),
        contacts: (input.business?.channels || []).map((c: any) => ({
          type: c.type,
          value: c.value,
        })),
        services: input.services || [],
        projects: (input.projects || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          cover: p.cover || p.image,
          description: p.description,
          tags: p.tags,
          url: p.url,
          order: p.order,
        })),
        testimonials: input.testimonials || [],
        faqs: input.faqs || [],
        mediaLibrary: (input.gallery || []).map((g: any) => ({
          id: g.id,
          kind: "image",
          src: g.image,
          alt: g.title,
          tags: g.tags,
        })),
        theme: {
          theme: input.theme || "neon",
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
        updatedAt: updated,
      };

      return site;
    }

    return null;
  } catch {
    return null;
  }
}
