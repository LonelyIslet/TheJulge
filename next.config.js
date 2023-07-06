/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: '@use "styles/variables.scss" as *;',
  },
};

module.exports = nextConfig;
