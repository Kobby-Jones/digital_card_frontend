"use client";
import { useClients } from "@/context/clients-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrCode as QrIcon, Pencil, Trash2, ExternalLink } from "lucide-react";
import QrCode from "@/components/qr-code";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast";

export default function AdminDashboard() {
  const { clients, remove } = useClients();
  const { push } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Clients</h2>
        <Link href="/admin/new"><Button>Create Client</Button></Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map(c => {
          const url = `https://prepgo.me/${c.slug}`;
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-5 space-y-4 border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold">{c.name}</div>
                    <div className="text-sm text-white/70">{c.title}</div>
                    <div className="text-xs text-white/50 mt-1">Updated {formatDate(c.updatedAt)}</div>
                  </div>
                  <QrIcon className="size-5 text-cyan-300" />
                </div>
                <div className="flex items-center gap-4">
                  <QrCode value={url} size={92} />
                  <div className="text-xs text-white/70 break-all">{url}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/clients/${c.id}`}>
                    <Button variant="outline"><Pencil className="size-4" /> Edit</Button>
                  </Link>
                  <a href={`/u/${c.slug}`} target="_blank" rel="noreferrer">
                    <Button variant="ghost"><ExternalLink className="size-4" /> View</Button>
                  </a>
                  <Button
                    variant="ghost"
                    onClick={() => { remove(c.id); push({ title: "Client removed" }); }}
                    className="text-red-300 hover:text-red-200">
                    <Trash2 className="size-4" /> Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
