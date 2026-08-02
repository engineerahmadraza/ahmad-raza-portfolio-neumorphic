'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import type { ExperienceItem } from '@/lib/data';

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;
  const current = items[Math.min(active, items.length - 1)];

  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-14">
          <p className="eyebrow mb-3">Experience</p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-2 space-y-3"
          >
            {items.map((exp, i) => (
              <button
                key={exp.id}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 transition-all duration-300 ${active === i ? 'neu-inset' : 'neu-sm'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ fontFamily: 'var(--font-display)' }}>
                      {exp.company}
                    </div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: active === i ? 'var(--accent-text)' : 'var(--ink-faint)' }}>
                      {exp.role}
                    </div>
                  </div>
                  <ChevronRight size={14} className={`shrink-0 transition-transform ${active === i ? 'translate-x-0.5' : ''}`} style={{ color: 'var(--accent-text)', opacity: active === i ? 1 : 0.3 }} />
                </div>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="neu p-8 h-full"
              >
                <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                  <div>
                    <h3 className="display-heading text-xl">{current.role}</h3>
                    <p className="font-medium text-sm mt-1" style={{ color: current.color }}>{current.company}</p>
                  </div>
                  <span className="neu-chip capitalize">{current.type}</span>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-faint text-xs">
                    <Calendar size={11} /> {current.period}
                  </div>
                  <div className="flex items-center gap-1.5 text-faint text-xs">
                    <Briefcase size={11} /> {current.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-faint text-xs">
                    <MapPin size={11} /> {current.location}
                  </div>
                </div>

                <p className="text-soft text-sm leading-relaxed mb-6">{current.description}</p>

                <p className="eyebrow mb-3 text-xs">Key contributions</p>
                <ul className="space-y-2.5">
                  {current.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-soft">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: current.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
