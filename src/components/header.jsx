import { appConfig } from "../config/app";

export default () => {
  return (
    <header>
      <h1 aria-level="1">
        <span className="square">&#9632;</span>
        <a href="/" title={appConfig.title}>
          {appConfig.domain}
        </a>
      </h1>
      <div className="toolbar" aria-label="Contatti">
        <a
          className="header-button"
          title="Domande? Proposte? Contattami!"
          href="/send-me-a-message"
        >
          <span className="mobile-off">
            <span>domande?</span>
          </span>
          <img src="/images/form.svg" alt="Form contatti" />
        </a>
      </div>
    </header>
  );
};
