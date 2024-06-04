/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uxwing.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
