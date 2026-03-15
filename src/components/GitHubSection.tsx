import SectionHeader from './SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export default function GitHubSection() {
  const { ref, visible } = useScrollReveal();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/mirzoanvar/repos?sort=updated&per_page=6')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock data
        setRepos([
          { id: 1, name: 'tls-analyzer', description: 'TLS/SSL security grading tool', html_url: '#', language: 'Python', stargazers_count: 12, updated_at: '2025-03-01' },
          { id: 2, name: 'phishing-detector', description: 'ML-powered phishing URL classifier', html_url: '#', language: 'Python', stargazers_count: 8, updated_at: '2025-02-15' },
          { id: 3, name: 'web-vuln-scanner', description: 'Automated web vulnerability scanner', html_url: '#', language: 'Python', stargazers_count: 15, updated_at: '2025-01-20' },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-36 px-6 md:px-14" style={{ background: 'hsl(var(--dark))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="Open Source" title="GitHub" highlight="Repositories" />
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}>
          {loading ? (
            <div className="font-mono text-[12px] text-muted-foreground">Loading repositories...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="bg-glass border border-border p-6 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1 group block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[14px]">📁</span>
                    <span className="font-mono text-[13px] text-foreground group-hover:text-primary transition-colors">{repo.name}</span>
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground leading-[1.7] mb-4">{repo.description || 'No description'}</p>
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="font-mono text-[10px] text-primary tracking-[1px]">● {repo.language}</span>
                    )}
                    <span className="font-mono text-[10px] text-muted-foreground">★ {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
