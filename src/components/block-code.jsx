import { useEffect } from "react";
import Prism from "prismjs";

export default (props) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  const renderCode = (source) => {
    switch (source) {
      case "about":
        return `
/*
    hello world! :)
    mi chiamo Antonio Gioia e sono 
    uno sviluppatore python & javascript full stack.
    svolgo la mia attività da libero professionista 
    specializzato nello sviluppo di applicazioni web
*/

const antonio_gioia = { 
    "ruolo"         : "full stack web developer",
    "livello"       : "senior",
    "esperienza"    : "programmatore da +15 anni",
    "partita-iva"   : "02621900741",
    "residenza"     : "lecce, italia"
    "gatti"         : "2"
};

`;

      case "skills":
        return `
const languages  = "javascript, python, php";
const server     = "linux (debian, ubuntu server)";
const backend    = "nodejs, python";
const frontend   = "react / nextjs, astro";
const database   = "mongodb, mysql, postgres";
const web_design = "html, css, photoshop";
const cloud      = "aws, cloudflare, google cloud";
const cms        = "wordpress (visual composer, divi, elementor)";
const competenze_specifiche = [
    "accessibilità (aria)",
    "responsive design",
    "integrazione mappe (maplibre-gl, leaflet)",
    "search engine optimization",
    "web crawlers",
    "SAML 2.0",
];

`;
      default:
        break;
    }
  };

  return (
    <div>
      <pre className="line-numbers">
        <code className="language-javascript">{renderCode(props.source)}</code>
      </pre>
    </div>
  );
};
