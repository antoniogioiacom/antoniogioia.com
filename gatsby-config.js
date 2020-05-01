module.exports = {
  siteMetadata: {
    siteUrl: `https://www.antoniogioia.com`,
    author: "Antonio Gioia",
    title: "Antonio Gioia, Lecce, Italy",
    description: "Antonio Gioia programmatore web full stack, lavora come libero professionista a Lecce, Italia",
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
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '/scripts/modernizr-custom.js', 
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: 'gatsby-plugin-feed-generator',
      options: {
      generator: `GatsbyJS`,
      rss: true,
      json: true,
      siteQuery: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              author
            }
          }
        }
      `,
      feeds: [
        {
          name: 'feed', 
          query: `
          {
            allMarkdownRemark(
              sort: {order: DESC, fields: [frontmatter___date]},
              limit: 100,
              ) {
              edges {
                node {
                  html
                  frontmatter {
                    date
                    filepath
                    title
                  }
                }
              }
            }
          }
          `,
          normalize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return {
                title: edge.node.frontmatter.title,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.frontmatter.filepath,
                html: edge.node.html,
              }
            })
          },
        },
      ],
    }
    },
  ]
}
