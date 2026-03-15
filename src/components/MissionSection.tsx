import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function MissionSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-36 px-6 md:px-14 relative" style={{ background: 'hsl(var(--dark2))' }}>
      <div ref={ref} className="max-w-[1200px] mx-auto text-center">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-[11px] tracking-[5px] text-purple-light uppercase mb-6">
            <span className="text-secondary">//</span> The Protocol
          </div>
          <h2 className="font-display text-[clamp(24px,3.5vw,48px)] font-black leading-[1.2] max-w-[900px] mx-auto mb-8">
            I build systems that <span className="text-primary">fail gracefully</span> and{' '}
            <span className="text-secondary">defend aggressively</span>.
          </h2>
          <p className="font-mono text-[14px] text-muted-foreground leading-[1.8] max-w-[600px] mx-auto">
            Think like an attacker, build like an engineer. Every exploit I understand is a defense mechanism I can design.
            Every vulnerability I find in a lab is a breach prevented in production.
          </p>
        </div>
      </div>
    </section>
  );
}
