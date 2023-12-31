/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: '@use "styles/variables.scss" as *; @use "styles/mixins.scss" as *;',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
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
