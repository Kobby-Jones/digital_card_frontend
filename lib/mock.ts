import { ClientProfile } from "./types";

export const MOCK_CLIENTS: ClientProfile[] = [
  {
    id: "c01",
    slug: "john-smith",
    name: "John Smith",
    title: "Product Designer",
    email: "john@smith.studio",
    phone: "+1 (555) 100-2000",
    location: "Toronto, CA",
    bio: "I craft joyful, accessible interfaces. Previously @Novi, @North. Open to freelance.",
    avatarUrl: "/avatars/john.png",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/example", icon: "linkedin" },
      { label: "Twitter/X", url: "https://x.com/example", icon: "twitter" },
      { label: "Website", url: "https://smith.studio", icon: "globe" }
    ],
    gallery: [
      { id: "g1", title: "Nexus UI Kit", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop" },
      { id: "g2", title: "Glass Dashboard", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" },
      { id: "g3", title: "Neon Mobile", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop" }
    ],
    accent: "dual",
    createdAt: "2025-09-01T10:00:00.000Z",
    updatedAt: "2025-10-10T09:00:00.000Z"
  },
  {
    id: "c02",
    slug: "amina-kwesi",
    name: "Amina Kwesi",
    title: "Growth Marketer",
    email: "amina@kwesi.co",
    phone: "+233 24 123 4567",
    location: "Accra, GH",
    bio: "Helping SaaS teams find repeatable growth with data, empathy, and experiments.",
    avatarUrl: "/avatars/amina.png",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com/in/example2", icon: "linkedin" },
      { label: "Instagram", url: "https://instagram.com/example2", icon: "instagram" }
    ],
    gallery: [
      { id: "a1", title: "Funnel Experiments", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" }
    ],
    accent: "cyan",
    createdAt: "2025-09-15T14:00:00.000Z",
    updatedAt: "2025-10-11T14:00:00.000Z"
  }
];
