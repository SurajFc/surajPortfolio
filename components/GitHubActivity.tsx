import SectionHeading from './SectionHeading'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'

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

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-400',
  CSS: 'bg-pink-400',
  HTML: 'bg-orange-400',
  Vue: 'bg-emerald-400',
}

async function fetchRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/SurajFc/repos?sort=updated&per_page=50&type=owner',
      {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'force-cache',
      }
    )
    if (!res.ok) return []
    const all: Repo[] = await res.json()
    return all.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
  } catch {
    return []
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-5 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FaGithub className="text-slate-500 flex-shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {repo.name}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1">
                {repo.description ?? 'No description'}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] ?? 'bg-slate-400'}`} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch />
                  {repo.forks_count}
                </span>
                <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
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
