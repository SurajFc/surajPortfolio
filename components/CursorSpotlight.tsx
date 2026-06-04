'use client'

import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full opacity-0 md:opacity-100 transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
      }}
    />
  )
}
