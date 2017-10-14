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
      // accounts: [],
      // coinbase: ''
    }
    // this._getAccountBalance = this._getAccountBalance.bind(this)
    // this._getAccountBalances = this._getAccountBalances.bind(this)
  }

  componentWillMount(){
    Board.setProvider(this.props.web3.currentProvider)
    Ad.setProvider(this.props.web3.currentProvider)
  }

  // _getAccountBalance (account) {
  //   var meta = MetaCoin.deployed()
  //   return new Promise((resolve, reject) => {
  //     meta.getBalance.call(account, {from: account}).then(function (value) {
  //       resolve({ account: value.valueOf() })
  //     }).catch(function (e) {
  //       console.log(e)
  //       reject()
  //     })
  //   })
  // }

  // _getAccountBalances () {
  //   this.props.web3.eth.getAccounts(function (err, accs) {
  //     if (err != null) {
  //       window.alert('There was an error fetching your accounts.')
  //       console.error(err)
  //       return
  //     }

  //     if (accs.length === 0) {
  //       window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
  //       return
  //     }

  //     this.setState({coinbase: accs[0]})

  //     var accountsAndBalances = accs.map((account) => {
  //       return this._getAccountBalance(account).then((balance) => { return { account, balance } })
  //     })

  //     Promise.all(accountsAndBalances).then((accountsAndBalances) => {
  //       this.setState({accounts: accountsAndBalances, coinbaseAccount: accountsAndBalances[0]})
  //     })
  //   }.bind(this))
  // }

  async componentDidMount() {
    
    console.log('to be removed in production because the ethboard contract will already have been instantiated');
    const {
            eth,
            toAscii
          } = this.props.web3
        , gas = 4476768
        , accounts = await new Promise((resolve, reject) => eth.getAccounts((err, accounts) => resolve(accounts)))
        , from = accounts[0]

    Board.defaults({from, gas})
    // console.log(accounts)
    // console.log(from)
    
    const board = await Board.at("0x5fada42d0103ed2d9cd292969c33bf682b9dbbd4")
    // const board = await Board.new('test init title', 'test init img', 'test init href', 22222222)
        , adsLength = (await board.getAdsLength()).toNumber()
    
    console.log(board)
    console.log(adsLength)

    // post new ad
    await board.postAd(
      `test title #${adsLength + 1}`,
      `test img #${adsLength + 1}`,
      `test href #${adsLength + 1}`,
      8,
      {from}
    )
    
    const ads = await Promise.all([...Array(adsLength).keys()].map(
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
    
    this.setState({ ads })
    console.log(this.state.ads)

    eth.accounts.map(account => {
      // console.log(account)
      console.log(eth.getBalance(account).toNumber())
    })

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
