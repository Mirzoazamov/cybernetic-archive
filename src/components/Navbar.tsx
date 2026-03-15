import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#case-studies', label: 'Cases' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#certifications', label: 'Certs' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[800] px-6 md:px-14 h-[68px] flex items-center justify-between transition-all duration-400 ${
        scrolled ? 'border-b border-border backdrop-blur-[24px]' : 'border-b border-transparent'
      }`}
      style={{ background: scrolled ? 'hsla(240,60%,2%,0.85)' : 'transparent' }}
    >
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
        className="font-display text-[11px] font-black tracking-[5px] text-primary flex items-center gap-[2px]"
      >
        <span className="text-secondary">[</span>MM_SEC<span className="text-secondary">]</span>
      </a>

      {/* Desktop */}
      <ul className="hidden md:flex gap-9 list-none">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
              className="font-mono text-[11px] tracking-[2px] text-muted-foreground uppercase relative transition-colors duration-300 hover:text-primary after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
        className="hidden md:block px-[22px] py-[9px] border border-primary/30 bg-primary/5 text-primary font-mono text-[11px] tracking-[2px] uppercase transition-all duration-300 hover:bg-primary/[0.12] hover:border-primary"
      >
        Hire Me
      </a>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-primary text-2xl"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[68px] left-0 right-0 border-b border-border backdrop-blur-[24px] p-6 md:hidden flex flex-col gap-4" style={{ background: 'hsla(240,60%,2%,0.95)' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
              className="font-mono text-[12px] tracking-[2px] text-muted-foreground uppercase hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
