'use client';

import { useState } from 'react';
import { Plus, Trash2, Pencil, X, Check } from 'lucide-react';
import { toast } from 'sonner';

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'color' | 'list' | 'checkbox' | 'select';
  options?: string[];
  placeholder?: string;
}

interface Props {
  collection: string;
  fields: FieldDef[];
  titleKey: string;
  subtitleKey?: string;
  emptyItem: Record<string, any>;
  dbConfigured: boolean;
  onChanged: () => void;
}

export default function CollectionManager({ collection, fields, titleKey, subtitleKey, emptyItem, dbConfigured, onChanged }: Props) {
  const [items, setItems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyItem);
  const [listItemInput, setListItemInput] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content/${collection}`);
      const data = await res.json();
      setItems(data.data || []);
    } catch {
      toast.error('Failed to load.');
    } finally {
      setLoading(false);
    }
  };

  if (items === null && !loading) load();

  const startAdd = () => {
    setForm(emptyItem);
    setEditingId(null);
    setMode('form');
  };

  const startEdit = (item: any) => {
    setForm(item);
    setEditingId(item.id);
    setMode('form');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/content/${collection}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setItems((prev) => (prev || []).filter((i) => i.id !== id));
      toast.success('Deleted.');
      onChanged();
    } catch {
      toast.error('Delete failed.');
    }
  };

  const handleSubmit = async () => {
    if (!form[titleKey]) {
      toast.error(`${fields.find((f) => f.key === titleKey)?.label || 'Title'} is required.`);
      return;
    }
    try {
      const url = editingId ? `/api/content/${collection}/${editingId}` : `/api/content/${collection}`;
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Save failed');

      if (editingId) {
        setItems((prev) => (prev || []).map((i) => (i.id === editingId ? data.data : i)));
      } else {
        setItems((prev) => [data.data, ...(prev || [])]);
      }
      toast.success(editingId ? 'Updated.' : 'Added.');
      setMode('list');
      onChanged();
    } catch (err: any) {
      toast.error(err.message || 'Save failed.');
    }
  };

  const addListChip = (key: string) => {
    const val = (listItemInput[key] || '').trim();
    if (!val) return;
    const current: string[] = form[key] || [];
    if (!current.includes(val)) {
      setForm({ ...form, [key]: [...current, val] });
    }
    setListItemInput({ ...listItemInput, [key]: '' });
  };

  const removeListChip = (key: string, val: string) => {
    setForm({ ...form, [key]: (form[key] || []).filter((v: string) => v !== val) });
  };

  if (loading || items === null) {
    return <div className="text-faint text-sm text-center py-12">Loading…</div>;
  }

  if (mode === 'list') {
    return (
      <div>
        {!dbConfigured && (
          <div className="neu-inset-sm px-4 py-3 mb-5 text-xs" style={{ color: 'var(--accent-text)' }}>
            Persistent storage isn&apos;t set up yet — you can preview this panel, but Add / Edit / Delete are
            disabled until storage is configured. See the README.
          </div>
        )}
        <div className="flex items-center justify-between mb-5">
          <p className="eyebrow text-xs">{items.length} item{items.length === 1 ? '' : 's'}</p>
          <button onClick={startAdd} disabled={!dbConfigured} className="neu-btn-accent px-4 py-2 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed">
            <Plus size={13} /> Add new
          </button>
        </div>
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.id} className="neu-sm flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-display)' }}>{item[titleKey]}</p>
                {subtitleKey && <p className="text-xs text-faint truncate">{item[subtitleKey]}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(item)} disabled={!dbConfigured} className="neu-btn w-8 h-8 flex items-center justify-center disabled:opacity-40" style={{ borderRadius: 999 }}>
                  <Pencil size={12} />
                </button>
                <button onClick={() => handleDelete(item.id)} disabled={!dbConfigured} className="neu-btn w-8 h-8 flex items-center justify-center disabled:opacity-40" style={{ borderRadius: 999 }}>
                  <Trash2 size={12} style={{ color: '#E05252' }} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-faint text-xs text-center py-8">Nothing here yet.</p>}
        </div>
      </div>
    );
  }

  // Form mode
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setMode('list')} className="text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
          ← Back
        </button>
        <p className="eyebrow text-xs">{editingId ? 'Edit item' : 'Add new item'}</p>
      </div>

      <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-faint mb-1.5 uppercase tracking-wide">{field.label}</label>

            {field.type === 'textarea' ? (
              <textarea
                rows={3}
                value={form[field.key] || ''}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="neu-field w-full px-3.5 py-2.5 text-sm resize-none"
              />
            ) : field.type === 'select' ? (
              <select
                value={form[field.key] || ''}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="neu-field w-full px-3.5 py-2.5 text-sm"
              >
                {(field.options || []).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'color' ? (
              <input
                type="color"
                value={form[field.key] || '#C8F000'}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="neu-field w-full h-11 cursor-pointer"
              />
            ) : field.type === 'checkbox' ? (
              <button
                type="button"
                onClick={() => setForm({ ...form, [field.key]: !form[field.key] })}
                className={`w-6 h-6 flex items-center justify-center ${form[field.key] ? '' : 'neu-inset-sm'}`}
                style={{ borderRadius: 8, background: form[field.key] ? 'var(--accent)' : undefined }}
              >
                {form[field.key] && <Check size={13} style={{ color: 'var(--accent-ink)' }} />}
              </button>
            ) : field.type === 'list' ? (
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={listItemInput[field.key] || ''}
                    onChange={(e) => setListItemInput({ ...listItemInput, [field.key]: e.target.value })}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addListChip(field.key); } }}
                    placeholder={field.placeholder || 'Type and press Enter'}
                    className="neu-field flex-1 px-3.5 py-2.5 text-sm"
                  />
                  <button type="button" onClick={() => addListChip(field.key)} className="neu-btn w-10 h-10 flex items-center justify-center shrink-0">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(form[field.key] || []).map((v: string) => (
                    <span key={v} className="neu-chip text-[11px]">
                      {v}
                      <button type="button" onClick={() => removeListChip(field.key, v)} className="ml-1 opacity-60 hover:opacity-100">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <input
                type={field.type === 'url' ? 'url' : 'text'}
                value={form[field.key] || ''}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="neu-field w-full px-3.5 py-2.5 text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="neu-btn-accent w-full py-3 font-semibold text-sm mt-6">
        {editingId ? 'Save changes' : 'Add item'}
      </button>
    </div>
  );
}
