// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: [process.env.NEXT_PUBLIC_BASE_URL_DOMAIN,'drive.google.com']
//   },
// }

module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: [process.env.NEXT_PUBLIC_BASE_URL_DOMAIN, 'drive.google.com'],
      loader: 'custom',
    },
  }
  return nextConfig
}