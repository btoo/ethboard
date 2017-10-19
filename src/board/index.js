import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAdsCountIfNeeded as fetchAdsCount,
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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAdsCount,
  postAd
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardContainer extends Component {
  
  async componentWillMount(){
    
    const res = await this.props.fetchAdsCount(this.props.boardContract)
    console.log(res)
    
  }

  // async componentDidMount() {
    
  //   // // console.log('to be removed in production because the ethboard contract will already have been instantiated');
  //   // const { eth, toAscii } = this.props.web3
  //   //     , gas = 4476768
  //   //     , accounts = await new Promise((resolve, reject) => eth.getAccounts((err, accounts) => resolve(accounts)))
  //   //     , from = accounts[0]

  //   // Board.defaults({from, gas})
    
  //   // // const fetchedBoardContract = fetchBoardContract


  //   // const board = await Board.at("0xb42f518d7dc4de7e7a24d5fae90191e6c75e1ddf")
  //   // // const board = await Board.new('test init title', 'test init img', 'test init href')
  //   //     , oldAdsLength = (await board.getAdsLength()).toNumber()
        
    
  //   // // console.log('board', board)
  //   // // console.log('board owner', await board.getOwner.call())

  //   // // post new ad
  //   // const posted = await board.postAd(
  //   //       `test title #${oldAdsLength + 1}`,
  //   //       `test img #${oldAdsLength + 1}`,
  //   //       `test href #${oldAdsLength + 1}`,
  //   //       {from: '0x6e23ef9c592916902334648a886972759c5dd908', value: 88}
  //   //     )
  //   //   , newAdsLength = (await board.getAdsLength()).toNumber()

  //   // // console.log('adsLength', newAdsLength)
    
  //   // const ads = await Promise.all([...Array(newAdsLength).keys()].map(
  //   //   async adIndex => {
  //   //     const address = await board.getAdAddress.call(adIndex)
  //   //         , contract = await Ad.at(address)
  //   //         , [ titleHex, imgHex, hrefHex, totalBigNumber ] = await contract.getState()
  //   //         , title = toAscii(titleHex)
  //   //         , img = toAscii(imgHex)
  //   //         , href = toAscii(hrefHex)
  //   //         , total = totalBigNumber.toNumber()

  //   //     return { address, contract, title, img, href, total }
  //   //   }
  //   // ))
    
  //   // this.setState({ads})
  //   // // console.log(this.state.ads)

  //   // eth.accounts.map(async account => {
  //   //   const balance = await new Promise((resolve, reject) => eth.getBalance(account, (err, result) => resolve(result)))
  //   //   console.log(balance.toNumber())
  //   // })

  // }

  render() {
    return (
      <div>
        <button onClick={this.props.postAd(this.props.txObj, this.props.boardContract)({
          title: 'nititle',
          img: 'niimg',
          href: 'nihref',
          contribution: 88
        })}>
          click this to post a new ad
        </button>
        {
          this.props.boardContract
            ? Object.keys(this.props.boardContract).map(key => key)
            : 'nuttin'
        }
        {/* 
        {this.state.ads.map((ad, i) => (
          <a key={i} href={ad.href}>
            <article>
              <img src={ad.img} alt={ad.title}/>
              | <h2>{ad.title}</h2>
              | <h3>{ad.total}</h3>
            </article>
          </a>
        ))}
        */}
      </div>
    )
  }
}