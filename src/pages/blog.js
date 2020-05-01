import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import BlogArticles from "../components/blog-articles"
import Footer from "../components/footer"

export default () => {
    return (
        <Layout>
            <Head prefix="Blog <> Web developer Full stack <> " />
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
