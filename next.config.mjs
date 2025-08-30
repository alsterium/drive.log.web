/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Removed 'export' output mode for Workers deployment
  // @opennextjs/cloudflare will handle the build process
  images: {
    unoptimized: true,
  },
}

export default nextConfig
