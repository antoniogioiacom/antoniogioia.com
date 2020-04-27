import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import TextLoop from "react-text-loop";
import "../css/header.scss"

export default () => {
  const data = useStaticQuery(
    graphql`
      query HeaderData {
        site {
          siteMetadata{
            details {
              domain
              logoLinkTitle
            }
          }
        }
      }
    `
  )
  return (
    <header>
        <h1 aria-level="1">
            <span className="square">&#9632;</span>
            <a href="/" title={data.site.siteMetadata.details.logoLinkTitle}>{data.site.siteMetadata.details.domain}</a>
        </h1>
        <div className="toolbar" aria-label="Contatti">
          <Link className="header-button" title="Domande? Proposte? Contattami!" to="/contacts">
            <span className="mobile-off">
              <TextLoop mask={true} interval={[3000, 2000]} springConfig={{ stiffness: 340, damping: 30 }}>
                <span>domande?</span>
                <span>progetti?</span>
                <span>proposte?</span>
                <span>consulenza?</span>
                <span>collaborazione?</span>
              </TextLoop>
            </span><img src="/images/form.svg" alt="Form contatti" />
          </Link>
        </div>
    </header>
  )
}