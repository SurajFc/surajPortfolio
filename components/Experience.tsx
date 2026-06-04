'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'

const experiences = [
  {
    company: 'Mindbrowser Inc',
    role: 'Software Engineer (Remote)',
    date: 'April 2021 – Present',
    gradient: 'from-indigo-500 to-purple-500',
    dot: 'bg-indigo-500',
    bullets: [
      'Designed and developed a large-scale web application with 200+ responsive pages using ReactJS',
      'Collaborated with client R&D teams to refine software designs and deliver innovative solutions',
      'Facilitated integration of multiple third-party and backend APIs coordinating with the backend team',
      'Led project development to ensure smooth and timely deliveries',
      'Mentored junior developers and conducted code reviews for team members',
    ],
  },
  {
    company: 'Macco Robotics',
    role: 'Vue.js Intern (Remote)',
    date: 'July 2020 – October 2020',
    gradient: 'from-cyan-500 to-blue-500',
    dot: 'bg-cyan-500',
    bullets: [
      'Coordinated with backend team to integrate multiple third-party and backend APIs ensuring seamless data flow',
      'Converted UI designs into Vue.js components utilizing Vuetify for enhanced styling and functionality',
    ],
  },
  {
    company: 'Agile Computers',
    role: 'Python Trainee',
    date: 'January 2019 – June 2019',
    gradient: 'from-emerald-500 to-teal-500',
    dot: 'bg-emerald-500',
    bullets: [
      'Developed applications using Django and related Python technologies',
    ],
  },
]

function ExperienceItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-3 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      <div
        className={`absolute left-0 top-2.5 -translate-x-[5px] w-2.5 h-2.5 rounded-full ${exp.dot} shadow-lg`}
      />

      <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
            <p
              className={`text-sm font-medium mt-0.5 bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}
            >
              {exp.role}
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
            {exp.date}
          </span>
        </div>
        <ul className="space-y-2">
          {exp.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
              <span className="text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="02" title="Experience" />
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
