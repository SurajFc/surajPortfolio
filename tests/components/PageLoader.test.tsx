import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import PageLoader from '@/components/PageLoader'

describe('PageLoader', () => {
  it('renders the loader initially', () => {
    render(<PageLoader />)
    expect(screen.getByText('ST')).toBeInTheDocument()
  })

  it('shows loading dots', () => {
    render(<PageLoader />)
    const dots = screen.getAllByText('', { selector: 'span.block' })
    expect(dots.length).toBe(3)
  })

  it('disappears after timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    render(<PageLoader />)
    expect(screen.getByText('ST')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(screen.queryByText('ST')).not.toBeInTheDocument()
    }, { timeout: 3000 })

    vi.useRealTimers()
  })

  it('has full-screen overlay styling', () => {
    render(<PageLoader />)
    const overlay = screen.getByText('ST').closest('.fixed')
    expect(overlay).toHaveClass('inset-0')
    expect(overlay).toHaveClass('z-[9999]')
  })
})
