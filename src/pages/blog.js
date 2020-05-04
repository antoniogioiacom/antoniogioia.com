import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import BlogArticles from "../components/blog-articles"
import Footer from "../components/footer"

export default ({ data }) => {
    return (
        <Layout>
            <Helmet
                title={`Blog <> Web developer Full stack <> ${data.site.siteMetadata.title}`}
            >
                <html lang="en-EN" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
                />
                <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                />
                <meta name="robots" content="index, follow" />
                <meta name="author" content={data.site.siteMetadata.author} />
            </Helmet>
            <section className="articles" role="main" aria-label="Blog">
                <BlogArticles />
                <a className="blog-post-feed" href="/feed.xml" title="Feed RSS">
                    <img
                        className="blog-feed-icon"
                        src="/images/rss.svg"
                        alt="RSS feed logo"
                    />
                </a>
            </section>
            <section className="footer">
                <Footer />
            </section>
        </Layout>
    )
}

export const query = graphql`
    query SiteInfo {
        site {
            siteMetadata {
                title
                description
                author
                siteUrl
            }
        }
    }
`
