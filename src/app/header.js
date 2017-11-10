import React from 'react'
import { BoardCreator } from 'board'
import { AdPoster } from 'ad'

export default props => (
  <header className="header">
    <h1>ethboard</h1>
    {props.boardContract
      ? <h2>{props.boardContract.address}</h2>
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