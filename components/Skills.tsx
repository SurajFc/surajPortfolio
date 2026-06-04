'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useTilt } from '@/lib/useTilt'

const skillCategories = [
  {
    name: 'Frontend',
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20',
    skills: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js', 'HTML', 'CSS', 'Redux', 'Tailwind CSS', 'React Query'],
  },
  {
    name: 'Backend',
    dot: 'bg-purple-400',
    badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20',
    skills: ['Python', 'Django', 'Django REST Framework', 'NestJS', 'Node.js', 'GraphQL', 'WebSockets', 'Celery', 'JWT'],
  },
  {
    name: 'Mobile',
    dot: 'bg-pink-400',
    badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-300 border-pink-500/20',
    skills: ['React Native', 'Flutter', 'Dart'],
  },
  {
    name: 'Databases',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    name: 'AI & ML',
    dot: 'bg-violet-400',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20',
    skills: ['LLM Integration', 'NLP', 'Sentiment Analysis', 'OpenAI API', 'SMART on FHIR', 'FHIR R4'],
  },
  {
    name: 'Tools & DevOps',
    dot: 'bg-orange-400',
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20',
    skills: ['AWS', 'Firebase', 'Docker', 'Git/GitHub', 'Turborepo', 'Figma', 'Stripe', 'Twilio', 'Web3', 'Jenkins', 'Postman', 'Jira'],
  },
]

function SkillCard({ cat, catIndex, isInView }: { cat: (typeof skillCategories)[0]; catIndex: number; isInView: boolean }) {
  const tilt = useTilt(6)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
      {...tilt}
      className="p-6 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2.5 h-2.5 rounded-full ${cat.dot}`} />
        <h3 className="text-slate-900 dark:text-white font-semibold">{cat.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: catIndex * 0.1 + i * 0.04 }}
            className={`text-sm px-3 py-1 rounded-full border ${cat.badge}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="05" title="Skills" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <SkillCard key={cat.name} cat={cat} catIndex={catIndex} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
