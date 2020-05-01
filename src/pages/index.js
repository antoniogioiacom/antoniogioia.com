import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import Window from "../components/window"
import Footer from "../components/footer"
import BlogArticles from "../components/blog-articles"
import ContactsWhy from "../components/contacts-why"
import MainMobile from "../components/main-mobile"
import "../css/index.scss"

export default () => {
    return (
        <Layout>
            <Head prefix="Full stack Javascript developer <> " />
            <section
                className="main"
                role="main"
                aria-label="Informazioni personali"
            >
                <Window
                    classes="editor code-editor code-editor-skills mobile-off"
                    content="code"
                    source="skills"
                />
                <Window
                    classes="editor code-editor code-editor-stack mobile-off"
                    content="render"
                />
                <Window
                    classes="editor code-editor code-editor-about mobile-off"
                    content="code"
                    source="about"
                />
                <div className="mobile-on">
                    <MainMobile />
                </div>
            </section>
            <section className="articles" aria-label="Blog">
                <BlogArticles />
            </section>
            <section
                className="projects"
                aria-label="Progetti e collaborazioni"
            >
                <h2 aria-level="2">
                    progetti<span className="mobile-off"> personali</span>
                    <span className="square">|</span>
                </h2>
                <ul className="box-container">
                    <li className="box">
                        <a
                            href="https://github.com/antoniogioiacom/startapp"
                            title="Repository Github (link esterno)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h3 aria-level="3">startapp</h3>
                            <picture>
                                <source
                                    srcSet="/images/startapp.webp"
                                    type="image/webp"
                                />
                                <source
                                    srcSet="/images/startapp.jpg"
                                    type="image/jpeg"
                                />
                                <img
                                    className="projects-img"
                                    src="/images/startapp.webp"
                                    alt="Koa.js app boilerplate"
                                />
                            </picture>
                            <span>javascript</span>
                            <div className="project-desc">
                                <div className="project-desc-inner">
                                    <p>
                                        Starter app boilerplate, basato su
                                        Koa.js, per creare rapidamente
                                        prototipi. Include build per assets
                                        statici{" "}
                                    </p>
                                </div>
                                <div className="project-desc-source">
                                    <img
                                        src="/images/github.svg"
                                        alt="Github logo"
                                    />
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="box">
                        <a
                            href="https://github.com/antoniogioiacom/wire"
                            title="Repository Github (link esterno)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h3 aria-level="3">wire</h3>
                            <picture>
                                <source
                                    srcSet="/images/wire.webp"
                                    type="image/webp"
                                />
                                <source
                                    srcSet="/images/wire.jpg"
                                    type="image/jpeg"
                                />
                                <img
                                    className="projects-img"
                                    src="/images/wire.webp"
                                    alt="Linux command line manager per reti wireless"
                                />
                            </picture>
                            <span>shell</span>
                            <div className="project-desc">
                                <div className="project-desc-inner">
                                    <p>
                                        Linux command line manager per
                                        interfacce di rete wireless{" "}
                                    </p>
                                </div>
                                <div className="project-desc-source">
                                    <img
                                        src="/images/github.svg"
                                        alt="Github logo"
                                    />
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="box">
                        <a
                            href="https://play.google.com/store/apps/details?id=trade.muchbtc.app"
                            title="App su google play store (link esterno)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h3 aria-level="3">muchbtc</h3>
                            <picture>
                                <source
                                    srcSet="/images/muchbtc.webp"
                                    type="image/webp"
                                />
                                <source
                                    srcSet="/images/muchbtc.jpg"
                                    type="image/jpeg"
                                />
                                <img
                                    className="projects-img"
                                    src="/images/muchbtc.webp"
                                    alt="Bitcoin portfolio Android app"
                                />
                            </picture>
                            <span>android</span>
                            <div className="project-desc">
                                <div className="project-desc-inner">
                                    <p>
                                        Android app [deprecata] per seguire
                                        quotazioni di mercato di Bitcoin e altre
                                        criptovalute con calcolo stima portfolio{" "}
                                    </p>
                                </div>
                                <div className="project-desc-source">
                                    <img
                                        src="/images/google-play.svg"
                                        alt="Google Play Store logo"
                                    />
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <h2 aria-level="2">
                    collaborazioni<span className="square">|</span>
                </h2>
                <div className="collabs">
                    <ul>
                        <li>
                            <a
                                href="http://apuliastudentservice.com"
                                title="Apulia Student Service (link esterno)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <picture>
                                    <source
                                        srcSet="/images/apuliastudentservice.webp"
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet="/images/apuliastudentservice.png"
                                        type="image/jpeg"
                                    />
                                    <img
                                        className="sm"
                                        src="/images/apuliastudentservice.webp"
                                        alt="Apulia Student Service logo"
                                    />
                                </picture>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.cercoalloggio.com"
                                title="Cercoalloggio.com (link esterno)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <picture>
                                    <source
                                        srcSet="/images/cercoalloggio.webp"
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet="/images/cercoalloggio.png"
                                        type="image/jpeg"
                                    />
                                    <img
                                        className="sm"
                                        src="/images/cercoalloggio.webp"
                                        alt="Cercoalloggio.com logo"
                                    />
                                </picture>
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://spassiaisi.photo"
                                title="Spassiaisi Photo Studio (link esterno)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <picture>
                                    <source
                                        srcSet="/images/spassiaisi.webp"
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet="/images/spassiaisi.png"
                                        type="image/jpeg"
                                    />
                                    <img
                                        className="sm"
                                        src="/images/spassiaisi.webp"
                                        alt="Spassiaisi logo"
                                    />
                                </picture>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="footer" aria-label="Contatti">
                <ContactsWhy />
                <Footer />
            </section>
        </Layout>
    )
}
