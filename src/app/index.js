import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {

// } from './actions'

import Nav from './nav'
import BoardContainer, { CreateBoardContainer } from 'board'
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
    <div className="app">
      <Nav boardAddress={this.props.boardAddress} />
      {
        this.props.boardAddress
          ? <BoardContainer />
          : <CreateBoardContainer />
      }
    </div>
  )}
}