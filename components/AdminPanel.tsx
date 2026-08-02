'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Eye, EyeOff, LogOut, Briefcase, FolderKanban, BookOpen, BarChart3, Mail } from 'lucide-react';
import { toast } from 'sonner';
import CollectionManager, { FieldDef } from './admin/CollectionManager';
import StatsPanel from './admin/StatsPanel';
import MessagesPanel from './admin/MessagesPanel';
import { categories, experienceTypes } from '@/lib/data';

type Tab = 'projects' | 'experience' | 'research' | 'stats' | 'messages';

const projectFields: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text', placeholder: 'e.g. Smart Conveyor System' },
  { key: 'category', label: 'Category', type: 'select', options: categories.filter((c) => c !== 'All') },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'link', label: 'Project link', type: 'url', placeholder: 'https://...' },
  { key: 'image', label: 'Image URL (optional)', type: 'url', placeholder: 'https://...' },
  { key: 'tags', label: 'Tags', type: 'list', placeholder: 'e.g. Arduino' },
  { key: 'color', label: 'Accent color', type: 'color' },
  { key: 'featured', label: 'Featured', type: 'checkbox' },
];

const experienceFields: FieldDef[] = [
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'period', label: 'Period', type: 'text', placeholder: 'e.g. Aug 2025 – Present' },
  { key: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. 10 months' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'type', label: 'Type', type: 'select', options: experienceTypes },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'highlights', label: 'Key contributions', type: 'list', placeholder: 'Add a highlight' },
  { key: 'color', label: 'Accent color', type: 'color' },
];

const researchFields: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'journal', label: 'Journal / Publisher', type: 'text' },
  { key: 'year', label: 'Year', type: 'text' },
  { key: 'abstract', label: 'Abstract', type: 'textarea' },
  { key: 'tags', label: 'Tags', type: 'list', placeholder: 'e.g. Robotics' },
  { key: 'status', label: 'Status', type: 'text', placeholder: 'e.g. Published (Client)' },
  { key: 'color', label: 'Accent color', type: 'color' },
];

const tabs: Array<{ id: Tab; label: string; icon: any }> = [
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'research', label: 'Research', icon: BookOpen },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'messages', label: 'Messages', icon: Mail },
];

export default function AdminPanel({
  open,
  onClose,
  dbConfigured,
  initialLoggedIn = false,
}: {
  open: boolean;
  onClose: () => void;
  dbConfigured: boolean;
  initialLoggedIn?: boolean;
}) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [checking, setChecking] = useState(false);
  const [tab, setTab] = useState<Tab>('projects');

  useEffect(() => {
    if (open) {
      fetch('/api/auth/me').then((r) => r.json()).then((d) => setLoggedIn(d.loggedIn));
    }
  }, [open]);

  const handleLogin = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setLoggedIn(true);
      setPassword('');
      toast.success('Welcome back, Ahmad.');
    } catch (err: any) {
      toast.error(err.message || 'Incorrect password.');
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setLoggedIn(false);
    toast.success('Logged out.');
  };

  const refresh = () => router.refresh();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(20,20,25,0.6)', backdropFilter: 'blur(12px)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="neu-lg w-full max-w-2xl max-h-[88vh] overflow-hidden flex flex-col"
            style={{ background: 'var(--bg)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0" style={{ borderBottom: '1px solid var(--border-soft)' }}>
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={17} style={{ color: 'var(--accent-text)' }} />
                <span className="display-heading text-base">{loggedIn ? 'Admin panel' : 'Admin login'}</span>
              </div>
              <div className="flex items-center gap-2">
                {loggedIn && (
                  <button onClick={handleLogout} className="neu-btn px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
                    <LogOut size={11} /> Logout
                  </button>
                )}
                <button onClick={onClose} className="neu-btn w-9 h-9 flex items-center justify-center" style={{ borderRadius: 999 }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              {!loggedIn ? (
                <div className="max-w-xs mx-auto py-6">
                  <p className="text-soft text-sm text-center mb-6">Enter your admin password to manage the site.</p>
                  <div className="relative mb-4">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="Password"
                      className="neu-field w-full px-4 py-3 pr-12 text-sm"
                    />
                    <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-faint">
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button onClick={handleLogin} disabled={checking} className="neu-btn-accent w-full py-3 font-semibold text-sm disabled:opacity-50">
                    {checking ? 'Checking…' : 'Log in'}
                  </button>
                  <p className="text-faint text-[11px] text-center mt-5">
                    Default password is set via <code>ADMIN_PASSWORD</code> — change it in your Vercel project&apos;s
                    environment variables.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-all ${tab === t.id ? 'neu-inset-sm' : 'neu-sm'}`}
                        style={{ borderRadius: 999, color: tab === t.id ? 'var(--accent-text)' : undefined }}
                      >
                        <t.icon size={12} /> {t.label}
                      </button>
                    ))}
                  </div>

                  {tab === 'projects' && (
                    <CollectionManager
                      collection="projects"
                      fields={projectFields}
                      titleKey="title"
                      subtitleKey="category"
                      emptyItem={{ title: '', category: categories[1], description: '', link: '', image: '', tags: [], color: '#C8F000', featured: false }}
                      dbConfigured={dbConfigured}
                      onChanged={refresh}
                    />
                  )}
                  {tab === 'experience' && (
                    <CollectionManager
                      collection="experience"
                      fields={experienceFields}
                      titleKey="company"
                      subtitleKey="role"
                      emptyItem={{ company: '', role: '', period: '', duration: '', location: '', type: 'full-time', description: '', highlights: [], color: '#C8F000' }}
                      dbConfigured={dbConfigured}
                      onChanged={refresh}
                    />
                  )}
                  {tab === 'research' && (
                    <CollectionManager
                      collection="research"
                      fields={researchFields}
                      titleKey="title"
                      subtitleKey="journal"
                      emptyItem={{ title: '', journal: '', year: new Date().getFullYear().toString(), abstract: '', tags: [], status: 'Published (Client)', color: '#C8F000' }}
                      dbConfigured={dbConfigured}
                      onChanged={refresh}
                    />
                  )}
                  {tab === 'stats' && <StatsPanel dbConfigured={dbConfigured} onChanged={refresh} />}
                  {tab === 'messages' && <MessagesPanel dbConfigured={dbConfigured} />}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
