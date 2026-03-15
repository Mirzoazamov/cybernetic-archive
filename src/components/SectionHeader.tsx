import { useRef, useEffect, useState } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  highlight: string;
}

export default function SectionHeader({ eyebrow, title, highlight }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className={`font-mono text-[11px] tracking-[5px] text-purple-light uppercase mb-4 flex items-center gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <span className="text-secondary">//</span> {eyebrow}
      </div>
      <h2 className={`font-display text-[clamp(30px,4vw,58px)] font-black leading-[1.05] mb-20 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {title} <span className="text-primary">{highlight}</span>
      </h2>
    </div>
  );
}
