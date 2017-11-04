import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postAd } from 'board/actions'

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    txObj: store.app.txObj,
    boardContract: store.board.boardContract,
    ads: store.board.ads
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  postAd
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AdPoster extends Component { // use class declaration for now because this babel decorator doesnt support decorators on anything else..
  
  render() { return (
    <button className="board--post-ad" onClick={_ => {
      const postedAdIndex = this.props.ads.length
      this.props.postAd(this.props.web3, this.props.txObj, this.props.boardContract, postedAdIndex, {
        title: `title #${postedAdIndex}`,
        img: prompt('ad img url'),
        href: `href #${postedAdIndex}`,
        contribution: 88 * postedAdIndex
      })
    }}>
      click this to post a new ad
    </button>
  )}
  
}