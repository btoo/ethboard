import React, { Component } from 'react'
import AdContainer from 'ad'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAdsIfNeeded as fetchAds,
  postAd
} from './actions'
import * as d3 from 'd3'
import Board from 'contracts/Board.sol'
import './index.css'

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    boardContract: store.board.boardContract,
    txObj: store.app.txObj,
    ads: store.board.ads
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAds,
  postAd
}, dispatch)

// import createBubbleChart from './bubbles-old'
import Bubbles from './bubbles'

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardContainer extends Component {
  
  async componentWillMount(){
    const fetchResult = await this.props.fetchAds(this.props.boardContract)
    // console.log(fetchResult)
  }
  
  // componentDidMount(){ this.createBubbleChart() }
  // componentDidUpdate(){ this.createBubbleChart() }

  // createBubbleChart(){
  //   console.log('creating')
  //   createBubbleChart(this.node, this.props.ads)
  // }

  render() { return (
    <div className="board" ref={node => this.node = node}>
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
      <br/>
      <Bubbles
        ads={this.props.ads}
        data={[5,10,1,3]}
        size={[500,500]}
      />
      {/* {this.props.ads.map((ad, i) => <AdContainer key={i} {...ad} />)} */}
    </div>
  )}
}

export { default as CreateBoardContainer } from './create'