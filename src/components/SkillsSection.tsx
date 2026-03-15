import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef } from 'react';

const skillCategories = [
  {
    icon: '🕸️',
    category: 'Web Penetration',
    skills: [
      { name: 'SQL Injection', detail: 'Blind, Union, Error-based exploitation across DBMS platforms' },
      { name: 'XSS / CSRF', detail: 'Stored, Reflected, DOM-based vectors and CSRF bypass techniques' },
      { name: 'Burp Suite Pro', detail: 'Full-stack web app testing with custom extensions' },
      { name: 'OWASP Top 10', detail: 'Complete coverage including SSRF, IDOR, and deserialization' },
    ],
  },
  {
    icon: '🌐',
    category: 'Network Security',
    skills: [
      { name: 'Nmap / Masscan', detail: 'Advanced host discovery and service enumeration' },
      { name: 'Wireshark / tcpdump', detail: 'Deep packet inspection and traffic analysis' },
      { name: 'Metasploit', detail: 'Exploitation framework with custom module development' },
      { name: 'Active Directory', detail: 'Kerberoasting, AS-REP roasting, DCSync attacks' },
    ],
  },
  {
    icon: '⚙️',
    category: 'Programming',
    skills: [
      { name: 'Python', detail: 'Custom automated fuzzing suites and security tools' },
      { name: 'Bash Scripting', detail: 'Automation for reconnaissance and post-exploitation' },
      { name: 'JavaScript', detail: 'XSS payload crafting and browser exploitation' },
      { name: 'Linux / Kali', detail: 'System administration and penetration testing platform' },
    ],
  },
];

function SkillCard({ category, delay }: { category: typeof skillCategories[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-6px)`;
    };
    const onLeave = () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.25,1,0.5,1)';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 600);
    };
    const onEnter = () => { card.style.transition = 'none'; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mouseenter', onEnter);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      card.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-hover
      className="bg-glass border border-border backdrop-blur-[20px] p-8 relative overflow-hidden transition-all duration-400 hover:border-primary/[0.18] hover:shadow-[var(--shadow-card)] will-change-transform"
      style={{ transitionDelay: `${delay}ms`, transformStyle: 'preserve-3d' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 hover:opacity-60 transition-opacity duration-400" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--lime)), transparent)' }} />
      <div className="text-[28px] mb-4">{category.icon}</div>
      <div className="font-display text-[10px] font-bold tracking-[4px] text-primary uppercase mb-6">{category.category}</div>
      <div className="space-y-5">
        {category.skills.map(s => (
          <div key={s.name}>
            <div className="font-mono text-[12px] text-foreground/60 mb-1">{s.name}</div>
            <div className="font-mono text-[10px] text-muted-foreground leading-[1.6]">{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="skills" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="02. Skills" title="Technical" highlight="Arsenal" />
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.category} category={cat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
