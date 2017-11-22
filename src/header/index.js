import React from 'react'
import { BoardCreator } from 'board'
import { AdPoster } from 'ad'
import './index.css'

const HeaderLink = ({boardContract, adIsFocused, focusedAd}) => {

  const href = adIsFocused
    ? focusedAd.href
    : `https://etherscan.io/address/${boardContract.address}`

  return (
    <a className="header--board-address" href={href} target="_blank">
      {adIsFocused ? focusedAd.title : boardContract.address}
    </a>
  )
}

export default props => {

  const adIsFocused = props.focusedAd.adIndex > -1

  return (
    <header className="header">
      {adIsFocused ? '' : (
        <h1>ethboard</h1>
      )}
      {props.boardContract ? <HeaderLink {...props} adIsFocused={adIsFocused} /> : ''}
      {adIsFocused ? '' : (
        <nav>
          {
            props.boardContract
              ? <AdPoster />
              : <BoardCreator />
          }
        </nav>
      )}
    </header>
  )
}