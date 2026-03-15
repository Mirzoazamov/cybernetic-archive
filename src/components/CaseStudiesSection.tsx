import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const caseStudies = [
  {
    id: 'CS_01',
    title: 'SQL Injection in Enterprise Web Application',
    phases: [
      { phase: 'Reconnaissance', icon: '🔍', content: 'Identified a legacy PHP web application with user-controlled input flowing directly into SQL queries. Manual testing revealed error-based SQL injection in the login form.' },
      { phase: 'Weaponization', icon: '⚔️', content: 'Developed custom SQLMap tamper scripts to bypass WAF rules. Crafted time-based blind injection payloads for stealthier data extraction.' },
      { phase: 'Exploitation', icon: '💥', content: 'Extracted full database schema, user credentials (hashed), and admin session tokens. Achieved unauthorized admin access to the application.' },
      { phase: 'Impact', icon: '📊', content: 'Full database compromise affecting 10,000+ user records. Admin panel takeover enabling arbitrary content modification.' },
      { phase: 'Mitigation', icon: '🛡️', content: 'Implemented parameterized queries across all endpoints. Deployed ModSecurity WAF rules. Added input validation and output encoding. Recommended regular penetration testing cycles.' },
    ],
    tags: ['SQLi', 'WAF Bypass', 'PHP', 'MySQL'],
  },
  {
    id: 'CS_02',
    title: 'Active Directory Lateral Movement Chain',
    phases: [
      { phase: 'Reconnaissance', icon: '🔍', content: 'Initial foothold via phishing. Enumerated AD environment using BloodHound, discovering misconfigured Group Policy Objects and overprivileged service accounts.' },
      { phase: 'Weaponization', icon: '⚔️', content: 'Identified Kerberoastable service accounts with weak passwords. Prepared AS-REP roasting attack against accounts with pre-authentication disabled.' },
      { phase: 'Exploitation', icon: '💥', content: 'Cracked service account hashes offline. Used Pass-the-Hash to move laterally to domain controller. Performed DCSync to extract all domain credentials.' },
      { phase: 'Impact', icon: '📊', content: 'Complete domain compromise. All user and admin credentials extracted. Potential for persistence via Golden Ticket attacks.' },
      { phase: 'Mitigation', icon: '🛡️', content: 'Enforced strong passwords on all service accounts. Implemented LAPS for local admin passwords. Enabled Protected Users group for privileged accounts. Deployed Microsoft ATA for anomaly detection.' },
    ],
    tags: ['Active Directory', 'Kerberoasting', 'BloodHound', 'DCSync'],
  },
];

export default function CaseStudiesSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="case-studies" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark2))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="03. Case Studies" title="Attack" highlight="Analysis" />
        <div ref={ref} className={`space-y-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          {caseStudies.map(cs => (
            <div key={cs.id} className="bg-glass border border-border p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--gradient-purple-lime)', opacity: 0.4 }} />
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-[11px] text-muted-foreground tracking-[3px]">{cs.id}</span>
                <div className="flex gap-[4px]">
                  {[1,2,3].map(i => <div key={i} className="w-[7px] h-[7px] bg-destructive border border-destructive" style={{ boxShadow: '0 0 6px hsla(350,80%,55%,0.6)' }} />)}
                </div>
              </div>
              <h3 className="font-display text-[18px] font-bold text-foreground mb-8">{cs.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {cs.phases.map((p, i) => (
                  <div key={p.phase} className="relative">
                    {i < cs.phases.length - 1 && (
                      <div className="hidden md:block absolute top-4 right-0 w-4 h-px bg-border z-10 translate-x-full" />
                    )}
                    <div className="p-4 border border-border bg-card/50 h-full">
                      <div className="text-[16px] mb-2">{p.icon}</div>
                      <div className="font-mono text-[9px] tracking-[3px] text-primary uppercase mb-2">{p.phase}</div>
                      <p className="font-mono text-[11px] text-muted-foreground leading-[1.7]">{p.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
                {cs.tags.map(t => (
                  <span key={t} className="px-3 py-1 border border-secondary/20 font-mono text-[10px] tracking-[1.5px] text-secondary/70 uppercase">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
