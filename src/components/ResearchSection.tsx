import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const articles = [
  {
    title: 'Active Directory Attack Paths Explained',
    desc: 'A comprehensive guide to understanding and exploiting AD misconfigurations, from initial foothold to domain admin via Kerberoasting, AS-REP roasting, and DCSync.',
    tags: ['Active Directory', 'Windows', 'Red Team'],
    date: 'Mar 2025',
  },
  {
    title: 'Privilege Escalation Techniques on Linux',
    desc: 'Systematic approach to Linux privesc — SUID binaries, cron jobs, kernel exploits, capabilities abuse, and container escapes.',
    tags: ['Linux', 'Priv Esc', 'CTF'],
    date: 'Feb 2025',
  },
  {
    title: 'XSS Filter Bypass Methods',
    desc: 'Modern XSS bypass techniques against WAFs and sanitization libraries. Covers mutation XSS, DOM clobbering, and prototype pollution chains.',
    tags: ['XSS', 'Web Security', 'WAF Bypass'],
    date: 'Jan 2025',
  },
  {
    title: 'Automating Reconnaissance with Python',
    desc: 'Building modular OSINT tools — subdomain enumeration, port scanning, technology fingerprinting, and API-based intelligence gathering.',
    tags: ['Python', 'OSINT', 'Automation'],
    date: 'Dec 2024',
  },
];

export default function ResearchSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="research" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark3))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="05. Intelligence" title="Security" highlight="Research" />
        <div ref={ref} className={`space-y-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          {articles.map((a, i) => (
            <div
              key={a.title}
              data-hover
              className="bg-glass border border-border p-7 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 hover:border-primary/20 hover:translate-x-1 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex-1">
                <div className="font-mono text-[10px] text-muted-foreground tracking-[2px] uppercase mb-2">{a.date}</div>
                <h3 className="font-display text-[15px] font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{a.title}</h3>
                <p className="font-mono text-[12px] text-muted-foreground leading-[1.7]">{a.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                {a.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 border border-border font-mono text-[9px] tracking-[2px] text-muted-foreground uppercase">{t}</span>
                ))}
              </div>
              <span className="font-mono text-[12px] text-muted-foreground group-hover:text-primary transition-all duration-300 md:ml-4">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
