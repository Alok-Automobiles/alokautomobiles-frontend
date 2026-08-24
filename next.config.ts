import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep development and production artifacts separate. Running `next build`
  // while `next dev` is open can otherwise replace chunks used by the dev
  // runtime and cause transient "Cannot find module './<chunk>.js'" errors.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/s2/favicons/**',
      },
      {
        protocol: 'https',
        hostname: 'icons.duckduckgo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    // Explicitly set root to this app's directory to avoid wrong root inference
    root: __dirname,
  },
  experimental: {
    // Disable Lightning CSS to avoid missing native binary on some Linux targets (e.g., Vercel)
    optimizeCss: false,
  },
};

export default nextConfig;
