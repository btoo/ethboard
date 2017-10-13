import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Web3 from 'web3'
import './index.css'
import truffleConfig from '../truffle.js'

const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

window.addEventListener('load', _ => {                    
  
  // Supports Metamask and Mist, and other wallets that provide 'web3'.
  const web3Provided = typeof web3 !== 'undefined'
    ? new Web3(web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line     
    : new Web3(new Web3.providers.HttpProvider(web3Location))

  ReactDOM.render(
    <App web3={web3Provided} />,
    document.getElementById('root')
  )

})