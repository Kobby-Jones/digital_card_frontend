// lib/types.ts
/* =========================
   Domain Model (v2)
   ========================= */

   export const SCHEMA_VERSION = 2 as const;

   /** Common ID and timestamp helpers */
   export type ID = string; // crypto.randomUUID()
   export type ISODate = string; // new Date().toISOString()
   
   /* ---------- Enums & Unions ---------- */
   export type Role = "admin" | "client";
   export type Visibility = "public" | "unlisted" | "private";
   export type PublishStatus = "draft" | "published" | "archived";
   export type PlanTier = "free" | "pro" | "business" | "agency";
   export type ThemeKey =
     | "neon"
     | "aurora"
     | "slate"
     | "royal"
     | "sunset"
     | "emerald"
     | "amber";
   export type ContactType = "email" | "phone" | "whatsapp" | "website" | "address";
   export type SocialPlatform =
     | "linkedin"
     | "twitter"
     | "instagram"
     | "facebook"
     | "tiktok"
     | "youtube"
     | "github"
     | "dribbble"
     | "behance"
     | "website";
   
   /* ---------- Core Entities ---------- */
   
   /** Person / Owner info displayed on site */
   export interface Person {
     fullName: string;
     title?: string;
     avatarUrl?: string;
     location?: string;       // City, Country (plain text)
     phone?: string;          // E.164 preferred
     email?: string;
     shortBio?: string;       // 1–2 sentence hook
     longBio?: string;        // longer “About” text
   }
   
   /** Social link for header/footer */
   export interface SocialLink {
     platform: SocialPlatform;
     label?: string;          // custom label if needed
     url: string;
   }
   
   /** Contact channels shown on Contact section */
   export interface ContactChannel {
     type: ContactType;
     value: string;           // email address, tel, URL, plain address
   }
   
   /** Business details (optional) */
   export interface BusinessDetails {
     company?: string;
     tagline?: string;
     registrationNo?: string;
     addressLine?: string;
     city?: string;
     region?: string;
     postalCode?: string;
     country?: string;
     mapUrl?: string;
     openingHours?: Array<{ dayLabel: string; open?: string; close?: string; closed?: boolean }>;
   }
   
   /** Media asset for galleries or projects */
   export interface MediaItem {
     createdAt: any;
     id: ID;
     kind: "image" | "video";
     src: string;             // URL
     alt?: string;
     width?: number;
     height?: number;
     poster?: string;         // for videos
     tags?: string[];
   }
   
   /** Services offered */
   export interface Service {
     id: ID;
     name: string;
     summary?: string;
     priceFrom?: string;      // e.g. "$500", "GHS 3,000"
     features?: string[];
     icon?: string;           // lucide icon name
     isFeatured?: boolean;
     order?: number;
   }
   
   /** Project/Case study */
   export interface Project {
     id: ID;
     name: string;
     cover: string;           // image URL
     description?: string;
     tags?: string[];
     url?: string;            // external link
     gallery?: MediaItem[];
     order?: number;
   }
   
   /** Testimonial */
   export interface Testimonial {
     id: ID;
     quote: string;
     author: string;
     role?: string;
     avatarUrl?: string;
     rating?: number;         // 1..5
     order?: number;
   }

   /** Partner or brand logo */
    export interface Partner {
    id: ID;
    name: string;
    logo: string;     // image URL
    url?: string;     // optional link to partner site
    order?: number;
  }
   
   /** FAQ */
   export interface FAQ {
     id: ID;
     q: string;
     a: string;
     order?: number;
   }
   
   /** SEO settings */
   export interface SEO {
     title?: string;
     description?: string;
     keywords?: string[];
     image?: string;          // social share image
     noindex?: boolean;
   }
   
   /** Theme + brand settings */
   export interface ThemeSettings {
     theme: ThemeKey;         // preset key
     accentStrategy?: "preset" | "custom";
     accent1?: string;        // when accentStrategy = "custom"
     accent2?: string;
     font?: "Inter" | "Poppins" | "System";
     layoutDensity?: "comfortable" | "compact";
   }
   
   /** Domain + publishing */
   export interface DomainSettings {
     slug: string;            // prepgo.me/<slug>
     customDomain?: string;   // e.g. example.com
   }
   
   export interface Publication {
     status: PublishStatus;
     visibility: Visibility;
     publishedAt?: ISODate;
   }
   
   /** Analytics snapshot (frontend placeholder) */
   export interface AnalyticsSummary {
     last30dVisits: number;
     last30dQRScans: number;
     topReferrers?: Array<{ source: string; count: number }>;
   }
   
   /** Billing & plan (placeholder until backend) */
   export interface Billing {
     plan: PlanTier;
     renewsAt?: ISODate;
     canceledAt?: ISODate;
   }
   
   /** Main Site record (previously ClientProfile) */
   export interface Site {
     _v: typeof SCHEMA_VERSION;    // schema version
     id: ID;
     ownerUserId: ID;              // user who owns this site
     domain: DomainSettings;
     person: Person;
     business?: BusinessDetails;
     partners?: Partner[];
   
     socials: SocialLink[];
     contacts: ContactChannel[];
   
     services: Service[];
     projects: Project[];
     testimonials: Testimonial[];
     
     faqs: FAQ[];
     mediaLibrary: MediaItem[];    // central asset bucket
   
     theme: ThemeSettings;
     seo?: SEO;
   
     publication: Publication;
     analytics?: AnalyticsSummary;
     billing?: Billing;
   
     createdAt: ISODate;
     updatedAt: ISODate;
   }
   
   /* ---------- User model (unchanged API) ---------- */
   export interface User {
     id: ID;
     role: Role;
     email: string;
     name?: string;
     /** convenience: the “primary” site they own (optional) */
     primarySiteId?: ID;
   }
   
   /* ---------- Lightweight list item for dashboards ---------- */
   export interface SiteListItem {
     id: ID;
     slug: string;
     name: string;
     title?: string;
     theme: ThemeKey;
     status: PublishStatus;
     updatedAt: ISODate;
   }
   
   /* ---------- Utility: map Site→SiteListItem ---------- */
   export function toSiteListItem(s: Site): SiteListItem {
     return {
       id: s.id,
       slug: s.domain.slug,
       name: s.person.fullName,
       title: s.person.title,
       theme: s.theme.theme,
       status: s.publication.status,
       updatedAt: s.updatedAt,
     };
   }
   