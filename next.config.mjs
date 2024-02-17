/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.testvalley.kr",
        port: "",
        pathname: "/logo/**",
      },
      {
        protocol: "https",
        hostname: "www.testvalley.kr",
        port: "",
        pathname: "/common/**",
      },
    ],
  },
};

export default nextConfig;
