export const SEND_BOARD = 'SEND_BOARD'
const sendBoard = _ => { return {
  type: SEND_BOARD
}}

export const BOARD_DELIVERED = 'BOARD_DELIVERED'
const boardDelivered = boardContract => { return {
  type: BOARD_DELIVERED,
  boardContract
}}

export const INVALIDATE_BOARD_DELIVERY = 'INVALIDATE_BOARD_DELIVERY'
const invalidateBoardDelivery = error => {
  return {
    type: INVALIDATE_BOARD_DELIVERY,
    error
  }
}

import Web3 from 'web3'
import truffleConfig from '../../../truffle.js'
import Board from 'contracts/Board.sol'
export const createBoard = (web3, txObj) => dispatch => async _ => {
  
  try {
    Board.setProvider(web3.currentProvider)
    Board.defaults(txObj)
    const boardContract = await Board.new('test init title', 'test init img', 'test init href')
    console.log('new EthBoard address:', boardContract.address)
    dispatch(boardDelivered(boardContract))
  } catch(error) {
    dispatch(invalidateBoardDelivery(error))
  }
  
}