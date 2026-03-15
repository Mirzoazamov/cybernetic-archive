import { useEffect, useState } from 'react';

export default function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === code[idx]) {
        idx++;
        if (idx === code.length) {
          setActivated(true);
          setShowEasterEgg(true);
          idx = 0;
          setTimeout(() => setShowEasterEgg(false), 4000);
        }
      } else {
        idx = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { activated, showEasterEgg };
}

export function EasterEggOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none" style={{ background: 'hsla(0,0%,0%,0.8)' }}>
      <div className="text-center animate-fade-up">
        <div className="font-display text-[14px] tracking-[8px] text-destructive uppercase mb-4" style={{ textShadow: '0 0 30px hsla(0,80%,50%,0.5)' }}>
          ACCESS GRANTED
        </div>
        <div className="font-mono text-[20px] text-primary font-bold" style={{ textShadow: '0 0 40px hsla(84,100%,67%,0.5)' }}>
          Welcome to the secure layer.
        </div>
        <div className="font-mono text-[11px] text-muted-foreground mt-4 tracking-[2px]">
          🔓 RED TEAM MODE ACTIVATED
        </div>
      </div>
    </div>
  );
}
