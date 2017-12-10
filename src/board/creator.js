import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createBoard } from './actions'

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    txObj: store.app.txObj,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createBoard,
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardCreator extends Component { // use class declaration for now because this babel decorator doesnt support decorators on anything else..
  
  render() { return (
    <article className="board">
      <button onClick={this.props.createBoard(this.props.web3, this.props.txObj)} className="button">
        click here to create a new board
      </button>
    </article>
  )}
  
}