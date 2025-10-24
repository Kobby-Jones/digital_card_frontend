"use client";
import type { SectionProps } from "../../types";
import Link from "next/link";

export default function CTA({ site, tokens }: SectionProps) {
  const email = site.person.email || site.contacts?.find(c => c.type === "email")?.value;
  if (!email) return null;
  return (
    <section className={`${tokens.card} ${tokens.radius} p-8 text-center`}>
      <h3 className={`text-xl ${tokens.heading}`}>Ready to work together?</h3>
      <p className="text-white/75 mt-1">Get a quote or book a consultation today.</p>
      <Link
        href={`mailto:${email}`}
        className="inline-flex mt-4 px-4 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/15"
      >
        Contact {site.person.fullName.split(" ")[0]}
      </Link>
    </section>
  );
}
