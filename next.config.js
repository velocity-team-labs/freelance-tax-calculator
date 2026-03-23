/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Freelance Tax Calculator',
    NEXT_PUBLIC_SITE_URL: 'https://freelancetaxcalculator.com'
  }
};

module.exports = nextConfig;
