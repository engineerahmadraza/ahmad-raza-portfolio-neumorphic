'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Research from './Research';
import Contact from './Contact';
import Footer from './Footer';
import AdminPanel from './AdminPanel';
import type { Stats, ExperienceItem, Project, ResearchPaper } from '@/lib/data';

interface Props {
  stats: Stats;
  experience: ExperienceItem[];
  projects: Project[];
  research: ResearchPaper[];
  dbConfigured: boolean;
}

export default function PortfolioApp({ stats, experience, projects, research, dbConfigured }: Props) {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <>
      <Navbar onAdminClick={() => setAdminOpen(true)} />
      <main>
        <Hero stats={stats} />
        <About />
        <Skills />
        <Experience items={experience} />
        <Projects items={projects} />
        <Research items={research} />
        <Contact />
      </main>
      <Footer />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} dbConfigured={dbConfigured} />
    </>
  );
}
