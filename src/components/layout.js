import React from "react"
import Header from "./header"
import "../css/layout.scss"

export default ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">{children}</div>
        </div>
    )
}
