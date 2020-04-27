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
      <section className="main" role="main" aria-label="Informazioni personali">
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
        <div class="mobile-on">
            <MainMobile />
        </div>
      </section>
      <section className="articles" aria-label="Blog">
        <BlogArticles />
      </section>
      <section className="projects" aria-label="Progetti e collaborazioni">
          <h2 aria-level="2">progetti<span className="mobile-off"> personali</span><span className="square">|</span></h2>
          <ul className="box-container">
              <li className="box">
                  <a href="https://github.com/antoniogioiacom/startapp" title="Repository Github (link esterno)" target="_blank" rel="noopener noreferrer">
                      <h3 aria-level="3">startapp</h3>
                      <img className="projects-img" src="/images/startapp.jpg" alt="Koa.js app boilerplate" />
                      <span>javascript</span>
                      <div className="project-desc">
                          <div className="project-desc-inner">
                              <p>Starter app boilerplate, basato su Koa.js, per creare rapidamente prototipi. Include build per assets statici </p>
                          </div>
                          <div className="project-desc-source">
                              <img src="/images/github.svg" alt="Github logo" />
                          </div>
                      </div>
                  </a>
              </li>
              <li className="box">
                  <a href="https://github.com/antoniogioiacom/wire" title="Repository Github (link esterno)" target="_blank" rel="noopener noreferrer">
                      <h3 aria-level="3">wire</h3>
                      <img className="projects-img" src="/images/wire.jpg" alt="Linux command line manager per reti wireless" />
                      <span>shell</span>
                      <div className="project-desc">
                          <div className="project-desc-inner">
                              <p>Linux command line manager per interfacce di rete wireless </p>
                          </div>
                          <div className="project-desc-source">
                              <img src="/images/github.svg" alt="Github logo" />
                          </div>
                      </div>
                  </a>
              </li>
              <li className="box">
                  <a href="https://play.google.com/store/apps/details?id=trade.muchbtc.app" title="App su google play store (link esterno)" target="_blank" rel="noopener noreferrer">
                      <h3 aria-level="3">muchbtc</h3>
                      <img className="projects-img" src="/images/muchbtc.jpg" alt="Bitcoin portfolio Android app" />
                      <span>android</span>
                      <div className="project-desc">
                          <div className="project-desc-inner">
                              <p>Android app [deprecata] per seguire quotazioni di mercato di Bitcoin e altre criptovalute con calcolo stima portfolio </p>
                          </div>
                          <div className="project-desc-source">
                              <img src="/images/google-play.svg" alt="Google Play Store logo" />
                          </div>
                      </div>
                  </a>
              </li>
          </ul>
          <h2 aria-level="2">collaborazioni<span className="square">|</span></h2>
          <div className="collabs">
              <ul>
                  <li><a href="http://apuliastudentservice.com" title="Apulia Student Service (link esterno)" target="_blank" rel="noopener noreferrer"><img src="/images/apuliastudentservice.png" alt="Apulia Student Service logo" className="sm" /></a></li>
                  <li><a href="https://www.cercoalloggio.com" title="Cercoalloggio.com (link esterno)" target="_blank" rel="noopener noreferrer"><img src="/images/cercoalloggio.png" alt="Cercoalloggio.com logo" /></a></li>
                  <li><a href="http://spassiaisi.photo" title="Spassiaisi Photo Studio (link esterno)" target="_blank" rel="noopener noreferrer"><img src="/images/spassiaisi.png" alt="Spassiaisi logo" className="sm" /></a></li>
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
