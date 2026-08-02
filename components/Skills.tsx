'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '@/lib/data';

const tools = [
  'AutoCAD', 'SolidWorks', 'MATLAB', 'Simulink', 'Abaqus', 'Arduino', 'ESP32',
  'PIC18', 'Tiva C', 'Blynk IoT', 'PLC', 'HMI', 'SCADA', 'Python', 'TensorFlow',
  'C/C++', 'C#', 'SQL Server', 'KHS', 'Krones', 'Tetra Pak', 'Sidel', 'MAC Valves', 'CNC',
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-14">
          <p className="eyebrow mb-3">Capabilities</p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Tools of the trade
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1 }}
              className="neu p-7"
            >
              <h3 className="display-heading text-base mb-6">{group.category}</h3>
              <div className="space-y-5">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-soft text-sm">{skill.name}</span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>{skill.level}%</span>
                    </div>
                    <div className="neu-track">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: gi * 0.1 + si * 0.06, ease: 'easeOut' }}
                        className="neu-track-fill"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <p className="eyebrow mb-5">Tools &amp; technologies</p>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((tech) => (
              <span key={tech} className="neu-chip">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
