import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef } from 'react';

const projects = [
  {
    num: 'PROJECT_01', type: 'TLS Security', difficulty: 'rrr',
    title: 'TLS Analyzer & Security Grader',
    desc: 'Deep TLS/SSL inspection tool that detects weak cipher suites, expired certificates, protocol downgrades, HSTS misconfigurations, and broken certificate chains. Outputs a graded security report (A–F).',
    tags: ['Python', 'TLS/SSL', 'Cryptography', 'OpenSSL', 'PKI'],
  },
  {
    num: 'PROJECT_02', type: 'Threat Detection', difficulty: 'rrp',
    title: 'Phishing Detection Engine',
    desc: 'ML-powered classifier for phishing URLs and emails using NLP and heuristic analysis. Detects typosquatting, homoglyph attacks, and suspicious redirects.',
    tags: ['Python', 'ML/NLP', 'VirusTotal', 'Email Sec'],
  },
  {
    num: 'PROJECT_03', type: 'CTF Writeups', difficulty: 'rrr',
    title: 'HackTheBox Machine Collection',
    desc: 'Structured writeups for retired HTB machines covering privilege escalation, LFI/RFI chains, buffer overflows, and AD lateral movement.',
    tags: ['Linux', 'Windows', 'Priv Esc', 'MITRE'],
  },
  {
    num: 'PROJECT_04', type: 'Web Security', difficulty: 'pp',
    title: 'Web Vulnerability Scanner',
    desc: 'Automated scanner that crawls targets and tests for SQLi, XSS, CSRF, open redirects, and CORS misconfigurations. Generates JSON/HTML reports.',
    tags: ['Python', 'OWASP', 'SQLi', 'XSS/CSRF'],
  },
  {
    num: 'PROJECT_05', type: 'Network IDS', difficulty: 'll',
    title: 'Network Intrusion Detection System',
    desc: 'Real-time Python/Scapy IDS detecting port scans, ARP spoofing, SYN floods, and DNS anomalies. Sends instant Telegram bot alerts.',
    tags: ['Scapy', 'Python', 'IDS/IPS', 'Telegram'],
  },
  {
    num: 'PROJECT_06', type: 'OSINT Framework', difficulty: 'ppp',
    title: 'Automated OSINT Recon Suite',
    desc: 'Modular recon framework integrating Shodan, Hunter.io, Censys, WHOIS, and Google dorking for automated target footprinting.',
    tags: ['OSINT', 'Shodan', 'Censys', 'Python'],
  },
];

function DifficultyDots({ pattern }: { pattern: string }) {
  return (
    <div className="flex gap-1">
      {pattern.split('').map((c, i) => {
        const color = c === 'r' ? 'bg-destructive border-destructive shadow-[0_0_6px_hsla(350,80%,55%,0.6)]' :
                      c === 'p' ? 'bg-secondary border-secondary shadow-[0_0_6px_hsla(270,70%,55%,0.6)]' :
                      c === 'l' ? 'bg-primary border-primary shadow-[0_0_6px_hsla(84,100%,67%,0.6)]' :
                      'border-border';
        return <div key={i} className={`w-[7px] h-[7px] border ${color}`} />;
      })}
    </div>
  );
}

function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-5px)`;
      card.style.setProperty('--mx', (x * 100) + '%');
      card.style.setProperty('--my', (y * 100) + '%');
    };
    const onLeave = () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.25,1,0.5,1)';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 600);
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-hover
      className="bg-glass border border-border backdrop-blur-[20px] p-9 relative overflow-hidden transition-all duration-400 hover:border-primary/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] will-change-transform"
      style={{ transformStyle: 'preserve-3d', transitionDelay: `${delay}ms` }}
    >
      {/* Radial glow on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), hsla(84,100%,67%,0.06) 0%, transparent 70%)' }} />
      
      {/* Purple corner glow */}
      <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsla(270,70%,55%,0.12) 0%, transparent 70%)' }} />

      <div className="font-display text-[11px] text-muted-foreground tracking-[3px] mb-5 flex items-center justify-between">
        <span>{project.num}</span>
        <DifficultyDots pattern={project.difficulty} />
      </div>
      <span className="px-3 py-1 border border-secondary/25 font-mono text-[10px] tracking-[2px] text-purple-light uppercase">{project.type}</span>
      <h3 className="font-display text-[16px] font-bold text-foreground mt-4 mb-3 leading-[1.35] tracking-[0.5px]">{project.title}</h3>
      <p className="text-[14px] leading-[1.78] text-foreground/[0.38] mb-6">{project.desc}</p>
      <div className="flex flex-wrap gap-[7px] mb-7">
        {project.tags.map(t => (
          <span key={t} className="px-[11px] py-1 border border-secondary/20 font-mono text-[10px] tracking-[1.5px] text-secondary/70 uppercase">{t}</span>
        ))}
      </div>
      <div className="flex gap-5 pt-5 border-t border-border">
        <a href="#" className="font-mono text-[11px] tracking-[2px] text-muted-foreground uppercase flex items-center gap-[7px] transition-all duration-300 hover:text-primary hover:gap-2.5" data-hover>→ GitHub</a>
        <a href="#" className="font-mono text-[11px] tracking-[2px] text-muted-foreground uppercase flex items-center gap-[7px] transition-all duration-300 hover:text-primary hover:gap-2.5" data-hover>→ Demo</a>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="projects" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="04. Projects" title="Practical" highlight="Work" />
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
