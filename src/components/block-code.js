import React from "react"
import { useEffect } from "react"
import Prism from "prismjs"
import "../css/block-code.scss"
import "../css/prism.scss"

export default (props) => {

    useEffect(() => {
        Prism.highlightAll()
    })

    const renderCode = (source) => {
        switch (source) {
            case "about":
                return `
/*
    hello world! :)
    mi chiamo Antonio Gioia e sono 
    uno sviluppatore javascript full stack.
    svolgo la mia attività da libero professionista 
    specializzato nello sviluppo di applicazioni web
*/

const antonio_gioia = { 
    "età"           : 35,
    "ruolo"         : "full stack javascript developer",
    "livello"       : "senior",
    "esperienza"    : "programmatore da +15 anni",
    "partita-iva"   : "02621900741",
    "residenza"     : "lecce, italia"
};

`

            case "skills":
                return `
const server = "linux (debian, ubuntu)";
const web_server = "nodejs, ngnix";
const database = "mysql, mongodb, postgres";
const sviluppo_api = "rest, graphql";
const web_design = "html, css, photoshop";
const front_end_javascript = "angular, react, jquery";
const android = "apache cordova, ionic";
const cms = "wordpress";
const competenze_specifiche = [
    "accessibilità (aria)",
    "responsive design",
    "compatibilità cross-browser",
    "integrazione mappe (google maps, open street map)",
    "integrazione protocollo saml",
    "search engine optimization",
    "sviluppo web crawlers",
    "sviluppo blockchain scrapers",
    "bash scripting"
];

`
            default:
            break;
        }
    }

    return (
        <div>
            <pre className="line-numbers">
                <code className="language-javascript">
                {renderCode(props.source)}
                </code>
            </pre>
        </div>
    )
}