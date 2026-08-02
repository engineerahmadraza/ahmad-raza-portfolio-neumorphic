'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gauge } from 'lucide-react';
import type { Stats } from '@/lib/data';

const words = ['Mechatronics', 'Automation', 'Robotics', 'Embedded Systems', 'AI / ML'];

export default function Hero({ stats }: { stats: Stats }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);
  const [needleOn, setNeedleOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNeedleOn(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayText.length < word.length) {
        timeout = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 75);
      } else {
        timeout = setTimeout(() => setTyping(false), 1600);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, typing, wordIndex]);

  const statList = [
    { value: stats.stat1_value, label: stats.stat1_label },
    { value: stats.stat2_value, label: stats.stat2_label },
    { value: stats.stat3_value, label: stats.stat3_label },
    { value: stats.stat4_value, label: stats.stat4_label },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="ambient-blob w-[500px] h-[500px] -top-40 -left-40" style={{ background: 'var(--accent)' }} />
      <div className="ambient-blob w-[400px] h-[400px] bottom-0 right-0" style={{ background: 'var(--accent)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="neu-chip mb-8"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#4CAF50' }} />
            Available for freelance &amp; full-time work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="display-heading"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', lineHeight: 1.04 }}
          >
            Ahmad Raza builds
            <br />
            intelligent, physical
            <br />
            systems.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mt-6 h-8"
          >
            <span className="text-soft text-lg">Specializing in</span>
            <span className="font-semibold text-lg" style={{ color: 'var(--accent-text)', fontFamily: 'var(--font-display)' }}>
              {displayText}
            </span>
            <span className="w-[2px] h-6" style={{ background: 'var(--accent)', opacity: 0.7 }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-soft mt-6 max-w-lg leading-relaxed"
          >
            Industrial automation, beverage line engineering (KHS · Sidel · Krones · Tetra Pak),
            embedded systems, and AI-driven mechatronic solutions — turning complex engineering
            problems into dependable, efficient systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 mt-9"
          >
            <a href="#contact" className="neu-btn-accent px-7 py-3.5 font-semibold text-sm inline-flex items-center gap-2">
              Work with me
              <ArrowUpRight size={16} />
            </a>
            <a href="#projects" className="neu-btn px-7 py-3.5 font-semibold text-sm text-soft">
              View projects
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="grid grid-cols-4 gap-3 mt-12 max-w-lg"
          >
            {statList.map((s) => (
              <div key={s.label} className="neu-sm px-2 py-4 text-center">
                <div className="display-heading text-xl sm:text-2xl">{s.value}</div>
                <div className="text-faint text-[10px] leading-tight mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — signature gauge visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="neu-lg relative w-full max-w-md aspect-square flex items-center justify-center p-10"
          >
            <GaugeGraphic on={needleOn} />

            {/* Small satellite chip */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="neu-circle absolute -top-4 -right-4 w-16 h-16 flex items-center justify-center"
            >
              <Gauge size={22} style={{ color: 'var(--accent-text)' }} />
            </motion.div>

            <div className="neu-sm absolute -bottom-5 left-8 px-4 py-2">
              <span className="text-[10px] tracking-widest uppercase text-faint">System</span>
              <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Online</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function GaugeGraphic({ on }: { on: boolean }) {
  // Dial from -120deg to +120deg (240deg sweep), needle rests at 0deg (12 o'clock) initially,
  // sweeps to ~72deg (representing ~90% reading) once mounted.
  const restAngle = -120;
  const activeAngle = 72;

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Outer inset ring track */}
      <circle cx="150" cy="150" r="120" fill="none" stroke="var(--track)" strokeWidth="14" opacity="0.6" />
      {/* Progress arc */}
      <motion.circle
        cx="150"
        cy="150"
        r="120"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 120}
        initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
        animate={{ strokeDashoffset: on ? 2 * Math.PI * 120 * 0.22 : 2 * Math.PI * 120 }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
        transform="rotate(-90 150 150)"
      />
      {/* Tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = 150 + Math.cos(rad) * 100;
        const y1 = 150 + Math.sin(rad) * 100;
        const x2 = 150 + Math.cos(rad) * 92;
        const y2 = 150 + Math.sin(rad) * 92;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-faint)" strokeWidth="2" opacity="0.4" />;
      })}
      {/* Needle */}
      <motion.g
        initial={{ rotate: restAngle }}
        animate={{ rotate: on ? activeAngle : restAngle }}
        transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
        style={{ originX: '150px', originY: '150px' }}
      >
        <line x1="150" y1="150" x2="150" y2="65" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
      <circle cx="150" cy="150" r="14" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />

      {/* Center readout */}
      <text x="150" y="205" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--ink-soft)" letterSpacing="2">
        AHMAD RAZA
      </text>
      <text x="150" y="222" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--ink-faint)" letterSpacing="1.5">
        MECHATRONICS
      </text>
    </svg>
  );
}
