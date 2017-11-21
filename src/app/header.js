import React from 'react'
import { BoardCreator } from 'board'
import { AdPoster } from 'ad'

export default ({boardContract, focusedAd}) => {

  const adIsFocused = focusedAd.adIndex > -1
      , href = adIsFocused
          ? focusedAd.href
          : `https://etherscan.io/address/${boardContract.address}`

  return (
    <header className="header">
      {adIsFocused ? '' : (
        <h1>ethboard</h1>
      )}
      {!boardContract ? '' : (
        <a className="header--board-address" href={href} target="_blank">
          {adIsFocused ? focusedAd.title : boardContract.address}
        </a>
      )}
      {adIsFocused ? '' : (
        <nav>
          {
            boardContract
              ? <AdPoster />
              : <BoardCreator />
          }
        </nav>
      )}
    </header>
  )
}