import React from "react"
import { Link, graphql } from "gatsby"
import Head from "../components/head"
import Layout from "../components/layout"
import Footer from "../components/footer"
import "../css/blog-articles.scss"

const BlogIndex = ({ data }) => {
    const posts = data.allMarkdownRemark.edges
  
    return (
      <Layout>
       <Head prefix="Blog <> " />
        <section className="articles" role="main" aria-label="Blog">
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
        </section>
        <section className="footer">
          <Footer />
        </section>
        </Layout>

    )
  }
  
  export default BlogIndex
  
  export const pageQuery = graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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