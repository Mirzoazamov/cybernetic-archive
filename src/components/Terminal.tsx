import { useState, useRef, useEffect, useCallback } from 'react';

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => `Available commands:
  help      — Show this help message
  whoami    — About Mirzoanvar
  skills    — Technical capabilities
  projects  — Security projects
  contact   — Contact information
  certs     — Certifications
  clear     — Clear terminal
  nmap      — Scan portfolio modules
  decrypt   — Try: decrypt flag`,

  whoami: () => `┌─────────────────────────────────────────┐
│  Mirzoanvar Mirzoa'zamov                │
│  Principal Security Engineer            │
│  Specializing in OffSec & Cloud Arch    │
│  TUIT · Class of 2026                   │
└─────────────────────────────────────────┘`,

  skills: () => `[SKILLS MATRIX]
  Web Penetration  ████████░░  SQL Injection, XSS, CSRF, Burp Suite
  Network Security ████████░░  Nmap, Wireshark, Metasploit, AD Attacks
  Programming      ████████░░  Python, Bash, JavaScript, Linux/Kali
  OSINT            ███████░░░  Shodan, Censys, Google Dorking`,

  projects: () => `[PROJECT REGISTRY]
  01. TLS Analyzer & Security Grader       [CRITICAL]
  02. Phishing Detection Engine            [HIGH]
  03. HackTheBox Machine Collection        [MEDIUM]
  04. Web Vulnerability Scanner            [HIGH]
  05. Network Intrusion Detection System   [MEDIUM]
  06. Automated OSINT Recon Suite          [HIGH]`,

  contact: () => `[SECURE CHANNELS]
  Email     → mirzoanvar@example.com
  Telegram  → t.me/mirzoanvar_sec
  LinkedIn  → linkedin.com/in/mirzoanvar
  GitHub    → github.com/mirzoanvar
  HTB       → HackTheBox Profile`,

  certs: () => `[CREDENTIALS]
  ✓ B.S. Cybersecurity Engineering (TUIT)  [ACTIVE]
  ✓ Google Cybersecurity Certificate       [COMPLETED]
  ◐ Penetration Testing Mastery            [68%]
  ✓ TryHackMe Top 5%                      [ACTIVE]
  ✓ HackTheBox Pro Hacker                  [ACTIVE]
  ○ eJPT                                   [PLANNED]
  ○ CompTIA Security+                      [PLANNED]`,

  nmap: () => `Starting Nmap 7.94 ( https://nmap.org )
Scanning portfolio modules... [██████████] 100%

PORT      STATE    SERVICE
443/tcp   open     https-portfolio
8080/tcp  open     three-js-engine
9090/tcp  open     terminal-service
1337/tcp  filtered easter-egg

Stealth mode active. 4 services detected.`,

  decrypt: (args: string[]) => {
    if (args[0] === 'flag') return '🔓 ACCESS_GRANTED: {K0N4M1_V1B35}';
    return '🔒 Key mismatch. Try: decrypt flag';
  },
};

interface Line {
  type: 'input' | 'output';
  content: string;
}

export default function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', content: '╔══════════════════════════════════════╗' },
    { type: 'output', content: '║  MM_SEC Terminal v1.0                ║' },
    { type: 'output', content: '║  Type "help" for available commands  ║' },
    { type: 'output', content: '╚══════════════════════════════════════╝' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const parts = cmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    const newLines: Line[] = [
      ...lines,
      { type: 'input', content: `guest@mm_sec:~$ ${input}` },
    ];

    if (command === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    if (command && COMMANDS[command]) {
      newLines.push({ type: 'output', content: COMMANDS[command](args) });
    } else if (command) {
      newLines.push({ type: 'output', content: `Command not found: ${command}. Type "help" for available commands.` });
    }

    setLines(newLines);
    setInput('');
  }, [input, lines]);

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay flex items-center justify-center p-6" onClick={onClose}>
      <div
        className="terminal-window w-full max-w-[700px] max-h-[500px] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground tracking-[2px]">MM_SEC TERMINAL</span>
          <button onClick={onClose} className="font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors">ESC</button>
        </div>

        {/* Output */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 min-h-[300px]">
          {lines.map((line, i) => (
            <div key={i} className={`font-mono text-[12px] leading-[1.8] whitespace-pre-wrap ${line.type === 'input' ? 'text-primary' : 'text-foreground/60'}`}>
              {line.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-t border-border">
          <span className="font-mono text-[12px] text-primary mr-2">guest@mm_sec:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none font-mono text-[12px] text-foreground"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
