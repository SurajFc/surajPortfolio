import SectionHeading from './SectionHeading'
import RepoCards from './RepoCards'
import GitHubStatPills from './GitHubStatPills'
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

interface GitHubProfile {
  public_repos: number
  followers: number
  following: number
}

const PINNED_REPOS = [
  'surajPortfolio',
  'smart-on-fhir-app',
  'Django-DRF-Boilerplate-with-otp-verification',
  'react-fhir-forms',
  'NestJsAuth',
  'Django-JWT-boilerplate',
]

const GH_HEADERS = { Accept: 'application/vnd.github+json' }

async function fetchRepos(): Promise<Repo[]> {
  try {
    const results = await Promise.all(
      PINNED_REPOS.map((name) =>
        fetch(`https://api.github.com/repos/SurajFc/${name}`, {
          headers: GH_HEADERS,
          cache: 'force-cache',
        }).then((r) => (r.ok ? (r.json() as Promise<Repo>) : null))
      )
    )
    return results.filter(Boolean) as Repo[]
  } catch {
    return []
  }
}

async function fetchProfile(): Promise<GitHubProfile | null> {
  try {
    const r = await fetch('https://api.github.com/users/SurajFc', {
      headers: GH_HEADERS,
      cache: 'force-cache',
    })
    return r.ok ? (r.json() as Promise<GitHubProfile>) : null
  } catch {
    return null
  }
}

// Shared query params for all github-readme-stats images
const GRS_BASE = 'https://github-readme-stats.vercel.app/api'
const GRS_PARAMS = 'theme=transparent&hide_border=true&title_color=6366f1&icon_color=6366f1&text_color=64748b&bg_color=00000000'

export default async function GitHubActivity() {
  const [repos, profile] = await Promise.all([fetchRepos(), fetchProfile()])
  if (repos.length === 0) return null

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0)

  return (
    <section className="py-24 px-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionHeading number="07" title="GitHub Activity" />
        </div>

        {/* Live stat pills */}
        <GitHubStatPills
          publicRepos={profile?.public_repos ?? repos.length}
          totalStars={totalStars}
          followers={profile?.followers ?? 0}
          totalForks={totalForks}
        />

        {/* GitHub Stats + Top Languages */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${GRS_BASE}?username=SurajFc&show_icons=true&count_private=true&include_all_commits=true&${GRS_PARAMS}`}
              alt="Suraj's GitHub stats"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${GRS_BASE}/top-langs/?username=SurajFc&layout=compact&langs_count=8&${GRS_PARAMS}`}
              alt="Suraj's top languages"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </div>
        </div>

        {/* Streak Stats */}
        <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://streak-stats.demolab.com/?user=SurajFc&theme=transparent&hide_border=true&stroke=6366f1&ring=6366f1&fire=f97316&currStreakNum=64748b&sideNums=64748b&currStreakLabel=6366f1&sideLabels=64748b&dates=64748b&background=00000000"
            alt="Suraj's GitHub streak stats"
            className="w-full max-w-2xl"
            loading="lazy"
          />
        </div>

        {/* Pinned repo cards */}
        <RepoCards repos={repos} />

        {/* Contribution activity graph */}
        <div className="mt-10 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">Contribution Activity</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github-activity-graph.vercel.app/graph?username=SurajFc&theme=react-dark&hide_border=true&area=true&bg_color=transparent&color=818cf8&line=6366f1&point=6366f1&area_color=6366f1"
            alt="GitHub contribution activity graph for SurajFc"
            className="w-full rounded"
            loading="lazy"
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
