import { useState } from 'react';

type ThemeMode = 'dark' | 'terminal' | 'matrix';

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const setTheme = (m: ThemeMode) => {
    document.body.classList.remove('terminal-mode', 'matrix-mode');
    if (m === 'terminal') document.body.classList.add('terminal-mode');
    if (m === 'matrix') document.body.classList.add('matrix-mode');
    setMode(m);
  };

  return (
    <div className="fixed top-20 right-4 z-[750] flex flex-col gap-1">
      {[
        { key: 'dark' as ThemeMode, label: 'Dark', icon: '🌑' },
        { key: 'terminal' as ThemeMode, label: 'Terminal', icon: '⌨' },
        { key: 'matrix' as ThemeMode, label: 'Matrix', icon: '🟢' },
      ].map(t => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          title={t.label}
          data-hover
          className={`w-9 h-9 border font-mono text-[12px] flex items-center justify-center transition-all duration-300 ${
            mode === t.key
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-glass text-muted-foreground hover:border-primary/30'
          }`}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
