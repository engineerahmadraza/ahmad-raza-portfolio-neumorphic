import PortfolioApp from '@/components/PortfolioApp';
import { getCollection, getSingleton, isDbConfigured } from '@/lib/db';
import { defaultStats, defaultExperience, defaultProjects, defaultResearch } from '@/lib/data';

// Force dynamic rendering — without this, Next may cache this page at build
// time and admin edits would never show up for visitors without a redeploy.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [stats, experience, projects, research] = await Promise.all([
    getSingleton('stats', defaultStats),
    getCollection('experience', defaultExperience),
    getCollection('projects', defaultProjects),
    getCollection('research', defaultResearch),
  ]);

  return (
    <PortfolioApp
      stats={stats}
      experience={experience}
      projects={projects}
      research={research}
      dbConfigured={isDbConfigured()}
    />
  );
}
