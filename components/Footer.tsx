import { FaGithub, FaLinkedin, FaStackOverflow, FaFacebook } from 'react-icons/fa'

const socialLinks = [
  {
    icon: FaGithub,
    href: 'https://github.com/SurajFc',
    label: 'GitHub',
  },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/suraj4/',
    label: 'LinkedIn',
  },
  {
    icon: FaStackOverflow,
    href: 'https://stackoverflow.com/users/12359814/surajfc',
    label: 'Stack Overflow',
  },
  {
    icon: FaFacebook,
    href: 'https://www.facebook.com/surajthapafc/',
    label: 'Facebook',
  },
]

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Suraj Thapa. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-slate-600 hover:text-indigo-400 transition-colors text-xl"
            >
              <link.icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
