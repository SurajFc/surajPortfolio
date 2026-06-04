'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Line = { type: 'input' | 'output' | 'error'; text: string }

const RESPONSES: Record<string, string[]> = {
  whoami: [
    '  Suraj Thapa — Software Engineer',
    '  5+ years building full-stack web & mobile applications.',
    '  Currently @ Mindbrowser Inc (Remote).',
    '  Based in India · Open to global opportunities.',
  ],
  skills: [
    '  Frontend   → React, TypeScript, Next.js, Vue.js, Tailwind',
    '  Backend    → Django, DRF, NestJS, Node.js, GraphQL',
    '  Mobile     → React Native, Flutter, Dart',
    '  AI & ML    → LLM Integration, NLP, OpenAI API, FHIR R4',
    '  Databases  → PostgreSQL, MongoDB, Redis, Elasticsearch',
    '  DevOps     → AWS, Docker, Firebase, Git, Turborepo',
  ],
  projects: [
    '  1. WellPro       AI health records platform   (ReactJS, LLM, NLP)',
    '  2. PeriopMD      Medical subscription portal  (Stripe, MaterialUI)',
    '  3. TTA Connect   Training marketplace          (Twilio, MSAL, JWT)',
    '  4. RippleGo      River navigation tracker      (GraphQL, Redux)',
  ],
  experience: [
    '  Mindbrowser Inc   · Software Engineer    Apr 2021 – Present',
    '  Macco Robotics    · Vue.js Intern         Jul 2020 – Oct 2020',
    '  Agile Computers   · Python Trainee        Jan 2019 – Jun 2019',
  ],
  education: [
    '  MCA · Bhai Parmanand Institute of Business Studies  (2017–2019)',
    '  BCA · Vivekananda Institute of Professional Studies (2014–2017)',
  ],
  contact: [
    '  Email     → surajthapafc@gmail.com',
    '  LinkedIn  → linkedin.com/in/suraj4',
    '  GitHub    → github.com/SurajFc',
    '  Schedule  → calendly.com/surajthapafc',
  ],
  resume: [
    '  Preparing your download...',
    '  CV will download in a moment.',
  ],
  help: [
    '  Available commands:',
    '  whoami      Who is Suraj?',
    '  skills      Tech stack overview',
    '  projects    Featured projects',
    '  experience  Work history',
    '  education   Academic background',
    '  contact     Get in touch',
    '  resume      Download CV',
    '  clear       Clear terminal',
  ],
}

const BOOT_LINES = [
  'Suraj Portfolio OS v2.0.0',
  'Type \'help\' to see available commands.',
  '',
]

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [booted, setBooted] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence
  useEffect(() => {
    let i = 0
    const tick = () => {
      if (i < BOOT_LINES.length) {
        const text = BOOT_LINES[i]
        setLines((prev) => [...prev, { type: 'output', text }])
        i++
        setTimeout(tick, 120)
      } else {
        setBooted(true)
      }
    }
    tick()
  }, [])

  useEffect(() => {
    // Scroll only the terminal body, never the page (scrollIntoView would bubble to window)
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [lines])

  const runCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    setLines((prev) => [...prev, { type: 'input', text: `$ ${cmd}` }])
    setHistory((h) => [cmd, ...h].slice(0, 50))
    setHistIdx(-1)

    if (trimmed === 'clear') {
      setLines([])
      return
    }
    if (trimmed === '') return

    const response = RESPONSES[trimmed]
    if (response) {
      if (trimmed === 'resume') {
        setLines((prev) => [...prev, ...response.map((t) => ({ type: 'output' as const, text: t }))])
        const { generateResumePdf } = await import('@/lib/generateResumePdf')
        const blob = await generateResumePdf()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Suraj_Thapa_CV.pdf'
        a.click()
        URL.revokeObjectURL(url)
      } else {
        setLines((prev) => [...prev, ...response.map((t) => ({ type: 'output' as const, text: t }))])
      }
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'error', text: `  command not found: ${trimmed}. Type 'help' for options.` },
      ])
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="block w-full max-w-2xl mx-auto mt-8 sm:mt-10"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 rounded-t-xl border border-white/10 border-b-0">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-zinc-400 font-mono">suraj@portfolio — terminal</span>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="bg-zinc-900/95 border border-white/10 border-t-0 rounded-b-xl p-3 sm:p-4 h-44 sm:h-64 overflow-y-auto font-mono text-xs sm:text-sm cursor-text">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'input'
                ? 'text-indigo-400 mb-0.5'
                : line.type === 'error'
                ? 'text-red-400 mb-0.5'
                : 'text-zinc-300 mb-0.5'
            }
          >
            {line.text || ' '}
          </div>
        ))}

        {booted && (
          <div className="flex items-center gap-1 text-indigo-400">
            <span>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent outline-none text-zinc-100 caret-indigo-400 ml-1"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
