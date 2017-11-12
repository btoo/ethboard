import React from 'react'
import { BoardCreator } from 'board'
import { AdPoster } from 'ad'

export default props => (
  <header className="header">
    <h1>ethboard</h1>
    {props.boardContract
      ? <a
          href={`https://etherscan.io/address/${props.boardContract.address}`} target="_blank"
          className="header--board-address"
        >
          {props.boardContract.address}
        </a>
      : ''
    }
    <nav>
      {
        props.boardContract
          ? <AdPoster />
          : <BoardCreator />
      }
    </nav>
  </header>
)