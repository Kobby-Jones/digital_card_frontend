"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAdmin) router.replace("/(auth)/login");
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) return <div className="text-white/70">Redirecting…</div>;
  return <>{children}</>;
}
