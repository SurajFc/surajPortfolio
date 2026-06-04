'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'

const certifications = [
  {
    name: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    meta: 'August 2018 · Certificate ID: 180-177-776',
    icon: '🏅',
  },
  {
    name: 'Python Bootcamp',
    issuer: 'Udemy',
    meta: '',
    icon: '🐍',
  },
  {
    name: 'Complete React Developer',
    issuer: 'Udemy',
    meta: '',
    icon: '⚛️',
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="06" title="Certifications" />
        </motion.div>

        <div className="space-y-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all duration-300"
            >
              <span className="text-3xl">{cert.icon}</span>
              <div>
                <p className="text-white font-medium">{cert.name}</p>
                <p className="text-slate-500 text-sm mt-0.5">
                  {cert.issuer}
                  {cert.meta && ` · ${cert.meta}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
