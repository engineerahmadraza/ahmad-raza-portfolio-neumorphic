'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import type { Message } from '@/lib/data';

export default function MessagesPanel({ dbConfigured }: { dbConfigured: boolean }) {
  const [messages, setMessages] = useState<Message[] | null>(null);

  const load = () => {
    fetch('/api/messages').then((r) => r.json()).then((d) => setMessages(d.data || []));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setMessages((prev) => (prev || []).filter((m) => m.id !== id));
      toast.success('Deleted.');
    } catch {
      toast.error('Delete failed.');
    }
  };

  if (messages === null) return <div className="text-faint text-sm text-center py-12">Loading…</div>;

  return (
    <div>
      {!dbConfigured && (
        <div className="neu-inset-sm px-4 py-3 mb-5 text-xs" style={{ color: 'var(--accent-text)' }}>
          Persistent storage isn&apos;t set up yet — contact form submissions won&apos;t be saved until it is.
        </div>
      )}
      <p className="eyebrow text-xs mb-5">{messages.length} message{messages.length === 1 ? '' : 's'}</p>
      <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
        {messages.map((m) => (
          <div key={m.id} className="neu-sm p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{m.name}</p>
                <a href={`mailto:${m.email}`} className="text-xs" style={{ color: 'var(--accent-text)' }}>{m.email}</a>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} className="neu-btn w-8 h-8 flex items-center justify-center" style={{ borderRadius: 999 }}>
                  <Mail size={12} />
                </a>
                <button onClick={() => handleDelete(m.id)} className="neu-btn w-8 h-8 flex items-center justify-center" style={{ borderRadius: 999 }}>
                  <Trash2 size={12} style={{ color: '#E05252' }} />
                </button>
              </div>
            </div>
            <p className="text-xs text-faint mb-1">{m.subject}</p>
            <p className="text-sm text-soft leading-relaxed">{m.message}</p>
            <p className="text-[10px] text-faint mt-2">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-faint text-xs text-center py-8">No messages yet.</p>}
      </div>
    </div>
  );
}
