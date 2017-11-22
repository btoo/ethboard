import React from 'react'
import { BoardCreator } from 'board'
import { AdPoster } from 'ad'

const Link = ({boardContract, adIsFocused, focusedAd}) => {

  const href = adIsFocused
    ? focusedAd.href
    : `https://etherscan.io/address/${boardContract.address}`

  return (
    <a className="header--board-address" href={href} target="_blank">
      {adIsFocused ? focusedAd.title : boardContract.address}
    </a>
  )
}

export default ({boardContract, focusedAd}) => {

  const adIsFocused = focusedAd.adIndex > -1

  return (
    <header className="header">
      {adIsFocused ? '' : (
        <h1>ethboard</h1>
      )}
      {boardContract ? <Link boardContract={boardContract} focusedAd={focusedAd} /> : ''}
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