import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
    expect(screen.getByText(/Suraj Thapa/)).toBeInTheDocument()
  })

  it('renders all social links', () => {
    render(<Footer />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Stack Overflow')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('social links open in new tab', () => {
    render(<Footer />)
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('social links have correct hrefs', () => {
    render(<Footer />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/SurajFc')
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/suraj4/')
  })

  it('renders as a footer element', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })
})
