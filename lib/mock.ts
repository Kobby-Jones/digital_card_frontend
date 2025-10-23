// lib/mock.ts
import type { Site } from "./types";
import { SCHEMA_VERSION } from "./types";

export const MOCK_SITES: Site[] = [
  {
    _v: SCHEMA_VERSION,
    id: "site-001",
    ownerUserId: "demo-owner-1",
    domain: { slug: "john-smith" },
    person: {
      fullName: "John Smith",
      title: "Product Designer",
      avatarUrl: "/avatars/john.png",
      location: "Toronto, CA",
      email: "john@smith.studio",
      phone: "+1 (555) 100-2000",
      shortBio: "I craft joyful, accessible interfaces.",
      longBio:
        "Previously at Novi & North. I design systems that scale and experiences that convert. Open to freelance.",
    },
    business: {
      company: "Smith Studio Inc.",
      tagline: "Design that moves metrics.",
      addressLine: "123 King St W",
      city: "Toronto",
      country: "Canada",
      mapUrl: "https://maps.google.com/?q=123+King+St+W+Toronto",
      openingHours: [
        { dayLabel: "Mon–Fri", open: "09:00", close: "18:00" },
        { dayLabel: "Sat", open: "10:00", close: "14:00" },
        { dayLabel: "Sun", closed: true },
      ],
    },
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/example" },
      { platform: "twitter", url: "https://x.com/example" },
      { platform: "website", url: "https://smith.studio" },
    ],
    contacts: [
      { type: "email", value: "john@smith.studio" },
      { type: "phone", value: "+1 (555) 100-2000" },
    ],
    services: [
      {
        id: "svc1",
        name: "Brand & Identity",
        summary: "Logos, palettes, and voice guidelines that scale.",
        priceFrom: "$1200",
        features: ["Logo kit", "Brand book", "Social pack"],
        icon: "Palette",
        isFeatured: true,
        order: 1,
      },
      {
        id: "svc2",
        name: "Product Design",
        summary: "End-to-end UX for web & mobile.",
        priceFrom: "$2500",
        features: ["User flows", "Hi-fi UI", "Prototyping"],
        icon: "Cpu",
        order: 2,
      },
    ],
    projects: [
      {
        id: "pr1",
        name: "Nova CRM",
        cover:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        description: "Sales analytics & outreach",
        tags: ["CRM", "B2B"],
        url: "#",
        order: 1,
      },
      {
        id: "pr2",
        name: "GlowBank App",
        cover:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
        description: "Retail banking mobile",
        tags: ["Fintech", "Mobile"],
        order: 2,
      },
    ],
    testimonials: [
      {
        id: "t1",
        quote: "John’s work improved our trial-to-paid by 37%.",
        author: "A. Patel",
        role: "Head of Growth, Nova",
        rating: 5,
      },
    ],
    faqs: [
      { id: "f1", q: "How soon can you start?", a: "Within 2 weeks; rush available." },
      { id: "f2", q: "Do you offer retainers?", a: "Yes—10/20/40 hrs per month." },
    ],
    mediaLibrary: [],
    theme: { theme: "neon", accentStrategy: "preset", font: "Inter", layoutDensity: "comfortable" },
    seo: {
      title: "John Smith — Product Designer",
      description: "Design systems & delightful UX.",
      keywords: ["design", "ui", "product"],
    },
    publication: { status: "published", visibility: "public", publishedAt: "2025-09-01T10:00:00.000Z" },
    analytics: { last30dVisits: 421, last30dQRScans: 92, topReferrers: [{ source: "Twitter", count: 180 }] },
    billing: { plan: "free" },
    createdAt: "2025-09-01T10:00:00.000Z",
    updatedAt: "2025-10-10T09:00:00.000Z",
  },
  {
    _v: SCHEMA_VERSION,
    id: "site-002",
    ownerUserId: "demo-owner-2",
    domain: { slug: "amina-kwesi" },
    person: {
      fullName: "Amina Kwesi",
      title: "Growth Marketer",
      avatarUrl: "/avatars/amina.png",
      location: "Accra, GH",
      email: "amina@kwesi.co",
      phone: "+233 24 123 4567",
      shortBio: "Data-driven growth with empathy & experiments.",
    },
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/example2" },
      { platform: "instagram", url: "https://instagram.com/example2" },
    ],
    contacts: [
      { type: "email", value: "amina@kwesi.co" },
      { type: "whatsapp", value: "+233241234567" },
    ],
    services: [
      {
        id: "svcA",
        name: "Go-to-Market Plan",
        summary: "ICP, messaging, and channel playbooks.",
        priceFrom: "$1800",
        features: ["ICP", "Messaging", "Channels"],
        icon: "Target",
        isFeatured: true,
      },
    ],
    projects: [],
    testimonials: [{ id: "ta", quote: "Consistent pipeline wins.", author: "N. Boateng", role: "CEO, AgroFlow", rating: 5 }],
    faqs: [{ id: "fa", q: "Remote?", a: "Yes—globally, async-first." }],
    mediaLibrary: [],
    theme: { theme: "neon", accentStrategy: "preset", font: "Inter", layoutDensity: "comfortable" },
    publication: { status: "published", visibility: "public", publishedAt: "2025-09-15T14:00:00.000Z" },
    analytics: { last30dVisits: 188, last30dQRScans: 40 },
    billing: { plan: "free" },
    createdAt: "2025-09-15T14:00:00.000Z",
    updatedAt: "2025-10-11T14:00:00.000Z",
  },
];
