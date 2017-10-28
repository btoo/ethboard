import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {

// } from './actions'

import BoardContainer from 'board'
import CreateBoardContainer from 'board/create'
import './index.css'

const mapStateToProps = store => { return {
  web3: store.app.web3,
  txObj: store.app.txObj,
  boardAddress: store.board.boardAddress,
}}

const mapDispatchToProps = dispatch => { return bindActionCreators({
  
}, dispatch)}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  
  render() { return (
    <div>
      header
      <br/>
      {
        this.props.boardAddress
          ? <BoardContainer />
          : <CreateBoardContainer />
      }
      <br/>
      footer
    </div>
  )}
}