// Builds the resume PDF in-browser using @react-pdf/renderer.
// This module is only ever loaded via a dynamic import inside a click
// handler, so it stays out of the static (server) render.

import {
  Document,
  Page,
  Text,
  View,
  Link,
  Image,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { resumeData } from './resume'
import { profilePhoto } from './profilePhoto'

// Brand palette (mirrors the site's indigo theme)
const HEADER_BG = '#1e1b4b' // deep indigo
const ACCENT = '#4f46e5' // indigo-600
const ACCENT_LIGHT = '#a5b4fc' // indigo-300
const HEADING = '#111827' // near-black
const BODY = '#374151' // gray-700
const MUTED = '#6b7280' // gray-500
const RULE = '#e5e7eb' // gray-200
const SIDEBAR_BG = '#f8fafc' // slate-50

const PAGE_PADDING_X = 0
const PAGE_PADDING_TOP = 0

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: BODY,
    lineHeight: 1.45,
    paddingBottom: 32,
  },

  /* Header band */
  header: {
    backgroundColor: HEADER_BG,
    paddingTop: 26,
    paddingBottom: 22,
    paddingHorizontal: 36,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: { flex: 1, paddingRight: 18 },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    objectFit: 'cover',
    border: `2.5 solid ${ACCENT_LIGHT}`,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 11,
    color: ACCENT_LIGHT,
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    fontSize: 8.5,
    color: '#cbd5e1',
  },
  contactItem: { color: '#cbd5e1', marginRight: 6 },
  contactSep: { color: ACCENT_LIGHT, marginRight: 6 },

  /* Two-column body */
  body: { flexDirection: 'row', paddingHorizontal: 36 },
  sidebar: { width: '34%', paddingRight: 18 },
  main: { width: '66%', paddingLeft: 18, borderLeftWidth: 1, borderLeftColor: RULE },

  /* Section headings */
  heading: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  headingRule: {
    height: 2,
    width: 26,
    backgroundColor: ACCENT,
    marginBottom: 8,
    marginTop: -4,
  },
  section: { marginBottom: 16 },

  summary: { color: BODY },

  /* Experience / education entries */
  block: { marginBottom: 11 },
  entryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  entryTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: HEADING },
  entryRole: { fontSize: 9.5, color: ACCENT, marginTop: 1.5 },
  entryDate: { fontSize: 8, color: MUTED, fontFamily: 'Helvetica-Bold' },
  bulletRow: { flexDirection: 'row', marginTop: 3, paddingRight: 2 },
  bulletDot: { color: ACCENT, marginRight: 5, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, color: BODY },

  /* Projects */
  projectName: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: HEADING },
  projectTech: { fontSize: 8, color: ACCENT, marginTop: 1, fontFamily: 'Helvetica-Oblique' },
  projectDesc: { color: BODY, marginTop: 2 },

  /* Sidebar items */
  sidebarBlock: { marginBottom: 5 },
  skillCategory: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: HEADING,
    marginBottom: 1.5,
  },
  skillItems: { color: BODY, fontSize: 8.8 },
  eduSchool: { fontSize: 9.2, fontFamily: 'Helvetica-Bold', color: HEADING },
  eduDegree: { fontSize: 8.8, color: ACCENT, marginTop: 1 },
  eduDate: { fontSize: 8, color: MUTED, marginTop: 1 },
  certRow: { flexDirection: 'row', marginBottom: 4 },
  certText: { flex: 1, color: BODY, fontSize: 8.8 },
})

function Heading({ children }: { children: string }) {
  return (
    <View>
      <Text style={styles.heading}>{children}</Text>
      <View style={styles.headingRule} />
    </View>
  )
}

export function ResumeDocument() {
  const d = resumeData
  const contactItems = [
    { label: d.contact.email, href: `mailto:${d.contact.email}` },
    { label: d.contact.phone, href: `tel:${d.contact.phone.replace(/\s+/g, '')}` },
    { label: d.contact.github, href: `https://${d.contact.github}` },
    { label: d.contact.linkedin, href: `https://${d.contact.linkedin}` },
    { label: d.contact.stackoverflow, href: `https://${d.contact.stackoverflow}` },
  ]

  return (
    <Document title={`${d.name} — Resume`} author={d.name} subject={d.title}>
      <Page size="A4" style={styles.page}>
        {/* Header band */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{d.name}</Text>
            <Text style={styles.title}>{d.title}</Text>
            <View style={styles.contactRow}>
              {contactItems.map((c, i) => (
                <View key={c.href} style={{ flexDirection: 'row' }}>
                  {i > 0 && <Text style={styles.contactSep}>|</Text>}
                  <Link src={c.href} style={styles.contactItem}>
                    {c.label}
                  </Link>
                </View>
              ))}
            </View>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.photo} src={profilePhoto} />
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <View style={styles.section}>
              <Heading>Skills</Heading>
              {d.skills.map((group) => (
                <View key={group.category} style={styles.sidebarBlock}>
                  <Text style={styles.skillCategory}>{group.category}</Text>
                  <Text style={styles.skillItems}>{group.items}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Heading>Education</Heading>
              {d.education.map((edu) => (
                <View key={edu.school} style={styles.block} wrap={false}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduDate}>{edu.date}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Heading>Certifications</Heading>
              {d.certifications.map((cert, i) => (
                <View key={i} style={styles.certRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.certText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Main column */}
          <View style={styles.main}>
            <View style={styles.section}>
              <Heading>Profile</Heading>
              <Text style={styles.summary}>{d.summary}</Text>
            </View>

            <View style={styles.section}>
              <Heading>Experience</Heading>
              {d.experience.map((exp) => (
                <View key={exp.company} style={styles.block} wrap={false}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryTitle}>{exp.company}</Text>
                    <Text style={styles.entryDate}>{exp.date}</Text>
                  </View>
                  <Text style={styles.entryRole}>{exp.role}</Text>
                  {exp.bullets.map((bullet, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Heading>Projects</Heading>
              {d.projects.map((proj) => (
                <View key={proj.name} style={styles.block} wrap={false}>
                  <Text style={styles.projectName}>{proj.name}</Text>
                  <Text style={styles.projectTech}>{proj.tech}</Text>
                  <Text style={styles.projectDesc}>{proj.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateResumePdf(): Promise<Blob> {
  return pdf(<ResumeDocument />).toBlob()
}
