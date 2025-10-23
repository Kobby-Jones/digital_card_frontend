export default function SectionHeader({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
    return (
      <div id={id} className="scroll-mt-28">
        <h3 className="text-xl font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-white/70 mt-1">{subtitle}</p>}
      </div>
    );
  }
  