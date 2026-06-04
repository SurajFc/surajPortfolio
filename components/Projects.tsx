'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './SectionHeading'

const projects = [
  {
    title: 'PeriopMD',
    image: '/images/PeriopMD.png',
    tech: ['ReactJS', 'Redux', 'MaterialUI', 'Stripe'],
    description:
      'A medical portal where hospitals and individual practitioners register via subscription. Provides test recommendations based on conditions and age, with custom test and condition creation.',
    link: 'https://practitioner.periopmd.org',
    glow: 'group-hover:shadow-blue-500/20',
    border: 'hover:border-blue-500/40',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  },
  {
    title: 'TTA Connect',
    image: '/images/TTAConnect.png',
    tech: ['ReactJS', 'Redux', 'MSAL', 'Twilio', 'JWT'],
    description:
      "World's largest training solutions provider. Built a CMS and Chat Support System, integrated Twilio for real-time talent-client chat, and Azure for secure authorization.",
    link: 'https://ttaconnect.com/',
    glow: 'group-hover:shadow-purple-500/20',
    border: 'hover:border-purple-500/40',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  },
  {
    title: 'Trabus RippleGo',
    image: '/images/trabus.png',
    tech: ['ReactJS', 'Redux', 'GraphQL'],
    description:
      'Real-time river navigation tracking app delivering route guidance and instant alerts on river conditions, navigation hazards, and bridge clearances via a GraphQL-driven interface.',
    link: 'https://trabus.com/ripplego',
    glow: 'group-hover:shadow-emerald-500/20',
    border: 'hover:border-emerald-500/40',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  {
    title: 'WellPro',
    image: '/images/project.jpg',
    tech: ['ReactJS', 'TypeScript', 'AI / LLM', 'NLP', 'HIPAA SaaS'],
    description:
      'An AI-native Intelligent Health Record (IHR) platform for personalized medicine practitioners. Integrates data from EMRs, labs, and wearables, using clinical LLMs and NLP to summarize patient history, analyze biomarkers, and guide tailored, data-driven wellness protocols.',
    link: 'https://wellpro.ai/',
    glow: 'group-hover:shadow-orange-500/20',
    border: 'hover:border-orange-500/40',
    badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.15 }}
      whileHover={{ y: -6 }}
      className={`group rounded-2xl overflow-hidden bg-white/5 border border-white/10 ${project.border} transition-all duration-300 shadow-xl ${project.glow}`}
    >
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 group-hover:opacity-60 transition-opacity duration-300" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`text-xs px-2.5 py-1 rounded-full border ${project.badge}`}
            >
              {t}
            </span>
          ))}
        </div>
        {project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium group/link"
          >
            View Project
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
        )}
        {project.link === '#' && (
          <span className="text-sm text-slate-600 italic">Coming soon</span>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading number="04" title="Projects" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
