/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: '@use "styles/variables.scss" as *; @use "styles/mixins.scss" as *;',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bootcamp-api.codeit.kr",
        // Optionally add pathname if there are specific folders to include
      },
      {
        protocol: "https",
        hostname: "*", // Allow all for local development
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bootcamp-api.codeit.kr/api/0-2/the-julge/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
