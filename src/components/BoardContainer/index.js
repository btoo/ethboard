import React, { Component } from 'react'
// import SendCoin from 'components/SendCoin/SendCoin'

import Board from 'contracts/Board.sol'
// import Web3 from 'web3'

class BoardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // accounts: [],
      // coinbase: ''
    }
    // this._getAccountBalance = this._getAccountBalance.bind(this)
    // this._getAccountBalances = this._getAccountBalances.bind(this)
  }

  componentWillMount(){
    // MetaCoin.setProvider(this.props.web3.currentProvider);    
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

  componentDidMount() {

    console.log('to be removed in production because the ethboard contract will already have been instantiated');
    (async _ => {
      const {
              toAscii
            } = this.props.web3
          , gas = 4700000
          , accounts = await new Promise((resolve, reject) => this.props.web3.eth.getAccounts((err, accounts) => resolve(accounts)))
          , from = accounts[0]

      Board.defaults({from, gas})
      Board.setProvider(this.props.web3.currentProvider)

      const board = await Board.new('test init text', 'test init url')
          , adsLength = await board.getAdsLength.call()
          , initAd = await board.getAd.call(0)
          , nonexistantAd = await board.getAd.call(88)
      
      // console.log(board)
      console.log(adsLength.toString(10))
      console.log(initAd.map(hex => toAscii(hex)))
      console.log(nonexistantAd.map(hex => toAscii(hex)))
      
    })()
    
    
    // const board = Board.deployed()
    new Promise((resolve, reject) => {
      // console.log(board.getAd)
      // board.getBalance.call(account, {from: account}).then(function (value) {
      //   resolve({ account: value.valueOf() })
      // }).catch(function (e) {
      //   console.log(e)
      //   reject()
      // })
    })

    // const refreshBalances = () => {
    //   this._getAccountBalances()
    // }

    // refreshBalances()

    // setInterval(()=>{
    //   refreshBalances();
    //   return refreshBalances
    // }, 5000)
  }

  render() {
    return (
      <div>
        niqua
        {/* <AccountList accounts={this.state.accounts} /> */}
        {/* <SendCoin sender={this.state.coinbase} /> */}
      </div>
    )
  }
}

export default BoardContainer
