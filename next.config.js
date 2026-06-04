const isProd = process.env.NODE_ENV === 'production'
const repo = 'surajPortfolio' // GitHub Pages project path: /surajPortfolio
const basePath = isProd ? `/${repo}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  // assetPrefix (no trailing slash) prefixes _next/static JS/CSS chunks
  assetPrefix: basePath,
  // Expose basePath to client code so components can prefix public/ image paths
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
}

module.exports = nextConfig
