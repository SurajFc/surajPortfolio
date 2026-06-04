'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <SectionHeading number="07" title="Get In Touch" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-lg leading-relaxed mb-10"
        >
          I&apos;m currently open to new opportunities. Whether you have a question or just want
          to say hi — my inbox is always open!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10"
        >
          <form
            method="POST"
            action="https://formspree.io/f/mvgkgdal"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="Contact request from portfolio" />
            <div>
              <label className="block text-slate-400 text-sm mb-1.5 font-medium">
                Your Email
              </label>
              <input
                type="email"
                name="_replyto"
                required
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1.5 font-medium">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
