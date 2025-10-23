"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { push } = useToast();
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "client">("admin");

  function onLogin() {
    signIn({ email, role, name: email.split("@")[0] });
    push({ title: `Signed in as ${role}` });
    router.replace(role === "admin" ? "/admin" : "/");
  }

  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Sign in</h2>
      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" checked={role==="admin"} onChange={()=>setRole("admin")} /> Admin
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={role==="client"} onChange={()=>setRole("client")} /> Client
          </label>
        </div>
        <Button onClick={onLogin}>Continue</Button>
        <div className="text-sm text-white/70">
          <Link className="underline" href="/(auth)/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}
