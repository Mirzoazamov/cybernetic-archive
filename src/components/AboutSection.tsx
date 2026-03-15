import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

function StatRow({ num, label, sub, delay }: { num: number; label: string; sub: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = Math.max(1, Math.ceil(num / 50));
        const iv = setInterval(() => {
          n = Math.min(n + step, num);
          setCount(n);
          if (n >= num) clearInterval(iv);
        }, 35);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  return (
    <div
      ref={ref}
      className="bg-glass border border-border p-7 px-8 flex items-center gap-6 relative overflow-hidden transition-all duration-300 hover:border-primary/20 hover:translate-x-1 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: 'var(--gradient-purple-lime)' }} />
      <div className="font-display text-[40px] font-black text-primary leading-none" style={{ textShadow: '0 0 24px hsla(84,100%,67%,0.25)' }}>
        {count}
      </div>
      <div>
        <div className="font-mono text-[11px] text-muted-foreground tracking-[2px] uppercase">{label}</div>
        <div className="font-mono text-[10px] text-purple-light mt-[3px]">{sub}</div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark2))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="01. About Me" title="Who" highlight="I Am" />
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
            <div className="space-y-6">
              <p className="text-[17px] leading-[1.9] text-foreground/50">
                I'm <strong className="text-foreground/[0.88]">Mirzoanvar Mirzoa'zamov</strong>, a passionate cybersecurity engineering student at <strong className="text-foreground/[0.88]">TUIT</strong> with a deep focus on <span className="text-primary">offensive security and threat intelligence</span>. I'm enrolled in professional penetration testing training while actively competing on global platforms.
              </p>
              <p className="text-[17px] leading-[1.9] text-foreground/50">
                My philosophy: <strong className="text-foreground/[0.88]">think like an attacker, build like an engineer</strong>. Every exploit I understand is a defense mechanism I can design.
              </p>
              <p className="text-[17px] leading-[1.9] text-foreground/50">
                Beyond coursework I hunt machines on <strong className="text-foreground/[0.88]">HackTheBox</strong>, compete in <strong className="text-foreground/[0.88]">CTF events worldwide</strong>, and build open-source security automation tools.
              </p>
            </div>
            <div className="glass-panel mt-9">
              <div className="font-mono text-[10px] tracking-[4px] text-muted-foreground uppercase mb-4">// Credential snapshot</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'TUIT Degree', color: 'primary' },
                  { label: 'Google Cybersec', color: 'secondary' },
                  { label: 'Pen Test Training', color: 'accent' },
                  { label: 'HTB Pro Hacker', color: 'primary' },
                  { label: 'THM Top 5%', color: 'primary' },
                ].map(c => (
                  <span
                    key={c.label}
                    className={`px-3.5 py-1.5 border font-mono text-[10px] tracking-[2px] uppercase ${
                      c.color === 'primary' ? 'border-primary/20 bg-primary/[0.06] text-primary' :
                      c.color === 'secondary' ? 'border-secondary/25 bg-secondary/[0.08] text-purple-light' :
                      'border-accent/20 bg-accent/[0.06] text-accent'
                    }`}
                  >
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-4 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
            <StatRow num={18} label="CTF Competitions" sub="National & International" delay={0} />
            <StatRow num={45} label="HTB Machines Pwned" sub="Pro Hacker Rank" delay={50} />
            <StatRow num={10} label="Security Projects" sub="Open Source" delay={100} />
            <StatRow num={3} label="Years Studying" sub="TUIT · Since 2022" delay={150} />
          </div>
        </div>
      </div>
    </section>
  );
}
