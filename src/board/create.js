import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createBoard } from './actions'

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    boardAddress: store.board.boardAddress,
    txObj: store.app.txObj,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createBoard,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateBoardContainer extends Component {
  
  render() { return (
    <button onClick={this.props.createBoard(this.props.web3, this.props.txObj)}>
      click here to create a new board and then check your console to view its address
    </button>
  )}
  
}