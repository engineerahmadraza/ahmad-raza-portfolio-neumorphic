'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Stats } from '@/lib/data';

export default function StatsPanel({ dbConfigured, onChanged }: { dbConfigured: boolean; onChanged: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/stats').then((r) => r.json()).then((d) => setStats(d.data));
  }, []);

  const handleSave = async () => {
    if (!stats) return;
    setSaving(true);
    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
      if (!res.ok) throw new Error();
      toast.success('Stats updated.');
      onChanged();
    } catch {
      toast.error('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  if (!stats) return <div className="text-faint text-sm text-center py-12">Loading…</div>;

  const pairs: Array<[keyof Stats, keyof Stats]> = [
    ['stat1_value', 'stat1_label'],
    ['stat2_value', 'stat2_label'],
    ['stat3_value', 'stat3_label'],
    ['stat4_value', 'stat4_label'],
  ];

  return (
    <div>
      {!dbConfigured && (
        <div className="neu-inset-sm px-4 py-3 mb-5 text-xs" style={{ color: 'var(--accent-text)' }}>
          Persistent storage isn&apos;t set up yet — changes here won&apos;t save. See the README.
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {pairs.map(([valueKey, labelKey], i) => (
          <div key={valueKey} className="neu-sm p-4">
            <label className="block text-[10px] uppercase tracking-wide text-faint mb-1.5">Stat {i + 1} value</label>
            <input
              value={stats[valueKey]}
              onChange={(e) => setStats({ ...stats, [valueKey]: e.target.value })}
              className="neu-field w-full px-3 py-2 text-sm mb-3"
            />
            <label className="block text-[10px] uppercase tracking-wide text-faint mb-1.5">Stat {i + 1} label</label>
            <input
              value={stats[labelKey]}
              onChange={(e) => setStats({ ...stats, [labelKey]: e.target.value })}
              className="neu-field w-full px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={saving || !dbConfigured} className="neu-btn-accent w-full py-3 font-semibold text-sm mt-6 disabled:opacity-40">
        {saving ? 'Saving…' : 'Save stats'}
      </button>
    </div>
  );
}
