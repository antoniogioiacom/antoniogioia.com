import React from "react"
import BlockRender from "./block-render"
import "../css/main-mobile.scss"

export default () => {
    return (
        <div className="intro">
            <h2 aria-level="2">hello world! :)</h2>
            <p>
                mi chiamo <span className="keyword">Antonio Gioia</span> e sono
                uno sviluppatore{" "}
                <span className="keyword-alt">python & javascript full stack</span>{" "}
                specializzato nello sviluppo di applicazioni web
            </p>
            <h2 aria-level="2">
                competenze <span className="square">|</span>
            </h2>
            <BlockRender />
        </div>
    )
}
