import { useEffect, useState, useRef } from 'react';
import ThreeHero from './ThreeHero';

const roles = ['Cybersecurity Engineer', 'Penetration Tester', 'Network Administrator', 'Security Researcher', 'Cybersecurity Student'];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      const tick = () => {
        const currentRole = roles[roleIdx.current];
        if (!deleting.current) {
          charIdx.current++;
          setTypedText(currentRole.slice(0, charIdx.current));
          if (charIdx.current === currentRole.length) {
            deleting.current = true;
            setTimeout(tick, 1900);
            return;
          }
          setTimeout(tick, 68);
        } else {
          charIdx.current--;
          setTypedText(currentRole.slice(0, charIdx.current));
          if (charIdx.current === 0) {
            deleting.current = false;
            roleIdx.current = (roleIdx.current + 1) % roles.length;
            setTimeout(tick, 300);
            return;
          }
          setTimeout(tick, 36);
        }
      };
      tick();
    }, 800);
    return () => clearTimeout(timeout);
  }, [visible]);

  const animClass = (delay: number) =>
    `transition-all duration-[900ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`;

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center px-6 md:px-14">
      <ThreeHero />

      <div className="relative z-[2] max-w-[820px]">
        <div className={`inline-flex items-center gap-2.5 px-[18px] py-[7px] border border-secondary/[0.35] bg-secondary/[0.08] font-mono text-[11px] text-purple-light tracking-[3px] uppercase mb-9 ${animClass(0)}`}
          style={{ transitionDelay: '0ms' }}>
          <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse-dot" style={{ boxShadow: '0 0 8px hsl(var(--purple))' }} />
          TUIT · Cybersecurity Engineering · Class of 2026
        </div>

        <h1 className={`font-display text-[clamp(42px,6.5vw,96px)] font-black leading-[0.95] tracking-[-2px] mb-2.5 ${animClass(120)}`}
          style={{ transitionDelay: '120ms' }}>
          <span className="block text-foreground">Mirzoanvar</span>
          <span className="block text-primary" style={{ textShadow: '0 0 60px hsla(84,100%,67%,0.3), 0 0 120px hsla(84,100%,67%,0.15)' }}>
            Mirzoa'zamov
          </span>
        </h1>

        <div className={`flex items-center gap-3.5 mt-[18px] mb-8 ${animClass(260)}`}
          style={{ transitionDelay: '260ms' }}>
          <div className="w-8 h-px bg-muted-foreground flex-shrink-0" />
          <div className="font-mono text-[clamp(13px,1.5vw,16px)] text-muted-foreground tracking-[3px] uppercase">
            I am a <span className="text-primary font-medium">{typedText}</span>
            <span className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-middle" style={{ animation: 'twblink 0.9s step-end infinite' }} />
          </div>
        </div>

        <p className={`text-[17px] leading-[1.85] text-foreground/50 max-w-[560px] mb-12 ${animClass(380)}`}
          style={{ transitionDelay: '380ms' }}>
          Cybersecurity Engineering student at <strong className="text-foreground/[0.85]">TUIT</strong>, specializing in offensive security, network defense, and threat intelligence. I find vulnerabilities before adversaries do — ethically.
        </p>

        <div className={`flex items-center gap-4 ${animClass(500)}`}
          style={{ transitionDelay: '500ms' }}>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-[38px] py-[15px] bg-primary text-primary-foreground font-mono text-[12px] font-medium tracking-[2px] uppercase relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_hsla(84,100%,67%,0.25)] group">
            <span className="absolute inset-0 bg-gradient-to-br from-lime-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-[1]">View Projects →</span>
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-[38px] py-[15px] bg-glass-2 border border-border text-muted-foreground font-mono text-[12px] tracking-[2px] uppercase backdrop-blur-[10px] transition-all duration-300 hover:border-secondary/50 hover:text-purple-light">
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-6 md:left-14 z-[2] flex items-center gap-4 font-mono text-[10px] text-muted-foreground tracking-[3px] uppercase" style={{ animation: 'fadeUp 1s ease 2.5s forwards', opacity: 0 }}>
        <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, hsl(var(--lime)), transparent)' }} />
        Scroll to explore
      </div>

      {/* Hero stats */}
      <div className="absolute right-6 md:right-14 bottom-12 z-[2] hidden md:flex gap-10" style={{ animation: 'fadeUp 1s ease 2.8s forwards', opacity: 0 }}>
        {[
          { num: 18, label: 'CTF Events' },
          { num: 45, label: 'HTB Machines' },
          { num: 10, label: 'Projects' },
        ].map(s => (
          <CountStat key={s.label} target={s.num} label={s.label} />
        ))}
      </div>
    </section>
  );
}

function CountStat({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const iv = setInterval(() => {
          n = Math.min(n + step, target);
          setCount(n);
          if (n >= target) clearInterval(iv);
        }, 35);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-[28px] font-black text-primary leading-none" style={{ textShadow: '0 0 20px hsla(84,100%,67%,0.3)' }}>
        {count}+
      </div>
      <div className="font-mono text-[9px] text-muted-foreground tracking-[2px] uppercase mt-1">{label}</div>
    </div>
  );
}
