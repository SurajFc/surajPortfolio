'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import DownloadResumeButton from './DownloadResumeButton'

const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'React Specialist',
  'Problem Solver',
]

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, roleIdx])

  return (
    <span>
      {displayed}
      <span className="inline-block w-0.5 h-6 md:h-8 bg-indigo-400 ml-0.5 align-middle animate-pulse" />
    </span>
  )
}

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!nameRef.current) return
    const chars = nameRef.current.querySelectorAll('.char')
    gsap.fromTo(
      chars,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, ease: 'power4.out', delay: 0.3 }
    )
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-5"
        >
          <p className="text-indigo-400 font-mono text-base md:text-lg tracking-widest">
            Hi there, I&apos;m
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to work
          </span>
        </motion.div>

        <h1
          ref={nameRef}
          aria-label="Suraj Thapa"
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 overflow-hidden leading-none"
        >
          {'Suraj'.split('').map((char, i) => (
            <span
              key={`s-${i}`}
              className="char inline-block bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
            >
              {char}
            </span>
          ))}
          <span className="char inline-block">&nbsp;</span>
          {'Thapa'.split('').map((char, i) => (
            <span
              key={`t-${i}`}
              className="char inline-block bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-xl md:text-3xl text-slate-400 mb-10 h-10 md:h-12 flex items-center justify-center"
        >
          <Typewriter />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <DownloadResumeButton className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-wait text-white rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5">
            Download CV
          </DownloadResumeButton>
          <a
            href="#projects"
            className="px-8 py-3 border border-indigo-500/40 hover:border-indigo-400 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500/10"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </motion.div>
    </section>
  )
}
