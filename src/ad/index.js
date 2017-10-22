// import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import {
//   // fetchAdsIfNeeded as fetchAds,
//   // postAd
// } from './actions'

// import Board from 'contracts/Board.sol'
// import Ad from 'contracts/Ad.sol'

// import './index.css'

// const mapStateToProps = store => { // set the props for this component
//   return {
//     ad: store.app.web3
//   }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({
  
// }, dispatch)

// @connect(mapStateToProps, mapDispatchToProps)
// export default class BoardContainer extends Component {
  
//   async componentWillMount(){
//     console.log(
//       'fetching dem ads',
//       await this.props.fetchAds(this.props.boardContract)
//     )
//   }

//   render() {
//     return (
//       <div>

//         <button onClick={_ => {
//           const newAdIndex = this.props.ads.length
//           this.props.postAd(this.props.web3, this.props.txObj, this.props.boardContract, this.props.ads, {
//             title: `title #${newAdIndex}`,
//             img: `img #${newAdIndex}`,
//             href: `href #${newAdIndex}`,
//             contribution: 88 * newAdIndex
//           })
//         }}>
//           click this to post a new ad
//         </button>

//         {this.props.ads.map((ad, i) => (
//           <a key={i} href={ad.href}>
//             <article>
//               <img src={ad.img} alt={ad.title}/>
//               | <h2>{ad.title}</h2>
//               | <h3>{ad.total}</h3>
//               | <p>{ad.address}</p>
//             </article>
//           </a>
//         ))}

//       </div>
//     )
//   }
// }