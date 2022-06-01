/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/setu/check_consent/[consent_id].js',
            destination: 'https://expense-tracking-website-git-master-saachikaup.vercel.app/api/setu/consent/[consent_id].js',
          },
        ]
      },
  };
