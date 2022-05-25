import React from "react"
import "../css/contacts-why.scss"

export default () => {
    return (
        <div>
            <h2 aria-level="2">
                cosa posso fare<span className="mobile-off"> per te</span>
                <span className="square">|</span>
            </h2>
            <ul className="contacts-why">
                <li>progettazione e realizzazione di rich web applications</li>
                <li>automazioni tra servizi cloud (google, amazon aws etc)</li>
                <li>
                    siti web con installazione wordpress, temi e plugin
                    personalizzati, licenza divi
                </li>
                <li>consulenza tecnica crypto, blockchain e nft</li>
            </ul>
        </div>
    )
}
