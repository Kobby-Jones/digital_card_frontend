import { Card } from "@/components/ui/card";

const quotes = [
  { q: "I had a link and QR for my business in under ten minutes.", a: "Ama D." },
  { q: "The site looks premium on my phone and on desktop.", a: "Nana K." },
  { q: "Updating services and photos is fast and simple.", a: "Yaw B." }
];

export default function HomeTestimonials() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">What users say</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {quotes.map((t, i) => (
          <Card key={i} className="p-6 border-white/10">
            <div className="text-lg leading-relaxed">“{t.q}”</div>
            <div className="text-sm text-white/80 mt-3">— {t.a}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
