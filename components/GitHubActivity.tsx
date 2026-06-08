import SectionHeading from './SectionHeading'
import RepoCards from './RepoCards'
import GitHubStatPills from './GitHubStatPills'
import GitHubNativeStats, { type LangStat } from './GitHubNativeStats'
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

async function fetchPinnedRepos(): Promise<Repo[]> {
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

async function fetchAllRepos(): Promise<Repo[]> {
  try {
    const r = await fetch(
      'https://api.github.com/users/SurajFc/repos?per_page=100&type=owner&sort=updated',
      { headers: GH_HEADERS, cache: 'force-cache' }
    )
    return r.ok ? (r.json() as Promise<Repo[]>) : []
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

function computeLanguages(repos: Repo[]): LangStat[] {
  const counts: Record<string, number> = {}
  for (const repo of repos) {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return []
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }))
}

export default async function GitHubActivity() {
  const [pinnedRepos, allRepos, profile] = await Promise.all([
    fetchPinnedRepos(),
    fetchAllRepos(),
    fetchProfile(),
  ])

  if (pinnedRepos.length === 0) return null

  const totalStars = allRepos.reduce((acc, r) => acc + r.stargazers_count, 0)
  const totalForks = allRepos.reduce((acc, r) => acc + r.forks_count, 0)
  const languages  = computeLanguages(allRepos)

  return (
    <section className="py-24 px-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <SectionHeading number="07" title="GitHub Activity" />
        </div>

        {/* Live stat pills */}
        <GitHubStatPills
          publicRepos={profile?.public_repos ?? pinnedRepos.length}
          totalStars={totalStars}
          followers={profile?.followers ?? 0}
          totalForks={totalForks}
        />

        {/* Native GitHub Stats + Top Languages cards */}
        <GitHubNativeStats
          totalStars={totalStars}
          totalForks={totalForks}
          publicRepos={profile?.public_repos ?? allRepos.length}
          followers={profile?.followers ?? 0}
          languages={languages}
        />

        {/* Streak Stats (needs auth for native — keeping the image) */}
        <div className="p-2 rounded-xl bg-white border border-black/10 flex items-center justify-center overflow-hidden mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://streak-stats.demolab.com/?user=SurajFc&theme=swift&hide_border=false"
            alt="Suraj's GitHub streak stats"
            className="w-full max-w-2xl"
            loading="lazy"
          />
        </div>

        {/* Pinned repo cards */}
        <RepoCards repos={pinnedRepos} />

        {/* Contribution activity graph */}
        <div className="mt-10 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">Contribution Activity</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=SurajFc&theme=react-dark&hide_border=true&area=true"
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
