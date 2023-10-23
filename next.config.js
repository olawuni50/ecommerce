/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['yt3.ggpht.com',
      'lh3.googleusercontent.com',
      "cdn.sanity.io", "images.unsplash.com", "plus.unsplash.com"]
      },
      typescript:{
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
