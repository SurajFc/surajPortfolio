import { describe, it, expect } from 'vitest'
import { resumeData } from '@/lib/resume'

describe('resumeData', () => {
  it('has required top-level fields', () => {
    expect(resumeData.name).toBeTruthy()
    expect(resumeData.title).toBeTruthy()
    expect(resumeData.summary).toBeTruthy()
    expect(resumeData.contact).toBeDefined()
  })

  it('has valid contact information', () => {
    const { contact } = resumeData
    expect(contact.email).toContain('@')
    expect(contact.github).toContain('github.com')
    expect(contact.linkedin).toContain('linkedin.com')
  })

  it('has at least one experience entry', () => {
    expect(resumeData.experience.length).toBeGreaterThan(0)
    resumeData.experience.forEach((exp) => {
      expect(exp.company).toBeTruthy()
      expect(exp.role).toBeTruthy()
      expect(exp.date).toBeTruthy()
      expect(exp.bullets.length).toBeGreaterThan(0)
    })
  })

  it('has at least one project entry', () => {
    expect(resumeData.projects.length).toBeGreaterThan(0)
    resumeData.projects.forEach((proj) => {
      expect(proj.name).toBeTruthy()
      expect(proj.tech).toBeTruthy()
      expect(proj.description).toBeTruthy()
    })
  })

  it('has at least one education entry', () => {
    expect(resumeData.education.length).toBeGreaterThan(0)
    resumeData.education.forEach((edu) => {
      expect(edu.school).toBeTruthy()
      expect(edu.degree).toBeTruthy()
      expect(edu.date).toBeTruthy()
    })
  })

  it('has at least one skill category', () => {
    expect(resumeData.skills.length).toBeGreaterThan(0)
    resumeData.skills.forEach((skill) => {
      expect(skill.category).toBeTruthy()
      expect(skill.items).toBeTruthy()
    })
  })

  it('has at least one certification', () => {
    expect(resumeData.certifications.length).toBeGreaterThan(0)
    resumeData.certifications.forEach((cert) => {
      expect(cert).toBeTruthy()
    })
  })

  it('exported type matches data shape', () => {
    const data = resumeData
    expect(typeof data).toBe('object')
    expect(Array.isArray(data.experience)).toBe(true)
    expect(Array.isArray(data.projects)).toBe(true)
    expect(Array.isArray(data.education)).toBe(true)
    expect(Array.isArray(data.skills)).toBe(true)
    expect(Array.isArray(data.certifications)).toBe(true)
  })
})
