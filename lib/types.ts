export type SocialLink = { label: string; url: string; icon: string };

export type PortfolioItem = {
  id: string;
  title: string;
  image: string;
  description?: string;
  tags?: string[];
};

export type ClientProfile = {
  id: string;
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
  createdAt: string; // ISO
  updatedAt: string; // ISO
};
