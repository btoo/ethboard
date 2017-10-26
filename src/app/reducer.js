import truffleConfig from '../../truffle.js'
import Web3 from 'web3'
import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'

import {
  REQUEST_ETH_ACCOUNTS,
  RECEIVE_ETH_ACCOUNTS,
  INVALIDATE_ETH_ACCOUNTS
} from './actions'

const web3 = typeof window.web3 !== 'undefined' // Supports Metamask and Mist, and other wallets that provide 'web3'.
  ? new Web3(window.web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line
  : new Web3(new Web3.providers.HttpProvider(`http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`))

const accounts = web3.eth.accounts
    , from = accounts.length > 1
        ? prompt(`Which account would you like to use?\n${
            accounts.map(acc => acc).join('\n')
          }`, accounts[0])
        : accounts[0]

export default (state = {
  web3,
  txObj: {
    from,
    gas: 4700000
  },
  accounts: [], // accounts hosted on this node
  fetchingEthAccounts: false,
  invalidatedEthAccounts: false
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

    case INVALIDATE_ETH_ACCOUNTS: return {
      ...state,
      invalidatedEthAccounts: true
    }

    default: return state
  }
}