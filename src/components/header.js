import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ContactIcon from "../components/contact-icon"
import "../css/header.scss"

export default () => {
  const data = useStaticQuery(
    graphql`
      query HeaderData {
        site {
          siteMetadata{
            details {
              domain
              baseUrl
              logoLinkTitle
            }
            contacts {
              tel
              email
              github
              twitter
              instagram
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
            <ul>
              <li>
                <ContactIcon 
                  contactUrlPrefix="tel:" 
                  contactUrl={data.site.siteMetadata.contacts.tel} 
                  linkTitle="Contatto telefonico (link telefono / Whatsapp)" 
                  icon="/images/whatsapp.svg" 
                  altText="Whatsapp logo"
                  linkTarget=""
                />
              </li>
              <li>
                <ContactIcon 
                  contactUrlPrefix="mailto:" 
                  contactUrl={data.site.siteMetadata.contacts.email} 
                  linkTitle="Contatto email (link email)" 
                  icon="/images/email.svg" 
                  altText="Email logo"
                  linkTarget=""
                />
              </li>
              <li>
                <ContactIcon 
                  contactUrlPrefix="" 
                  contactUrl={data.site.siteMetadata.contacts.github} 
                  linkTitle="Profilo Github (link esterno)" 
                  icon="/images/github.svg" 
                  altText="Github logo" 
                  linkTarget="_blank"
                />
              </li>
              <li>
                <ContactIcon 
                  contactUrlPrefix="" 
                  contactUrl={data.site.siteMetadata.contacts.twitter} 
                  linkTitle="Profilo Twitter (link esterno)" 
                  icon="/images/twitter.svg" 
                  altText="Twitter logo" 
                  linkTarget="_blank"
                />
              </li>
              <li>
                <ContactIcon 
                  contactUrlPrefix="" 
                  contactUrl={data.site.siteMetadata.contacts.instagram} 
                  linkTitle="Profilo Instagram (link esterno)" 
                  icon="/images/instagram.svg" 
                  altText="Instagram logo" 
                  linkTarget="_blank"
                />
              </li>
            </ul>
        </div>
    </header>
  )
}