import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import {
//   // fetchAdsIfNeeded as fetchAds,
//   // postAd
// } from './actions'

// import Board from 'contracts/Board.sol'

// // import './index.css'

// const mapStateToProps = store => { // set the props for this component
//   return {
//     ad: store.app.web3
//   }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({
  
// }, dispatch)

// @connect(mapStateToProps, mapDispatchToProps)
export default class AdContainer extends Component {
  
  render() {
    const {href, img, title, total, address} = this.props
    return (
      <a href={href} className="ad">
        <article>
          <img src={img} alt={title}/>
          | <h2>{title}</h2>
          | <h3>{total}</h3>
          | <p>{address}</p>
        </article>
      </a>
    )
  }

}