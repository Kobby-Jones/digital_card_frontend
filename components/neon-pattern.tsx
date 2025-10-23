export default function NeonPattern() {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div className="absolute inset-0" style={{
          backgroundImage:
            "radial-gradient(1000px 600px at 10% -10%,rgba(0,255,255,0.12),transparent 60%),radial-gradient(1200px 800px at 100% 120%,rgba(255,0,255,0.14),transparent 60%)"
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_50%)]" />
      </div>
    );
  }
  