/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig

// module.exports = {
//     async rewrites() {
//         return [
//           {
//             source: '/api/setu/check_consent/[consent_id]*',
//             destination: 'https://fiu-uat.setu.co/consents/[consnet_id]*',
//           },
//         ]
//         return [
//           {
//             source: 
//           }
//         ]
//       },
//   };
