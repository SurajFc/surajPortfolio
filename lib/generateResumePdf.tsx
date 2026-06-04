// Builds the resume PDF in-browser using @react-pdf/renderer.
// This module is only ever loaded via a dynamic import inside a click
// handler, so it stays out of the static (server) render.

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import { resumeData } from './resume'

const ACCENT = '#4f46e5'
const TEXT = '#1f2937'
const MUTED = '#6b7280'
const LINE = '#e5e7eb'

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 36,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.4,
  },
  name: { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#111827' },
  title: { fontSize: 12, color: ACCENT, marginTop: 2, marginBottom: 6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 8.5, color: MUTED },
  contactItem: { marginRight: 10 },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  summary: { color: '#374151' },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemTitle: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111827' },
  itemRole: { fontSize: 9.5, color: ACCENT, marginTop: 1 },
  itemDate: { fontSize: 8.5, color: MUTED },
  block: { marginBottom: 9 },
  bulletRow: { flexDirection: 'row', marginTop: 2.5, paddingRight: 4 },
  bulletDot: { color: ACCENT, marginRight: 5 },
  bulletText: { flex: 1, color: '#374151' },
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillCategory: { width: 95, fontFamily: 'Helvetica-Bold', color: '#111827' },
  skillItems: { flex: 1, color: '#374151' },
  projectName: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827' },
  projectTech: { fontSize: 8.5, color: ACCENT, marginTop: 1 },
  projectDesc: { color: '#374151', marginTop: 1.5 },
  certRow: { flexDirection: 'row', marginTop: 2.5 },
})

export function ResumeDocument() {
  const d = resumeData
  return (
    <Document
      title={`${d.name} — Resume`}
      author={d.name}
      subject={d.title}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{d.name}</Text>
          <Text style={styles.title}>{d.title}</Text>
          <View style={styles.contactRow}>
            <Link src={`mailto:${d.contact.email}`} style={styles.contactItem}>
              {d.contact.email}
            </Link>
            <Link src={`https://${d.contact.github}`} style={styles.contactItem}>
              {d.contact.github}
            </Link>
            <Link src={`https://${d.contact.linkedin}`} style={styles.contactItem}>
              {d.contact.linkedin}
            </Link>
            <Link src={`https://${d.contact.stackoverflow}`} style={styles.contactItem}>
              {d.contact.stackoverflow}
            </Link>
          </View>
        </View>

        {/* Summary */}
        <Text style={styles.sectionHeading}>Summary</Text>
        <Text style={styles.summary}>{d.summary}</Text>

        {/* Experience */}
        <Text style={styles.sectionHeading}>Experience</Text>
        {d.experience.map((exp) => (
          <View key={exp.company} style={styles.block} wrap={false}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{exp.company}</Text>
              <Text style={styles.itemDate}>{exp.date}</Text>
            </View>
            <Text style={styles.itemRole}>{exp.role}</Text>
            {exp.bullets.map((bullet, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionHeading}>Projects</Text>
        {d.projects.map((proj) => (
          <View key={proj.name} style={styles.block} wrap={false}>
            <Text style={styles.projectName}>{proj.name}</Text>
            <Text style={styles.projectTech}>{proj.tech}</Text>
            <Text style={styles.projectDesc}>{proj.description}</Text>
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionHeading}>Education</Text>
        {d.education.map((edu) => (
          <View key={edu.school} style={styles.block} wrap={false}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{edu.school}</Text>
              <Text style={styles.itemDate}>{edu.date}</Text>
            </View>
            <Text style={styles.itemRole}>{edu.degree}</Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionHeading}>Skills</Text>
        {d.skills.map((group) => (
          <View key={group.category} style={styles.skillRow}>
            <Text style={styles.skillCategory}>{group.category}</Text>
            <Text style={styles.skillItems}>{group.items}</Text>
          </View>
        ))}

        {/* Certifications */}
        <Text style={styles.sectionHeading}>Certifications</Text>
        {d.certifications.map((cert, i) => (
          <View key={i} style={styles.certRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>{cert}</Text>
          </View>
        ))}
      </Page>
    </Document>
  )
}

export async function generateResumePdf(): Promise<Blob> {
  return pdf(<ResumeDocument />).toBlob()
}
