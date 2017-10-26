import React, { Component } from 'react'
import AdContainer from 'ad'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAdsIfNeeded as fetchAds,
  postAd
} from './actions'

import Board from 'contracts/Board.sol'
import './index.css'

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    boardAddress: store.board.boardAddress,
    boardContract: store.board.boardContract,
    txObj: store.app.txObj,
    ads: store.board.ads
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAds,
  postAd
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardContainer extends Component {
  
  async componentWillMount(){
    await this.props.fetchAds(this.props.boardContract)
  }

  render() { return (
    <div>

      <button onClick={_ => {
        const postedAdIndex = Object.keys(this.props.ads).length
        this.props.postAd(this.props.web3, this.props.txObj, this.props.boardContract, postedAdIndex, {
          title: `title #${postedAdIndex}`,
          img: `img #${postedAdIndex}`,
          href: `href #${postedAdIndex}`,
          contribution: 88 * postedAdIndex
        })
      }}>
        click this to post a new ad
      </button>

      {Object.values(this.props.ads).map((ad, i) => <AdContainer key={i} {...ad} />)}

    </div>
  )}
}