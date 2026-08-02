'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { toast } from 'sonner';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      toast.success(
        data.saved === false
          ? "Message received — but storage isn't set up yet, so it wasn't saved. Email me directly for now."
          : "Message sent — I'll respond within 24 hours."
      );
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="ambient-blob w-[400px] h-[400px] bottom-0 left-1/3" style={{ background: 'var(--accent)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <p className="eyebrow mb-3 flex justify-center">Get in touch</p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Let&apos;s build something
          </h2>
          <p className="text-soft text-sm mt-4 max-w-xl mx-auto">
            Automation, embedded systems, AI/ML, or freelance engineering support — tell me about your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
              { icon: Phone, label: siteConfig.phone, href: `tel:${siteConfig.phone}` },
              { icon: MapPin, label: siteConfig.location, href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="neu-sm flex items-center gap-4 px-5 py-4 neu-hover-lift transition-transform">
                <div className="neu-circle w-10 h-10 flex items-center justify-center shrink-0">
                  <Icon size={15} style={{ color: 'var(--accent-text)' }} />
                </div>
                <span className="text-sm text-soft">{label}</span>
              </a>
            ))}

            <div className="neu p-6 mt-2">
              <p className="eyebrow mb-4 text-xs">Hire me on</p>
              <div className="space-y-2.5">
                {[
                  { name: 'Upwork', href: siteConfig.upwork },
                  { name: 'Fiverr', href: siteConfig.fiverr },
                  { name: 'Freelancer.com', href: siteConfig.freelancer },
                ].map((p) => (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-soft hover:text-[var(--ink)] transition-colors group">
                    {p.name}
                    <ArrowUpRight size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 neu p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="neu-field px-4 py-3 text-sm w-full"
              />
              <input
                type="email"
                placeholder="Email address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="neu-field px-4 py-3 text-sm w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="neu-field px-4 py-3 text-sm w-full mb-4"
            />
            <textarea
              placeholder="Tell me about your project *"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="neu-field px-4 py-3 text-sm w-full resize-none mb-6"
            />
            <button type="submit" disabled={sending} className="neu-btn-accent w-full py-3.5 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
