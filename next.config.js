const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const repo = 'surajPortfolio'
const basePath = isGitHubPages ? `/${repo}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
}

module.exports = nextConfig
