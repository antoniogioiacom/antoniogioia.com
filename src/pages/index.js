import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import Window from "../components/window"
import Footer from "../components/footer"
import MainMobile from "../components/main-mobile"
import "../css/index.scss"

export default () => {

  return (
    <Layout>
      <Head prefix="" />
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
        <ul>
            <li><a className="external" href="/how-to-configure-your-vps-with-security" title="Blog: How to configure your VPS with security in mind">how to configure your VPS with security in mind</a></li>
            <li><a className="external" href="/dynamic-port-forwarding-with-ssh" title="Blog: Dynamic port forwarding with SSH and SOCKS5">dynamic port forwarding with SSH and SOCKS5</a></li>
            <li><a className="external" href="/irc-with-ssl-and-otr" title="Blog: IRC with SSL and OTR encryption">IRC with SSL and OTR encryption</a></li>
            <li><a className="external" href="/how-html5-apis-can-fingerprint-users" title="Blog: How HTML5 APIs can fingerprint users">how HTML5 APIs can fingerprint users</a></li>
            <li><a className="external" href="/how-to-use-microdata-person" title="Blog: How to use microdata Person on your portfolio website and improve your SEO">how to use microdata Person on your portfolio website and improve your seo</a></li>
        </ul>
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
                  <li><img src="/images/apuliastudentservice.png" alt="Apulia Student Service logo" className="sm" /></li>
                  <li><img src="/images/cercoalloggio.png" alt="Cercoalloggio.com logo" /></li>
                  <li><img src="/images/spassiaisi.png" alt="Spassiaisi logo" className="sm" /></li>
              </ul>
          </div>
      </section>
      <section className="footer" aria-label="Contatti">
        <h2 aria-level="2">cosa posso fare<span className="mobile-off"> per te</span><span className="square">|</span></h2>
        <ul className="contacts-why">
            <li>progettazione e realizzazione di rich web applications</li>
            <li>piattaforme web con soluzioni personalizzate</li>
            <li>creazione e/o aggiornamento di siti web e landing pages</li>
            <li>siti aziendali con installazione wordpress, temi personalizzati e configurazione plugin</li>
            <li>programmazione di crawlers con aggregazione e analisi di dati per strategie di marketing</li>
            <li>consulenza tecnica servizi informatici</li>
            <li>consulenza sicurezza informatica e protezione dati</li>
        </ul>
        <Footer />
      </section>
    </Layout>
  )
}
