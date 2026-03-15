import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

export default function ContactSection() {
  const { ref, visible } = useScrollReveal();
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = () => {
    setSendState('sending');
    setTimeout(() => setSendState('sent'), 1800);
  };

  const contacts = [
    { icon: '@', label: 'mirzoanvar@example.com', href: '#' },
    { icon: '✈', label: 't.me/mirzoanvar_sec', href: 'https://t.me/mirzoanvar_sec' },
    { icon: 'in', label: 'linkedin.com/in/mirzoanvar', href: 'https://linkedin.com' },
    { icon: '⌥', label: 'github.com/mirzoanvar', href: 'https://github.com' },
    { icon: '⬡', label: 'HackTheBox Profile', href: '#' },
  ];

  return (
    <section id="contact" className="py-36 px-6 md:px-14 relative overflow-hidden" style={{ background: 'hsl(var(--dark3))' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(80px,14vw,180px)] font-black whitespace-nowrap pointer-events-none select-none tracking-[-6px]" style={{ color: 'hsla(84,100%,67%,0.025)' }}>
        CONTACT
      </div>
      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader eyebrow="07. Contact" title="Get In" highlight="Touch" />
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          <div>
            <h3 className="font-display text-[clamp(22px,3vw,38px)] font-black leading-[1.15] mb-6">
              Let's work<br /><span className="text-primary">together.</span>
            </h3>
            <p className="text-[16px] leading-[1.8] text-foreground/[0.42] mb-11">
              Open to internships, freelance security engagements, CTF team partnerships, and research collaborations. Got a system that needs stress-testing? Let's talk.
            </p>
            <div className="flex flex-col">
              {contacts.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  data-hover
                  className={`flex items-center gap-4 py-[18px] border-b border-border font-mono text-[13px] text-foreground/[0.45] transition-all duration-300 hover:text-primary hover:pl-2 group ${i === 0 ? 'border-t' : ''}`}
                >
                  <i className="text-secondary w-[18px] text-center not-italic transition-colors duration-300 group-hover:text-primary">{c.icon}</i>
                  {c.label}
                  <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-[3px] text-muted-foreground uppercase">Your Name</label>
              <input type="text" placeholder="John Doe" className="bg-glass-2 border border-border px-[18px] py-3.5 text-foreground font-mono text-[13px] outline-none backdrop-blur-[10px] transition-all duration-300 focus:border-primary/40 focus:bg-primary/[0.03] placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-[3px] text-muted-foreground uppercase">Email Address</label>
              <input type="email" placeholder="hello@example.com" className="bg-glass-2 border border-border px-[18px] py-3.5 text-foreground font-mono text-[13px] outline-none backdrop-blur-[10px] transition-all duration-300 focus:border-primary/40 focus:bg-primary/[0.03] placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-[3px] text-muted-foreground uppercase">Message</label>
              <textarea placeholder="Hi Mirzoanvar, I'd like to..." className="bg-glass-2 border border-border px-[18px] py-3.5 text-foreground font-mono text-[13px] outline-none backdrop-blur-[10px] transition-all duration-300 focus:border-primary/40 focus:bg-primary/[0.03] placeholder:text-muted-foreground h-[110px] resize-none" />
            </div>
            <button
              onClick={handleSend}
              data-hover
              className="py-4 bg-primary text-primary-foreground font-mono text-[12px] font-medium tracking-[3px] uppercase relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_hsla(84,100%,67%,0.3)] group"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-lime-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-[1]">
                {sendState === 'idle' ? 'SEND MESSAGE →' : sendState === 'sending' ? 'SENDING...' : 'SENT ✓'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
