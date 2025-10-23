export type SocialLink = { label: string; url: string; icon: string };

export type PortfolioItem = {
  id: string;
  title: string;
  image: string;
  description?: string;
  tags?: string[];
};

export type ThemePreset = "neon" | "aurora" | "slate" | "royal";

export type ClientProfile = {
  id: string;
  ownerId?: string;          // NEW: who owns this site (client user id)
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
  accent?: "cyan" | "magenta" | "dual";
  theme?: ThemePreset;       // NEW: choose a theme
  createdAt: string;         // ISO
  updatedAt: string;         // ISO
};

export type User = {
  id: string;
  role: "admin" | "client";
  email: string;
  name?: string;
  clientId?: string;         // if client owns a single profile
};
