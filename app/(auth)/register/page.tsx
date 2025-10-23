"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function RegisterPage() {
  const { push } = useToast();
  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Create your admin account</h2>
      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Ada Lovelace" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@company.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button onClick={() => push({ title: "Account created (mock)" })}>Create account</Button>
      </div>
    </div>
  );
}
