import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Footer from "../components/footer"
import "../css/blog.scss"

const BlogPostTemplate = ({ data }) => {
    const post = data.markdownRemark

    return (
        <Layout>
            <Helmet
                title={`Blog <> ${post.frontmatter.title} <> ${data.site.siteMetadata.title}`}
            >
                <html lang="it-IT" />
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
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.frontmatter.title} />
                <meta
                    property="og:url"
                    content={`${data.site.siteMetadata.siteUrl}${post.frontmatter.filepath}`}
                />
                <meta
                    property="og:image"
                    content={`${data.site.siteMetadata.siteUrl}${post.frontmatter.cover}`}
                />
                <meta
                    property="article:author"
                    content={data.site.siteMetadata.author}
                />
            </Helmet>
            <div className="blog" role="main">
                <div className="blog-post-container">
                    <div className="blog-post">
                        <article
                            className="blog-post-content"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                        <hr />
                        <div className="blog-post-footer">
                            ⇠{" "}
                            <Link to="/blog" title="Lista articoli">
                                Blog
                            </Link>{" "}
                            <a
                                className="blog-post-feed"
                                href="/feed.xml"
                                title="Feed RSS"
                            >
                                <img
                                    className="blog-feed-icon"
                                    src="/images/rss.svg"
                                    alt="RSS feed logo"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <section className="footer">
                <Footer />
            </section>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                filepath
                cover
            }
        }
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
