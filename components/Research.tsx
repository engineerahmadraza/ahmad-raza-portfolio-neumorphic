'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen } from 'lucide-react';
import type { ResearchPaper } from '@/lib/data';

export default function Research({ items }: { items: ResearchPaper[] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  if (items.length === 0) return null;

  return (
    <section id="research" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-14">
          <p className="eyebrow mb-3">Research</p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Papers &amp; publications
          </h2>
          <p className="text-soft text-sm mt-4 max-w-xl">
            Authored for academic and industrial clients as research consulting / ghost-writing services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="neu p-7"
            >
              <div className="flex items-start gap-4">
                <div className="neu-circle w-11 h-11 flex items-center justify-center shrink-0">
                  <BookOpen size={16} style={{ color: paper.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-snug mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-xs font-medium" style={{ color: paper.color }}>{paper.journal}</span>
                    <span className="text-xs text-faint">{paper.year}</span>
                  </div>
                  <p className="text-soft text-xs leading-relaxed mb-4">{paper.abstract}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full text-faint" style={{ background: 'var(--bg-elevated)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-medium" style={{ color: paper.color }}>{paper.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
