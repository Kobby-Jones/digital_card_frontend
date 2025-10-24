import type { Template } from "../types";
import tokens from "./tokens";
import hero from "./sections/hero";
import logos from "./sections/logos";
import highlights from "./sections/highlights";
import services from "./sections/services";
import projects from "./sections/projects";
import testimonials from "./sections/testimonials";
import pricing from "./sections/pricing";
import faqs from "./sections/faqs";
import cta from "./sections/cta";
import contact from "./sections/contact";
import footer from "./sections/footer";

const nova: Template = {
  key: "nova",
  name: "Nova (Clean Corporate)",
  preview: "linear-gradient(135deg,#60a5fa55,#06b6d455)",
  tokens,
  sections: {
    hero,
    logos,
    highlights,
    services,
    projects,
    testimonials,
    pricing,
    faqs,
    cta,
    contact,
    footer,
  },
};

export default nova;
