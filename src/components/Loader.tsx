import { useState, useEffect } from 'react';

const messages = ['INITIALIZING...', 'LOADING MODULES...', 'SCANNING NETWORK...', 'READY'];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 16 + 5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(iv);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 300);
      }
      setProgress(Math.floor(prog));
    }, 80);

    const failsafe = setTimeout(() => {
      clearInterval(iv);
      setProgress(100);
      setDone(true);
      setTimeout(onComplete, 700);
    }, 3000);

    return () => { clearInterval(iv); clearTimeout(failsafe); };
  }, [onComplete]);

  const msgIdx = Math.min(Math.floor(progress / 34), messages.length - 2);
  const displayText = progress >= 100 ? 'READY — 100%' : `${messages[msgIdx]} ${progress}%`;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 transition-all duration-700 ${done ? 'opacity-0 -translate-y-8 pointer-events-none' : ''}`}
      style={{ background: 'hsl(var(--dark))' }}
    >
      <div className="font-display text-[13px] font-black tracking-[6px] text-primary animate-fade-up" style={{ textShadow: '0 0 30px hsla(84,100%,67%,0.5)' }}>
        MM_SEC
      </div>
      <div className="w-[220px] h-px relative overflow-hidden animate-fade-up" style={{ background: 'rgba(255,255,255,0.08)', animationDelay: '0.2s' }}>
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(var(--purple)), hsl(var(--lime)))',
            boxShadow: '0 0 10px hsl(var(--lime))',
          }}
        />
      </div>
      <div className="font-mono text-[11px] tracking-[3px] text-muted-foreground animate-fade-up" style={{ animationDelay: '0.3s' }}>
        {displayText}
      </div>
    </div>
  );
}
