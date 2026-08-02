'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const education = [
  { degree: 'B.E. Mechatronics & Control Systems', school: 'University of Engineering & Technology, Lahore', year: '2021 – 2025' },
  { degree: 'F.Sc Pre-Engineering', school: 'The Hope College of Science', year: '2017 – 2019' },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-14">
          <p className="eyebrow mb-3">About</p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            The engineer behind the systems
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 neu p-8"
          >
            <div className="flex items-start gap-5 mb-6">
              <div className="neu-circle w-16 h-16 flex items-center justify-center shrink-0">
                <span className="display-heading text-lg" style={{ color: 'var(--accent-text)' }}>AR</span>
              </div>
              <div>
                <h3 className="display-heading text-xl">Ahmad Raza</h3>
                <p className="text-sm mt-0.5" style={{ color: 'var(--accent-text)' }}>{siteConfig.title}</p>
                <div className="flex items-center gap-1.5 text-faint text-xs mt-2">
                  <MapPin size={11} />
                  {siteConfig.location}
                </div>
              </div>
            </div>

            <p className="text-soft text-sm leading-relaxed mb-4">
              Throughout my career, I've led projects from concept to completion — designing automatic
              systems, coding microcontrollers, and integrating IoT for enhanced performance, with a
              proven track record of managing timelines and budgets under strict deadlines.
            </p>
            <p className="text-soft text-sm leading-relaxed">
              Currently contributing to FMCG beverage line automation at Projexon Engineering Solutions,
              while maintaining an active freelance practice on Upwork and Fiverr, serving clients across
              15+ countries with AI/ML models, robotics simulations, and embedded system design.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-7">
              <a href={`mailto:${siteConfig.email}`} className="neu-sm flex items-center gap-3 px-4 py-3 neu-hover-lift transition-transform">
                <Mail size={14} style={{ color: 'var(--accent-text)' }} />
                <span className="text-xs text-soft truncate">{siteConfig.email}</span>
              </a>
              <a href={`tel:${siteConfig.phone}`} className="neu-sm flex items-center gap-3 px-4 py-3 neu-hover-lift transition-transform">
                <Phone size={14} style={{ color: 'var(--accent-text)' }} />
                <span className="text-xs text-soft">{siteConfig.phone}</span>
              </a>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="neu p-7 flex-1"
            >
              <p className="eyebrow mb-5">Education</p>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.degree}>
                    <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)' }}>{edu.degree}</p>
                    <p className="text-soft text-xs mt-1">{edu.school}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--accent-text)' }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="neu p-7"
            >
              <p className="eyebrow mb-4">Find me on</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Upwork — Top Rated', href: siteConfig.upwork },
                  { label: 'Fiverr — Level 2', href: siteConfig.fiverr },
                  { label: 'LinkedIn', href: siteConfig.linkedin },
                  { label: 'Freelancer.com', href: siteConfig.freelancer },
                ].map((p) => (
                  <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group text-sm text-soft hover:text-[var(--ink)] transition-colors">
                    {p.label}
                    <ArrowUpRight size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
