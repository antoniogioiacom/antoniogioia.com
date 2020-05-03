import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import Footer from "../components/footer"
import "../css/404.scss"

export default () => {
    return (
        <Layout>
            <Head prefix="Messaggio inviato <> " />
            <section className="default">
                <div className="not-found">
                    <h1 className="not-found-number">grazie!</h1>
                    <img
                        className="not-found-icon"
                        src="/images/ok.svg"
                        alt="Successo invio"
                    />
                    <h2 className="not-found-title">
                        messaggio inviato correttamente, <br />
                        sarai ricontattato al più presto!
                    </h2>
                </div>
            </section>
            <section className="footer">
                <Footer />
            </section>
        </Layout>
    )
}
