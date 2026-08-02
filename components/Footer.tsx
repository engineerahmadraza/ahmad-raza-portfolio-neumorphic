'use client';

import { siteConfig } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 px-6">
      <div className="max-w-7xl mx-auto neu-sm px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="display-heading text-sm">Ahmad Raza</div>
          <p className="text-faint text-[11px] mt-0.5">Mechatronics Engineer — Lahore, Pakistan</p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { label: 'LI', href: siteConfig.linkedin },
            { label: 'UP', href: siteConfig.upwork },
            { label: 'FV', href: siteConfig.fiverr },
            { label: 'FB', href: siteConfig.facebook },
            { label: 'FL', href: siteConfig.freelancer },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="neu-circle w-9 h-9 flex items-center justify-center text-[10px] font-bold text-faint hover:text-[var(--accent-text)] transition-colors">
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-faint text-[11px] text-center md:text-right">© {year} Ahmad Raza</p>
      </div>
    </footer>
  );
}
