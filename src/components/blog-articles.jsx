export default ({ scope }) => {
  const articles = [
    {
      title:
        "How to handle Authentication in Next.js with Passport.js: Cookies and Redis Approaches",
      url: "/how-to-handle-authentication-in-nextjs-with-passportjs-cookies-and-redis-approaches",
    },
    {
      title: "How to setup a MongoDB Replica Set with Coolify",
      url: "/how-to-setup-a-mongodb-replica-set-with-coolify",
    },
    {
      title: "Poor man's data analysis with OpenAI",
      url: "/poor-mans-data-analysis-with-openai",
    },
    {
      title: "SAML Single Sign On setup with Express and Passport",
      url: "/saml-sso-setup-with-express-and-passport",
    },
    {
      title: "How to configure your VPS with security in mind",
      url: "/how-to-configure-your-vps-with-security",
    },
    {
      title: "IRC with SSL and OTR encryption",
      url: "/irc-with-ssl-and-otr",
    },
    {
      title: "How HTML5 APIs can fingerprint users",
      url: "/how-html5-apis-can-fingerprint-users",
    },
    {
      title: "Dynamic port forwarding with SSH and SOCKS5",
      url: "/dynamic-port-forwarding-with-ssh",
    },
    {
      title:
        "How to use microdata Person on your portfolio website and improve your SEO",
      url: "/how-to-use-microdata-person",
    },
  ];

  return (
    <div>
      <h2 aria-level="2">
        blog<span className="square">|</span>
      </h2>
      <ul>
        {articles
          .slice(0, scope === "home" ? 5 : articles.length)
          .map((article) => (
            <li key={article.title}>
              <a className="external" href={article.url} title={article.title}>
                {article.title}
              </a>
            </li>
          ))}

        {scope === "home" ? (
          <>
            <li>
              <a
                className="blog-all"
                href="/blog"
                title="Tutti gli articoli del blog"
              >
                Tutti gli articoli del blog
              </a>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};
