"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const { push } = useToast();
  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Sign in</h2>
      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@company.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button onClick={() => push({ title: "Logged in (mock)", desc: "Redirecting to Admin…" })}>
          Continue
        </Button>
        <div className="text-sm text-white/70">
          <Link className="underline" href="/(auth)/forgot">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
