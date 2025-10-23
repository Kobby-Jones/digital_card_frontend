export type SocialLink = { label: string; url: string; icon: string };
export type Role = "admin" | "client";

export type User = {
    id: string;              // stable user id
    role: Role;              // "admin" | "client"
    email: string;
    name?: string;
    clientId?: string;       // optional: the client profile this user owns
  };

export type PortfolioItem = {
  id: string;
  title: string;
  image: string;
  description?: string;
  tags?: string[];
  linkUrl?: string;
};

export type Service = {
  id: string;
  name: string;
  summary: string;
  priceFrom?: string;
  features?: string[];
  icon?: string; // lucide icon name (e.g., "Briefcase", "Wrench")
};

export type Project = {
  id: string;
  name: string;
  cover: string;
  description?: string;
  tags?: string[];
  url?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
};

export type OpeningHour = { day: string; open: string; close: string; closed?: boolean };

export type BusinessDetails = {
  company?: string;
  tagline?: string;
  addressLine?: string;
  city?: string;
  country?: string;
  mapUrl?: string;           // embeddable map link
  channels?: { type: "email"|"phone"|"whatsapp"|"website"; value: string }[];
  openingHours?: OpeningHour[];
};

export type ThemePreset = "neon" | "aurora" | "slate" | "royal";

export type ClientProfile = {
  id: string;
  ownerId?: string;
  slug: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLink[];
  gallery: PortfolioItem[];
  services?: Service[];
  projects?: Project[];
  testimonials?: Testimonial[];
  faqs?: { q: string; a: string }[];
  business?: BusinessDetails;
  accent?: "cyan" | "magenta" | "dual";
  theme?: ThemePreset;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};
