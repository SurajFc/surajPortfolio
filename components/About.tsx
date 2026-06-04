'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import DownloadResumeButton from './DownloadResumeButton'

const stats = [
  { label: 'Years Experience', value: '4+' },
  { label: 'Projects Delivered', value: '10+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Companies', value: '3' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="01" title="About Me" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              I am a versatile software engineer with{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">4+ years</span> of industry experience,
              having successfully delivered complex technical projects utilizing a variety of
              technologies across{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">front-end</span> and{' '}
              <span className="text-indigo-500 dark:text-indigo-400 font-medium">back-end</span> development.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mt-4">
              As a collaborative team member and effective problem solver, I am seeking an opportunity
              to contribute to a challenging environment where I can apply my skills and further my
              professional growth.
            </p>
            <div className="mt-8">
              <DownloadResumeButton className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-wait text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5">
                Download CV
              </DownloadResumeButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="p-6 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/40 transition-all duration-300"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
