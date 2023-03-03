/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_URL: process.env.NEXT_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },

  images: {
    domains: [
      'files.stripe.com'
    ]
  }
}

module.exports = nextConfig
