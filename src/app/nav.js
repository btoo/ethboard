import React from 'react'
import { AdPoster } from 'ad'

export default props => (
  <nav className="nav">
    this is the nav
    <br/>
    {
      props.boardContract
        ? (
            <div>
              address: {props.boardContract.address}
              <AdPoster />
            </div>
          )
        : ''
    }
  </nav>
)