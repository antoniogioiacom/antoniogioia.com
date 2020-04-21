import React from "react"
import "../css/contact-icon.scss"

export default (props) => {
    return (
        <a className="contact-link" href={props.contactUrlPrefix + props.contactUrl} title={props.linkTitle} target={props.linkTarget} rel="noopener noreferrer">
            <img className="contact-icon" src={props.icon} alt={props.altText} />   
        </a>
    )
}