export const REQUEST_ETH_ACCOUNTS = 'REQUEST_ETH_ACCOUNTS'
const requestEthAccounts = eth => {
  return {
    type: REQUEST_ETH_ACCOUNTS,
    eth
  }
}

export const RECEIVE_ETH_ACCOUNTS = 'RECEIVE_ETH_ACCOUNTS'
const receiveEthAccounts = (eth, accounts) => {
  return {
    type: RECEIVE_ETH_ACCOUNTS,
    eth,
    accounts
  }
}

export const fetchEthAccounts = eth => dispatch => {
  dispatch(requestEthAccounts(eth))
  eth.getAccounts((err, accounts) => dispatch(receiveEthAccounts(eth, accounts)))
}