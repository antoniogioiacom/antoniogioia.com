import React from 'react'
import Header from "./header"
import "../css/layout.scss"

export default ({children}) => {
  return (
    <div itemscope itemtype="http://schema.org/Person">
      <Header />
      <div className="container">
        {children}
      </div>
    </div>
  )
}