import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

function SQLiDemo() {
  const [input, setInput] = useState('');
  const [broken, setBroken] = useState(false);

  const handleInput = (val: string) => {
    setInput(val);
    if (val.includes("' OR 1=1") || val.includes("' or 1=1")) {
      setBroken(true);
    } else {
      setBroken(false);
    }
  };

  return (
    <div className="bg-glass border border-border p-7 relative overflow-hidden transition-all duration-500">
      <div className="font-display text-[10px] tracking-[4px] text-primary uppercase mb-4">SQL Injection Simulator</div>
      <p className="font-mono text-[11px] text-muted-foreground mb-4">Try entering: <code className="text-accent">' OR 1=1 --</code></p>
      
      <div className={`transition-all duration-500 ${broken ? 'border-destructive bg-destructive/5' : 'border-border'} border p-4`}>
        <label className="font-mono text-[10px] text-muted-foreground tracking-[2px] uppercase block mb-2">Username</label>
        <input
          type="text"
          value={input}
          onChange={e => handleInput(e.target.value)}
          placeholder="Enter username..."
          className="w-full bg-transparent border border-border px-3 py-2 font-mono text-[12px] text-foreground outline-none focus:border-primary/40"
        />
      </div>

      {broken && (
        <div className="mt-4 p-4 border border-destructive bg-destructive/5 animate-fade-up">
          <div className="font-mono text-[10px] text-destructive tracking-[2px] uppercase mb-3">⚠ DATABASE EXPOSED</div>
          <pre className="font-mono text-[10px] text-foreground/50 leading-[1.8] overflow-x-auto">{`{
  "users": [
    { "id": 1, "user": "admin", "pass": "$2b$10$hash..." },
    { "id": 2, "user": "mirzoanvar", "role": "security_eng" },
    { "id": 3, "user": "guest", "pass": "plaintext123" }
  ],
  "status": "VULNERABLE — Use parameterized queries!"
}`}</pre>
        </div>
      )}
    </div>
  );
}

function PhishingDemo() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<null | { safe: boolean; reason: string }>(null);

  const analyze = () => {
    const lower = url.toLowerCase();
    const suspicious = lower.includes('login') || lower.includes('secure') || lower.includes('verify') ||
      lower.includes('paypal') || lower.includes('bank') || lower.match(/[а-яёА-ЯЁ]/) ||
      (lower.includes('.') && lower.split('.').length > 3) || lower.includes('@');
    
    setResult({
      safe: !suspicious,
      reason: suspicious
        ? 'Suspicious patterns detected: possible typosquatting, excessive subdomains, or credential harvesting keywords.'
        : 'URL appears clean. No immediate phishing indicators detected.',
    });
  };

  return (
    <div className="bg-glass border border-border p-7">
      <div className="font-display text-[10px] tracking-[4px] text-primary uppercase mb-4">Phishing URL Detector</div>
      <p className="font-mono text-[11px] text-muted-foreground mb-4">Enter a URL to analyze for phishing indicators</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://secure-paypal-login.suspicious.com"
          className="flex-1 bg-transparent border border-border px-3 py-2 font-mono text-[12px] text-foreground outline-none focus:border-primary/40"
        />
        <button onClick={analyze} className="px-4 py-2 bg-primary text-primary-foreground font-mono text-[11px] tracking-[2px] uppercase hover:shadow-[var(--shadow-lime)] transition-all">Scan</button>
      </div>
      {result && (
        <div className={`mt-4 p-4 border ${result.safe ? 'border-primary/20 bg-primary/5' : 'border-destructive bg-destructive/5'}`}>
          <div className={`font-mono text-[10px] tracking-[2px] uppercase mb-2 ${result.safe ? 'text-primary' : 'text-destructive'}`}>
            {result.safe ? '✓ LIKELY SAFE' : '⚠ SUSPICIOUS'}
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">{result.reason}</p>
        </div>
      )}
    </div>
  );
}

function TLSDemo() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const scan = () => {
    setScanning(true);
    setResults([]);
    const checks = [
      '✓ TLS 1.3 supported',
      '✓ HSTS header present',
      '✓ Certificate valid (expires 2026)',
      '⚠ TLS 1.0 still enabled — recommend disabling',
      '✓ Forward secrecy supported',
      '✓ No known vulnerabilities (POODLE, BEAST)',
      '⚠ Missing CAA DNS record',
      '── Grade: B+ (TLS 1.0 deprecation needed)',
    ];
    checks.forEach((c, i) => {
      setTimeout(() => {
        setResults(prev => [...prev, c]);
        if (i === checks.length - 1) setScanning(false);
      }, (i + 1) * 400);
    });
  };

  return (
    <div className="bg-glass border border-border p-7">
      <div className="font-display text-[10px] tracking-[4px] text-primary uppercase mb-4">TLS Security Scanner</div>
      <p className="font-mono text-[11px] text-muted-foreground mb-4">Simulated TLS configuration audit</p>
      <button
        onClick={scan}
        disabled={scanning}
        className="px-4 py-2 bg-primary text-primary-foreground font-mono text-[11px] tracking-[2px] uppercase disabled:opacity-50 hover:shadow-[var(--shadow-lime)] transition-all"
      >
        {scanning ? 'Scanning...' : 'Run TLS Scan'}
      </button>
      {results.length > 0 && (
        <div className="mt-4 p-4 border border-border bg-card/50">
          {results.map((r, i) => (
            <div key={i} className={`font-mono text-[11px] leading-[2] ${r.includes('⚠') ? 'text-yellow-500' : r.includes('──') ? 'text-accent font-bold' : 'text-foreground/60'}`}>
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SecurityDemos() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="demos" className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark2))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="Interactive Lab" title="Security" highlight="Demos" />
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          <SQLiDemo />
          <PhishingDemo />
          <div className="lg:col-span-2">
            <TLSDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
