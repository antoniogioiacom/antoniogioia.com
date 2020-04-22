import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ContactIcon from "../components/contact-icon"
import "../css/footer.scss"

export default () => {
  const data = useStaticQuery(
    graphql`
      query FooterData {
        site {
          siteMetadata{
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
      <div>
        <h2 aria-level="2">come contattarmi<span className="square">|</span></h2>
        <ul className="footer-links">
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
        <div itemscope itemtype="http://schema.org/Person">
          <small>
            <span itemprop="name">Antonio Gioia </span><br class="mobile-on" />
            <span className="square-footer">□</span><span itemprop="jobTitle"> Web developer </span><br class="mobile-on" />
            <span className="square-footer">□</span> P. Iva 02621900741 <br class="mobile-on" />
            <span className="square-footer">□</span> <span itemscope itemtype="http://schema.org/PostalAddress"><span itemprop="addressLocality">Lecce</span>, <span itemprop="addressCountry">Italia</span></span>
          </small>
        </div>
        <div className="footer-logo"></div>
      </div>
  )
}
