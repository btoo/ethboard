import React, { Component } from 'react'
// import SendCoin from 'components/SendCoin/SendCoin'

import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'
// import Web3 from 'web3'

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
    
    
    // const board = await Board.at("0xda296be026f6ded2483f67aff93a2ee1ef4b2dd8")
    const board = await Board.new('test init title', 'test init img', 'test init href', 22)
        , adsLength = (await board.getAdsLength()).toNumber()
    
    console.log(board)
    console.log(adsLength)

    // post new ad
    await board.postAd(
      `test title #${adsLength + 1}`,
      `test img #${adsLength + 1}`,
      `test href #${adsLength + 1}`,
      22,
      {from}
    )
    
    const ads = await Promise.all([...Array(adsLength).keys()].map(
      async adIndex => {
        const adAddress = await board.getAdAddress.call(adIndex)
        return await Ad.at(adAddress)
      }
    ))
    
    this.setState({ads})
    console.log(this.state.ads)

    const contributions = await Promise.all(ads.map(
      async ad => (await ad.getTotalContributions.call()).toNumber()
    ))
    
    console.log(contributions)

    eth.accounts.map(account => {
      console.log(account)
      // console.log(eth.getBalance(account).toNumber())
    })

  }

  render() {
    return (
      <div>
        {this.state.ads.map((ad, i) => (
          'yo'
          // <a key={i} href={ad.href}>
          //   <article>
          //     <img src={ad.img} alt={ad.title}/>
          //     <h2>
          //       {ad.title}  
          //     </h2>
          //   </article>
          // </a>
        ))}
      </div>
    )
  }
}

export default BoardContainer
