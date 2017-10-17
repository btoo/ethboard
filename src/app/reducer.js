import truffleConfig from '../../truffle.js'
import Board from 'contracts/Board.sol'
import Ad from 'contracts/Ad.sol'

export default (state = {
  web3: typeof web3 !== 'undefined' // Supports Metamask and Mist, and other wallets that provide 'web3'.
    ? new Web3(web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line     
    : new Web3(new Web3.providers.HttpProvider(`http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`))
}, action) => {
  
  Board.setProvider(state.web3.currentProvider)
  Ad.setProvider(state.web3.currentProvider)

  return state // no actions needed on app level yet
}