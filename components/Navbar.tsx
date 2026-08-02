'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import NeuToggle from './NeuToggle';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="neu flex items-center justify-between gap-4 px-5 py-3" style={{ borderRadius: 999 }}>
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 shrink-0">
              <div className="neu-circle w-10 h-10 flex items-center justify-center">
                <span className="display-heading text-sm" style={{ color: 'var(--accent-text)' }}>AR</span>
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="display-heading text-sm">Ahmad Raza</div>
                <div className="text-faint text-[10px] tracking-[0.15em] uppercase">Mechatronics Engineer</div>
              </div>
            </a>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-soft hover:text-[var(--ink)] transition-colors rounded-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden md:block">
                <NeuToggle compact />
              </div>

              <button
                onClick={onAdminClick}
                aria-label="Admin login"
                className="neu-btn w-10 h-10 flex items-center justify-center"
                style={{ borderRadius: 999 }}
              >
                <ShieldCheck size={16} style={{ color: 'var(--accent-text)' }} />
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden neu-btn w-10 h-10 flex items-center justify-center"
                style={{ borderRadius: 999 }}
                aria-label="Open menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-24 left-4 right-4 z-40 lg:hidden"
          >
            <div className="neu-lg p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-soft hover:text-[var(--ink)] neu-btn text-center"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex justify-center pt-3">
                <NeuToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
