import React, { Component } from 'react'
// import SendCoin from 'components/SendCoin/SendCoin'

import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'
// import Web3 from 'web3'

import './index.css'

class BoardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ads: []
    }
  }

  componentWillMount(){
    Board.setProvider(this.props.web3.currentProvider)
    Ad.setProvider(this.props.web3.currentProvider)
  }


  async componentDidMount() {
    
    console.log('to be removed in production because the ethboard contract will already have been instantiated');
    const { eth, toAscii } = this.props.web3
        , gas = 4476768
        , accounts = await new Promise((resolve, reject) => eth.getAccounts((err, accounts) => resolve(accounts)))
        , from = accounts[0]

    Board.defaults({from, gas})
    
    const board = await Board.at("0x86aba3f2a362f6687587ec7b41b7a50e35cf73cf")
    // const board = await Board.new('test init title', 'test init img', 'test init href')
        , oldAdsLength = (await board.getAdsLength()).toNumber()
        
    
    console.log('board', board)
    console.log('board owner', await board.getOwner.call())

    // post new ad
    const posted = await board.postAd(
          `test title #${oldAdsLength + 1}`,
          `test img #${oldAdsLength + 1}`,
          `test href #${oldAdsLength + 1}`,
          {from: '0x41f4370397d42bada75664d72b6bf4d0a2ff6780', value: 99999999999990000000}
        )
      , newAdsLength = (await board.getAdsLength()).toNumber()

    console.log('adsLength', newAdsLength)
    
    const ads = await Promise.all([...Array(newAdsLength).keys()].map(
      async adIndex => {
        const address = await board.getAdAddress.call(adIndex)
            , contract = await Ad.at(address)
            , [ titleHex, imgHex, hrefHex, totalBigNumber ] = await contract.getState()
            , title = toAscii(titleHex)
            , img = toAscii(imgHex)
            , href = toAscii(hrefHex)
            , total = totalBigNumber.toNumber()

        return { address, contract, title, img, href, total }
      }
    ))
    
    this.setState({ads})
    console.log(this.state.ads)

    eth.accounts.map(async account => {
      const balance = await new Promise((resolve, reject) => eth.getBalance(account, (err, result) => resolve(result)))
      console.log(balance.toNumber())
    })

    // board owner 0xac7328f5f11bd698a0ca0f199b01e59ec6230ee1
    // testrpc[0] public = 0x0ebe068998aabbcf570b98e45cb6520b644faaa9
    // private f6f430e5aada6141a3149a31ad34ffb90e8e765672570c25f4de5a383859f7a8

  }

  render() {
    return (
      <div>
        {this.state.ads.map((ad, i) => (
          <a key={i} href={ad.href}>
            <article>
              <img src={ad.img} alt={ad.title}/>
              <h2>{ad.title}</h2>
              <h3>{ad.total}</h3>
            </article>
          </a>
        ))}
      </div>
    )
  }
}

export default BoardContainer
