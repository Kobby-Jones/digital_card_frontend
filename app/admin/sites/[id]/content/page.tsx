"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Reorder, motion } from "framer-motion";
import { ChevronLeft, Check, Plus, Pencil, Trash2, GripVertical, Eye } from "lucide-react";

import { useClients } from "@/context/clients-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CrudModal from "@/components/content/crud-modal";

import type { Service, Project, Testimonial, FAQ } from "@/lib/types";
import ServiceForm from "@/components/content/service-form";
import ProjectForm from "@/components/content/project-form";
import TestimonialForm from "@/components/content/testimonial-form";
import FaqForm from "@/components/content/faq-form";

type TabKey = "services" | "projects" | "testimonials" | "faqs";
const TABS: TabKey[] = ["services", "projects", "testimonials", "faqs"];

export default function ContentManagerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update } = useClients();

  const site = getById(id);
  const [tab, setTab] = useState<TabKey>("services");
  const [saved, setSaved] = useState(false);

  // Working copies for reorder UX
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Modal state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!site) return;
    setServices((site.services ?? []).slice().sort(byOrder));
    setProjects((site.projects ?? []).slice().sort(byOrder));
    setTestimonials((site.testimonials ?? []).slice().sort(byOrder));
    setFaqs((site.faqs ?? []).slice().sort(byOrder));
  }, [site?.id]); // eslint-disable-line

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

  function byOrder(a: {order?: number}, b: {order?: number}) {
    const ao = a.order ?? 0, bo = b.order ?? 0;
    return ao - bo;
  }

  function onSaveAll() {
    // reindex order
    const re = <T extends {id: string}>(arr: T[]) => arr.map((x, i) => ({ ...x, order: i+1 }));
    if (!site) return;
    update(site.id, {
      services: re(services),
      projects: re(projects),
      testimonials: re(testimonials),
      faqs: re(faqs),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  function openCreate() {
    setEditingId(null);
    setOpen(true);
  }
  function openEdit(id: string) {
    setEditingId(id);
    setOpen(true);
  }

  function onSubmitModal(value: Service | Project | Testimonial | FAQ) {
    if (tab === "services") {
      setServices((arr) => upsert(arr, value as Service));
    } else if (tab === "projects") {
      setProjects((arr) => upsert(arr, value as Project));
    } else if (tab === "testimonials") {
      setTestimonials((arr) => upsert(arr, value as Testimonial));
    } else {
      setFaqs((arr) => upsert(arr, value as FAQ));
    }
    setOpen(false);
  }

  function onDelete(id: string) {
    if (tab === "services") setServices(services.filter(s => s.id !== id));
    else if (tab === "projects") setProjects(projects.filter(s => s.id !== id));
    else if (tab === "testimonials") setTestimonials(testimonials.filter(s => s.id !== id));
    else setFaqs(faqs.filter(s => s.id !== id));
  }

  const activeList = tab === "services" ? services
                    : tab === "projects" ? projects
                    : tab === "testimonials" ? testimonials
                    : faqs;

  const editingValue = useMemo(() => {
    if (!editingId) return undefined;
    return activeList.find(i => i.id === editingId);
  }, [editingId, tab, services, projects, testimonials, faqs]); // eslint-disable-line

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/u/${site.domain.slug}`} target="_blank">
            <Button variant="outline"><Eye className="size-4" /> View</Button>
          </Link>
          <Button onClick={onSaveAll}>{saved ? <><Check className="size-4" /> Saved</> : "Save changes"}</Button>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-2 border-white/10 flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${tab===t ? "bg-white/15 border-white/30" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
          >
            {capitalize(t)}
          </button>
        ))}
        <div className="flex-1" />
        <Button onClick={openCreate}><Plus className="size-4" /> Add {capitalize(tab).slice(0,-1)}</Button>
      </Card>

      {/* List with Reorder */}
      <Card className="p-4 border-white/10">
        <Reorder.Group axis="y" values={activeList as Service[]} onReorder={(arr: Service[]) => setActiveList(tab, arr, {services,setServices,projects,setProjects,testimonials,setTestimonials,faqs,setFaqs})} className="space-y-2">
          {activeList.map((item) => (
            <Reorder.Item key={item.id} value={item} as="div" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10" whileDrag={{ scale: 1.02 }}>
              <GripVertical className="size-4 text-white/50" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {"name" in item ? (item as any).name
                    : "q" in item ? (item as any).q
                    : "author" in item ? (item as any).author
                    : (item as any).id}
                </div>
                <div className="text-xs text-white/60 truncate">
                  {"summary" in item && (item as any).summary}
                  {"description" in item && (item as any).description}
                  {"quote" in item && `“${(item as any).quote}”`}
                  {"a" in item && (item as any).a}
                </div>
              </div>
              <Button variant="outline" onClick={()=>openEdit(item.id)}><Pencil className="size-4" /> Edit</Button>
              <Button variant="ghost" className="text-red-300 hover:text-red-200" onClick={()=>onDelete(item.id)}>
                <Trash2 className="size-4" /> Delete
              </Button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Card>

      {/* Modal */}
      <CrudModal
        open={open}
        onClose={()=>setOpen(false)}
        title={editingId ? `Edit ${singular(tab)}` : `New ${singular(tab)}`}
        onSubmit={() => {
          // handled inside individual form onChange; we just close
          // but to ensure value saved, we rely on controlled commit from child
          // so here just close; or keep it to allow Cancel vs Save
          setOpen(false);
        }}
        submitLabel="Close"
      >
        {tab === "services" && (
          <ServiceForm
          value={editingValue as Service | undefined}
          onChange={(val)=>setServices(arr=>upsert(arr, val))}
          siteId={site.id}
        />
        
        )}
        {tab === "projects" && (
          <ProjectForm
          value={editingValue as Project | undefined}
          onChange={(val)=>setProjects(arr=>upsert(arr, val))}
          siteId={site.id}
        />
        
        )}
        {tab === "testimonials" && (
          <TestimonialForm
            value={editingValue as Testimonial | undefined}
            onChange={(val)=>setTestimonials(arr=>upsert(arr, val))}
          />
        )}
        {tab === "faqs" && (
          <FaqForm
            value={editingValue as FAQ | undefined}
            onChange={(val)=>setFaqs(arr=>upsert(arr, val))}
          />
        )}
      </CrudModal>
    </div>
  );
}

/* helpers */
function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function singular(tab: TabKey) { return tab === "faqs" ? "FAQ" : tab.slice(0, -1); }
function upsert<T extends { id: string }>(arr: T[], val: T) {
  const idx = arr.findIndex(a => a.id === val.id);
  if (idx === -1) return [...arr, { ...val, order: arr.length + 1 }];
  const clone = [...arr]; clone[idx] = { ...val }; return clone;
}
function setActiveList(
  tab: TabKey,
  arr: any[],
  bag: any
) {
  if (tab === "services") bag.setServices(arr);
  else if (tab === "projects") bag.setProjects(arr);
  else if (tab === "testimonials") bag.setTestimonials(arr);
  else bag.setFaqs(arr);
}
