import React, { Children } from 'react'

export default props => (
  <div className="ad-poster--fields">
    {props.children[props.activeFormField]}
  </div>
)