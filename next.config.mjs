/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseURL: "http://localhost:8000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uxwing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
    // images: {
    // domains: ['https://res.cloudinary.com', 'https://uxwing.com'],
  //},
};

export default nextConfig;
