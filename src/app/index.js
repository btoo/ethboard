import React, { Component } from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Web3 from 'web3'
import './index.css'
import truffleConfig from '../../truffle.js'

import AccountListContainer from 'components/AccountList/AccountListContainer'
import BoardContainer from 'board'

const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

window.addEventListener('load', _ => {                    
  
  // Supports Metamask and Mist, and other wallets that provide 'web3'.
  const web3Provided = typeof web3 !== 'undefined'
    ? new Web3(web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line     
    : new Web3(new Web3.providers.HttpProvider(web3Location))

  render(
    <div className="App">
      <BoardContainer web3={web3Provided} />
      {/* <AccountListContainer web3={this.props.web3} /> */}
    </div>,
    document.getElementById('root')
  )

})