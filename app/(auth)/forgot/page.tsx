"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function ForgotPage() {
  const { push } = useToast();
  return (
    <div className="max-w-md mx-auto glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Reset password</h2>
      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@company.com" />
        </div>
        <Button onClick={() => push({ title: "Reset email sent (mock)" })}>Send reset link</Button>
      </div>
    </div>
  );
}
