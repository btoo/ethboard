import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {
//   // fetchEthAccounts
//   createBoard
// } from './actions'

import BoardContainer from 'board'
import './index.css'

const mapStateToProps = store => { return {
  web3: store.app.web3,
  txObj: store.app.txObj,
}}

const mapDispatchToProps = dispatch => { return bindActionCreators({
  // fetchEthAccounts,
  // createBoard
}, dispatch)}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  
  render() { return (
    <div>
      header
      <br/>
      <BoardContainer />
      <br/>
      footer
    </div>
  )}
}