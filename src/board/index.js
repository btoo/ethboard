import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAdsCountIfNeeded as fetchAdsCount,
  fetchAdsIfNeeded as fetchAds,
  postAd
} from './actions'

import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'

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
  fetchAdsCount,
  fetchAds,
  postAd
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardContainer extends Component {
  
  async componentWillMount(){
    
    const adsCount = await this.props.fetchAdsCount(this.props.boardContract)
    console.log(
      'fetching dem ads',
      await this.props.fetchAds(adsCount)
    )
    
  }

  render() {
    return (
      <div>
        <button onClick={_ => {
          const newAdIndex = this.props.ads.length
          this.props.postAd({
            title: `title #${newAdIndex}`,
            img: `img #${newAdIndex}`,
            href: `href #${newAdIndex}`,
            contribution: 88 * newAdIndex
          })
        }}>
          click this to post a new ad
        </button>
        {
          this.props.boardContract
            ? Object.keys(this.props.boardContract).map(key => key)
            : 'nuttin'
        }
        {this.props.ads.map((ad, i) => (
          <a key={i} href={ad.href}>
            <article>
              <img src={ad.img} alt={ad.title}/>
              | <h2>{ad.title}</h2>
              | <h3>{ad.total}</h3>
            </article>
          </a>
        ))}
      </div>
    )
  }
}