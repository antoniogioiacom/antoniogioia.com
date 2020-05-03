import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "../css/blog-articles.scss"

export default () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: DESC }
                ) {
                    edges {
                        node {
                            excerpt
                            fields {
                                slug
                            }
                            frontmatter {
                                date(formatString: "MMMM DD, YYYY")
                                title
                                description
                            }
                        }
                    }
                }
            }
        `
    )

    const posts = data.allMarkdownRemark.edges

    return (
        <div>
            <h2 aria-level="2">
                blog<span className="square">|</span>
            </h2>
            <ul>
                {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                        <li key={node.fields.slug}>
                            <Link className="external" to={node.fields.slug}>
                                {title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
