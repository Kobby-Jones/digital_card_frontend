export default function NeonPattern() {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div className="absolute inset-0" style={{
          backgroundImage:
            "radial-gradient(1000px 600px at 10% -10%,color-mix(in oklab,var(--accent-1) 18%, transparent), transparent 60%),radial-gradient(1200px 800px at 100% 120%,color-mix(in oklab,var(--accent-2) 16%, transparent), transparent 60%)"
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_50%)]" />
      </div>
    );
  }
  