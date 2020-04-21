import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export default ({prefix}) => {
    const data = useStaticQuery(
      graphql`
        query HeadData {
          site {
            siteMetadata{
                title
                description
                author
            }
          }
        }
      `
    )

    return (
        <Helmet 
            title={`${prefix} ${data.site.siteMetadata.title}`} 
        >
        <html lang="it-IT" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"/>
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={data.site.siteMetadata.author} />
        </Helmet>
    )

}