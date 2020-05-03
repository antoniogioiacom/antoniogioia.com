import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import Footer from "../components/footer"
import "../css/404.scss"

export default () => {
    return (
        <Layout>
            <Head prefix="Pagina non trovata <> " />
            <section className="default">
                <div className="not-found">
                    <h1 className="not-found-number">404</h1>
                    <img
                        className="not-found-icon"
                        src="/images/404.svg"
                        alt="Errore 404"
                    />
                    <h2 className="not-found-title">pagina non trovata!</h2>
                </div>
            </section>
            <section className="footer">
                <Footer />
            </section>
        </Layout>
    )
}
