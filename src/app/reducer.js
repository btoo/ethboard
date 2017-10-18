import truffleConfig from '../../truffle.js'
import Web3 from 'web3'
import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'

import {
  REQUEST_ETH_ACCOUNTS,
  RECEIVE_ETH_ACCOUNTS
} from './actions'

export default (state = {
  web3: typeof web3 !== 'undefined' // Supports Metamask and Mist, and other wallets that provide 'web3'.
    ? new Web3(web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line     
    : new Web3(new Web3.providers.HttpProvider(`http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`)),
  accounts: [], // accounts hosted on this node
  txObj: {
    from: null, // <Address> for now just use the first account
    gas: 4700000
  }
}, action) => {
  
  Board.setProvider(state.web3.currentProvider)
  Ad.setProvider(state.web3.currentProvider)
  
  switch (action.type){

    case REQUEST_ETH_ACCOUNTS: return {
      ...state,
      fetchingEthAccounts: true
    }

    case RECEIVE_ETH_ACCOUNTS: return {
      ...state,
      fetchingEthAccounts: false,
      accounts: action.accounts,
      txObj: {
        ...state.txObj,
        from: action.accounts[0]
      }
    }

    default: return state
  }
}