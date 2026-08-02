'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Cpu } from 'lucide-react';
import type { Project } from '@/lib/data';
import { categories } from '@/lib/data';

export default function Projects({ items }: { items: Project[] }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? items : items.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-10">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Projects &amp; builds
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-medium transition-all ${filter === cat ? 'neu-inset-sm' : 'neu-sm'}`}
              style={{ color: filter === cat ? 'var(--accent-text)' : undefined, borderRadius: 999 }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="neu p-6 flex flex-col neu-hover-lift transition-transform group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="neu-circle w-14 h-14 flex items-center justify-center shrink-0">
                    {project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image} alt="" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <Cpu size={22} style={{ color: project.color }} />
                    )}
                  </div>
                  {project.featured && <span className="neu-chip text-[10px]">Featured</span>}
                </div>

                <span className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: project.color }}>
                  {project.category}
                </span>
                <h3 className="display-heading text-base mb-2 leading-snug">{project.title}</h3>
                <p className="text-soft text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full text-faint" style={{ background: 'var(--bg-elevated)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: project.color }}>
                  View project
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-faint text-sm text-center py-16">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
