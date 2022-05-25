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
    uno sviluppatore python & javascript full stack.
    svolgo la mia attività da libero professionista 
    specializzato nello sviluppo di applicazioni web
*/

const antonio_gioia = { 
    "età"           : 37,
    "ruolo"         : "full stack web developer",
    "livello"       : "senior",
    "esperienza"    : "programmatore da +15 anni",
    "partita-iva"   : "02621900741",
    "residenza"     : "lecce, italia"
};

`

            case "skills":
                return `
const languages  = "javascript, python, php";
const server     = "linux (debian, ubuntu)";
const backend    = "nodejs, nextjs (rest, graphql)";
const frontend   = "angular, react, jquery";
const database   = "mysql, mongodb, postgres";
const web_design = "html, css, photoshop";
const android    = "apache cordova";
const cloud      = "aws (ec2, s3, lambda)";
const cms        = "wordpress (visual composer, divi, elementor)";
const competenze_specifiche = [
    "accessibilità (aria)",
    "responsive design",
    "compatibilità cross-browser",
    "integrazione mappe (google maps, osm, leaflet)",
    "search engine optimization",
    "web crawlers",
    "blockchain scrapers",
    "automazioni servizi google (google apps script)"
];

`
            default:
                break
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
