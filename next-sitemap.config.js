/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://thejulge.netlify.app/',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1,
  exclude: [
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
        ],
      },
    ],
  },
}
