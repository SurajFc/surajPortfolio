// Single source of truth for the dynamically-generated resume PDF.
// Edit values here and the downloadable CV updates automatically.

export const resumeData = {
  name: 'Suraj Thapa',
  title: 'Software Engineer',
  contact: {
    email: 'surajthapafc@gmail.com',
    phone: '+91 9818479189',
    github: 'github.com/SurajFc',
    linkedin: 'linkedin.com/in/suraj4',
    stackoverflow: 'stackoverflow.com/users/12359814/surajfc',
    portfolio: 'surajfc.github.io/surajPortfolio',
  },
  summary:
    'Versatile software engineer with 5+ years of industry experience, having successfully delivered complex technical projects across front-end and back-end development. A collaborative team member and effective problem solver seeking to contribute to a challenging environment.',
  experience: [
    {
      company: 'Mindbrowser Inc',
      role: 'Software Engineer (Remote)',
      date: 'April 2021 – Present',
      bullets: [
        'Designed and developed a large-scale web application with 200+ responsive pages using ReactJS.',
        'Collaborated with client R&D teams to refine software designs and deliver innovative solutions.',
        'Facilitated integration of multiple third-party and backend APIs coordinating with the backend team.',
        'Led project development to ensure smooth and timely deliveries.',
        'Mentored junior developers and conducted code reviews for team members.',
      ],
    },
    {
      company: 'Macco Robotics',
      role: 'Vue.js Intern (Remote)',
      date: 'July 2020 – October 2020',
      bullets: [
        'Coordinated with the backend team to integrate multiple third-party and backend APIs, ensuring seamless data flow.',
        'Converted UI designs into Vue.js components utilizing Vuetify for enhanced styling and functionality.',
      ],
    },
    {
      company: 'Agile Computers',
      role: 'Python Trainee',
      date: 'January 2019 – June 2019',
      bullets: ['Developed applications using Django and related Python technologies.'],
    },
  ],
  projects: [
    {
      name: 'WellPro',
      tech: 'ReactJS, TypeScript, AI/LLM, NLP',
      description:
        'AI-native Intelligent Health Record (IHR) integrating EMRs, labs, and wearables; uses clinical LLMs and NLP to guide personalized wellness protocols.',
    },
    {
      name: 'PeriopMD',
      tech: 'ReactJS, Redux, MaterialUI, Stripe',
      description:
        'Medical subscription portal for hospitals and practitioners with AI-driven test recommendations based on conditions and age.',
    },
    {
      name: 'TTA Connect',
      tech: 'ReactJS, Redux, MSAL, Twilio, JWT',
      description:
        'Training marketplace with CMS and real-time Twilio chat between talent and clients, secured via JWT and Azure authorization.',
    },
    {
      name: 'Trabus RippleGo',
      tech: 'ReactJS, Redux, GraphQL',
      description:
        'Real-time river navigation tracker delivering route guidance and instant hazard alerts via a GraphQL interface.',
    },
  ],
  education: [
    {
      school: 'Bhai Parmanand Institute of Business Studies',
      degree: 'Masters of Computer Application',
      date: 'Aug 2017 – July 2019',
    },
    {
      school: 'Vivekananda Institute of Professional Studies',
      degree: 'Bachelors of Computer Application',
      date: 'Aug 2014 – July 2017',
    },
  ],
  skills: [
    { category: 'Frontend',       items: 'JavaScript, TypeScript, React, Vue.js, Next.js, HTML, CSS, Redux, Tailwind CSS, React Query',       pdfItems: 'JS, TS, React, Vue.js, Next.js, HTML/CSS, Redux, Tailwind, React Query' },
    { category: 'Backend',        items: 'Python, Django, Django REST Framework, NestJS, Node.js, GraphQL, WebSockets, Celery, JWT',           pdfItems: 'Python, Django, DRF, NestJS, Node.js, GraphQL, WebSockets, JWT' },
    { category: 'Mobile',         items: 'React Native, Flutter, Dart' },
    { category: 'Databases',      items: 'PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch' },
    { category: 'AI & ML',        items: 'LLM Integration, NLP, Sentiment Analysis, OpenAI API, SMART on FHIR, FHIR R4',                     pdfItems: 'LLM Integration, NLP, Sentiment Analysis, OpenAI API, FHIR R4' },
    { category: 'Tools & DevOps', items: 'AWS, Firebase, Docker, Git/GitHub, Turborepo, Stripe, Twilio, Web3, Jenkins, Figma, Postman',       pdfItems: 'AWS, Firebase, Docker, Git/GitHub, Stripe, Twilio, Figma, Jira' },
  ],
  certifications: [
    'Red Hat Certified System Administrator (RHCSA) — Red Hat, August 2018 (ID: 180-177-776)',
    'The Complete Python Bootcamp — Udemy',
    'Complete React Developer in 2024 — Udemy',
    'The Complete Flutter & Dart Development Bootcamp — Udemy',
    'Django REST Framework — Building RESTful APIs — Udemy',
    'Node.js: The Complete Guide (NestJS, GraphQL, Deno) — Udemy',
  ],
}

export type ResumeData = typeof resumeData
