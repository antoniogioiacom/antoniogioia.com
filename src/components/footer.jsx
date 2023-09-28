import ContactIcon from "./contact-icon.jsx";

export default () => {
  return (
    <div>
      <h2 aria-level="2">
        come contattarmi<span className="square">|</span>
      </h2>
      <ul className="footer-links">
        <li>
          <ContactIcon
            contactUrlPrefix="https://wa.me/"
            contactUrl={"00393383357050"}
            linkTitle="Contatto telefonico (link telefono / Whatsapp)"
            icon="/images/whatsapp.svg"
            altText="Whatsapp logo"
            linkTarget=""
          />
        </li>
        <li>
          <ContactIcon
            contactUrlPrefix=""
            contactUrl={"https://github.com/antoniogioiacom"}
            linkTitle="Profilo Github (link esterno)"
            icon="/images/github.svg"
            altText="Github logo"
            linkTarget="_blank"
          />
        </li>
        <li>
          <ContactIcon
            contactUrlPrefix=""
            contactUrl={"https://instagram.com/antoniogioiacom"}
            linkTitle="Profilo Instagram (link esterno)"
            icon="/images/instagram.svg"
            altText="Instagram logo"
            linkTarget="_blank"
          />
        </li>
      </ul>
      <div itemScope itemType="http://schema.org/Person">
        <small>
          <a
            itemProp="url"
            href="https://antoniogioia.com"
            title="Full stack web developer, Antonio Gioia"
          >
            <span itemProp="name">Antonio Gioia</span>
          </a>{" "}
          <br className="mobile-on" />
          <span className="square-footer">□</span>
          <span itemProp="jobTitle"> Web developer </span>
          <br className="mobile-on" />
          <span className="square-footer">□</span> P. Iva 02621900741{" "}
          <br className="mobile-on" />
          <span className="square-footer">□</span>{" "}
          <span itemScope itemType="http://schema.org/PostalAddress">
            <span itemProp="addressLocality">Lecce</span>,{" "}
            <span itemProp="addressCountry">Italia</span>
          </span>
        </small>
      </div>
      <div className="footer-logo"></div>
    </div>
  );
};
