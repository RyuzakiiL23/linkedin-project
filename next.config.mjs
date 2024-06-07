/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseURL: "localhost:3000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uxwing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
