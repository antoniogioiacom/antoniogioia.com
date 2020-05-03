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
                <li>piattaforme web con soluzioni personalizzate</li>
                <li>creazione e/o aggiornamento di siti web e landing pages</li>
                <li>
                    siti aziendali con installazione wordpress, temi
                    personalizzati e configurazione plugin
                </li>
                <li>
                    programmazione di crawlers con aggregazione e analisi di
                    dati per strategie di marketing
                </li>
                <li>consulenza tecnica servizi informatici</li>
                <li>consulenza sicurezza informatica e protezione dati</li>
            </ul>
        </div>
    )
}
