import {
  REQUEST_BOARD_CONTRACT,
  RECEIVE_BOARD_CONTRACT
} from './actions'

export default (state = {
  boardAddress: "0xb42f518d7dc4de7e7a24d5fae90191e6c75e1ddf",
  boardContract: null,
  fetchingBoardContract: false,
  fetchedBoardContract: false,
  fetchBoardError: null
}, action) => {

  switch (action.type){
    case REQUEST_BOARD_CONTRACT: return {
      ...state,
      fetchingBoardContract: true
    }
    case RECEIVE_BOARD_CONTRACT: return {
      ...state,
      fetchingBoardContract: false,
      boardContract: action.boardContract
    }
    default: return state
  }
  
}