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
      {
        protocol: "https",
        hostname: "dvd6ljcj7w3pj.cloudfront.net",
        port: "",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "dvd6ljcj7w3pj.cloudfront.net",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
