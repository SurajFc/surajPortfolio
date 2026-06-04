const isProd = process.env.NODE_ENV === 'production'
const repo = 'surajPortfolio' // GitHub Pages project path: /surajPortfolio

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // On GitHub Pages the site is served from /<repo>/, so prefix assets/routes
  // in production. Local dev (npm run dev) keeps the root path.
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
