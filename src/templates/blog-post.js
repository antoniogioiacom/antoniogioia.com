import React from "react"
import { graphql } from "gatsby"
import Head from "../components/head"
import Layout from "../components/layout"
import Footer from "../components/footer"
import "../css/blog.scss"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
    <Head prefix={`Blog <> ${post.frontmatter.title} <> `} />
      <div className="blog" role="main">
        <div className="blog-post-container">
          <div className="blog-post">
            <article className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
    }
  }
`