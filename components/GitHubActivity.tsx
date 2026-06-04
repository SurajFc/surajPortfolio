import SectionHeading from './SectionHeading'
import RepoCards from './RepoCards'
import { FaGithub } from 'react-icons/fa'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

// Update this list to match your pinned repos on github.com/SurajFc
const PINNED_REPOS = [
  'surajPortfolio',
  'smart-on-fhir-app',
  'Django-DRF-Boilerplate-with-otp-verification',
  'react-fhir-forms',
  'NestJsAuth',
  'Django-JWT-boilerplate',
]

async function fetchRepos(): Promise<Repo[]> {
  try {
    const results = await Promise.all(
      PINNED_REPOS.map((name) =>
        fetch(`https://api.github.com/repos/SurajFc/${name}`, {
          headers: { Accept: 'application/vnd.github+json' },
          cache: 'force-cache',
        }).then((r) => (r.ok ? (r.json() as Promise<Repo>) : null))
      )
    )
    return results.filter(Boolean) as Repo[]
  } catch {
    return []
  }
}


export default async function GitHubActivity() {
  const repos = await fetchRepos()
  if (repos.length === 0) return null

  return (
    <section className="py-24 px-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionHeading number="07" title="GitHub Activity" />
        </div>

        <RepoCards repos={repos} />

        {/* Contribution graph */}
        <div className="mt-10 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">Contribution Activity</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ghchart.rshah.org/4f46e5/SurajFc"
            alt="GitHub contribution graph for SurajFc"
            className="w-full rounded"
          />
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://github.com/SurajFc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-500/40 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all text-sm font-medium"
          >
            <FaGithub />
            View all repositories
          </a>
        </div>
      </div>
    </section>
  )
}
