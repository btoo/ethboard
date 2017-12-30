import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from 'header'
import BoardContainer, { BoardCreator } from 'board'
import './index.css'

const mapStateToProps = store => { return {
  web3: store.app.web3,
  txObj: store.app.txObj,
  boardContract: store.board.boardContract,
  focusedAd: store.board.focusedAd
}}

const mapDispatchToProps = dispatch => { return bindActionCreators({
  
}, dispatch)}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  
  render() { return (
    <main className={`app${this.props.focusedAd.adIndex > -1 ? ' ad-is-focused' : ''}`}>
      <Header boardContract={this.props.boardContract} focusedAd={this.props.focusedAd} txObj={this.props.txObj} eth={this.props.web3.eth}/>
      {this.props.boardContract ? <BoardContainer /> : ''}
    </main>
  )}

}