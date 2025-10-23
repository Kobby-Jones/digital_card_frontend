import { Card } from "@/components/ui/card";

const stats = [
  { k: "2min", v: "Avg. setup time" },
  { k: "∞", v: "Custom slugs" },
  { k: "QR", v: "Auto-generated" },
  { k: "Neon", v: "Futuristic UI" }
];

export default function HomeStats() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Card key={i} className="p-5 text-center border-white/10">
          <div className="text-2xl font-extrabold">{s.k}</div>
          <div className="text-sm text-white/70">{s.v}</div>
        </Card>
      ))}
    </section>
  );
}
