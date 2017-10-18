import Web3 from 'web3'
import truffleConfig from '../../truffle.js'
import Board from 'contracts/Board.sol'

export default async _ => {
  
  const web3 = typeof web3 !== 'undefined' // Supports Metamask and Mist, and other wallets that provide 'web3'.
    ? new Web3(web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line     
    : new Web3(new Web3.providers.HttpProvider(`http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`))
  
  Board.setProvider(web3.currentProvider)
  const { eth, toAscii } = web3
      , gas = 4476768
      , accounts = await new Promise((resolve, reject) => eth.getAccounts((err, accounts) => resolve(accounts)))
      , from = accounts[0]

  Board.defaults({from, gas})
  const board = await Board.new('test init title', 'test init img', 'test init href')
  
  console.log('new EthBoard address:', board.address)
  
}