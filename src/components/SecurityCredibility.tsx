import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SecurityCredibility() {
  return (
    <section className="py-20 px-6 md:px-14 border-t border-border" style={{ background: 'hsl(var(--dark))' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PGP */}
          <div className="bg-glass border border-border p-6">
            <div className="font-display text-[10px] tracking-[4px] text-primary uppercase mb-4">PGP Public Key</div>
            <code className="font-mono text-[10px] text-muted-foreground block mb-3 break-all leading-[1.8]">
              Fingerprint: 4A3B 7C9E 2D1F 8A5B 6E0C D4F7 9B2A 1E3C 5F8D 0A6B
            </code>
            <button
              data-hover
              onClick={() => navigator.clipboard.writeText('4A3B7C9E2D1F8A5B6E0CD4F79B2A1E3C5F8D0A6B')}
              className="font-mono text-[10px] tracking-[2px] text-primary uppercase hover:underline"
            >
              Copy Fingerprint
            </button>
          </div>

          {/* Security.txt */}
          <div className="bg-glass border border-border p-6">
            <div className="font-display text-[10px] tracking-[4px] text-primary uppercase mb-4">Security.txt</div>
            <p className="font-mono text-[11px] text-muted-foreground leading-[1.8] mb-3">
              This site follows the security.txt standard for vulnerability disclosure.
            </p>
            <a href="/security.txt" className="font-mono text-[10px] tracking-[2px] text-primary uppercase hover:underline" data-hover>
              View security.txt →
            </a>
          </div>

          {/* Responsible Disclosure */}
          <div className="bg-glass border border-border p-6">
            <div className="font-display text-[10px] tracking-[4px] text-primary uppercase mb-4">Responsible Disclosure</div>
            <p className="font-mono text-[11px] text-muted-foreground leading-[1.8]">
              If you find a vulnerability in this site, please email <span className="text-primary">security@mirzoanvar.dev</span> before public disclosure. Response within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
