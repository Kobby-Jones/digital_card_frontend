"use client";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useClients } from "@/context/clients-context";
import { useEffect } from "react";

export default function EditOwnerLayout({ children }: { children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { getBySlug } = useClients();
  const router = useRouter();

  useEffect(() => {
    const c = getBySlug(slug);
    const allowed = !!c && !!user && (user.role === "admin" || user.id === c.ownerUserId);
    if (!allowed) router.replace("/login");
  }, [slug, user, getBySlug, router]);

  return <>{children}</>;
}
