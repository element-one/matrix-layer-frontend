/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // Add rule for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  }, 
  reactStrictMode: true, 
  images: {
    domains: []
  },
  async rewrites() {
    return process.env.NEXT_PUBLIC_APP_ENV === 'dev'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
          },
        ]
      : []
  },
}

module.exports = nextConfig
