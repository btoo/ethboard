import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAdsIfNeeded as fetchAds
} from './actions'
import Board from 'contracts/Board.sol'
import './index.css'
import Bubbles from "bubbles"

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    boardContract: store.board.boardContract,
    txObj: store.app.txObj,
    ads: store.board.ads,
    height: store.app.height,
    width: store.app.width
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAds
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardContainer extends Component {
  
  async componentWillMount(){
    const fetchResult = await this.props.fetchAds(this.props.boardContract)
    // console.log(fetchResult)
  }
  
  render() { return (
    <article className="board">
      <Bubbles
        ads={this.props.ads}
        height={this.props.height}
        width={this.props.width}
      />
    </article>
  )}
}

export { default as BoardCreator } from './creator'