import React from "react"
import "../css/block-render.scss"

export default () => {
    return (
        <div className="stack-tools">
            <ul>
                <li>
                    <img src="/images/javascript.svg" alt="Javascript logo" />
                    <span>javascript</span>
                </li>
                <li>
                    <img src="/images/python.svg" alt="Python logo" />
                    <span>python</span>
                </li>
                <li>
                    <img src="/images/nodejs.svg" alt="NodeJs logo" />
                    <span>nodejs</span>
                </li>
                <li className="stack-hide">
                    <img src="/images/angular.svg" alt="AngularJs logo" />
                    <span>angular</span>
                </li>
                <li>
                    <img src="/images/react.svg" alt="ReactJs logo" />
                    <span>react</span>
                </li>
            </ul>
        </div>
    )
}
