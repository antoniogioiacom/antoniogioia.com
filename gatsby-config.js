module.exports = {
  siteMetadata: {
    siteUrl: `https://www.antoniogioia.com`,
    author: "Antonio Gioia",
    title: "Antonio Gioia, Lecce, Italy",
    description: "Antonio Gioia programmatore web full stack, lavora come libero professionista in Lecce, Italia",
    details: {
      domain: "antoniogioia.com",
      logoLinkTitle: "Antonio Gioia - full stack web developer"
    },
    contacts: {
      tel: "00393383357050",
      email: "info@antoniogioia.com",
      github: "https://github.com/antoniogioiacom",
      twitter: "https://twitter.com/antoniogioiacom",
      instagram: "https://instagram.com/antoniogioiacom"
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-advanced-sitemap`
  ]
}
