"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { ChevronLeft, QrCode as QrIcon, ExternalLink, RefreshCw, ArrowUpRight, ArrowDownRight } from "lucide-react";

import { useClients } from "@/context/clients-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QrCode from "@/components/qr-code";

// --- helpers (deterministic mock series) ---
function seedRandom(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    // xorshift
    h += h << 13; h ^= h >>> 7; h += h << 3; h ^= h >>> 17; h += h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

type RangeKey = 7 | 14 | 30 | 90;

export default function SiteAnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useClients();
  const site = getById(id);

  const [range, setRange] = useState<RangeKey>(30);

  if (!site) {
    return (
      <div className="space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <Card className="p-6 border-white/10">Site not found.</Card>
      </div>
    );
  }

  const url = `https://prepgo.me/${site.domain.slug}`;

  const { series, totals, prevTotals, referrers, devices, topPages } = useMemo(() => {
    const rnd = seedRandom(site.id + ":" + site.updatedAt + ":" + site.domain.slug + ":" + range);

    // Base targets from summary (fallbacks if missing)
    const baseVisits = site.analytics?.last30dVisits ?? 240;
    const baseScans = site.analytics?.last30dQRScans ?? 60;

    // scale for selected range
    const targetVisits = Math.max(5, Math.round(baseVisits * (range / 30)));
    const targetScans = Math.max(2, Math.round(baseScans * (range / 30)));

    // shape the curve (gentle weekly wave + randomness)
    const days: { date: string; visits: number; scans: number }[] = [];
    const today = new Date();
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const wave = 0.85 + 0.3 * Math.sin((2 * Math.PI * (range - i)) / 7);
      const v = Math.round((targetVisits / range) * wave * (0.75 + rnd() * 0.5));
      const s = Math.round((targetScans / range) * wave * (0.7 + rnd() * 0.6));

      days.push({ date: formatDate(d), visits: v, scans: s });
    }

    const totals = {
      visits: days.reduce((a, b) => a + b.visits, 0),
      scans: days.reduce((a, b) => a + b.scans, 0),
    };

    // previous period for deltas (same length, immediately preceding)
    const prevDays: { visits: number; scans: number }[] = [];
    for (let i = range; i < range * 2; i++) {
      const wave = 0.85 + 0.3 * Math.sin((2 * Math.PI * (range - i)) / 7);
      const v = Math.round((targetVisits / range) * wave * (0.65 + rnd() * 0.5));
      const s = Math.round((targetScans / range) * wave * (0.65 + rnd() * 0.6));
      prevDays.push({ visits: v, scans: s });
    }
    const prevTotals = {
      visits: prevDays.reduce((a, b) => a + b.visits, 0),
      scans: prevDays.reduce((a, b) => a + b.scans, 0),
    };

    // referrers – use provided topReferrers if available
    const referrers =
      site.analytics?.topReferrers?.length
        ? site.analytics.topReferrers.map((r) => ({ name: r.source, value: r.count }))
        : [
            { name: "Direct", value: Math.round(totals.visits * 0.42) },
            { name: "Twitter/X", value: Math.round(totals.visits * 0.2) },
            { name: "LinkedIn", value: Math.round(totals.visits * 0.16) },
            { name: "Instagram", value: Math.round(totals.visits * 0.12) },
            { name: "Other", value: Math.max(1, totals.visits - Math.round(totals.visits * 0.9)) },
          ];

    // devices breakdown (mock)
    const mobile = 55 + Math.round(rnd() * 10);
    const desktop = 100 - mobile - 8;
    const tablet = 8;
    const devices = [
      { name: "Mobile", value: Math.max(10, mobile) },
      { name: "Desktop", value: Math.max(10, desktop) },
      { name: "Tablet", value: tablet },
    ];

    // top "pages" (sections)
    const topPages = [
      { name: "Hero", views: Math.round(totals.visits * (0.95 + rnd() * 0.04)) },
      { name: "About", views: Math.round(totals.visits * (0.78 + rnd() * 0.1)) },
      { name: "Services", views: Math.round(totals.visits * (0.62 + rnd() * 0.08)) },
      { name: "Projects", views: Math.round(totals.visits * (0.55 + rnd() * 0.1)) },
      { name: "Contact", views: Math.round(totals.visits * (0.32 + rnd() * 0.09)) },
    ];

    return { series: days, totals, prevTotals, referrers, devices, topPages };
  }, [site.id, site.updatedAt, site.domain.slug, site.analytics, range]); // eslint-disable-line

  // deltas
  const visitsDelta = percentDelta(totals.visits, prevTotals.visits);
  const scansDelta = percentDelta(totals.scans, prevTotals.scans);

  const accent1 = "var(--accent-1)";
  const accent2 = "var(--accent-2)";
  const grid = "rgba(255,255,255,0.06)";
  const text = "rgba(255,255,255,0.85)";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <a href={`/u/${site.domain.slug}`} target="_blank" rel="noreferrer">
            <Button variant="outline"><ExternalLink className="size-4" /> View</Button>
          </a>
        </div>
      </div>

      {/* Range selector */}
      <Card className="p-3 border-white/10 flex items-center gap-2">
        <span className="text-sm text-white/70">Range:</span>
        {[7, 14, 30, 90].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r as RangeKey)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${range===r ? "bg-white/15 border-white/30" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
          >
            {r}d
          </button>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs text-white/60">
          <RefreshCw className="size-3" /> Demo data auto-generates from your site id.
        </div>
      </Card>

      {/* KPI cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Visits" value={totals.visits} delta={visitsDelta} />
        <KpiCard title="QR Scans" value={totals.scans} delta={scansDelta} />
        <KpiCard title="Bounce Rate" value={`${(32 + (range % 7))}%`} note="mock" />
        <KpiCard title="Avg. Time on Page" value={`${1 + (range % 3)}m ${(15 + (range % 30))}s`} note="mock" />
      </div>

      {/* Traffic chart */}
      <Card className="p-4 border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold">Traffic & Scans</div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accent1} stopOpacity={0.45}/>
                  <stop offset="95%" stopColor={accent1} stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="gScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accent2} stopOpacity={0.45}/>
                  <stop offset="95%" stopColor={accent2} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke={grid} strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke={text} tick={{ fill: text, fontSize: 12 }} />
              <YAxis stroke={text} tick={{ fill: text, fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12, color: "#fff" }} />
              <Legend />
              <Area type="monotone" dataKey="visits" name="Visits" stroke={accent1} fill="url(#gVisits)" strokeWidth={2} />
              <Area type="monotone" dataKey="scans"  name="QR Scans" stroke={accent2} fill="url(#gScans)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Referrers + Devices + QR */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-4 border-white/10">
          <div className="text-lg font-semibold mb-2">Top Referrers</div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={referrers} dataKey="value" nameKey="name" outerRadius={90} innerRadius={48} paddingAngle={3}>
                  {referrers.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? "var(--accent-1)" : "var(--accent-2)"} opacity={0.8 - i * 0.08} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12, color: "#fff" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 border-white/10">
          <div className="text-lg font-semibold mb-2">Devices</div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={devices}>
                <CartesianGrid stroke={grid} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={text} tick={{ fill: text }} />
                <YAxis stroke={text} tick={{ fill: text }} />
                <Tooltip contentStyle={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12, color: "#fff" }} />
                <Bar dataKey="value" name="Share (%)" fill="var(--accent-1)" opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 border-white/10">
          <div className="text-lg font-semibold mb-2">QR Code</div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl border border-white/10 bg-white/5">
              <QrCode value={url} size={128} />
            </div>
            <div className="text-sm">
              <div className="text-white/90">Scan to open</div>
              <div className="text-white/60 break-all">{url}</div>
              <a className="inline-flex items-center gap-1 mt-2 text-xs underline text-white/80" href={url} target="_blank" rel="noreferrer">
                <ExternalLink className="size-3" /> Open site
              </a>
            </div>
          </div>
          <div className="mt-3 text-xs text-white/60">
            Print this on your physical business card. Scans are tracked here (mock).
          </div>
        </Card>
      </div>

      {/* Top sections */}
      <Card className="p-4 border-white/10">
        <div className="text-lg font-semibold mb-2">Top Sections</div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPages}>
              <CartesianGrid stroke={grid} strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke={text} tick={{ fill: text }} />
              <YAxis stroke={text} tick={{ fill: text }} />
              <Tooltip contentStyle={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12, color: "#fff" }} />
              <Bar dataKey="views" name="Views" fill="var(--accent-2)" opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function percentDelta(curr: number, prev: number) {
  if (!prev) return 0;
  return Math.round(((curr - prev) / prev) * 100);
}

function KpiCard({ title, value, delta, note }: { title: string; value: number | string; delta?: number; note?: string }) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="p-4 border-white/10">
      <div className="text-sm text-white/70">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {typeof delta === "number" && (
        <div className={`mt-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border ${up ? "border-emerald-500/30 text-emerald-300" : "border-red-500/30 text-red-300"}`}>
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />} {Math.abs(delta)}% vs prev
        </div>
      )}
      {note && <div className="text-[11px] text-white/50 mt-1">{note}</div>}
    </Card>
  );
}
