"use client";
import HomeHero from "@/components/home/hero";
import HomeStats from "@/components/home/stats";
import HomeFeatures from "@/components/home/features";
import HomeTemplates from "@/components/home/templates";
import HomeHowItWorks from "@/components/home/how-it-works";
import HomePricing from "@/components/home/pricing";
import HomeTestimonials from "@/components/home/testimonials";
import HomeFaqs from "@/components/home/faqs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="space-y-16">
      <HomeHero />
      <HomeStats />
      <HomeFeatures />
      <HomeTemplates />
      <HomeHowItWorks />
      <HomePricing />
      <HomeTestimonials />
      <HomeFaqs />

      {/* Final CTA band */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 border border-white/10 text-center"
      >
        <h3 className="text-2xl font-semibold">Your business deserves a stunning website.</h3>
        <p className="text-white/80 mt-2">Create a neon-glass site with a QR code and share it everywhere.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/register"><Button>Create your site</Button></Link>
          <Link href="/login"><Button variant="outline">Sign in</Button></Link>
        </div>
      </motion.section>
    </div>
  );
}
