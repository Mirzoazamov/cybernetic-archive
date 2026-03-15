import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

const certs = [
  { org: 'TUIT · Tashkent', title: 'B.S. Cybersecurity Engineering', desc: 'Full-time degree covering network security, cryptography, ethical hacking, digital forensics.', year: '2022 – 2026', status: 'active', featured: true },
  { org: 'Google · Coursera', title: 'Google Cybersecurity Professional Certificate', desc: '8-course program — threat analysis, SIEM tools, Python automation, incident response.', year: '2024', status: 'done' },
  { org: 'Professional Training', title: 'Penetration Testing Mastery', desc: 'Offensive security training covering web app, network, and AD attack vectors.', year: '2024–2025', status: 'progress', progress: 68 },
  { org: 'TryHackMe', title: 'Top 5% Global Ranking', desc: 'Consistent top-5% placement across offensive and defensive security learning paths.', year: '2023 – Now', status: 'active' },
  { org: 'HackTheBox', title: 'Pro Hacker Rank', desc: '45+ retired machines rooted. Specializing in Linux privilege escalation and AD attack chains.', year: '2023 – Now', status: 'active' },
  { org: 'eLearnSecurity', title: 'eJPT — Junior Penetration Tester', desc: 'Entry-level practical cert validating real-world attack methodologies.', year: 'Q2 2025', status: 'planned' },
  { org: 'CompTIA', title: 'Security+', desc: 'Industry-standard certification covering threats, cryptography, network security.', year: 'Q3 2025', status: 'planned' },
];

const statusConfig: Record<string, { label: string; badgeClass: string; dotClass: string; lineClass: string }> = {
  active: { label: 'Active', badgeClass: 'bg-primary/[0.07] border-primary/25 text-primary', dotClass: 'bg-primary animate-pulse-dot shadow-[0_0_6px_hsl(var(--lime))]', lineClass: 'from-primary to-primary/10' },
  done: { label: 'Completed', badgeClass: 'bg-secondary/10 border-secondary/30 text-purple-light', dotClass: 'bg-secondary', lineClass: 'from-secondary to-secondary/10' },
  progress: { label: 'In Progress', badgeClass: 'bg-accent/[0.07] border-accent/25 text-accent', dotClass: 'bg-accent animate-pulse-dot shadow-[0_0_6px_hsl(var(--cyan))]', lineClass: 'from-accent to-accent/10' },
  planned: { label: 'Planned', badgeClass: 'bg-muted/10 border-muted/28 text-muted-foreground', dotClass: 'bg-muted-foreground', lineClass: 'from-muted-foreground to-muted/10' },
};

export default function CertificationsSection() {
  const { ref, visible } = useScrollReveal();
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'active', 'done', 'progress', 'planned'];

  return (
    <section id="certifications" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark3))' }}>
      <div className="max-w-[1200px] mx-auto relative">
        {/* Grid bg */}
        <div className="absolute -inset-[60px] pointer-events-none z-0 opacity-100"
          style={{
            backgroundImage: 'linear-gradient(hsla(84,100%,67%,0.016) 1px, transparent 1px), linear-gradient(90deg, hsla(84,100%,67%,0.016) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)',
          }}
        />
        
        <div className="relative z-[2] flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-11">
          <div>
            <SectionHeader eyebrow="06. Credentials" title="Certifications &" highlight="Achievements" />
          </div>
          <div className="flex items-center gap-3 px-5 py-3 border border-border bg-glass backdrop-blur-[12px] flex-shrink-0">
            <div className="font-display text-[24px] font-black text-primary leading-none" style={{ textShadow: '0 0 20px hsla(84,100%,67%,0.3)' }}>07</div>
            <div className="font-mono text-[10px] text-muted-foreground tracking-[2px] uppercase leading-[1.5]">Total<br />Credentials</div>
          </div>
        </div>

        <div className="relative z-[2] flex gap-1.5 mb-7 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-[18px] py-2 border font-mono text-[11px] tracking-[2px] uppercase transition-all duration-250 ${
                filter === f
                  ? 'bg-primary/[0.08] border-primary/[0.35] text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/20 hover:text-primary/70'
              }`}
            >
              {f === 'all' ? 'All' : statusConfig[f]?.label || f}
            </button>
          ))}
        </div>

        <div ref={ref} className={`relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          {certs.map((c, i) => {
            const s = statusConfig[c.status];
            const show = filter === 'all' || filter === c.status;
            return (
              <div
                key={c.title}
                className={`bg-glass-2/50 border border-border backdrop-blur-[20px] p-6 relative overflow-hidden transition-all duration-400 hover:border-primary/[0.18] hover:-translate-y-1 ${
                  c.featured ? 'md:col-span-2' : ''
                } ${show ? 'opacity-100 scale-100' : 'opacity-[0.12] scale-[0.98] pointer-events-none'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Top line */}
                <div className={`absolute top-0 left-0 w-0 h-px bg-gradient-to-r ${s.lineClass} transition-all duration-500 hover:w-full`} />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="font-mono text-[10px] tracking-[3px] text-muted-foreground/40 uppercase">{c.org}</div>
                  <div className={`flex items-center gap-[7px] px-[11px] py-[5px] border font-mono text-[10px] font-medium tracking-[2px] uppercase ${s.badgeClass}`}>
                    <div className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${s.dotClass}`} />
                    {s.label}
                  </div>
                </div>
                <h3 className="font-sans text-[14px] font-bold text-foreground/[0.88] leading-[1.35] mb-2.5">{c.title}</h3>
                <p className="font-mono text-[11px] leading-[1.75] text-foreground/[0.27]">{c.desc}</p>
                
                {c.progress && (
                  <>
                    <div className="mt-3 h-[2px] bg-foreground/[0.04] overflow-hidden">
                      <div className="h-full transition-all duration-[1.4s]" style={{ width: visible ? `${c.progress}%` : '0%', background: 'var(--gradient-accent)', boxShadow: '0 0 10px hsla(195,100%,50%,0.4)' }} />
                    </div>
                    <div className="font-mono text-[10px] text-accent tracking-[1px] mt-1">{c.progress}% complete</div>
                  </>
                )}
                
                <div className="flex justify-between items-center mt-4 pt-3.5 border-t border-foreground/[0.05]">
                  <div className="font-display text-[11px] font-bold text-muted-foreground/40 tracking-[2px]">{c.year}</div>
                  <span className="font-mono text-[10px] tracking-[2px] text-muted-foreground/40 uppercase">View →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
