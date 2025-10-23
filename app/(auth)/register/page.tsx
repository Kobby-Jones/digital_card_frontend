"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { push } = useToast();
  const { signIn } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onCreate() {
    signIn({ email, role: "client", name });
    push({ title: "Account created (client)" });
    router.replace("/onboard");
  }

  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Create your account</h2>
      <div className="mt-4 space-y-4">
        <div><Label htmlFor="name">Name</Label><Input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Kwaku Mensah" /></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" /></div>
        <Button onClick={onCreate}>Continue</Button>
      </div>
    </div>
  );
}
