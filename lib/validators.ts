// lib/validators.ts
import { z } from "zod";
import { SCHEMA_VERSION } from "./types";

/* Reusable primitives */
export const idSchema = z.string().min(8);
export const isoSchema = z.string().datetime().or(z.string()); // be lenient in demo
export const urlSchema = z.string().url();
export const optionalUrl = urlSchema.optional();

export const slugSchema = z
  .string()
  .min(3)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "only lowercase letters, numbers, and hyphens");

export const contactType = z.enum(["email","phone","whatsapp","website","address"]);
export const socialPlatform = z.enum([
  "linkedin","twitter","instagram","facebook","tiktok","youtube","github","dribbble","behance","website"
]);
export const themeKey = z.enum(["neon","aurora","slate","royal","sunset","emerald","amber"]);
export const publishStatus = z.enum(["draft","published","archived"]);
export const visibility = z.enum(["public","unlisted","private"]);
export const planTier = z.enum(["free","pro","business","agency"]);

/* Schemas */
export const personSchema = z.object({
  fullName: z.string().min(2),
  title: z.string().optional(),
  avatarUrl: optionalUrl,
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  shortBio: z.string().optional(),
  longBio: z.string().optional(),
});

export const socialLinkSchema = z.object({
  platform: socialPlatform,
  label: z.string().optional(),
  url: urlSchema,
});

export const contactChannelSchema = z.object({
  type: contactType,
  value: z.string().min(1),
});

export const businessDetailsSchema = z.object({
  company: z.string().optional(),
  tagline: z.string().optional(),
  registrationNo: z.string().optional(),
  addressLine: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  mapUrl: optionalUrl,
  openingHours: z.array(z.object({
    dayLabel: z.string(),
    open: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().optional(),
  })).optional(),
});

export const mediaItemSchema = z.object({
  id: idSchema,
  kind: z.enum(["image","video"]),
  src: urlSchema,
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  poster: optionalUrl,
  tags: z.array(z.string()).optional(),
});

export const serviceSchema = z.object({
  id: idSchema,
  name: z.string().min(2),
  summary: z.string().optional(),
  priceFrom: z.string().optional(),
  features: z.array(z.string()).optional(),
  icon: z.string().optional(),
  isFeatured: z.boolean().optional(),
  order: z.number().optional(),
});

export const projectSchema = z.object({
  id: idSchema,
  name: z.string().min(2),
  cover: urlSchema,
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  url: optionalUrl,
  gallery: z.array(mediaItemSchema).optional(),
  order: z.number().optional(),
});

export const testimonialSchema = z.object({
  id: idSchema,
  quote: z.string().min(2),
  author: z.string().min(2),
  role: z.string().optional(),
  avatarUrl: optionalUrl,
  rating: z.number().min(1).max(5).optional(),
  order: z.number().optional(),
});

export const faqSchema = z.object({
  id: idSchema,
  q: z.string().min(2),
  a: z.string().min(2),
  order: z.number().optional(),
});

export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  image: optionalUrl,
  noindex: z.boolean().optional(),
});

export const themeSettingsSchema = z.object({
  theme: themeKey,
  accentStrategy: z.enum(["preset","custom"]).optional(),
  accent1: z.string().optional(),
  accent2: z.string().optional(),
  font: z.enum(["Inter","Poppins","System"]).optional(),
  layoutDensity: z.enum(["comfortable","compact"]).optional(),
});

export const domainSettingsSchema = z.object({
  slug: slugSchema,
  customDomain: z.string().min(3).optional(),
});

export const publicationSchema = z.object({
  status: publishStatus,
  visibility: visibility,
  publishedAt: isoSchema.optional(),
});

export const analyticsSummarySchema = z.object({
  last30dVisits: z.number().nonnegative(),
  last30dQRScans: z.number().nonnegative(),
  topReferrers: z.array(z.object({ source: z.string(), count: z.number().nonnegative() })).optional(),
}).optional();

export const billingSchema = z.object({
  plan: planTier,
  renewsAt: isoSchema.optional(),
  canceledAt: isoSchema.optional(),
}).optional();

export const siteSchema = z.object({
  _v: z.literal(SCHEMA_VERSION),
  id: idSchema,
  ownerUserId: idSchema,
  domain: domainSettingsSchema,
  person: personSchema,
  business: businessDetailsSchema.optional(),
  socials: z.array(socialLinkSchema),
  contacts: z.array(contactChannelSchema),
  services: z.array(serviceSchema),
  projects: z.array(projectSchema),
  testimonials: z.array(testimonialSchema),
  faqs: z.array(faqSchema),
  mediaLibrary: z.array(mediaItemSchema),
  theme: themeSettingsSchema,
  seo: seoSchema.optional(),
  publication: publicationSchema,
  analytics: analyticsSummarySchema,
  billing: billingSchema,
  createdAt: isoSchema,
  updatedAt: isoSchema,
});

export type SiteInput = z.input<typeof siteSchema>;
export type SiteOutput = z.output<typeof siteSchema>;

/** Validate & coerce a Site; throws on error */
export function validateSite(input: unknown): SiteOutput {
  const parsed = siteSchema.parse(input);
  return parsed;
}
