"use client";

import Link from "next/link";
import {
  ExternalLink,
  Pencil,
  QrCode as QrIcon,
  RefreshCw,
  Tag,
  Sparkles,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

import { useClients } from "@/context/clients-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QrCode from "@/components/qr-code";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { sites, list, remove, resetToMock } = useClients();

  if (sites === null) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Sites</h2>
          <Button disabled>Loading…</Button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6 border-white/10">
              <div className="h-6 w-40 bg-white/10 rounded" />
              <div className="mt-4 h-24 w-full bg-white/5 rounded-xl" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const ordered = list();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sites</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToMock}>
            <RefreshCw className="size-4" /> Reseed demo
          </Button>
          <Link href="/onboard">
            <Button>
              <Sparkles className="size-4" /> New Site
            </Button>
          </Link>
          <Link href="/marketplace"><Button variant="outline">Marketplace</Button></Link>
        {ordered.map((s) => (
          <Link key={s.id} href={`/admin/sites/${s.id}/media`}>
            <Button variant="outline">Media</Button>
          </Link>
        ))}

        </div>
      </div>

      {ordered.length === 0 ? (
        <Card className="p-6 border-white/10 text-white/80">
          No sites yet. Click <b>New Site</b> to create one, or{" "}
          <button className="underline" onClick={resetToMock}>
            Reseed demo
          </button>
          .
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ordered.map((s) => {
            const url = `https://prepgo.me/${s.domain.slug}`;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-5 space-y-4 border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-semibold">
                        {s.person.fullName}
                      </div>
                      <div className="text-sm text-white/70">
                        {s.person.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-white/60">
                        <Tag className="size-3" />
                        <span
                          className={cn(
                            "capitalize",
                            s.publication.status === "published"
                              ? "text-emerald-300"
                              : s.publication.status === "draft"
                              ? "text-amber-300"
                              : "text-white/60"
                          )}
                        >
                          {s.publication.status}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{s.theme.theme}</span>
                      </div>
                    </div>
                    <Palette className="size-5 text-[var(--accent-1)]" />
                  </div>

                  <div className="flex items-center gap-4">
                    <QrCode value={url} size={92} />
                    <div className="text-xs text-white/70 break-all">{url}</div>
                  </div>

                  {/* Updated actions block */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/sites/${s.id}/settings`}>
                      <Button variant="outline">
                        <Pencil className="size-4" /> Settings
                      </Button>
                    </Link>
                    <Link href={`/admin/sites/${s.id}/content`}>
                    <Button variant="outline">Content</Button>
                    </Link>

                    <Link href={`/admin/sites/${s.id}/builder`}>
                      <Button variant="outline">
                        <QrIcon className="size-4" /> Builder
                      </Button>
                    </Link>
                    <Link href={`/admin/sites/${s.id}/analytics`}>
                    <Button variant="outline">Analytics</Button>
                    </Link>

                    <a
                      href={`/u/${s.domain.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="ghost">
                        <ExternalLink className="size-4" /> View
                      </Button>
                    </a>

                    <Button
                      variant="ghost"
                      className="text-red-300 hover:text-red-200"
                      onClick={() => remove(s.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
