/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: '/',
      destination: '/login',
      permanent: false,
    },
  ],
}

module.exports = nextConfig
