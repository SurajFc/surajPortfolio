# Suraj Thapa — Portfolio

A modern, animated personal portfolio built as a **statically-exported Next.js** site. Dark theme, glassmorphism UI, scroll-triggered motion, and a GSAP-animated hero.

🔗 **Live:** [surajthapa.vercel.app](https://surajthapa.vercel.app/) · [surajfc.github.io/surajPortfolio](https://surajfc.github.io/surajPortfolio/)

---

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | [Next.js 14](https://nextjs.org/) (App Router, static export) |
| Language     | TypeScript                                  |
| Styling      | [Tailwind CSS](https://tailwindcss.com/)    |
| Animation    | [Framer Motion](https://www.framer.com/motion/) (UI & scroll) + [GSAP](https://gsap.com/) (hero) |
| Icons        | [react-icons](https://react-icons.github.io/react-icons/) |
| Forms        | [Formspree](https://formspree.io/)          |

---

## Features

- ⚡ **Static export** — zero server, deployable to any static host (GitHub Pages, Netlify, Vercel)
- 🎬 **GSAP hero animation** — character-by-character reveal of the name
- 📜 **Scroll-triggered motion** — Framer Motion fade/slide-in on every section
- 🧭 **Smart header** — active-section highlighting + animated mobile menu
- 🪟 **Glassmorphism cards** with hover effects across Experience, Projects, and Skills
- 📱 **Fully responsive** dark-themed design with indigo/purple accents
- 📨 **Working contact form** via Formspree

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server (http://localhost:3000)
npm run dev

# Build a static export (outputs to ./out)
npm run build
```

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Page composition (section order)
│   └── globals.css         # Global styles + Tailwind layers
├── components/
│   ├── Header.tsx          # Sticky nav with active-section detection
│   ├── Hero.tsx            # GSAP animated landing section
│   ├── About.tsx           # Bio + animated stat cards
│   ├── Experience.tsx      # Timeline of roles
│   ├── Education.tsx       # Degrees
│   ├── Projects.tsx        # Project cards (incl. WellPro)
│   ├── Skills.tsx          # Categorized skill badges
│   ├── Certifications.tsx  # Certifications list
│   ├── Contact.tsx         # Formspree contact form
│   ├── Footer.tsx          # Social links
│   └── SectionHeading.tsx  # Shared numbered section heading
├── public/
│   ├── assets/             # Resume PDF
│   └── images/             # Project images
├── next.config.js          # Static export config
├── tailwind.config.ts
└── tsconfig.json
```

---

## Sections

**About · Experience · Education · Projects · Skills · Certifications · Contact**

### Featured Projects
- **PeriopMD** — medical subscription portal (ReactJS, Redux, MaterialUI, Stripe)
- **TTA Connect** — training solutions platform with real-time chat (ReactJS, Redux, MSAL, Twilio)
- **Trabus RippleGo** — real-time river navigation tracking (ReactJS, Redux, GraphQL)
- **WellPro** — AI-native Intelligent Health Record platform (ReactJS, TypeScript, AI/LLM, NLP)

---

## Deployment

The site is configured for static export (`output: 'export'` in `next.config.js`). Running `npm run build` generates a fully static `out/` directory that can be served by any static host.

- **Vercel:** [surajthapa.vercel.app](https://surajthapa.vercel.app/) — auto-deploys from `master` (`vercel.json` serves the `out/` directory)
- **GitHub Pages:** [surajfc.github.io/surajPortfolio](https://surajfc.github.io/surajPortfolio/) — deployed via GitHub Actions (`GITHUB_PAGES=true` sets the `/surajPortfolio` base path)

---

## Contact

- **GitHub:** [SurajFc](https://github.com/SurajFc)
- **LinkedIn:** [suraj4](https://www.linkedin.com/in/suraj4/)
- **Stack Overflow:** [surajfc](https://stackoverflow.com/users/12359814/surajfc)
