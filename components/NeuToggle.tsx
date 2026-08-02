'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function NeuToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';
  const trackWidth = compact ? 92 : 120;
  const knobSize = compact ? 32 : 40;
  const pad = 6;
  const travel = trackWidth - knobSize - pad * 2;

  if (!mounted) {
    return <div style={{ width: trackWidth, height: compact ? 44 : 52 }} className="neu-toggle-track opacity-0" />;
  }

  return (
    <div className="flex items-center gap-3">
      <span className={`neu-toggle-label ${!isDark ? 'active' : ''}`}>
        LIGHT<br />MODE
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="neu-toggle-track"
        style={{ width: trackWidth, height: compact ? 44 : 52 }}
      >
        <motion.span
          className="neu-toggle-knob"
          style={{ width: knobSize, height: knobSize, top: pad }}
          animate={{ x: isDark ? travel + pad - 6 : 0 }}
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </button>

      <span className={`neu-toggle-label ${isDark ? 'active' : ''}`}>
        DARK<br />MODE
      </span>
    </div>
  );
}
