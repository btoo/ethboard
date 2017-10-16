import truffleConfig from '../../truffle.js'

export default (state = {
  web3: typeof web3 !== 'undefined' // Supports Metamask and Mist, and other wallets that provide 'web3'.
    ? new Web3(web3.currentProvider) // Use the Mist/wallet provider. eslint-disable-next-line     
    : new Web3(new Web3.providers.HttpProvider(`http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`))
}, action) => {
  // switch (action.type){
  //   case 'ACTION_1':
  //     return {
  //       ...state,

  //     }
  // }
  
  return state // no actions needed on app level yet

}