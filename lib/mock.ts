import { ClientProfile } from "./types";

export const MOCK_CLIENTS: ClientProfile[] = [
  {
    id: "c01",
    ownerId: "demo-owner-1",
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
      { id: "g1", title: "Nexus UI Kit", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop", tags:["UI","Design System"], linkUrl:"#"},
      { id: "g2", title: "Glass Dashboard", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", tags:["Dashboard","SaaS"] },
      { id: "g3", title: "Neon Mobile", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop", tags:["Mobile","Neon"] }
    ],
    services: [
      { id:"s1", name:"Brand & Identity", summary:"Logos, palettes, and voice guidelines that scale.", priceFrom:"$1200", features:["Logo kit","Brand book","Social pack"], icon:"Palette" },
      { id:"s2", name:"Product Design", summary:"End-to-end UX for web & mobile.", priceFrom:"$2500", features:["User flows","Hi-fi UI","Prototyping"], icon:"Cpu" },
      { id:"s3", name:"Design Systems", summary:"Tokenized, component-driven systems.", priceFrom:"$3000", features:["Tokens","Docs site","Figma + code"], icon:"Boxes" }
    ],
    projects: [
      { id:"p1", name:"Nova CRM", cover:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", description:"Sales analytics & outreach", tags:["CRM","B2B"], url:"#"},
      { id:"p2", name:"GlowBank App", cover:"https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop", description:"Retail banking mobile", tags:["Fintech","Mobile"] }
    ],
    testimonials: [
      { id:"t1", quote:"John’s work improved our trial-to-paid by 37%.", author:"A. Patel", role:"Head of Growth, Nova" },
      { id:"t2", quote:"Pixel-perfect designs and pragmatic process.", author:"M. Laurent", role:"CTO, GlowBank" }
    ],
    faqs: [
      { q:"How soon can you start?", a:"Typically within 2 weeks; rush options available." },
      { q:"Do you offer retainers?", a:"Yes—10/20/40 hours per month with priority support." }
    ],
    business: {
      company: "Smith Studio Inc.",
      tagline: "Design that moves metrics.",
      addressLine: "123 King St W",
      city: "Toronto",
      country: "Canada",
      mapUrl: "https://maps.google.com/?q=123+King+St+W+Toronto",
      channels: [
        { type:"email", value:"john@smith.studio" },
        { type:"phone", value:"+1 (555) 100-2000" },
        { type:"website", value:"https://smith.studio" }
      ],
      openingHours: [
        { day:"Mon–Fri", open:"09:00", close:"18:00" },
        { day:"Sat", open:"10:00", close:"14:00" },
        { day:"Sun", open:"–", close:"–", closed:true }
      ]
    },
    accent: "dual",
    theme: "neon",
    createdAt: "2025-09-01T10:00:00.000Z",
    updatedAt: "2025-10-10T09:00:00.000Z"
  },
  {
    id: "c02",
    ownerId: "demo-owner-2",
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
      { id: "a1", title: "Funnel Experiments", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", tags:["Growth","A/B"] }
    ],
    services: [
      { id:"as1", name:"Go-to-Market Plan", summary:"ICP, messaging, and channel playbooks.", priceFrom:"$1800", features:["ICP","Messaging","Channels"], icon:"Target" },
      { id:"as2", name:"Experiment Ops", summary:"Design & run growth experiments.", priceFrom:"$1500", features:["Roadmap","Analytics"], icon:"FlaskConical" }
    ],
    projects: [
      { id:"ap1", name:"SaaS Growth Engine", cover:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", description:"Northstar, loops, and experiments", tags:["SaaS","Growth"] }
    ],
    testimonials: [
      { id:"at1", quote:"Consistent pipeline wins, great comms.", author:"N. Boateng", role:"CEO, AgroFlow" }
    ],
    faqs:[
      { q:"Do you work remote?", a:"Yes—globally with async-first collaboration." }
    ],
    business: {
      company: "Kwesi Growth",
      tagline: "Evidence over ego.",
      addressLine: "Airport City",
      city: "Accra",
      country: "Ghana",
      mapUrl: "https://maps.google.com/?q=Airport+City+Accra",
      channels: [
        { type:"email", value:"amina@kwesi.co" },
        { type:"phone", value:"+233 24 123 4567" },
        { type:"website", value:"https://kwesi.co" },
        { type:"whatsapp", value:"+233241234567" }
      ],
      openingHours: [
        { day:"Mon–Fri", open:"08:30", close:"17:30" }
      ]
    },
    accent: "cyan",
    theme: "neon",
    createdAt: "2025-09-15T14:00:00.000Z",
    updatedAt: "2025-10-11T14:00:00.000Z"
  }
];
