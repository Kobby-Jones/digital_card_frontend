"use client";
import Image from "next/image";
import { Card } from "./ui/card";
import Chip from "./chip";
import { motion } from "framer-motion";

export default function ProjectCard({ cover, name, description, tags, url }: {
  cover: string; name: string; description?: string; tags?: string[]; url?: string;
}) {
  return (
    <motion.a href={url || "#"} target={url ? "_blank" : "_self"} className="block" whileHover={{ scale: 1.01 }}>
      <Card className="overflow-hidden p-0 border-white/10">
        <div className="relative aspect-[16/9]">
          <Image src={cover} alt={name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <div className="font-semibold">{name}</div>
          {description && <div className="text-sm text-white/75 mt-1">{description}</div>}
          {tags?.length ? (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(t => <Chip key={t}>{t}</Chip>)}
            </div>
          ) : null}
        </div>
      </Card>
    </motion.a>
  );
}
