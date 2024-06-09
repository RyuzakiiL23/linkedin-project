/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseURL: "http://localhost:8000",
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
