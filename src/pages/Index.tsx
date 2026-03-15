import { useState, useCallback } from 'react';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SecurityDemos from '@/components/SecurityDemos';
import ResearchSection from '@/components/ResearchSection';
import CertificationsSection from '@/components/CertificationsSection';
import GitHubSection from '@/components/GitHubSection';
import ContactSection from '@/components/ContactSection';
import SecurityCredibility from '@/components/SecurityCredibility';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import ThemeToggle from '@/components/ThemeToggle';
import useKonamiCode, { EasterEggOverlay } from '@/hooks/useKonamiCode';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { showEasterEgg } = useKonamiCode();

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaded} />}
      <CustomCursor />
      <div className="noise-overlay" />
      
      {loaded && (
        <>
          <Navbar />
          <ThemeToggle />
          <main>
            <HeroSection />
            <MissionSection />
            <AboutSection />
            <SkillsSection />
            <CaseStudiesSection />
            <ProjectsSection />
            <SecurityDemos />
            <ResearchSection />
            <GitHubSection />
            <CertificationsSection />
            <ContactSection />
            <SecurityCredibility />
          </main>
          <Footer />

          {/* Terminal FAB */}
          <button
            onClick={() => setTerminalOpen(true)}
            data-hover
            className="fixed bottom-6 right-6 z-[800] px-5 py-3 border border-primary/30 bg-card font-mono text-[11px] text-primary tracking-[2px] uppercase transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:shadow-[var(--shadow-lime)]"
          >
            [~] Terminal
          </button>

          <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
          <EasterEggOverlay show={showEasterEgg} />
        </>
      )}
    </>
  );
};

export default Index;
